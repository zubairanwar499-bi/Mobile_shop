"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [beforeError, setBeforeError] = useState(false);
  const [afterError, setAfterError] = useState(false);

  const getPos = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return 50;
      const rect = containerRef.current.getBoundingClientRect();
      const pos = ((clientX - rect.left) / rect.width) * 100;
      return Math.max(5, Math.min(95, pos));
    },
    []
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      setSliderPos(getPos(clientX));
    };
    const handleUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, getPos]);

  return (
    <section className="py-24 sm:py-32 bg-[#111111]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Results
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            The Difference Is Clear.
          </h2>
          <p className="text-[#A1A1AA] mt-4 text-base">
            Drag the slider to see before and after.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          ref={containerRef}
          className="relative overflow-hidden rounded-3xl select-none cursor-col-resize aspect-video bg-[#0a0a0a] border border-white/10"
          aria-label="Before and after comparison slider"
        >
          {/* Before (full width) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!beforeError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/images/before-after/before.webp"
                alt="Before repair"
                className="w-full h-full object-cover"
                onError={() => setBeforeError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a0a0a] to-[#0a0a1a]">
                <div className="text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-red-400 text-sm font-medium">Before</p>
                  <p className="text-[#555] text-xs">Cracked screen</p>
                </div>
              </div>
            )}
            {/* Label */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
              <span className="text-white text-xs font-semibold">Before</span>
            </div>
          </div>

          {/* After (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden flex items-center justify-center"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            {!afterError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/images/before-after/after.webp"
                alt="After repair"
                className="w-full h-full object-cover"
                style={{ minWidth: `${100 / (sliderPos / 100)}%` }}
                onError={() => setAfterError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a1a0a] to-[#0a0a1a]">
                <div className="text-center">
                  <div className="text-4xl mb-2">✨</div>
                  <p className="text-emerald-400 text-sm font-medium">After</p>
                  <p className="text-[#555] text-xs">Like new</p>
                </div>
              </div>
            )}
            {/* Label */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
              <span className="text-white text-xs font-semibold">After</span>
            </div>
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.6)]"
            style={{ left: `${sliderPos}%` }}
          />

          {/* Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center cursor-col-resize z-10 hover:scale-110 transition-transform touch-none"
            style={{ left: `${sliderPos}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            role="slider"
            aria-label="Before/after comparison slider"
            aria-valuenow={Math.round(sliderPos)}
          >
            <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
