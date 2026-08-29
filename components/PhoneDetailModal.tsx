"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Check,
  RotateCw,
  Cpu,
  Battery,
  Camera,
  Shield,
  Layers,
  MessageCircle,
  Sparkles,
  Play,
  Pause,
} from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { business } from "@/data/business";
import Image from "next/image";

interface PhoneDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PhoneDetailModal({
  product,
  isOpen,
  onClose,
}: PhoneDetailModalProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"3d-phone" | "3d-internals" | "3d-sequence">("3d-phone");

  // 3D Interactive Rotation State
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const startAngleRef = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);

  // 250-Frame sequence canvas ref for "3d-internals" and "3d-sequence"
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesCacheRef = useRef<(HTMLImageElement | null)[]>(new Array(250).fill(null));
  const [currentFrame, setCurrentFrame] = useState(0);

  const [selectedStorage, setSelectedStorage] = useState(product?.storage || "256GB");
  const [selectedColor, setSelectedColor] = useState(product?.color || "Natural Titanium");

  // Sync selected options when product changes
  useEffect(() => {
    if (product) {
      setSelectedStorage(product.storage || "256GB");
      setSelectedColor(product.color || "Natural Titanium");
      setRotationAngle(0);
      setCurrentFrame(0);
    }
  }, [product]);

  // Determine sequence path for component tabs
  const sequencePath =
    activeTab === "3d-internals"
      ? "/images/sequence-2"
      : "/images/sequence-3";

  // Preload sequence frames when internal or sequence tabs are active
  useEffect(() => {
    if (!isOpen || activeTab === "3d-phone") return;

    framesCacheRef.current = new Array(250).fill(null);
    let isMounted = true;

    const loadFrame = (idx: number) => {
      const img = new window.Image();
      img.src = `${sequencePath}/${idx + 1}.jpg`;
      img.onload = () => {
        if (isMounted) {
          framesCacheRef.current[idx] = img;
          if (idx === currentFrame) {
            drawSequenceCanvas(idx);
          }
        }
      };
    };

    const keyframes = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 249];
    keyframes.forEach(loadFrame);

    for (let i = 0; i < 250; i += 2) {
      if (!keyframes.includes(i)) loadFrame(i);
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, activeTab, sequencePath, currentFrame]);

  // Draw sequence canvas for exploded view
  const drawSequenceCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = framesCacheRef.current[frameIdx];
    if (!img || !img.complete) {
      for (let i = frameIdx - 1; i >= 0; i--) {
        if (framesCacheRef.current[i]?.complete) {
          img = framesCacheRef.current[i];
          break;
        }
      }
    }
    if (!img || !img.complete) return;

    canvas.width = canvas.offsetWidth * 1.5;
    canvas.height = canvas.offsetHeight * 1.5;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.min((cw * 0.92) / iw, (ch * 0.92) / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);

    // Floor shadow
    const grad = ctx.createRadialGradient(
      cw / 2,
      dy + dh * 0.92,
      dw * 0.05,
      cw / 2,
      dy + dh * 0.92,
      dw * 0.45
    );
    grad.addColorStop(0, "rgba(34, 211, 238, 0.25)");
    grad.addColorStop(0.5, "rgba(0,0,0,0.4)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(cw / 2, dy + dh * 0.92, dw * 0.4, dh * 0.07, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  useEffect(() => {
    if (activeTab !== "3d-phone") {
      drawSequenceCanvas(currentFrame);
    }
  }, [currentFrame, activeTab, drawSequenceCanvas]);

  // Continuous Auto-Spin Animation Loop for 3D Phone
  useEffect(() => {
    if (!isAutoSpin || isDragging || !isOpen || activeTab !== "3d-phone") return;

    let animId: number;
    const spin = () => {
      setRotationAngle((prev) => (prev + 0.6) % 360);
      animId = requestAnimationFrame(spin);
    };

    animId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(animId);
  }, [isAutoSpin, isDragging, isOpen, activeTab]);

  // Mouse / Touch Drag to Rotate 3D Phone
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoSpin(false);
    dragStartXRef.current = e.clientX;
    startAngleRef.current = rotationAngle;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // 3D Parallax tilt from cursor
    const stage = stageRef.current;
    if (stage) {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setTiltX((-y / (rect.height / 2)) * 14);
      setTiltY((x / (rect.width / 2)) * 14);
    }

    if (!isDragging) return;

    if (activeTab === "3d-phone") {
      const deltaX = e.clientX - dragStartXRef.current;
      const newAngle = (startAngleRef.current + deltaX * 0.8) % 360;
      setRotationAngle(newAngle < 0 ? newAngle + 360 : newAngle);
    } else {
      const deltaX = e.clientX - dragStartXRef.current;
      const frameDelta = Math.floor(deltaX * 0.6);
      let nextFrame = (currentFrame + frameDelta) % 250;
      if (nextFrame < 0) nextFrame += 250;
      setCurrentFrame(nextFrame);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch Support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoSpin(false);
    dragStartXRef.current = e.touches[0].clientX;
    startAngleRef.current = rotationAngle;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartXRef.current;

    if (activeTab === "3d-phone") {
      const newAngle = (startAngleRef.current + deltaX * 0.9) % 360;
      setRotationAngle(newAngle < 0 ? newAngle + 360 : newAngle);
    } else {
      const frameDelta = Math.floor(deltaX * 0.7);
      let nextFrame = (currentFrame + frameDelta) % 250;
      if (nextFrame < 0) nextFrame += 250;
      setCurrentFrame(nextFrame);
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const msg = encodeURIComponent(
      `Hello ${business.name}! I am interested in purchasing ${product.name} (${selectedStorage}, ${selectedColor}) priced at PKR ${product.price.toLocaleString()}. Is this phone available right now?`
    );
    window.open(`https://wa.me/${business.whatsapp.replace(/\D/g, "")}?text=${msg}`, "_blank");
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-5xl bg-[#0d0d0e] border border-cyan-500/25 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] z-10 my-auto max-h-[94vh] flex flex-col"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-cyan-950/20">
              <div className="flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
                  {product.name} — FULL 3D ANIMATED SHOWCASE
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
              {/* Left Column: 3D Animated Showcase Stage (7 cols) */}
              <div className="lg:col-span-7 flex flex-col">
                {/* View Switcher Pills */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 bg-black/60 p-1.5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setActiveTab("3d-phone")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        activeTab === "3d-phone"
                          ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)] font-bold"
                          : "text-[#A1A1AA] hover:text-white"
                      }`}
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      3D Phone 360°
                    </button>
                    <button
                      onClick={() => setActiveTab("3d-internals")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        activeTab === "3d-internals"
                          ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)] font-bold"
                          : "text-[#A1A1AA] hover:text-white"
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      3D Exploded Internals
                    </button>
                    <button
                      onClick={() => setActiveTab("3d-sequence")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        activeTab === "3d-sequence"
                          ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)] font-bold"
                          : "text-[#A1A1AA] hover:text-white"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      3D Flagship Rebuilt
                    </button>
                  </div>

                  {activeTab === "3d-phone" && (
                    <button
                      onClick={() => setIsAutoSpin(!isAutoSpin)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/8 hover:bg-white/15 text-[11px] font-mono text-cyan-300 transition-colors"
                      title={isAutoSpin ? "Pause rotation" : "Auto spin"}
                    >
                      {isAutoSpin ? (
                        <>
                          <Pause className="w-3 h-3 text-cyan-400" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 text-cyan-400" />
                          <span>Auto 3D Spin</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* THE 3D INTERACTIVE STAGE */}
                <div
                  ref={stageRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="relative aspect-[4/3] sm:aspect-square w-full rounded-2xl bg-gradient-to-b from-[#141416] via-[#0d0d0f] to-[#060608] border border-cyan-500/20 flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing shadow-2xl"
                  style={{ perspective: "1200px" }}
                >
                  {/* Cybernetic ambient grid and lighting */}
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.12)_0%,transparent_75%)]" />
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.15) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(34, 211, 238, 0.15) 1px, transparent 1px)`,
                      backgroundSize: "30px 30px",
                    }}
                  />

                  {activeTab === "3d-phone" ? (
                    /* FULL 3D INTERACTIVE ROTATING PHONE STAGE (Shows the actual uploaded phone image!) */
                    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                      {/* Dynamic 3D Radial Floor Shadow */}
                      <div
                        className="absolute bottom-6 w-3/4 h-12 rounded-full pointer-events-none transition-all duration-150"
                        style={{
                          background:
                            "radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.3) 0%, rgba(0,0,0,0.6) 45%, transparent 70%)",
                          transform: `scale(${0.8 + Math.abs(Math.cos((rotationAngle * Math.PI) / 180)) * 0.3}) translateY(${tiltX * 0.5}px)`,
                          opacity: 0.85,
                        }}
                      />

                      {/* 3D Rotating Device Frame Container */}
                      <div
                        className="relative w-3/5 sm:w-1/2 aspect-[9/18] max-h-[78%] transition-transform duration-100 ease-out"
                        style={{
                          transform: `rotateX(${tiltX.toFixed(2)}deg) rotateY(${(rotationAngle + tiltY).toFixed(2)}deg) scale3d(1, 1, 1)`,
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* 3D Phone Chassis Layer */}
                        <div className="absolute inset-0 rounded-[34px] p-2 bg-gradient-to-tr from-[#252528] via-[#121214] to-[#3a3a40] border-2 border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(34,211,238,0.25)] flex items-center justify-center overflow-hidden">
                          {/* Front Screen with the actual uploaded phone image! */}
                          <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-black flex items-center justify-center">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(max-width: 640px) 80vw, 40vw"
                              className="object-contain p-2 transition-transform duration-300 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/sequence-3/1.jpg";
                              }}
                              unoptimized
                            />

                            {/* Dynamic Glass Specular Reflection that sweeps with rotation */}
                            <div
                              className="absolute inset-0 pointer-events-none mix-blend-overlay"
                              style={{
                                background: `linear-gradient(${120 + rotationAngle * 0.5}deg, rgba(255,255,255,0.3) 0%, rgba(34,211,238,0.1) 40%, transparent 70%)`,
                              }}
                            />

                            {/* Speaker & Camera Dynamic Island pill */}
                            <div className="absolute top-2.5 w-16 h-3 rounded-full bg-black border border-white/10 z-20" />
                          </div>
                        </div>
                      </div>

                      {/* 360 Rotation Angle Indicator */}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                        ROTATION: <strong className="text-white">{Math.round(rotationAngle)}°</strong>
                      </div>

                      {/* Drag / Swipe cue */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 pointer-events-none">
                        <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: "6s" }} />
                        <span>DRAG TO ROTATE 360° IN 3D</span>
                      </div>
                    </div>
                  ) : (
                    /* 250-FRAME SEQUENCES (Exploded Internals or Reassembly) */
                    <>
                      <canvas
                        ref={canvasRef}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                        FRAME: <strong className="text-white">{currentFrame + 1}</strong> / 250
                      </div>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 pointer-events-none">
                        <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: "6s" }} />
                        <span>DRAG TO SCRUB 3D REPAIR SEQUENCE</span>
                      </div>
                    </>
                  )}
                </div>

                <p className="text-[11px] text-[#71717A] mt-2 text-center">
                  Full 3D rendered view. Move cursor or swipe to rotate and inspect phone from any angle.
                </p>
              </div>

              {/* Right Column: Phone Specifications & Actions (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                <div>
                  {/* Brand & Condition Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                      {product.brand}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/15 text-emerald-400 border border-emerald-400/25">
                      {product.condition} Condition
                    </span>
                    {product.discount && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                        SAVE {product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Title WITH PRICE in the name area as requested */}
                  <div className="mb-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                      {product.name}
                    </h2>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-2xl sm:text-3xl font-black text-cyan-400">
                        PKR {product.price.toLocaleString("en-PK")}
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-[#71717A] line-through">
                          PKR {product.oldPrice.toLocaleString("en-PK")}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Storage selection */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-2">
                      Storage Capacity
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["128GB", "256GB", "512GB", "1TB"].map((cap) => (
                        <button
                          key={cap}
                          onClick={() => setSelectedStorage(cap)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            selectedStorage === cap
                              ? "bg-cyan-400 text-black border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                              : "border-white/10 text-white hover:border-white/25 bg-white/3"
                          }`}
                        >
                          {cap}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specifications Matrix */}
                  <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-white/4 border border-white/8 mb-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#71717A]">RAM</p>
                        <p className="text-xs font-semibold text-white">{product.ram || "8GB Unified"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#71717A]">Battery Health</p>
                        <p className="text-xs font-semibold text-white">100% Tested</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#71717A]">Camera System</p>
                        <p className="text-xs font-semibold text-white">48MP Pro Optics</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-violet-400 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] text-[#71717A]">Warranty</p>
                        <p className="text-xs font-semibold text-white">6 Months Warranty</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call To Actions */}
                <div className="space-y-2.5 pt-2 border-t border-white/8">
                  <button
                    onClick={handleAddToCart}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
                      added
                        ? "bg-emerald-400 text-black shadow-[0_0_20px_rgba(52,211,153,0.5)]"
                        : "bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart — PKR {product.price.toLocaleString("en-PK")}
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order / Inquire via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
