"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import RepairServices from "@/components/RepairServices";
import RepairBooking from "@/components/RepairBooking";
import SellPhone from "@/components/SellPhone";
import Accessories from "@/components/Accessories";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactCTA from "@/components/ContactCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

// Dynamically import 250-frame 3D canvas experience + search overlay
const PhoneScrollExperience = dynamic(
  () => import("@/components/PhoneScrollExperience"),
  {
    ssr: false,
    loading: () => (
      <div className="h-screen bg-[#050505] flex items-center justify-center">
        <p className="text-cyan-400 text-sm font-mono tracking-widest uppercase animate-pulse">
          Loading 3D Phone Experience...
        </p>
      </div>
    ),
  }
);

const SearchOverlay = dynamic(() => import("@/components/Search"), {
  ssr: false,
});

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-400 focus:text-black focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      <main id="main" tabIndex={-1}>
        {/* 1. Cinematic 3D Phone Scroll Hero (Core Experience) */}
        <PhoneScrollExperience />

        {/* 2. Smartphones Marketplace (New & Used) + Upload Phone Option */}
        <ProductGrid />

        {/* 3. Repair Services Catalog */}
        <RepairServices />

        {/* 4. Instant Repair Booking */}
        <RepairBooking />

        {/* 5. Sell Your Old Phone (Trade-In Calculator) */}
        <SellPhone />

        {/* 6. Mobile Accessories & Essentials */}
        <Accessories />

        {/* 7. Before / After Quality Slider */}
        <BeforeAfter />

        {/* 8. Verified Customer Reviews */}
        <Testimonials />

        {/* 9. Frequently Asked Questions */}
        <FAQ />

        {/* 10. Contact & Location Information */}
        <ContactCTA />
      </main>

      <Footer />

      {/* Floating WhatsApp */}
      <WhatsAppButton />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
