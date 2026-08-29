"use client";

import { motion } from "framer-motion";
import { Users, Package, Tag, Shield } from "lucide-react";

const benefits = [
  {
    n: "01",
    icon: Users,
    title: "Skilled Technicians",
    desc: "Our team brings years of hands-on experience across all major smartphone brands and models.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/8",
  },
  {
    n: "02",
    icon: Package,
    title: "Quality Components",
    desc: "We use tested, compatible parts to restore your device's performance and feel.",
    color: "text-blue-400",
    bg: "bg-blue-400/8",
  },
  {
    n: "03",
    icon: Tag,
    title: "Transparent Pricing",
    desc: "No hidden fees. You receive a clear quote before any work begins.",
    color: "text-violet-400",
    bg: "bg-violet-400/8",
  },
  {
    n: "04",
    icon: Shield,
    title: "Warranty Options",
    desc: "Ask about our repair warranty at the time of service. Configurable per repair type.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/8",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 sm:py-32 bg-[#050505] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Why Choose Us
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Repair Done Right.
          </h2>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-[#111111] border border-white/8 hover:border-white/15 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`w-12 h-12 rounded-xl ${benefit.bg} flex items-center justify-center`}
                >
                  <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <span className="text-white/10 font-bold text-2xl">
                  {benefit.n}
                </span>
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">
                {benefit.title}
              </h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
