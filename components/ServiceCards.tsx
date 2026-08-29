"use client";

import { motion, type Variants } from "framer-motion";
import {
  Smartphone,
  BatteryCharging,
  Plug,
  Camera,
  Cpu,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    id: "screen",
    name: "Screen Repair",
    description: "Cracked glass? We restore the view.",
    price: "From PKR 2,500",
    icon: Smartphone,
    gradient: "from-cyan-500/20 to-blue-600/10",
    border: "border-cyan-500/20",
    accent: "text-cyan-400",
    href: "#repairs",
  },
  {
    id: "battery",
    name: "Battery Replacement",
    description: "Restore full-day battery performance.",
    price: "From PKR 1,500",
    icon: BatteryCharging,
    gradient: "from-emerald-500/20 to-teal-600/10",
    border: "border-emerald-500/20",
    accent: "text-emerald-400",
    href: "#repairs",
  },
  {
    id: "charging",
    name: "Charging Port",
    description: "Fix loose or dead charging connections.",
    price: "From PKR 1,200",
    icon: Plug,
    gradient: "from-violet-500/20 to-purple-600/10",
    border: "border-violet-500/20",
    accent: "text-violet-400",
    href: "#repairs",
  },
  {
    id: "camera",
    name: "Camera Repair",
    description: "Blurry shots or cracked lens? We fix it.",
    price: "From PKR 1,800",
    icon: Camera,
    gradient: "from-orange-500/20 to-amber-600/10",
    border: "border-orange-500/20",
    accent: "text-orange-400",
    href: "#repairs",
  },
  {
    id: "motherboard",
    name: "Motherboard / IC",
    description: "Expert board-level micro-soldering.",
    price: "From PKR 3,500",
    icon: Cpu,
    gradient: "from-rose-500/20 to-red-600/10",
    border: "border-rose-500/20",
    accent: "text-rose-400",
    href: "#repairs",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ServiceCards() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 sm:py-32 bg-[#050505]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-xl"
        >
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Services
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Whatever Your
            <br />
            Phone Needs.
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`group relative p-6 rounded-2xl bg-gradient-to-br ${service.gradient} border ${service.border} cursor-pointer hover:shadow-2xl transition-all duration-300`}
              onClick={() => scrollTo(service.href)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && scrollTo(service.href)}
              aria-label={`Learn about ${service.name}`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className={`w-6 h-6 ${service.accent}`} />
              </div>

              <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                {service.name}
              </h3>
              <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold ${service.accent}`}>
                  {service.price}
                </span>
                <ArrowRight
                  className={`w-4 h-4 ${service.accent} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
