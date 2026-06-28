import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export const config = {
  api: { bodyParser: false },
};

async function addToMailerLite(email: string, name: string): Promise<void> {
  const apiKey = process.env.MAILERLITE_ACADEMIA_API_KEY;
  const groupId = process.env.MAILERLITE_ACADEMIA_GROUP_ID;

  if (!apiKey || !groupId) {
    console.warn("MailerLite Academia no configurado");
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

    if (email) {
      await addToMailerLite(email, name);
    }
  }

  return res.status(200).json({ received: true });
}
