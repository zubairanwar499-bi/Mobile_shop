"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

const conditionColors: Record<string, string> = {
  New: "bg-emerald-400/15 text-emerald-400 border-emerald-400/20",
  Refurbished: "bg-blue-400/15 text-blue-400 border-blue-400/20",
  Used: "bg-amber-400/15 text-amber-400 border-amber-400/20",
};

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardTilt, setCardTilt] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    setCardTilt(`perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setCardTilt("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const formatPrice = (p: number) =>
    `PKR ${p.toLocaleString("en-PK")}`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onViewDetails?.(product)}
      style={{ transform: cardTilt, transition: "transform 0.18s ease-out" }}
      className="group relative flex flex-col bg-[#111111] rounded-2xl border border-white/8 hover:border-cyan-500/40 overflow-hidden transition-colors duration-300 hover:shadow-[0_12px_45px_rgba(0,0,0,0.6)] cursor-pointer"
    >
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden bg-[#0a0a0a]">
        <Image
          src={imgError ? "/images/sequence-3/1.jpg" : product.image}
          alt={`${product.name} - ${product.condition}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          onError={() => setImgError(true)}
          unoptimized
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
              conditionColors[product.condition]
            }`}
          >
            {product.condition}
          </span>
          {product.discount && product.discount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/15 text-red-400 border border-red-400/20">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* 3D Animated Indicator */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-black/60 text-cyan-300 border border-cyan-400/30 backdrop-blur-md flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
            3D VIEW
          </span>
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.(product);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/15 hover:bg-cyan-400 hover:text-black backdrop-blur-sm border border-white/20 text-white text-xs font-semibold rounded-full transition-all duration-200 shadow-lg cursor-pointer"
            aria-label={`View details for ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
            3D View &amp; Details
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-[#A1A1AA] text-xs mb-1">{product.brand}</p>
        
        {/* Phone Name WITH PRICE in the heading */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-white font-bold text-sm sm:text-base leading-snug">
            {product.name}
          </h3>
          <span className="text-cyan-400 font-extrabold text-sm sm:text-base whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
        </div>

        {product.storage && (
          <p className="text-[#71717A] text-xs mb-3">{product.storage} · {product.ram || "8GB"}</p>
        )}

        {/* Secondary price with discount strike-through */}
        <div className="flex items-baseline gap-2 mb-4">
          {product.oldPrice ? (
            <span className="text-[#555] text-xs line-through">
              Original: {formatPrice(product.oldPrice)}
            </span>
          ) : (
            <span className="text-[11px] text-emerald-400 font-medium">In Stock · Ready to Ship</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            added
              ? "bg-emerald-400 text-black"
              : "bg-white/8 hover:bg-cyan-400 text-white hover:text-black border border-white/10 hover:border-transparent"
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <Star className="w-4 h-4" />
                Added!
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
