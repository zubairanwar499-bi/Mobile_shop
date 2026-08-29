"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Reviews
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Customers Love Us.
          </h2>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col p-6 rounded-2xl bg-[#111111] border border-white/8 hover:border-white/15 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`w-4 h-4 ${
                      si < t.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-white/10"
                    }`}
                  />
                ))}
              </div>

              <p className="text-white/90 text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{t.review}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-[#A1A1AA] text-xs">{t.category}</p>
                </div>
                {t.date && (
                  <span className="text-[#555] text-xs">{t.date}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-[#555] text-xs mt-10"
        >
          Demo reviews — replace with real customer testimonials in{" "}
          <code className="text-[#666]">data/testimonials.ts</code>
        </motion.p>
      </div>
    </section>
  );
}
