"use client";
import { useState, useEffect, useMemo } from "react";
import { Sun, Moon } from "lucide-react";

export type HeaderSite = "web" | "docs";

type NavItem = { name: string; href: string };

type Props = {
  onClickLink?: () => void;
  /**
   * Host app uses rewrites to `/docs` and `/animation`. Docs app uses `basePath` `/docs`.
   */
  site?: HeaderSite;
  /**
   * Absolute URL of the host app; used when `site` is `"docs"` for the “Server Host” link.
   */
  hostAppOrigin?: string;
};

/**
 * Sticky top bar with nav links centered on the full header width and a theme toggle on the right.
 * @param onClickLink - Optional callback when a nav link is activated.
 * @param site - `"web"` links to `/docs` and `/animation`; `"docs"` links back to the host origin.
 * @param hostAppOrigin - Base URL for Server Host (e.g. from `NEXT_PUBLIC_WEB_ORIGIN` in the docs layout).
 */
export default function Header({
  onClickLink,
  site = "web",
  hostAppOrigin = "http://localhost:3000",
}: Props) {
  const [isDark, setIsDark] = useState(false);

  const navigation = useMemo<NavItem[]>(() => {
    if (site === "docs") {
      return [
        { name: "Services Docs", href: "/docs" },
        { name: "Server Host", href: hostAppOrigin },
      ];
    }
    return [
      { name: "Server Host", href: "/" },
      { name: "Services Docs", href: "/docs" },
      { name: "Services Animation", href: "/animation" },
    ];
  }, [site, hostAppOrigin]);

  useEffect(() => {
    const theme = document.documentElement.classList.contains("dark");
    setIsDark(theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const homeHref = site === "docs" ? "/docs" : "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href={homeHref}
          className="relative z-20 flex shrink-0 items-center gap-2 rounded-md outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
        >
          <span className="rounded-md bg-primary px-2 py-1 font-mono text-xs font-bold text-primary-foreground sm:text-sm">
            MFE
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline md:text-base">
            Monorepo lab
          </span>
        </a>

        <nav
          className="absolute left-1/2 top-1/2 z-10 max-w-[min(100%,calc(100vw-9rem))] -translate-x-1/2 -translate-y-1/2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Main navigation"
        >
          <ul className="flex items-center justify-center gap-0.5 whitespace-nowrap sm:gap-1 md:gap-2">
            {navigation.map((item) => (
              <li key={item.href} className="shrink-0">
                <a
                  href={item.href}
                  onClick={() => onClickLink?.()}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary md:px-4 md:text-base"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          className="relative z-20 flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-accent text-accent-foreground transition-colors hover:bg-accent/80"
        >
          <span
            className={`absolute transition-all duration-300 ${isDark ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0"}`}
          >
            <Sun className="size-5" />
          </span>
          <span
            className={`absolute transition-all duration-300 ${isDark ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"}`}
          >
            <Moon className="size-5" />
          </span>
        </button>
      </div>
    </header>
  );
}
