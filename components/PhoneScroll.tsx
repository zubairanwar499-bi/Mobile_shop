"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, motion } from "framer-motion";

interface FrameConfig {
  totalFrames: number;
  basePath: string;
  extension: string;
}

const defaultConfig: FrameConfig = {
  totalFrames: 120,
  basePath: "/images/screen-repair",
  extension: "webp",
};

const scrollTextSequences = [
  {
    id: 0,
    start: 0,
    end: 0.25,
    lines: ["Broken?", "That\u2019s temporary."],
  },
  {
    id: 1,
    start: 0.25,
    end: 0.5,
    lines: ["Precision Repair.", "Every component matters."],
  },
  {
    id: 2,
    start: 0.5,
    end: 0.75,
    lines: ["Original-quality craftsmanship.", "Built for your phone."],
  },
  {
    id: 3,
    start: 0.75,
    end: 1.01,
    lines: ["Back to Perfect.", "Ready for another day."],
  },
];

export default function PhoneScroll({
  config = defaultConfig,
}: {
  config?: FrameConfig;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [activeSequence, setActiveSequence] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) return;

      // Find nearest available frame
      let img = imagesRef.current[index];
      if (!img) {
        for (let i = index - 1; i >= 0; i--) {
          if (imagesRef.current[i]) {
            img = imagesRef.current[i];
            break;
          }
        }
      }
      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1;
      const ih = img.naturalHeight || 1;

      // Contain-style fit
      const scale = Math.min(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      try {
        ctx.drawImage(img, dx, dy, dw, dh);
      } catch {
        // Silently skip if image is not drawable
      }
    },
    []
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    ctxRef.current = canvas.getContext("2d");
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload images in batches
  useEffect(() => {
    const { totalFrames, basePath, extension } = config;
    imagesRef.current = new Array(totalFrames).fill(null);
    let loaded = 0;

    const loadImage = (i: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          imagesRef.current[i] = img;
          loaded++;
          setLoadProgress(Math.round((loaded / totalFrames) * 100));
          if (loaded === totalFrames) setIsReady(true);
          resolve();
        };
        img.onerror = () => {
          // Keep null for missing frame — drawFrame will find nearest
          loaded++;
          setLoadProgress(Math.round((loaded / totalFrames) * 100));
          if (loaded === totalFrames) setIsReady(true);
          resolve();
        };
        img.src = `${basePath}/${i + 1}.${extension}`;
      });

    const batchLoad = async (start: number) => {
      if (start >= totalFrames) return;
      const batch = [];
      for (let i = start; i < Math.min(start + 10, totalFrames); i++) {
        batch.push(loadImage(i));
      }
      await Promise.all(batch);
      // Draw first frame immediately when available
      if (start === 0) drawFrame(0);
      batchLoad(start + 10);
    };

    batchLoad(0);
  }, [config, drawFrame]);

  // Canvas resize observer
  useEffect(() => {
    resizeCanvas();
    const obs = new ResizeObserver(resizeCanvas);
    const canvas = canvasRef.current;
    if (canvas?.parentElement) obs.observe(canvas.parentElement);
    return () => obs.disconnect();
  }, [resizeCanvas]);

  // Scroll → frame mapping
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const clamped = Math.max(0, Math.min(1, v));
      const frameIndex = Math.max(
        0,
        Math.min(
          config.totalFrames - 1,
          Math.round(clamped * (config.totalFrames - 1))
        )
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }

      // Text sequence
      const seqIndex = scrollTextSequences.findIndex(
        (s) => clamped >= s.start && clamped < s.end
      );
      const newSeq = seqIndex !== -1 ? seqIndex : activeSequence;
      if (newSeq !== activeSequence) {
        setTextVisible(false);
        setTimeout(() => {
          setActiveSequence(newSeq);
          setTextVisible(true);
        }, 200);
      }
    });

    return () => {
      unsub();
      cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollYProgress, config.totalFrames, drawFrame]);

  const currentSeq = scrollTextSequences[activeSequence];

  return (
    <section
      className="relative bg-[#050505]"
      style={{ height: "500vh" }}
      ref={containerRef}
      aria-label="Interactive repair animation"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Canvas */}
        <div className="absolute inset-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            aria-hidden="true"
          />
        </div>

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-transparent to-[#050505]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-[#050505]/40 pointer-events-none" />

        {/* Loading */}
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[#050505]">
            <div className="text-white text-xl font-light mb-6">
              Loading Experience{" "}
              <span className="text-cyan-400 font-semibold">
                {loadProgress}%
              </span>
            </div>
            <div className="w-64 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                style={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-[#A1A1AA] text-sm mt-4">
              Scroll experience loading...
            </p>
          </div>
        )}

        {/* Overlay text */}
        {isReady && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
            <motion.div
              key={activeSequence}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: textVisible ? 1 : 0,
                y: textVisible ? 0 : -20,
              }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-4xl"
            >
              {currentSeq?.lines.map((line, i) => (
                <p
                  key={i}
                  className={`font-bold text-white drop-shadow-2xl ${
                    i === 0
                      ? "text-4xl sm:text-6xl lg:text-7xl leading-tight"
                      : "text-lg sm:text-2xl lg:text-3xl text-[#A1A1AA] mt-3 font-normal"
                  }`}
                >
                  {line}
                </p>
              ))}
            </motion.div>
          </div>
        )}

        {/* Bottom label */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
          <p className="text-[#A1A1AA] text-[10px] sm:text-xs uppercase tracking-[0.3em]">
            Screen · Battery · Charging · Camera · Motherboard
          </p>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="absolute left-0 top-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}
