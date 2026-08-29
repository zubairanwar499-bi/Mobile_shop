"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Wrench, ShoppingBag } from "lucide-react";

interface SequenceDef {
  id: string;
  name: string;
  badge: string;
  basePath: string;
  totalFrames: number;
}

const sequences: SequenceDef[] = [
  {
    id: "sequence-1",
    name: "01 Screen",
    badge: "SCREEN & DISASSEMBLY",
    basePath: "/images/sequence-1",
    totalFrames: 250,
  },
  {
    id: "sequence-2",
    name: "02 Repair",
    badge: "INTERNAL PRECISION",
    basePath: "/images/sequence-2",
    totalFrames: 250,
  },
  {
    id: "sequence-3",
    name: "03 Rebuilt",
    badge: "FLAWLESS REASSEMBLY",
    basePath: "/images/sequence-3",
    totalFrames: 250,
  },
];

// Exact narrative phases requested in Section 9
const storyMessages = [
  {
    id: 0,
    start: 0.0,
    end: 0.2,
    title: "YOUR PHONE.",
    subtitle: "MORE THAN A DEVICE.",
    tag: "THE ESSENTIAL COMPANION",
  },
  {
    id: 1,
    start: 0.2,
    end: 0.45,
    title: "WHEN IT BREAKS",
    subtitle: "WE BRING IT BACK.",
    tag: "PRECISION DISASSEMBLY",
  },
  {
    id: 2,
    start: 0.45,
    end: 0.7,
    title: "PRECISION.",
    subtitle: "DOWN TO THE MICROCHIP.",
    tag: "BOARD-LEVEL DIAGNOSTICS",
  },
  {
    id: 3,
    start: 0.7,
    end: 0.9,
    title: "REPAIRED. TESTED.",
    subtitle: "READY FOR ACTION.",
    tag: "MULTI-POINT CALIBRATION",
  },
  {
    id: 4,
    start: 0.9,
    end: 1.01,
    title: "YOUR PHONE.",
    subtitle: "REBUILT BETTER.",
    tag: "100% QUALITY ASSURED",
  },
];

export default function PhoneScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Preloading cache for all 3 sequences (250 frames each)
  const cacheRef = useRef<Record<string, (HTMLImageElement | null)[]>>({
    "sequence-1": new Array(250).fill(null),
    "sequence-2": new Array(250).fill(null),
    "sequence-3": new Array(250).fill(null),
  });

  // Smooth lerp physics refs (Slow & Smooth Motion Engine)
  const targetScrollProgressRef = useRef(0);
  const smoothScrollProgressRef = useRef(0);

  const targetMouseXRef = useRef(0);
  const targetMouseYRef = useRef(0);
  const smoothMouseXRef = useRef(0);
  const smoothMouseYRef = useRef(0);

  const activeSeqIndexRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // React UI state
  const [loadPercent, setLoadPercent] = useState(0);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [currentSeqIdx, setCurrentSeqIdx] = useState(0);
  const [showHud, setShowHud] = useState(false);
  const [hudInfo, setHudInfo] = useState({
    frame: 1,
    total: 250,
    seq: 1,
    seqName: sequences[0].badge,
    progress: "0.0",
  });

  // Framer Motion scroll hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Draw frame with 3D cursor parallax, ambient floating, and glare
  const drawFrameWith3DPhysics = useCallback(
    (
      frameIdx: number,
      seqIdx: number,
      mouseX: number,
      mouseY: number,
      time: number
    ) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) return;

      const seq = sequences[seqIdx];
      const frames = cacheRef.current[seq.id];
      if (!frames) return;

      // Nearest available frame lookup
      let img = frames[frameIdx];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let i = frameIdx - 1; i >= 0; i--) {
          if (frames[i]?.complete && frames[i]!.naturalWidth > 0) {
            img = frames[i];
            break;
          }
        }
        if (!img || !img.complete) {
          for (let i = frameIdx + 1; i < seq.totalFrames; i++) {
            if (frames[i]?.complete && frames[i]!.naturalWidth > 0) {
              img = frames[i];
              break;
            }
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, cw, ch);
      ctx.save();

      // Continuous Slow & Smooth Ambient Floating Animation
      const isPortrait = ch > cw;
      const floatY = Math.sin(time) * 8;
      const floatX = Math.cos(time * 0.7) * 4;

      // 3D Parallax Offsets from Cursor movement
      const parallaxX = mouseX * 24 + floatX;
      const parallaxY = mouseY * 16 + floatY;

      // Responsive Heroic Scaling & Centering Logic
      let scale: number;
      let centerY: number;
      if (isPortrait) {
        // Mobile portrait: scale to fill viewport heroically, centered perfectly
        scale = Math.max((cw * 1.30) / iw, (ch * 0.58) / ih);
        centerY = ch * 0.44 + parallaxY;
      } else {
        // Desktop landscape:
        scale = Math.min((cw * 0.94) / iw, (ch * 0.80) / ih);
        centerY = ch / 2 + parallaxY;
      }

      const dw = iw * scale;
      const dh = ih * scale;
      const centerX = cw / 2 + parallaxX;

      // 3D Ground Radial Shadow / Glow beneath phone (moves opposite to tilt)
      const shadowX = cw / 2 - parallaxX * 0.4;
      const shadowY = centerY + dh * 0.43;
      const shadowGrad = ctx.createRadialGradient(
        shadowX,
        shadowY,
        dw * 0.05,
        shadowX,
        shadowY,
        dw * 0.46
      );
      shadowGrad.addColorStop(0, "rgba(34, 211, 238, 0.24)");
      shadowGrad.addColorStop(0.45, "rgba(0, 0, 0, 0.55)");
      shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(shadowX, shadowY, dw * 0.42, dh * 0.078, 0, 0, Math.PI * 2);
      ctx.fill();

      // Translate to phone center & apply subtle 3D tilt skew
      ctx.translate(centerX, centerY);

      const tiltSkewX = mouseX * 0.038;
      const tiltSkewY = mouseY * 0.026;
      ctx.transform(1, tiltSkewY, tiltSkewX, 1, 0, 0);

      // Render the 3D phone frame
      ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);

      // Dynamic 3D Specular Glare Reflection that tracks cursor/touch
      const glareX = -dw / 2 + (mouseX * 0.45 + 0.5) * dw;
      const glareY = -dh / 2 + (mouseY * 0.45 + 0.5) * dh;
      const glare = ctx.createRadialGradient(
        glareX,
        glareY,
        5,
        glareX,
        glareY,
        dw * 0.36
      );
      glare.addColorStop(0, "rgba(255, 255, 255, 0.14)");
      glare.addColorStop(0.45, "rgba(34, 211, 238, 0.06)");
      glare.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = glare;
      ctx.beginPath();
      ctx.ellipse(
        glareX,
        glareY,
        dw * 0.32,
        dh * 0.36,
        Math.PI / 4,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.restore();
    },
    []
  );

  // Resize canvas with DPR scaling for Retina / OLED displays
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr =
      typeof window !== "undefined"
        ? Math.min(window.devicePixelRatio || 1, 2)
        : 1;
    const w = parent.clientWidth;
    const h = parent.clientHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctxRef.current = ctx;
    }
  }, []);

  // Preload frames progressively
  useEffect(() => {
    let totalLoaded = 0;
    const totalToTrack = 250;

    const loadFrame = (seqIdx: number, frameIdx: number): Promise<void> =>
      new Promise((resolve) => {
        const seq = sequences[seqIdx];
        if (cacheRef.current[seq.id][frameIdx]) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          cacheRef.current[seq.id][frameIdx] = img;
          if (seqIdx === 0) {
            totalLoaded++;
            setLoadPercent(
              Math.min(100, Math.round((totalLoaded / totalToTrack) * 100))
            );
            if (frameIdx === 0) {
              setIsHeroReady(true);
            }
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
        img.src = `${seq.basePath}/${frameIdx + 1}.jpg`;
      });

    // Priority keyframes of Sequence 1
    const priorityFrames = [0, 15, 30, 60, 90, 120, 180, 249];
    Promise.all(priorityFrames.map((f) => loadFrame(0, f))).then(() => {
      setIsHeroReady(true);

      // Remaining frames of Sequence 1
      const remainingSeq1: number[] = [];
      for (let i = 0; i < 250; i++) {
        if (!priorityFrames.includes(i)) remainingSeq1.push(i);
      }

      const loadSeq1Chunks = async (idx: number) => {
        if (idx >= remainingSeq1.length) {
          preloadBackgroundSequences();
          return;
        }
        const batch = remainingSeq1.slice(idx, idx + 20);
        await Promise.all(batch.map((f) => loadFrame(0, f)));
        loadSeq1Chunks(idx + 20);
      };

      loadSeq1Chunks(0);
    });

    // Background preloader for Sequence 2 and 3
    const preloadBackgroundSequences = async () => {
      await Promise.all([
        ...priorityFrames.map((f) => loadFrame(1, f)),
        ...priorityFrames.map((f) => loadFrame(2, f)),
      ]);

      for (let s = 1; s <= 2; s++) {
        for (let i = 0; i < 250; i += 25) {
          const batch: Promise<void>[] = [];
          for (let j = i; j < Math.min(i + 25, 250); j++) {
            batch.push(loadFrame(s, j));
          }
          await Promise.all(batch);
        }
      }
    };
  }, []);

  // Setup Resize & Orientation listeners
  useEffect(() => {
    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [resizeCanvas]);

  // Cursor & Touch Movement Listeners (Responsive 3D Parallax Control)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetMouseXRef.current = Math.max(-1, Math.min(1, x));
      targetMouseYRef.current = Math.max(-1, Math.min(1, y));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = (touch.clientY / window.innerHeight) * 2 - 1;
        targetMouseXRef.current = Math.max(-1, Math.min(1, x));
        targetMouseYRef.current = Math.max(-1, Math.min(1, y));
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Track raw scroll from Framer Motion
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      targetScrollProgressRef.current = Math.max(0, Math.min(1, latest));
    });
    return () => unsub();
  }, [scrollYProgress]);

  // CONTINUOUS 60FPS LERP PHYSICS ENGINE (Slow & Smooth Motion Loop)
  useEffect(() => {
    let isRunning = true;

    const loop = (timestamp: number) => {
      if (!isRunning) return;

      // 1. Slow, luxurious and ultra-smooth lerp for scroll progress
      const targetP = targetScrollProgressRef.current;
      smoothScrollProgressRef.current +=
        (targetP - smoothScrollProgressRef.current) * 0.035;

      // 2. Slow and smooth lerp for mouse/touch coordinates
      smoothMouseXRef.current +=
        (targetMouseXRef.current - smoothMouseXRef.current) * 0.03;
      smoothMouseYRef.current +=
        (targetMouseYRef.current - smoothMouseYRef.current) * 0.03;

      const p = smoothScrollProgressRef.current;

      // Determine sequence index automatically across scroll segments
      let seqIdx = 0;
      let localProgress = 0;

      if (p < 0.33) {
        seqIdx = 0; // Sequence 1: Screen & Disassembly
        localProgress = p / 0.33;
      } else if (p < 0.67) {
        seqIdx = 1; // Sequence 2: Precision Components & Board
        localProgress = (p - 0.33) / 0.34;
      } else {
        seqIdx = 2; // Sequence 3: Reassembly & Flawless Phone
        localProgress = (p - 0.67) / 0.33;
      }

      // Cursor movement adds subtle interactive 3D rotation (+/- 6 frames)
      const cursorFrameOffset = Math.round(smoothMouseXRef.current * 6);
      const rawFrame =
        Math.floor(Math.max(0, Math.min(1, localProgress)) * 249) +
        cursorFrameOffset;
      const newFrameIndex = Math.max(0, Math.min(249, rawFrame));

      currentFrameRef.current = newFrameIndex;

      // Sync React state for narrative text & badges (debounced / thresholded)
      const sIdx = storyMessages.findIndex((sm) => p >= sm.start && p <= sm.end);
      if (sIdx !== -1 && sIdx !== activeStoryIdx) {
        setActiveStoryIdx(sIdx);
      }

      if (seqIdx !== activeSeqIndexRef.current) {
        activeSeqIndexRef.current = seqIdx;
        setCurrentSeqIdx(seqIdx);
      }

      // Time parameter for ultra-slow ambient breathing float
      const time = timestamp * 0.0008;

      // Draw frame with full 3D physics, cursor parallax, and ambient motion
      drawFrameWith3DPhysics(
        newFrameIndex,
        seqIdx,
        smoothMouseXRef.current,
        smoothMouseYRef.current,
        time
      );

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrameWith3DPhysics, activeStoryIdx]);

  const activeStory = storyMessages[activeStoryIdx] || storyMessages[0];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative bg-[#050505] text-white select-none"
      style={{ height: "800vh" }}
      aria-label="3D Phone Scroll Experience"
    >
      {/* Sticky Hero Viewport (100vh) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Dynamic Cinematic Background Lighting - seamlessly blends into OLED black */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 bg-black"
          style={{
            background:
              currentSeqIdx === 0
                ? "radial-gradient(circle at 50% 45%, rgba(6, 40, 60, 0.22) 0%, #000000 65%)"
                : currentSeqIdx === 1
                ? "radial-gradient(circle at 50% 50%, rgba(20, 50, 95, 0.25) 0%, #000000 65%)"
                : "radial-gradient(circle at 50% 50%, rgba(15, 65, 80, 0.22) 0%, #000000 65%)",
          }}
        />

        {/* Ambient glow orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Cybernetic Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />

        {/* THE 3D PHONE CANVAS (Animated on Scroll & Cursor) */}
        <div className="relative w-full h-full flex items-center justify-center z-10 pointer-events-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            aria-label="Interactive 3D phone model"
          />
        </div>

        {/* Cinematic Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/75 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/50 via-transparent to-[#050505]/50 pointer-events-none z-10" />

        {/* Preloading Badge (Top Left) */}
        {loadPercent < 100 && (
          <div className="absolute top-20 left-4 sm:left-8 z-30 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-white/80">
              PRELOADING 3D ASSETS:{" "}
              <strong className="text-cyan-400">{loadPercent}%</strong>
            </span>
          </div>
        )}


        {/* Interactive Cursor / Touch Motion Indicator (Top Right) */}
        <div className="absolute top-20 sm:top-24 right-4 sm:right-8 hidden md:flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#A1A1AA] uppercase z-20 pointer-events-none bg-black/40 px-3 py-1 rounded-full border border-white/8 backdrop-blur-sm">
          <span className="w-1 h-1 rounded-full bg-cyan-400" />
          <span>CURSOR &amp; SCROLL DRIVEN 3D</span>
        </div>

        {/* Initial Hero Action Overlay (Visible at 0–15% scroll, smoothly dissolves on scroll) */}
        <motion.div
          className="absolute inset-x-0 bottom-6 sm:bottom-16 z-20 flex flex-col items-center justify-center px-4 pointer-events-none"
          animate={{
            opacity: activeStoryIdx === 0 ? 1 : 0,
            y: activeStoryIdx === 0 ? 0 : 25,
            pointerEvents: activeStoryIdx === 0 ? "auto" : "none",
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2.5 sm:gap-4 items-center mb-2.5 w-full max-w-xs sm:max-w-none justify-center">
            <button
              onClick={() => scrollTo("#booking")}
              className="group flex items-center justify-center gap-1.5 px-3 py-3 sm:px-8 sm:py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-2xl sm:rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.5)] text-xs sm:text-base cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Book Repair</span>
            </button>
            <button
              onClick={() => scrollTo("#shop")}
              className="flex items-center justify-center gap-1.5 px-3 py-3 sm:px-8 sm:py-4 border border-white/20 hover:border-white/50 text-white font-semibold rounded-2xl sm:rounded-full transition-all duration-300 hover:bg-white/10 text-xs sm:text-base backdrop-blur-md bg-black/60 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Shop Phones</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] sm:text-xs uppercase tracking-[0.2em] text-[#A1A1AA] font-mono">
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
            </motion.span>
            <span>SCROLL OR TOUCH TO ROTATE 3D</span>
          </div>
        </motion.div>

        {/* Scroll Story Text Overlays (Appears on scroll > 15%) */}
        {activeStoryIdx > 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.id}
                initial={{
                  opacity: 0,
                  y: 30,
                  filter: "blur(12px)",
                  scale: 0.95,
                }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{
                  opacity: 0,
                  y: -30,
                  filter: "blur(12px)",
                  scale: 1.05,
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="text-center max-w-4xl"
              >
                <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-cyan-400 font-mono mb-2 sm:mb-3 bg-black/60 px-3 py-1 rounded-full border border-cyan-400/20 backdrop-blur-md">
                  {activeStory.tag}
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)] leading-[0.95]">
                  {activeStory.title}
                </h2>
                <p className="text-lg sm:text-2xl md:text-3xl text-cyan-300 font-light mt-2 sm:mt-4 drop-shadow-[0_8px_25px_rgba(0,0,0,0.95)]">
                  {activeStory.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
