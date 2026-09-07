import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fraunces, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Clarity from "@/components/Clarity";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${fraunces.variable} ${jost.variable}`}>
      <Component {...pageProps} />
      <Analytics />
      <Clarity />
    </main>
  );
}
