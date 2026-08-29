"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartDrawer() {
  const { state, closeCart, removeItem, increaseQty, decreaseQty, subtotal } =
    useCart();

  const formatPrice = (p: number) => `PKR ${p.toLocaleString("en-PK")}`;

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-[#0a0a0a] border-l border-white/10 flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-cyan-400" />
                <h2 className="text-white font-semibold text-lg">Your Cart</h2>
                {state.items.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-black text-xs font-bold flex items-center justify-center">
                    {state.items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-[#A1A1AA] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {state.items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full py-20 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                      <ShoppingCart className="w-8 h-8 text-[#555]" />
                    </div>
                    <p className="text-[#A1A1AA] text-base">
                      Your cart is empty
                    </p>
                    <button
                      onClick={closeCart}
                      className="mt-4 text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </motion.div>
                ) : (
                  state.items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-3 p-3 rounded-xl bg-[#111111] border border-white/8"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 rounded-lg bg-[#0a0a0a] flex-shrink-0 overflow-hidden relative">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                          unoptimized
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium leading-snug truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[#A1A1AA] text-xs mb-2">
                          {item.product.storage} · {item.product.condition}
                        </p>
                        <p className="text-cyan-400 text-sm font-bold">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 text-[#555] hover:text-red-400 transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                          <button
                            onClick={() => decreaseQty(item.product.id)}
                            className="w-6 h-6 flex items-center justify-center hover:text-white text-[#A1A1AA] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-white text-sm font-medium w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQty(item.product.id)}
                            className="w-6 h-6 flex items-center justify-center hover:text-white text-[#A1A1AA] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="p-4 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#A1A1AA] text-sm">Subtotal</span>
                  <span className="text-white font-bold text-lg">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <button
                  className="w-full flex items-center justify-center gap-2 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-2xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                  onClick={() => alert("Checkout integration coming soon.")}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-[#555] text-xs text-center">
                  Checkout integration coming soon.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
