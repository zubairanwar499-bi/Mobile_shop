"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  Sparkles,
  PlusCircle,
  Image as ImageIcon,
  CheckCircle,
  Smartphone,
  Cpu,
  Battery,
} from "lucide-react";
import { Product } from "@/data/products";
import Image from "next/image";

interface ListPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

const presetImages = [
  { label: "Titanium 3D", url: "/images/sequence-3/1.jpg" },
  { label: "Internal 3D", url: "/images/sequence-2/125.jpg" },
  { label: "Screen 3D", url: "/images/sequence-1/50.jpg" },
  { label: "Galaxy S24", url: "/images/products/samsung-s24.webp" },
  { label: "iPhone 15 Pro", url: "/images/products/iphone-15-pro.webp" },
];

export default function ListPhoneModal({
  isOpen,
  onClose,
  onAddProduct,
}: ListPhoneModalProps) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("Apple");
  const [price, setPrice] = useState("");
  const [storage, setStorage] = useState("256GB");
  const [ram, setRam] = useState("8GB");
  const [condition, setCondition] = useState<"New" | "Refurbished" | "Used">("Used");
  const [batteryHealth, setBatteryHealth] = useState("95%");
  const [color, setColor] = useState("Natural Titanium");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("/images/sequence-3/1.jpg");
  const [isSuccess, setIsSuccess] = useState(false);

  // 3D Card Parallax Tilt Ref
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    glareX: 50,
    glareY: 50,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 16;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      glareX: 50,
      glareY: 50,
    });
  };

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      brand,
      category: "smartphone",
      price: parseInt(price.replace(/\D/g, "")) || 50000,
      condition,
      storage,
      ram,
      color,
      image: imagePreview,
      description:
        description.trim() ||
        `${brand} ${name} in ${condition} condition. ${storage} storage, ${ram} RAM, ${batteryHealth} battery health.`,
      featured: true,
    };

    onAddProduct(newProduct);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset form
      setName("");
      setPrice("");
      setDescription("");
    }, 1400);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-5xl bg-[#0c0c0e] border border-cyan-500/20 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] z-10 my-auto max-h-[94vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-cyan-950/20">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  LIST PHONE WITH 3D ANIMATED PREVIEW
                </h3>
                <p className="text-[10px] text-[#A1A1AA]">
                  Add your phone picture and specs with an interactive 3D card
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
            {/* Left: Input Form (7 cols) */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                    Phone Name / Model *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. iPhone 15 Pro Max"
                    className="w-full bg-[#141416] border border-white/12 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                    Brand *
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-[#141416] border border-white/12 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Google">Google</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                    Price (PKR) *
                  </label>
                  <input
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 145000"
                    className="w-full bg-[#141416] border border-white/12 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                    Storage
                  </label>
                  <select
                    value={storage}
                    onChange={(e) => setStorage(e.target.value)}
                    className="w-full bg-[#141416] border border-white/12 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="128GB">128GB</option>
                    <option value="256GB">256GB</option>
                    <option value="512GB">512GB</option>
                    <option value="1TB">1TB</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                    RAM
                  </label>
                  <select
                    value={ram}
                    onChange={(e) => setRam(e.target.value)}
                    className="w-full bg-[#141416] border border-white/12 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="6GB">6GB</option>
                    <option value="8GB">8GB</option>
                    <option value="12GB">12GB</option>
                    <option value="16GB">16GB</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                    Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as "New" | "Refurbished" | "Used")}
                    className="w-full bg-[#141416] border border-white/12 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="New">New</option>
                    <option value="Refurbished">Refurbished</option>
                    <option value="Used">Used</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                    Battery Health
                  </label>
                  <input
                    type="text"
                    value={batteryHealth}
                    onChange={(e) => setBatteryHealth(e.target.value)}
                    placeholder="e.g. 96%"
                    className="w-full bg-[#141416] border border-white/12 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                    Color
                  </label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="e.g. Natural Titanium"
                    className="w-full bg-[#141416] border border-white/12 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              {/* Photo Upload Section */}
              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                  Upload Phone Picture (or Pick 3D Render)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/8 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white transition-all">
                    <Upload className="w-4 h-4 text-cyan-400" />
                    <span>Upload From Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
                    <span className="text-[11px] text-[#71717A] mr-1 hidden sm:inline">Presets:</span>
                    {presetImages.map((preset) => (
                      <button
                        type="button"
                        key={preset.label}
                        onClick={() => setImagePreview(preset.url)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all whitespace-nowrap ${
                          imagePreview === preset.url
                            ? "border-cyan-400 bg-cyan-400/20 text-cyan-300"
                            : "border-white/10 text-[#A1A1AA] hover:border-white/20"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key features, cosmetic state, accessories included..."
                  className="w-full bg-[#141416] border border-white/12 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSuccess}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    isSuccess
                      ? "bg-emerald-400 text-black shadow-[0_0_25px_rgba(52,211,153,0.6)]"
                      : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Phone Listed Successfully! Added to Shop
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-5 h-5" />
                      Publish Phone to Shop &amp; Showcase
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Right: Live 3D Holographic Animated Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="text-center mb-3">
                <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase">
                  ✦ LIVE 3D INTERACTIVE CARD ✦
                </span>
                <p className="text-[11px] text-[#71717A]">Move your mouse over the card to tilt in 3D</p>
              </div>

              {/* The 3D Parallax Tilt Card */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: tiltStyle.transform,
                  transition: "transform 0.15s ease-out",
                }}
                className="relative w-full max-w-[340px] aspect-[9/14] rounded-3xl bg-gradient-to-b from-[#18181b] via-[#101012] to-[#09090b] border-2 border-cyan-500/30 p-5 flex flex-col justify-between overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] cursor-pointer select-none group"
              >
                {/* Holographic Glare Layer */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-dodge transition-opacity group-hover:opacity-75"
                  style={{
                    background: `radial-gradient(circle at ${tiltStyle.glareX}% ${tiltStyle.glareY}%, rgba(34,211,238,0.5) 0%, rgba(59,130,246,0.2) 35%, transparent 70%)`,
                  }}
                />

                {/* Cybernetic Grid lines */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(rgba(34,211,238,0.2) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(34,211,238,0.2) 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Card Top: Brand & Condition */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-black tracking-widest text-cyan-400 uppercase">
                    {brand || "BRAND"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                    {condition}
                  </span>
                </div>

                {/* 3D Floating Center Image with dynamic 3D floating and glow */}
                <div className="relative z-10 my-auto aspect-square w-full flex items-center justify-center p-2">
                  <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-[0_20px_35px_rgba(34,211,238,0.35)] animate-pulse" style={{ animationDuration: "4s" }}>
                    <Image
                      src={imagePreview}
                      alt={name || "Phone Preview"}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/sequence-3/1.jpg";
                      }}
                      unoptimized
                    />
                  </div>
                </div>

                {/* Card Bottom: Specs & Live Price in Heading */}
                <div className="relative z-10 bg-black/70 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-extrabold text-white truncate">
                      {name ? `${name}` : "Untitled Phone"}
                    </h4>
                    <span className="text-xs font-mono font-black text-cyan-400 whitespace-nowrap">
                      PKR {price ? parseInt(price.replace(/\D/g, "") || "0").toLocaleString("en-PK") : "0"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-[#A1A1AA]">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-cyan-400" />
                      {ram}
                    </span>
                    <span className="flex items-center gap-1">
                      <Battery className="w-3 h-3 text-emerald-400" />
                      {batteryHealth}
                    </span>
                    <span className="truncate max-w-[90px]">{color}</span>
                  </div>

                  <div className="pt-1.5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-[#71717A]">Listed Price</span>
                    <span className="text-base font-black text-white">
                      PKR {price ? parseInt(price.replace(/\D/g, "") || "0").toLocaleString("en-PK") : "0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
