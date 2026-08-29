"use client";

import React from "react";

interface ZubairLogoProps {
  size?: number;
  className?: string;
  withText?: boolean;
  textClassName?: string;
}

export default function ZubairLogo({
  size = 36,
  className = "",
  withText = false,
  textClassName = "",
}: ZubairLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Precision 3D Vector Emblem */}
      <div
        className="relative flex items-center justify-center flex-shrink-0"
        style={{ width: size, height: size }}
      >
        {/* Ambient Neon Backglow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/40 via-blue-600/30 to-indigo-500/40 rounded-xl blur-[6px] transition-all" />

        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          <defs>
            {/* Primary Cyan to Blue Gradient */}
            <linearGradient id="zmsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="50%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>

            {/* Accent Electric Cyan Gradient */}
            <linearGradient id="zmsAccent" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#A5F3FC" />
            </linearGradient>

            {/* Shield Background Gradient */}
            <linearGradient id="zmsShield" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>

            {/* Border Stroke Gradient */}
            <linearGradient id="zmsStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#1E293B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Outer Rounded Squircle Base (Smartphone Silhouette) */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="24"
            fill="url(#zmsShield)"
            stroke="url(#zmsStroke)"
            strokeWidth="3"
          />

          {/* Precision Smartphone Dynamic Island / Speaker Grill at Top */}
          <rect
            x="38"
            y="11"
            width="24"
            height="4"
            rx="2"
            fill="#38BDF8"
            opacity="0.9"
          />

          {/* Iconic Geometric Monogram "Z" Merged with Precision Circuitry */}
          {/* Top Bar of Z */}
          <path
            d="M 22 26 L 76 26 C 78.2 26 79.5 28.5 78.2 30.2 L 72 38 L 26 38 C 23.8 38 22 36.2 22 34 Z"
            fill="url(#zmsGrad)"
          />

          {/* Diagonal Laser Beam of Z */}
          <path
            d="M 74 33 L 34 70 L 24 70 C 21.8 70 20.8 67.5 22.2 65.8 L 62 28 Z"
            fill="url(#zmsAccent)"
          />

          {/* Bottom Bar of Z */}
          <path
            d="M 24 64 L 70 64 C 72.2 64 74 65.8 74 68 L 74 72 C 74 74.2 72.2 76 70 76 L 22 76 C 19.8 76 18.5 73.5 19.8 71.8 L 24 64 Z"
            fill="url(#zmsGrad)"
          />

          {/* Precision Micro-Repair Chip Core at Center */}
          <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="2.5" fill="#0EA5E9" />

          {/* Subtle Circuit Pins Accent */}
          <circle cx="26" cy="26" r="2" fill="#38BDF8" opacity="0.8" />
          <circle cx="74" cy="74" r="2" fill="#38BDF8" opacity="0.8" />
        </svg>
      </div>

      {/* Brand Typography (Optional) */}
      {withText && (
        <div className={`flex flex-col leading-tight ${textClassName}`}>
          <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
            Zubair <span className="text-cyan-400">Mobile</span>
          </span>
          <span className="text-[10px] font-mono tracking-widest text-cyan-300/80 uppercase font-semibold">
            SHOP &amp; PRECISION REPAIR
          </span>
        </div>
      )}
    </div>
  );
}
