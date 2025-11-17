import { Metadata } from "next";
import Main from "./main";
import "./style.css";
export const metadata: Metadata = {
  title: "My Enjoyment Space ✨",
  description: "...",
};
export default function Page() {
  return <Main />;
}
