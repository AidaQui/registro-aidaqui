import type { NextConfig } from "next";

// Personal webinar link (/vivo/<token>?e=<email>): the Sierra panel serves it,
// but the contact sees the landing's domain. The panel records the join and
// redirects to Zoom; the redirect passes through the rewrite untouched.
const sierraPanel = process.env.NEXT_PUBLIC_SIERRA_URL?.replace(/\/+$/, "");
const sierraWebinar = sierraPanel ? [{ source: "/vivo/:token", destination: `${sierraPanel}/w/:token` }] : [];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
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
