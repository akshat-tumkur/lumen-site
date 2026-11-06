"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useTransform, useSpring, motion, MotionValue } from "framer-motion";

const TOTAL_FRAMES = 200;

const TextOverlay = ({
  text,
  start,
  end,
  scrollProgress,
  align = "center",
  type = "text"
}: {
  text: React.ReactNode;
  start: number;
  end: number;
  scrollProgress: MotionValue<number>;
  align?: "left" | "center" | "right";
  type?: "text" | "hero";
}) => {
  const opacity = useTransform(
    scrollProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollProgress,
    [start, end],
    [20, -20]
  );

  const alignClass = {
    left: "items-start text-left pl-10 md:pl-20",
    center: "items-center text-center",
    right: "items-end text-right pr-10 md:pr-20",
  }[align];

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center pointer-events-none ${alignClass} z-20`}
    >
      {type === "hero" ? (
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white/90">{text}</h1>
        </div>
      ) : (
        <h2 className="text-4xl md:text-5xl font-light tracking-wide text-white/90">{text}</h2>
      )}
    </motion.div>
  );
};

export default function CameraScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    const onImageLoad = () => {
      loadedCount++;
      setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      if (loadedCount === TOTAL_FRAMES) {
        setLoaded(true);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${i.toString().padStart(3, "0")}.webp`;
      img.onload = onImageLoad;
      imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
    mass: 0.1
  });

  // Opacity fade out of the fixed layer as we reach the end
  const canvasOpacity = useTransform(smoothProgress, [0.9, 1], [1, 0]);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = images[index];

    if (!canvas || !ctx || !img) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    // Cover Logic
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!loaded) return;
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(latest * TOTAL_FRAMES)
    );
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  useEffect(() => {
    if (!loaded) return;
    const handleResize = () => requestAnimationFrame(() =>
      renderFrame(Math.min(TOTAL_FRAMES - 1, Math.floor(smoothProgress.get() * TOTAL_FRAMES)))
    );
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, smoothProgress]);

  useEffect(() => {
    if (loaded) renderFrame(0);
  }, [loaded]);

  return (
    // Spacer Container: Defines the scroll height
    <div ref={containerRef} className="relative h-[600vh] w-full bg-[#050505]">

      {/* Fixed Curtain: Stays pinned to viewport, behind content (z-0) */}
      <motion.div
        style={{ opacity: canvasOpacity }}
        className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-[#050505] z-0 pointer-events-none"
      >
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050505] z-50">
            <div className="text-white/60 font-mono text-sm tracking-widest">
              SYSTEM INITIALIZING... {progress}%
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover"
          style={{ width: "100%", height: "100%" }}
        />

        {loaded && (
          <div>
            <TextOverlay
              start={0} end={0.15}
              scrollProgress={smoothProgress}
              type="hero"
              text={
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                    className="text-[15vw] md:text-[20vw] leading-none text-white font-cursive mix-blend-normal tracking-wide"
                  >
                    Lumen
                  </motion.div>
                  <div className="text-xl md:text-3xl text-white/90 font-light tracking-[0.5em] uppercase mt-2 font-sans">Capture Reality</div>
                </>
              }
            />

            <TextOverlay
              start={0.30} end={0.40}
              scrollProgress={smoothProgress}
              align="left"
              text={
                <span className="text-6xl md:text-8xl font-medium tracking-tight">Precision Optics</span>
              }
            />

            <TextOverlay
              start={0.55} end={0.65}
              scrollProgress={smoothProgress}
              align="right"
              text={
                <span className="text-6xl md:text-8xl font-medium tracking-tight">Engineered From Within</span>
              }
            />

            <TextOverlay
              start={0.8} end={0.9}
              scrollProgress={smoothProgress}
              align="center"
              text={
                <span className="text-4xl md:text-6xl font-light border-b border-white/30 pb-2">See Beyond</span>
              }
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
