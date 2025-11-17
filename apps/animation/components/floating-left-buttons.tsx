"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

type Props = {
  inspiredLink?: string;
  backToListLink?: string;
};

export default function LeftFloatingButtons({
  inspiredLink = "#",
  backToListLink = "/",
}: Props) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      {/* Floating Buttons Container - Left Side */}
      <div className="fixed top-6 left-6 z-50 flex gap-3">
        {/* Back to List Button */}
        <Link
          title="Back to main"
          href={backToListLink}
          className="w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-primary-foreground hover:shadow-xl hover:scale-110 transition-all duration-300 animate-float cursor-pointer"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        {/* Inspired Button */}
        <Link
          title={`✨ Inspired By ${inspiredLink}`}
          href={inspiredLink}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="w-14 h-14 bg-accent cursor-pointer rounded-full shadow-lg flex items-center justify-center text-accent-foreground hover:shadow-xl hover:scale-110 transition-all duration-300 animate-float-delayed relative overflow-hidden group"
        >
          {/* Sparkle effect background */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-2 left-2 w-1 h-1 bg-yellow-300 rounded-full animate-sparkle-1"></div>
            <div className="absolute top-4 right-3 w-1 h-1 bg-yellow-200 rounded-full animate-sparkle-2"></div>
            <div className="absolute bottom-3 left-4 w-1 h-1 bg-yellow-400 rounded-full animate-sparkle-3"></div>
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-yellow-300 rounded-full animate-sparkle-4"></div>
          </div>

          {/* Main icon with pulse */}
          <Sparkles
            className={`h-6 w-6 relative z-10 transition-all duration-300 ${
              isHovering ? "animate-pulse-sparkle" : ""
            }`}
          />
        </Link>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes sparkle-1 {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes sparkle-2 {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          60% {
            opacity: 1;
            transform: scale(1.8);
          }
        }

        @keyframes sparkle-3 {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          40% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes sparkle-4 {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          70% {
            opacity: 1;
            transform: scale(1.6);
          }
        }

        @keyframes pulse-sparkle {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.1) rotate(5deg);
          }
          75% {
            transform: scale(1.1) rotate(-5deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-sparkle-1 {
          animation: sparkle-1 1.5s ease-in-out infinite;
        }

        .animate-sparkle-2 {
          animation: sparkle-2 1.5s ease-in-out infinite 0.2s;
        }

        .animate-sparkle-3 {
          animation: sparkle-3 1.5s ease-in-out infinite 0.4s;
        }

        .animate-sparkle-4 {
          animation: sparkle-4 1.5s ease-in-out infinite 0.6s;
        }

        .animate-pulse-sparkle {
          animation: pulse-sparkle 0.6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
