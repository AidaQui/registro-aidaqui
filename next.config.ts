import type { NextConfig } from "next";

// Personal webinar link (/vivo/<token>?e=<email>): the Sierra panel serves it,
// but the contact sees the landing's domain. The panel records the join and
// redirects to Zoom; the redirect passes through the rewrite untouched.
const sierraPanel = process.env.NEXT_PUBLIC_SIERRA_URL?.replace(/\/+$/, "");
// Fixed WhatsApp group link of the launch (/grupo/<token>): the panel sends
// each person to the current group and rotates when one fills up.
const sierraWebinar = sierraPanel
  ? [
      { source: "/vivo/:token", destination: `${sierraPanel}/w/:token` },
      { source: "/grupo/:token", destination: `${sierraPanel}/g/:token` },
    ]
  : [];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  experimental: {
    // Critters (paquete `critters`) mete en el HTML el CSS que la página usa y
    // carga el resto sin bloquear: en mobile los <link> de CSS eran la
    // principal solicitud de bloqueo de renderización.
    // `fonts: true` porque Next pasa `fonts: false`: sin los @font-face en el
    // CSS inline, las fuentes empezaban a bajar recién con el CSS diferido y
    // el texto que se parte en líneas por JS medía con la fuente de respaldo.
    optimizeCss: { fonts: true },
  },
  async rewrites() {
    return [
      ...sierraWebinar,
      {
        // registro.aidaqui.com root keeps serving the Masterclass landing
        // (its original content) without exposing /masterclass in the URL.
        source: "/",
        destination: "/masterclass",
        has: [{ type: "host", value: "registro.aidaqui.com" }],
      },
      {
        // academia.aidaqui.com root serves the Academia ADN landing
        // without exposing /academia in the URL.
        source: "/",
        destination: "/academia",
        has: [{ type: "host", value: "academia.aidaqui.com" }],
      },
      {
        source: "/gracias",
        destination: "/academia/gracias",
        has: [{ type: "host", value: "academia.aidaqui.com" }],
      },
    ];
  },
};

export default nextConfig;
