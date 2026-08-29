"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { business } from "@/data/business";

export default function ContactCTA() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-cyan-400 text-sm font-medium uppercase tracking-[0.2em] mb-6">
              Contact
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Need Your Phone
              <br />
              Fixed?
            </h2>
            <p className="text-[#A1A1AA] text-lg mb-10">
              Bring it in. We&apos;ll take it from here.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <button
                onClick={() => scrollTo("#booking")}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-full transition-all hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] text-sm"
              >
                Book a Repair
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={business.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 font-semibold rounded-full transition-all text-sm hover:bg-emerald-400/5"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <a
                href={`tel:${business.phone}`}
                className="flex items-center justify-center gap-2 px-6 py-3.5 border border-white/15 hover:border-white/30 text-white font-semibold rounded-full transition-all text-sm hover:bg-white/5"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 border border-white/15 hover:border-white/30 text-white font-semibold rounded-full transition-all text-sm hover:bg-white/5"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </motion.div>

          {/* Right — Info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-[#111111] border border-white/8 p-8"
          >
            <h3 className="text-white font-semibold text-xl mb-6">
              Find Us
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/8 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[#A1A1AA] text-xs uppercase tracking-wider mb-1">
                    Address
                  </p>
                  <p className="text-white text-sm">{business.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/8 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[#A1A1AA] text-xs uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${business.phone}`}
                    className="text-white text-sm hover:text-cyan-400 transition-colors"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/8 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[#A1A1AA] text-xs uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${business.email}`}
                    className="text-white text-sm hover:text-cyan-400 transition-colors"
                  >
                    {business.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-400/8 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[#A1A1AA] text-xs uppercase tracking-wider mb-1">
                    Opening Hours
                  </p>
                  <p className="text-white text-sm">{business.openingHours}</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-6 aspect-video rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center overflow-hidden">
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-center p-4 hover:text-cyan-400 transition-colors"
              >
                <MapPin className="w-8 h-8 text-[#555]" />
                <p className="text-[#A1A1AA] text-sm">View on Google Maps</p>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
