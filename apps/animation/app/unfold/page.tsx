import type { Metadata } from "next";
import Main from "./Main";
import "./style.css";
import LeftFloatingButtons from "../../components/floating-left-buttons";

export const metadata: Metadata = {
  title: "Sticky Scroll Animation Unfolds Like a Mini Timeline of Cards",
  description: "...",
};

export default function UnfoldPage() {
  return (
    <>
      <LeftFloatingButtons inspiredLink="https://www.sensei.tech/" />
      <Main />;
    </>
  );
}
