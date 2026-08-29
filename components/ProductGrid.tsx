"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Sparkles, Upload, Smartphone, CheckCircle, Flame } from "lucide-react";
import { products as initialProducts, brands as defaultBrands, conditions, storageOptions, Product } from "@/data/products";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import PhoneDetailModal from "./PhoneDetailModal";
import ListPhoneModal from "./ListPhoneModal";

export default function ProductGrid() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedCondition, setSelectedCondition] = useState<string>("All");
  const [selectedStorage, setSelectedStorage] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]);

  // Modal states
  const [selectedProductForDetails, setSelectedProductForDetails] = useState<Product | null>(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  // Restore saved custom phones from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("qasir_custom_phones");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom uploaded phones at top of initial list
          setProductList([...parsed, ...initialProducts]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Dynamic brands list
  const availableBrands = useMemo(() => {
    const set = new Set(productList.map((p) => p.brand));
    return ["All", ...Array.from(set)];
  }, [productList]);

  const filtered = useMemo(() => {
    let list = [...productList];

    if (selectedBrand !== "All")
      list = list.filter((p) => p.brand === selectedBrand);
    if (selectedCondition !== "All")
      list = list.filter((p) => p.condition === selectedCondition);
    if (selectedStorage !== "All")
      list = list.filter((p) => p.storage === selectedStorage);
    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "featured":
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "discount":
        list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
    }

    return list;
  }, [productList, selectedBrand, selectedCondition, selectedStorage, sortBy, priceRange]);

  // Add new or old uploaded phone to state & localStorage
  const handleAddProduct = (newProd: Product) => {
    setProductList((prev) => {
      const updated = [newProd, ...prev];
      try {
        const customOnes = updated.filter((p) => p.id.startsWith("custom-"));
        localStorage.setItem("qasir_custom_phones", JSON.stringify(customOnes));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    // Automatically open 3D details of the newly listed product
    setTimeout(() => {
      setSelectedProductForDetails(newProd);
    }, 350);
  };

  return (
    <section id="shop" className="py-20 sm:py-28 bg-[#0a0a0a] relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Easy Action Banner: Upload New / Old Phone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#101318] to-blue-950/30 border border-cyan-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Upload className="w-7 h-7 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                  NEW / OLD PHONE UPLOAD
                </span>
                <span className="text-[11px] text-[#A1A1AA] font-mono">3D ANIMATED</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Upload Phone Photos &amp; Price Details
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
                Apne new ya old mobile ki photos aur price add karein — wo automatically 3D animated showcase ban jayega!
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsListModalOpen(true)}
            className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl sm:rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-sm sm:text-base transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 text-black group-hover:rotate-90 transition-transform duration-300" />
            <span>+ Upload Mobile Pic &amp; Details</span>
          </button>
        </motion.div>

        {/* Section Title & Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-cyan-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                SMARTPHONES LISTING (NEW &amp; USED)
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Explore Available Phones.
              </h2>
            </div>

            {/* Quick condition filter buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCondition("All")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCondition === "All"
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/5 text-[#A1A1AA] hover:text-white border border-white/8"
                }`}
              >
                All ({productList.length})
              </button>
              <button
                onClick={() => setSelectedCondition("New")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCondition === "New"
                    ? "bg-emerald-400 text-black shadow-lg"
                    : "bg-white/5 text-[#A1A1AA] hover:text-white border border-white/8"
                }`}
              >
                ✨ Brand New (Dabba Pack)
              </button>
              <button
                onClick={() => setSelectedCondition("Used")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCondition === "Used"
                    ? "bg-amber-400 text-black shadow-lg"
                    : "bg-white/5 text-[#A1A1AA] hover:text-white border border-white/8"
                }`}
              >
                📱 Used / Old Phones
              </button>
              <button
                onClick={() => setSelectedCondition("Refurbished")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCondition === "Refurbished"
                    ? "bg-blue-400 text-black shadow-lg"
                    : "bg-white/5 text-[#A1A1AA] hover:text-white border border-white/8"
                }`}
              >
                🔧 Refurbished
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters Bar */}
        <div className="p-4 rounded-2xl bg-white/3 border border-white/8 backdrop-blur-md mb-8">
          <ProductFilters
            brands={availableBrands}
            conditions={["All", ...conditions]}
            storageOptions={["All", ...storageOptions]}
            sortOptions={[
              { value: "featured", label: "Featured" },
              { value: "price-asc", label: "Price: Low to High" },
              { value: "price-desc", label: "Price: High to Low" },
              { value: "discount", label: "Biggest Discount" },
            ]}
            selectedBrand={selectedBrand}
            selectedCondition={selectedCondition}
            selectedStorage={selectedStorage}
            sortBy={sortBy}
            onBrandChange={setSelectedBrand}
            onConditionChange={setSelectedCondition}
            onStorageChange={setSelectedStorage}
            onSortChange={setSortBy}
          />
        </div>

        {/* Product Cards Grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/2 rounded-3xl border border-white/5"
          >
            <p className="text-[#A1A1AA] text-lg mb-2">No phones match your filters.</p>
            <button
              onClick={() => {
                setSelectedBrand("All");
                setSelectedCondition("All");
                setSelectedStorage("All");
                setSortBy("featured");
              }}
              className="text-cyan-400 text-sm hover:text-cyan-300 underline underline-offset-4 transition-colors cursor-pointer"
            >
              Reset all filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <ProductCard
                  product={product}
                  onViewDetails={(prod) => setSelectedProductForDetails(prod)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 3D Phone Details Showcase Modal */}
      <PhoneDetailModal
        product={selectedProductForDetails}
        isOpen={selectedProductForDetails !== null}
        onClose={() => setSelectedProductForDetails(null)}
      />

      {/* List / Upload Phone with Live 3D Holographic Preview Modal */}
      <ListPhoneModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </section>
  );
}
