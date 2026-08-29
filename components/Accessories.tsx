"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { accessories, accessoryCategories } from "@/data/accessories";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";

export default function Accessories() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addItem } = useCart();

  const filtered =
    activeCategory === "all"
      ? accessories
      : accessories.filter((a) => a.category === activeCategory);

  // Cast accessory to a Product-compatible shape for cart
  const toCartProduct = (a: (typeof accessories)[0]): Product => ({
    id: a.id,
    name: a.name,
    brand: a.brand || "Generic",
    category: "smartphone",
    price: a.price,
    oldPrice: a.oldPrice,
    condition: "New",
    image: a.image,
    description: a.description,
  });

  return (
    <section id="accessories" className="py-24 sm:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Accessories
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Power Up
            <br />
            Your Setup.
          </h2>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
              activeCategory === "all"
                ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                : "border-white/10 text-[#A1A1AA] hover:border-white/20 hover:text-white"
            }`}
          >
            All
          </button>
          {accessoryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                  : "border-white/10 text-[#A1A1AA] hover:border-white/20 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((acc, i) => (
            <motion.div
              key={acc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex flex-col bg-[#111] rounded-2xl border border-white/8 hover:border-white/16 overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-square bg-[#0a0a0a] overflow-hidden">
                <Image
                  src={acc.image}
                  alt={acc.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                  unoptimized
                />
                {acc.oldPrice && (
                  <div className="absolute top-2 left-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/80 text-white">
                      -{Math.round(((acc.oldPrice - acc.price) / acc.oldPrice) * 100)}
                      %
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 p-3 sm:p-4">
                {acc.brand && (
                  <p className="text-[#A1A1AA] text-[10px] sm:text-xs mb-1">
                    {acc.brand}
                  </p>
                )}
                <h3 className="text-white text-xs sm:text-sm font-semibold leading-snug mb-2 flex-1">
                  {acc.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-white font-bold text-sm">
                    PKR {acc.price.toLocaleString()}
                  </span>
                  {acc.oldPrice && (
                    <span className="text-[#555] text-xs line-through">
                      {acc.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => addItem(toCartProduct(acc))}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/8 hover:bg-cyan-400 hover:text-black text-white text-xs font-medium transition-all border border-white/8 hover:border-transparent"
                  aria-label={`Add ${acc.name} to cart`}
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
