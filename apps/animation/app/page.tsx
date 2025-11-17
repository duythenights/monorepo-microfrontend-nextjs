import Link from "next/link";
import { LIST_ROUTE } from "../config/route.config";

export default function Page() {
  return (
    <div className="flex flex-col justify-center gap-10 items-center w-full min-h-screen bg-background">
      <h1 className="text-[50px] font-bold italic text-foreground">
        Animation Page
      </h1>
      <Link href={LIST_ROUTE.UNFOLD}>Fold</Link>
    </div>
  );
}
