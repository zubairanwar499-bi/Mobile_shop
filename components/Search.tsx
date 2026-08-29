"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.condition.toLowerCase().includes(q) ||
        (p.storage && p.storage.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b border-white/10"
          >
            {/* Search input */}
            <div className="max-w-3xl mx-auto px-4 py-4">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-[#A1A1AA] flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search phones, brands, accessories..."
                  className="flex-1 bg-transparent text-white text-lg placeholder-[#555] focus:outline-none"
                  aria-label="Search products"
                />
                <button
                  onClick={onClose}
                  className="p-2 text-[#A1A1AA] hover:text-white transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results */}
            <AnimatePresence>
              {query.trim() && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-3xl mx-auto px-4 pb-4 max-h-[60vh] overflow-y-auto"
                >
                  {results.length === 0 ? (
                    <p className="text-[#A1A1AA] py-6 text-center">
                      No products found for &ldquo;{query}&rdquo;
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-[#A1A1AA] text-xs mb-3">
                        {results.length} result{results.length !== 1 ? "s" : ""}{" "}
                        found
                      </p>
                      {results.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-4 p-3 rounded-xl bg-white/4 hover:bg-white/7 transition-colors"
                        >
                          <div className="w-14 h-14 rounded-lg bg-[#111] flex-shrink-0 overflow-hidden relative">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-1"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                              }}
                              unoptimized
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                              {product.name}
                            </p>
                            <p className="text-[#A1A1AA] text-xs">
                              {product.brand} · {product.storage} ·{" "}
                              {product.condition}
                            </p>
                            <p className="text-cyan-400 text-sm font-semibold">
                              PKR {product.price.toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              addItem(product);
                              onClose();
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-semibold rounded-lg transition-colors flex-shrink-0"
                            aria-label={`Add ${product.name} to cart`}
                          >
                            Add
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
