import { Metadata } from "next";
import Main from "./main";
import "./style.css";
import LeftFloatingButtons from "../../components/floating-left-buttons";
export const metadata: Metadata = {
  title: "3D Slide ✨",
  description: "...",
};
export default function Page() {
  return (
    <>
      <LeftFloatingButtons inspiredLink="https://www.andreasantonsson.dev/" />
      <Main />;
    </>
  );
}
