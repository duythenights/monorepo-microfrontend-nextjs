import Link from "next/link";
import { LIST_ROUTE } from "../config/route.config";

export default function Page() {
  return (
    <div className="">
      <Link href={LIST_ROUTE.UNFOLD}>Fold</Link>
    </div>
  );
}
