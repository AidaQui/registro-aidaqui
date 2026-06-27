import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async rewrites() {
    return [
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
