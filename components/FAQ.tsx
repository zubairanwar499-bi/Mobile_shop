"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data/faq";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="py-24 sm:py-32 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-[0.2em] mb-4">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Questions? Answered.
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openId === faq.id
                  ? "border-cyan-400/20 bg-cyan-400/3"
                  : "border-white/8 bg-[#111111]"
              }`}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                aria-expanded={openId === faq.id}
                aria-controls={`faq-${faq.id}`}
              >
                <span
                  className={`text-base font-medium pr-4 leading-snug transition-colors ${
                    openId === faq.id ? "text-white" : "text-white/80"
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openId === faq.id
                      ? "bg-cyan-400 text-black"
                      : "bg-white/8 text-[#A1A1AA]"
                  }`}
                >
                  {openId === faq.id ? (
                    <Minus className="w-3.5 h-3.5" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    id={`faq-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="px-5 sm:px-6 pb-5 text-[#A1A1AA] text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
