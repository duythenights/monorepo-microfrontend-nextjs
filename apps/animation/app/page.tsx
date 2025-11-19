import { Metadata } from "next";
import Link from "next/link";
import { LIST_ROUTE } from "../config/route.config";

export const metadata: Metadata = {
  title: "My Enjoyment Space ✨",
  description: "...",
};

const navigationItems = [
  {
    href: LIST_ROUTE.UNFOLD,
    title: "Unfold",
    description: "Smooth unfolding animations",
    icon: "✨",
    gradientFrom: "from-primary",
    gradientTo: "to-accent",
    shadowColor: "shadow-primary/70",
    iconGradient: "from-primary via-accent to-primary",
    overlayGradient: "from-primary/15 to-accent/15",
    blurGradient: "from-primary/40 to-accent/40",
    blurGradientHover: "group-hover:from-primary/60 group-hover:to-accent/60",
  },
  {
    href: LIST_ROUTE["3DSLIDE"],
    title: "3D Slide",
    description: "Dynamic 3D slide effects",
    icon: "🎬",
    gradientFrom: "from-accent",
    gradientTo: "to-primary",
    shadowColor: "shadow-accent/70",
    iconGradient: "from-accent via-primary to-accent",
    overlayGradient: "from-accent/15 to-primary/15",
    blurGradient: "from-accent/40 to-primary/40",
    blurGradientHover: "group-hover:from-accent/60 group-hover:to-primary/60",
  },
];

export default function Page() {
  return (
    <div className="relative w-full bg-background font-bold text-primary h-screen">
      <nav className="fixed top-0 w-full p-8 z-20 flex justify-between items-start">
        <div>
          <p className="text-2xl ">duythenights</p>
          <p className="text-sm mt-1">FE Enjoyer ✨</p>
        </div>
      </nav>

      <footer className="fixed bottom-0 left-0 w-full justify-between p-8 flex items-center z-20">
        <p>Experiment 0502</p>
        <p>&copy; 2025</p>
      </footer>

      <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-10 z-10 pointer-events-none"></div>

      <div className="w-full h-full flex justify-center gap-8 items-center px-8">
        {navigationItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} p-1 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${item.shadowColor}`}
          >
            <div className="relative h-full w-full rounded-2xl bg-background backdrop-blur-xl px-12 py-16 transition-all duration-500">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.overlayGradient} opacity-60 transition-opacity duration-500 group-hover:opacity-80`} />
              <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                <div className={`text-6xl font-bold bg-gradient-to-br ${item.iconGradient} bg-clip-text text-transparent transition-all duration-500 group-hover:scale-110 drop-shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold text-primary transition-all duration-300 group-hover:-translate-y-1">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/80 text-center max-w-[200px] font-medium transition-all duration-300 group-hover:text-foreground">
                  {item.description}
                </p>
              </div>
              <div className={`absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${item.blurGradient} blur-3xl transition-all duration-500 ${item.blurGradientHover} group-hover:scale-150`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
