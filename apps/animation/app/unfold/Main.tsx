"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Image from "next/image";
import { useRef } from "react";

export default function Main() {
  const images = [
    "/images/unfold/1.jpg",
    "/images/unfold/2.jpg",
    "/images/unfold/3.jpg",
    "/images/unfold/4.jpg",
  ];

  const spotlightRef = useRef<HTMLElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lenisRef = useRef<Lenis | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenisRef.current = lenis;

    const scrollUpdate = () => ScrollTrigger.update();
    lenis.on("scroll", scrollUpdate);

    const ticker = gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const spotlightImageFinalPos: [number, number][] = [
      [-140, -140],
      [40, -130],
      [-160, 40],
      [20, 30],
    ];

    const initialRotations: number[] = [5, -3, 3.5, -1];
    const phaseOneStartOffsets: number[] = [0, 0.1, 0.2, 0.3];
    const phaseTwoStartOffsets: number[] = [0.5, 0.55, 0.6, 0.65];

    const trigger = ScrollTrigger.create({
      trigger: spotlightRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 6}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        imageRefs.current.forEach((image, i) => {
          if (!image) return;

          const initialRotation = initialRotations[i]!;
          const phase1Start = phaseOneStartOffsets[i]!;
          const phase1End = Math.min(
            phase1Start + (0.45 - phase1Start) * 0.9,
            0.45
          );

          let x = -50;
          let y: number, rotation: number;

          if (progress < phase1Start) {
            y = 200;
            rotation = initialRotation;
          } else if (progress <= 0.45) {
            let phase1Progress: number;

            if (progress >= phase1End) {
              phase1Progress = 1;
            } else {
              const linearProgress =
                (progress - phase1Start) / (phase1End - phase1Start);
              phase1Progress = 1 - Math.pow(1 - linearProgress, 3);
            }

            y = 200 - phase1Progress * 250;
            rotation = initialRotation;
          } else {
            y = -50;
            rotation = initialRotation;
          }

          const phase2Start = phaseTwoStartOffsets[i]!;
          const phase2End = Math.min(
            phase2Start + (0.95 - phase2Start) * 0.9,
            0.95
          );
          const finalX = spotlightImageFinalPos[i]![0];
          const finalY = spotlightImageFinalPos[i]![1];

          if (progress >= phase2Start && progress <= 0.95) {
            let phase2Progress: number;
            if (progress >= phase2End) {
              phase2Progress = 1;
            } else {
              const linearProgress =
                (progress - phase2Start) / (phase2End - phase2Start);
              phase2Progress = 1 - Math.pow(1 - linearProgress, 3);
            }

            x = -50 + (finalX + 50) * phase2Progress;
            y = -50 + (finalY + 50) * phase2Progress;
            rotation = initialRotation * (1 - phase2Progress);
          } else if (progress > 0.95) {
            x = finalX;
            y = finalY;
            rotation = 0;
          }

          gsap.set(image, {
            transform: `translate(${x}%, ${y}%) rotate(${rotation}deg)`,
          });
        });
      },
    });
  });

  return (
    <>
      <section className="intro">
        <h1>Dive into the mesmerizing world beneath the waves</h1>
      </section>
      <section className="spotlight" ref={spotlightRef}>
        <div className="spotlight-header">
          <h1>Discover the vibrant marine life in stunning detail</h1>
        </div>
        <div className="spotlight-images">
          {images.map((image, index) => (
            <div
              key={image}
              className="spotlight-img"
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
            >
              <Image
                width={1920}
                height={1080}
                src={image}
                alt="sample"
                title="sample"
              />
            </div>
          ))}
        </div>
      </section>
      <section className="outro">
        <h1>Bring the ocean's tranquility to your screen</h1>
      </section>
    </>
  );
}
