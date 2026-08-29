"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  BatteryCharging,
  Plug,
  Camera,
  Volume2,
  Shield,
  Droplets,
  Code,
  Cpu,
  Clock,
  ArrowRight,
} from "lucide-react";
import { repairServices } from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  smartphone: Smartphone,
  "battery-charging": BatteryCharging,
  plug: Plug,
  camera: Camera,
  "volume-2": Volume2,
  shield: Shield,
  droplets: Droplets,
  code: Code,
  cpu: Cpu,
};

export default function RepairServices() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="repairs" className="py-24 sm:py-32 bg-[#0a0a0a]">
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
            Repair Services
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Precision at Every Level.
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-xl mx-auto">
            From cracked screens to complex board-level repairs — we handle it
            all with care.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repairServices.map((service, i) => {
            const Icon = iconMap[service.icon] || Smartphone;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative p-6 rounded-2xl bg-[#111111] border border-white/8 hover:border-cyan-400/20 hover:bg-[#131313] transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-cyan-400/8 flex items-center justify-center group-hover:bg-cyan-400/15 transition-colors">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-base mb-1">
                      {service.name}
                    </h3>
                    <p className="text-[#A1A1AA] text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-[#A1A1AA] text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      {service.estimatedTime}
                    </div>
                    <span className="text-cyan-400 text-xs font-semibold">
                      {service.startingPrice}
                    </span>
                  </div>
                  <button
                    onClick={() => scrollTo("#booking")}
                    className="flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-cyan-400 transition-colors"
                    aria-label={`Book ${service.name}`}
                  >
                    Book
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => scrollTo("#booking")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
          >
            Book a Repair Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
