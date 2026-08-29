"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, PhoneCall, Sun, Moon } from "lucide-react";
import { business } from "@/data/business";
import { useTheme } from "@/context/ThemeContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
  onScrollTo: (href: string) => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  onScrollTo,
}: MobileMenuProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-[300px] bg-[#0a0a0a] border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-md flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white font-bold text-base">
                  {business.name}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#A1A1AA] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  onClick={() => onScrollTo(link.href)}
                  className="text-left py-3.5 px-4 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-white/5 text-base font-medium transition-all duration-200"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* Footer actions */}
            <div className="p-6 border-t border-white/10 space-y-3">
              {/* Theme Toggle Button in Mobile Drawer */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs font-semibold text-white flex items-center gap-2">
                  {theme === "dark" ? (
                    <Moon className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Sun className="w-4 h-4 text-amber-400" />
                  )}
                  <span>{theme === "dark" ? "Dark Mode" : "White Mode"}</span>
                </span>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-400 text-black hover:bg-cyan-300 transition-colors cursor-pointer"
                >
                  Switch to {theme === "dark" ? "White" : "Dark"}
                </button>
              </div>

              <button
                onClick={() => onScrollTo("#booking")}
                className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-xl transition-colors text-sm"
              >
                Book a Repair
              </button>
              <a
                href={`tel:${business.phone}`}
                className="flex items-center justify-center gap-2 w-full py-3 border border-white/15 hover:border-white/30 text-white rounded-xl transition-colors text-sm"
              >
                <PhoneCall className="w-4 h-4" />
                {business.phone}
              </a>
              <p className="text-[#A1A1AA] text-xs text-center">
                {business.openingHours}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
