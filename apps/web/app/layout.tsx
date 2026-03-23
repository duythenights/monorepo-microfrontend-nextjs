import { Header, TopLoader } from "@repo/ui";
import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Host app — Monorepo microfrontends",
  description:
    "Next.js host with Turborepo, shared UI package, and proxied docs / animation apps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${sourceSans.variable} font-[family-name:var(--font-body)] antialiased`}
      >
        <TopLoader theme="blue" />
        <Header site="web" />
        {children}
      </body>
    </html>
  );
}
