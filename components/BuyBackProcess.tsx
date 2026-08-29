"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Tell Us About Your Phone",
    desc: "Share the brand, model, condition, and any accessories.",
  },
  {
    n: "02",
    title: "Get Your Estimate",
    desc: "We provide an instant trade-in valuation — no obligations.",
  },
  {
    n: "03",
    title: "Bring It In",
    desc: "Drop by our store for a quick physical inspection.",
  },
  {
    n: "04",
    title: "Get Paid",
    desc: "Walk out with cash in hand. Fast and hassle-free.",
  },
];

export default function BuyBackProcess() {
  return (
    <section className="py-20 sm:py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-[0.2em] mb-4">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Selling Your Phone Is Simple.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                {/* Number circle */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center">
                    <span className="text-3xl font-bold bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {step.n}
                    </span>
                  </div>
                  {/* Connector dot */}
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-2 h-2 rounded-full bg-cyan-400/40 -translate-y-1/2" />
                </div>

                <h3 className="text-white font-semibold text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
