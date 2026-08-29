"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Menu, Zap, Sun, Moon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { business } from "@/data/business";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  onSearchOpen: () => void;
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Shop", href: "#shop" },
    { label: "Sell Your Phone", href: "#sell" },
    { label: "Repairs", href: "#repairs" },
    { label: "Accessories", href: "#accessories" },
    { label: "About", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("#home")}
              className="flex items-center gap-2 group"
              aria-label="Go to home"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute inset-0 bg-cyan-400/30 rounded-lg blur-md group-hover:blur-lg transition-all" />
              </div>
              <span className="text-white font-bold text-base lg:text-lg tracking-tight">
                {business.name}
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-[#A1A1AA] hover:text-white text-sm font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Dark / Light Mode Toggle Button (Mobile & Desktop) */}
              <button
                onClick={toggleTheme}
                className="p-2 text-[#A1A1AA] hover:text-white transition-all rounded-lg hover:bg-white/10 cursor-pointer flex items-center justify-center relative group"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-amber-300 transition-transform duration-300 group-hover:rotate-45" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600 transition-transform duration-300 group-hover:-rotate-12" />
                )}
              </button>

              <button
                onClick={onSearchOpen}
                className="p-2 text-[#A1A1AA] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={toggleCart}
                className="relative p-2 text-[#A1A1AA] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                aria-label={`Cart with ${itemCount} items`}
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => scrollToSection("#booking")}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
              >
                Book Repair
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#A1A1AA] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        onScrollTo={scrollToSection}
      />
    </>
  );
}
