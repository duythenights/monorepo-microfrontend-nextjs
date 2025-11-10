// packages/ui/src/components/toploader.tsx
"use client";

import NextTopLoader from "nextjs-toploader";

interface TopLoaderProps {
  theme?: "light" | "dark" | "blue" | "red" | "green";
}

export function TopLoader({ theme = "blue" }: TopLoaderProps) {
  const colors = {
    light: "#000000",
    dark: "#ffffff",
    blue: "#2563eb",
    red: "#dc2626",
    green: "#16a34a",
  };

  const color = colors[theme];

  return (
    <NextTopLoader
      color={color}
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow={`0 0 10px ${color},0 0 5px ${color}`}
      zIndex={1600}
    />
  );
}
