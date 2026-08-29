"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Share2, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { business } from "@/data/business";
import ZubairLogo from "./ZubairLogo";

const footerLinks = {
  Shop: [
    { label: "Smartphones", href: "#shop" },
    { label: "Accessories", href: "#accessories" },
    { label: "Sell Your Phone", href: "#sell" },
    { label: "Refurbished", href: "#shop" },
  ],
  Repair: [
    { label: "Screen Repair", href: "#repairs" },
    { label: "Battery", href: "#repairs" },
    { label: "Charging Port", href: "#repairs" },
    { label: "Camera", href: "#repairs" },
  ],
  Support: [
    { label: "Contact Us", href: "#contact" },
    { label: "FAQ", href: "#faq" },
    { label: "Book a Repair", href: "#booking" },
    { label: "Repair Status", href: "#contact" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <ZubairLogo size={36} />
              <span className="text-white font-black text-lg tracking-tight">
                Zubair <span className="text-cyan-400">Mobile Shop</span>
              </span>
            </div>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6 max-w-xs">
              {business.tagline} — Your trusted destination for buying, selling,
              and repairing smartphones.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={business.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href={business.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href={business.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#25D366]/20 flex items-center justify-center text-[#A1A1AA] hover:text-[#25D366] transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${business.email}`}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white text-sm font-semibold mb-4">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-[#A1A1AA] hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/8 pt-10 pb-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <div>
              <h4 className="text-white font-semibold mb-1">Stay Updated</h4>
              <p className="text-[#A1A1AA] text-sm">
                Get offers &amp; repair tips in your inbox.
              </p>
            </div>
            {subscribed ? (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-emerald-400 text-sm font-medium"
              >
                ✓ You&apos;re subscribed!
              </motion.p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex gap-2 w-full sm:w-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 sm:w-64 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#555] focus:outline-none focus:border-cyan-400 transition-colors"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-xl text-sm transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[#555] text-xs">
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[#555] text-xs">
            <span>{business.openingHours}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
