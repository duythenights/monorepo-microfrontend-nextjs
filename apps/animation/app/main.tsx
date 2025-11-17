import { Metadata } from "next";
import React from "react";

export default function Main() {
  return (
    <div className="relative w-full h-screen bg-background text-primary">
      <nav className="fixed top-0 w-screen p-8 z-2">
        <p id="logo">duythenights</p>
        <p>FE Enjoyer ✨</p>
      </nav>

      <footer className="fixed bottom-0 left-0 w-screen justify-between p-8 flex items-center z-2">
        <p>Experiment 1711</p>
        <p>&copy; 2025</p>
      </footer>
      <div className="slider-wrapper">
        <canvas></canvas>
      </div>
      <div className="overlay fixed top-0 left-0 w-screen h-screen opacity-50 z-1"></div>
    </div>
  );
}
