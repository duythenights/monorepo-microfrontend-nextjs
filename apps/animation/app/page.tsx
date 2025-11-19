import { Metadata } from "next";
import Link from "next/link";
import { LIST_ROUTE } from "../config/route.config";
export const metadata: Metadata = {
  title: "My Enjoyment Space ✨",
  description: "...",
};

export default function Page() {
  return (
    <div className="relative w-full bg-primary-foreground font-bold text-primary h-screen">
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

      <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-20 z-10 pointer-events-none"></div>

      <div className="w-full h-full flex justify-center gap-10 items-center">
        <Link href={LIST_ROUTE.UNFOLD}>Fold</Link>
        <Link href={LIST_ROUTE["3DSLIDE"]}>3DSLIDE</Link>
      </div>
    </div>
  );
}
