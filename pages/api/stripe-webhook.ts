import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { atribucionDeReferencia, registrarCompra } from "@/lib/sierra";

export const config = {
  api: { bodyParser: false },
};

/**
 * Un mismo webhook recibe las compras de todos los productos de la cuenta de
 * Stripe. Cada compra va al grupo de MailerLite de su producto, y ese grupo
 * dispara su propia automatización (Academia, mail post compra de Activación,
 * Activación del Corazón).
 *
 * `STRIPE_CORAZON_IDS` y `STRIPE_ACTIVACION_IDS` admiten IDs de producto
 * (prod_…) o de precio (price_…), separados por coma. Se revisa primero
 * Corazón, después Activación; lo que no coincide con ninguno sigue yendo a
 * Academia, que es el comportamiento que había antes de separar.
 */
function parseIdList(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

type Destino = { producto: string; groupId: string | undefined };

function resolverDestino(idsComprados: string[]): Destino {
  const compro = (variable: string | undefined) => {
    const ids = parseIdList(variable);
    return idsComprados.some((id) => ids.includes(id));
  };

  if (compro(process.env.STRIPE_CORAZON_IDS)) {
    return { producto: "corazon", groupId: process.env.MAILERLITE_CORAZON_GROUP_ID };
  }
  if (compro(process.env.STRIPE_ACTIVACION_IDS)) {
    return { producto: "activacion", groupId: process.env.MAILERLITE_ACTIVACION_GROUP_ID };
  }
  return { producto: "academia", groupId: process.env.MAILERLITE_ACADEMIA_GROUP_ID };
}

async function addToMailerLite(
  email: string,
  name: string,
  destino: Destino
): Promise<void> {
  const apiKey = process.env.MAILERLITE_ACADEMIA_API_KEY;
  const { groupId, producto } = destino;

  if (!apiKey || !groupId) {
    console.warn(`MailerLite no configurado para ${producto}`);
    return;
  }

  try {
    const resp = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        fields: { name },
        groups: [groupId],
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      console.error("MailerLite error", resp.status, detail);
    }
  } catch (err) {
    console.error("Error llamando a MailerLite", err);
  }
}

async function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method not allowed");
  }

  // Hay dos cuentas de Stripe (la original y la nueva de la clienta). Cada una
  // firma sus avisos con su propio secreto y se consulta con su propia clave:
  // la firma indica de qué cuenta viene el evento.
  const cuentas = [
    { secret: process.env.STRIPE_ACADEMIA_WEBHOOK_SECRET, key: process.env.STRIPE_SECRET_KEY },
    { secret: process.env.STRIPE_ACADEMIA_WEBHOOK_SECRET_2, key: process.env.STRIPE_SECRET_KEY_2 },
  ].filter((c): c is { secret: string; key: string | undefined } => Boolean(c.secret));
  if (cuentas.length === 0) {
    console.error("Falta STRIPE_ACADEMIA_WEBHOOK_SECRET");
    return res.status(500).end("Config error");
  }

  const rawBody = await getRawBody(req);
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event | null = null;
  let claveCuenta: string | undefined;
  for (const cuenta of cuentas) {
    try {
      event = new Stripe(cuenta.key ?? "", { apiVersion: "2026-06-24.dahlia" }).webhooks.constructEvent(
        rawBody,
        sig,
        cuenta.secret
      );
      claveCuenta = cuenta.key;
      break;
    } catch {
      /* firma de otra cuenta: se prueba la siguiente */
    }
  }
  if (!event) {
    console.error("Webhook signature inválida");
    return res.status(400).end("Invalid signature");
  }
  if (!claveCuenta) {
    console.error("Falta la clave secreta de la cuenta de Stripe que firmó este evento");
    return res.status(500).end("Config error");
  }
  const stripe = new Stripe(claveCuenta, { apiVersion: "2026-06-24.dahlia" });

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email ?? "";
    const name = session.customer_details?.name ?? "";

    // El evento no trae los productos: hay que pedirlos aparte. Si falla,
    // respondemos 500 para que Stripe reintente en vez de mandar la compra
    // al grupo equivocado. Reintentar es seguro: MailerLite actualiza al
    // suscriptor si ya existe.
    let idsComprados: string[];
    try {
      const items = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
      });
      idsComprados = items.data.flatMap((item) => {
        const price = item.price;
        if (!price) return [];
        const productId =
          typeof price.product === "string" ? price.product : price.product.id;
        return [price.id, productId];
      });
    } catch (err) {
      console.error("No se pudieron leer los productos de la compra", err);
      return res.status(500).end("Line items error");
    }

    const destino = resolverDestino(idsComprados);
    // Deja en los logs de Vercel qué IDs trae cada compra: así se sacan los
    // valores para STRIPE_ACTIVACION_IDS con una compra de prueba.
    console.info("Compra Stripe", {
      session: session.id,
      ids: idsComprados,
      destino: destino.producto,
    });

    if (email) {
      await addToMailerLite(email, name, destino);
    }

    // Panel de sierra labs. event.id hace que los reintentos de Stripe no se
    // cuenten dos veces. Las compras entran por Payment Links (no se crea la
    // sesión en este repo): la landing y el anuncio llegan en
    // client_reference_id, que el kit agrega al link al hacer clic. Si el
    // botón pasa por un redirector (PixelBridge) no llega, y la compra cae en
    // la ruta de su producto: SIERRA_ACTIVACION_PATH, o SIERRA_CORAZON_PATH
    // (por defecto /activacion-v4, la única landing que lo vende). No lanza.
    const referencia = atribucionDeReferencia(session.client_reference_id);
    const rutaPorProducto =
      destino.producto === "activacion"
        ? process.env.SIERRA_ACTIVACION_PATH?.trim() || null
        : destino.producto === "corazon"
          ? process.env.SIERRA_CORAZON_PATH?.trim() || "/activacion-v4"
          : null;
    await registrarCompra({
      id: event.id,
      amount: (session.amount_total ?? 0) / 100,
      currency: (session.currency ?? "usd").toUpperCase(),
      email: email || null,
      name: name || null,
      phone: session.customer_details?.phone ?? null,
      path: session.metadata?.sl_path ?? referencia?.path ?? rutaPorProducto,
      utm: {
        utm_source: session.metadata?.utm_source ?? referencia?.utm?.utm_source,
        utm_medium: session.metadata?.utm_medium,
        utm_campaign: session.metadata?.utm_campaign ?? referencia?.utm?.utm_campaign,
        utm_content: session.metadata?.utm_content ?? referencia?.utm?.utm_content,
      },
    });
  }

  return res.status(200).json({ received: true });
}
