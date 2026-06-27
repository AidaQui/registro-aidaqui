import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async rewrites() {
    return [
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
    ];
  },
};

export default nextConfig;
