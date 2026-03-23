import { Header, TopLoader } from "@repo/ui";
import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-docs-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-docs-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Docs — Monorepo microfrontends",
  description:
    "Documentation shell served under /docs with shared design system from @repo/ui.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${jetbrains.variable} font-[family-name:var(--font-docs-sans)] antialiased`}
      >
        <TopLoader theme="blue" />
        <Header
          site="docs"
          hostAppOrigin={
            process.env.NEXT_PUBLIC_WEB_ORIGIN ?? "http://localhost:3000"
          }
        />
        {children}
      </body>
    </html>
  );
}
