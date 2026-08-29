"use client";

import { motion } from "framer-motion";
import {
  Search,
  Wrench,
  CheckCircle,
  FlaskConical,
  Package,
} from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Search,
    title: "Diagnose",
    desc: "Full diagnostic to identify the exact problem — no guesswork.",
    color: "text-cyan-400",
    glow: "shadow-cyan-400/20",
  },
  {
    n: "02",
    icon: Wrench,
    title: "Disassemble",
    desc: "Careful, methodical disassembly using precision tools.",
    color: "text-blue-400",
    glow: "shadow-blue-400/20",
  },
  {
    n: "03",
    icon: FlaskConical,
    title: "Repair",
    desc: "Component replacement and repair performed with expertise.",
    color: "text-violet-400",
    glow: "shadow-violet-400/20",
  },
  {
    n: "04",
    icon: CheckCircle,
    title: "Test",
    desc: "Thorough testing across all functions before handing back.",
    color: "text-emerald-400",
    glow: "shadow-emerald-400/20",
  },
  {
    n: "05",
    icon: Package,
    title: "Return",
    desc: "Your device returned clean, working, and ready to use.",
    color: "text-amber-400",
    glow: "shadow-amber-400/20",
  },
];

export default function RepairProcess() {
  return (
    <section className="py-24 sm:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Our Process
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Engineering-Grade Repair.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className={`lg:flex ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-8 lg:mb-8`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    i % 2 === 0 ? "lg:text-right" : "lg:text-left"
                  }`}
                >
                  <div
                    className={`flex items-center gap-4 mb-3 ${
                      i % 2 === 0 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <span className="text-white/20 font-bold text-xl">
                      {step.n}
                    </span>
                    <h3 className="text-white font-bold text-xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-xs">
                    {step.desc}
                  </p>
                </div>

                {/* Center icon */}
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center shadow-xl ${step.glow} hidden lg:flex`}
                >
                  <step.icon className={`w-7 h-7 ${step.color}`} />
                </div>

                {/* Mobile layout */}
                <div className="lg:hidden flex items-center gap-4 p-4 rounded-2xl bg-[#111] border border-white/8 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white/30 text-xs font-bold">{step.n}</span>
                      <h3 className="text-white font-bold text-base">{step.title}</h3>
                    </div>
                    <p className="text-[#A1A1AA] text-sm">{step.desc}</p>
                  </div>
                </div>

                {/* Empty half */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
