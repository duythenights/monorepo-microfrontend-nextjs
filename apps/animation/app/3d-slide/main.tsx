"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Lenis from "lenis";

const data = [
  {
    link: "/",
    title: "Playful and Curious",
    img: "/animation/images/3d-slide/0.webp",
  },
  {
    link: "/",
    title: "Calm and Serene",
    img: "/animation/images/3d-slide/1.webp",
  },
  {
    link: "/",
    title: "Colorful and Lively",
    img: "/animation/images/3d-slide/2.webp",
  },
  {
    link: "/",
    title: "Majestic and Free",
    img: "/animation/images/3d-slide/3.webp",
  },
  {
    link: "/",
    title: "Mysterious and Graceful",
    img: "/animation/images/3d-slide/4.webp",
  },
  {
    link: "/",
    title: "Glowing and Dreamy",
    img: "/animation/images/3d-slide/5.webp",
  },
  {
    link: "/",
    title: "Tiny and Delicate",
    img: "/animation/images/3d-slide/6.webp",
  },
  {
    link: "/",
    title: "Powerful and Swift",
    img: "/animation/images/3d-slide/7.webp",
  },
  {
    link: "/",
    title: "Elegant and Social",
    img: "/animation/images/3d-slide/8.webp",
  },
  {
    link: "/",
    title: "Quiet and Enigmatic",
    img: "/animation/images/3d-slide/9.webp",
  },
];

const extra = 2;
const MAX_IMG = data.length - extra + 1;

export default function Main() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentScrollRef = useRef<number>(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const images: HTMLImageElement[] = [];
    let loadedImageCount = 0;

    function loadImages() {
      for (let i = 0; i < data.length; i++) {
        const img = new Image();

        img.onload = function () {
          images[i] = img; // <-- GIỮ ĐÚNG INDEX
          loadedImageCount++;
          setProgress(Math.round((loadedImageCount / data.length) * 100));

          if (loadedImageCount === data.length) {
            initializeScene();
            setAnimateOut(true);
            setTimeout(() => setLoading(false), 800);
          }
        };

        img.onerror = function () {
          loadedImageCount++;
          setProgress(Math.round((loadedImageCount / data.length) * 100));

          if (loadedImageCount === data.length) {
            initializeScene();
            setTimeout(() => setLoading(false), 300);
          }
        };

        img.src = data?.[i]?.img as string;
      }
    }

    function initializeScene() {
      if (!canvasRef.current) return;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        powerPreference: "high-performance",
      });
      rendererRef.current = renderer;

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const parentWidth = 20;
      const parentHeight = 75;
      const curvature = 35;
      const segmentsX = 200;
      const segmentsY = 200;

      const parentGeometry = new THREE.PlaneGeometry(
        parentWidth,
        parentHeight,
        segmentsX,
        segmentsY
      );
      const positions = parentGeometry.attributes.position?.array || [];
      for (let i = 0; i < positions.length; i += 3) {
        const y = positions[i + 1] as number;
        const distanceFromCenter = Math.abs(y / (parentHeight / 2));

        const smoothCurve = Math.pow(distanceFromCenter, 2);
        positions[i + 2] = smoothCurve * curvature;
      }
      parentGeometry.computeVertexNormals();

      const totalSlides = MAX_IMG + 1;
      const slideHeight = 15;
      const gap = 0.5;
      const cycleHeight = totalSlides * (slideHeight + gap);

      const textureCanvas = document.createElement("canvas");

      const ctx = textureCanvas.getContext("2d", {
        alpha: false,
        willReadFrequently: false,
      });

      if (!ctx) return;

      textureCanvas.width = 2048;
      textureCanvas.height = 8192;

      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = Math.min(
        4,
        renderer.capabilities.getMaxAnisotropy()
      );

      const parentMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const parentMesh = new THREE.Mesh(parentGeometry, parentMaterial);
      parentMesh.position.set(0, 0, 0);
      parentMesh.rotation.x = THREE.MathUtils.degToRad(-20);
      parentMesh.rotation.y = THREE.MathUtils.degToRad(20);
      scene.add(parentMesh);

      const distance = 17.5;
      const heightOffset = 5;
      const offsetX = distance * Math.sin(THREE.MathUtils.degToRad(20));
      const offsetZ = distance * Math.cos(THREE.MathUtils.degToRad(20));

      camera.position.set(offsetX, heightOffset, offsetZ);
      camera.lookAt(0, -2, 0);
      camera.rotation.z = THREE.MathUtils.degToRad(-5);

      function updateTexture(offset: number = 0) {
        if (!ctx) return;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

        const fontSize = 120;
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let i = -extra; i < totalSlides + extra; i++) {
          let slideY = -i * (slideHeight + gap);
          slideY += offset * cycleHeight;

          const textureY = (slideY / cycleHeight) * textureCanvas.height;
          let wrappedY = textureY % textureCanvas.height;
          if (wrappedY < 0) wrappedY += textureCanvas.height;

          let slideIndex = ((-i % totalSlides) + totalSlides) % totalSlides;

          const slideRect = {
            x: textureCanvas.width * 0.05,
            y: wrappedY,
            width: textureCanvas.width * 0.9,
            height: (slideHeight / cycleHeight) * textureCanvas.height,
          };

          const img = images[slideIndex];
          if (img) {
            const imgAspect = img.width / img.height;
            const rectAspect = slideRect.width / slideRect.height;
            let drawWidth: number,
              drawHeight: number,
              drawX: number,
              drawY: number;

            if (imgAspect > rectAspect) {
              drawHeight = slideRect.height;
              drawWidth = drawHeight * imgAspect;
              drawX = slideRect.x + (slideRect.width - drawWidth) / 2;
              drawY = slideRect.y;
            } else {
              drawWidth = slideRect.width;
              drawHeight = drawWidth / imgAspect;
              drawX = slideRect.x;
              drawY = slideRect.y + (slideRect.height - drawHeight) / 2;
            }

            ctx.save();
            ctx.beginPath();
            ctx.roundRect(
              slideRect.x,
              slideRect.y,
              slideRect.width,
              slideRect.height,
              50
            );
            ctx.clip();
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
            ctx.restore();

            ctx.fillStyle = "white";
            ctx.fillText(
              `${data[slideIndex]?.title}`,
              textureCanvas.width / 2,
              wrappedY + slideRect.height / 2
            );
          }
        }
        texture.needsUpdate = true;
      }

      lenis.on(
        "scroll",
        ({ scroll, limit }: { scroll: number; limit: number }) => {
          currentScrollRef.current = scroll / limit;
          updateTexture(currentScrollRef.current);
          renderer.render(scene, camera);
        }
      );

      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          updateTexture(currentScrollRef.current);
          renderer.render(scene, camera);
        }, 250);
      };

      window.addEventListener("resize", handleResize);

      updateTexture(0);
      renderer.render(scene, camera);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    loadImages();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <>
      {loading && (
        <div
          className={`
      fixed inset-0 flex items-center justify-center z-9999
      bg-black text-white
      transition-all duration-800 ease-out
      ${animateOut ? "scale-150 opacity-0" : "scale-100 opacity-100"}
    `}
        >
          <div className="text-center">
            <p className="text-xl font-semibold tracking-widest">Loading…</p>
            <p className="text-4xl font-bold mt-4">{progress}%</p>
          </div>
        </div>
      )}
      <div
        className="relative w-full bg-black text-white"
        style={{ height: "500vh" }}
      >
        <footer className="fixed bottom-0 left-0 w-full justify-between p-8 flex items-center z-20">
          <p>Experiment 1711</p>
          <p>&copy; 2025</p>
        </footer>

        <div className="fixed top-0 left-0 w-full h-screen">
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
        </div>

        <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-20 z-10 pointer-events-none"></div>
      </div>
    </>
  );
}
