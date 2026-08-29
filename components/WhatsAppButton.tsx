"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { business } from "@/data/business";
import { useState } from "react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/${business.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="px-3 py-2 rounded-xl bg-[#111] border border-white/10 text-white text-xs sm:text-sm font-medium shadow-xl whitespace-nowrap hidden sm:block"
          >
            Chat with us 💬
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-shadow cursor-pointer"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-10 [animation-delay:0.5s]" />
        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10" />
      </motion.a>
    </div>
  );
}
