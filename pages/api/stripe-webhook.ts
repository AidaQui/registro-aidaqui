import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export const config = {
  api: { bodyParser: false },
};

/**
 * Un mismo webhook recibe las compras de todos los productos de la cuenta de
 * Stripe. Cada compra va al grupo de MailerLite de su producto, y ese grupo
 * dispara su propia automatización (Academia, mail post compra de Activación).
 *
 * `STRIPE_ACTIVACION_IDS` admite IDs de producto (prod_…) o de precio
 * (price_…), separados por coma. Lo que no coincide con Activación sigue
 * yendo a Academia, que es el comportamiento que había antes de separar.
 */
function parseIdList(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

type Destino = { producto: string; groupId: string | undefined };

function resolverDestino(idsComprados: string[]): Destino {
  const idsActivacion = parseIdList(process.env.STRIPE_ACTIVACION_IDS);
  const esActivacion = idsComprados.some((id) => idsActivacion.includes(id));

  return esActivacion
    ? { producto: "activacion", groupId: process.env.MAILERLITE_ACTIVACION_GROUP_ID }
    : { producto: "academia", groupId: process.env.MAILERLITE_ACADEMIA_GROUP_ID };
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

  const secret = process.env.STRIPE_ACADEMIA_WEBHOOK_SECRET;
  if (!secret) {
    console.error("Falta STRIPE_ACADEMIA_WEBHOOK_SECRET");
    return res.status(500).end("Config error");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2026-06-24.dahlia",
  });

  const rawBody = await getRawBody(req);
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.error("Webhook signature inválida", err);
    return res.status(400).end("Invalid signature");
  }

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
  }

  return res.status(200).json({ received: true });
}
