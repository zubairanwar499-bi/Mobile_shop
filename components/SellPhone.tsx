"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";

const brandOptions = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "OnePlus",
  "Google",
  "Oppo",
  "Vivo",
  "Huawei",
  "Other",
];

const modelsByBrand: Record<string, string[]> = {
  Apple: [
    "iPhone 16 Pro Max",
    "iPhone 15 Pro Max",
    "iPhone 15 Pro",
    "iPhone 15",
    "iPhone 14 Pro Max",
    "iPhone 14 Pro",
    "iPhone 14",
    "iPhone 13",
    "iPhone 12",
    "iPhone 11",
    "Older Model",
  ],
  Samsung: [
    "Galaxy S24 Ultra",
    "Galaxy S24+",
    "Galaxy S24",
    "Galaxy S23",
    "Galaxy A55",
    "Galaxy A35",
    "Older Model",
  ],
  Xiaomi: [
    "Xiaomi 14 Pro",
    "Xiaomi 14",
    "Redmi Note 13 Pro+",
    "Redmi Note 13",
    "Other",
  ],
  OnePlus: ["OnePlus 12", "OnePlus 12R", "OnePlus Nord 4", "Other"],
  Google: ["Pixel 9 Pro", "Pixel 9", "Pixel 8a", "Pixel 8", "Other"],
  Oppo: ["Find X8 Pro", "Reno 12 Pro", "A3 Pro", "Other"],
  Vivo: ["X200 Pro", "V30 Pro", "Y200", "Other"],
  Huawei: ["Pura 70 Pro", "Pura 70", "P60 Pro", "Other"],
  Other: ["Other"],
};

const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"];
const conditionOptions = [
  { value: "excellent", label: "Excellent", desc: "Like new, no scratches" },
  { value: "good", label: "Good", desc: "Minor wear, fully working" },
  { value: "fair", label: "Fair", desc: "Visible scratches, working" },
  { value: "poor", label: "Poor", desc: "Cracked/damaged" },
];
const batteryOptions = ["100–90%", "89–80%", "79–70%", "Below 70%", "Unknown"];

// Demo pricing multipliers (replace with real API)
const basePrices: Record<string, number> = {
  "iPhone 16 Pro Max": 120000,
  "iPhone 15 Pro Max": 100000,
  "iPhone 15 Pro": 85000,
  "iPhone 15": 70000,
  "iPhone 14 Pro Max": 80000,
  "iPhone 14 Pro": 70000,
  "iPhone 14": 55000,
  "iPhone 13": 45000,
  "iPhone 12": 35000,
  "iPhone 11": 28000,
  "Galaxy S24 Ultra": 90000,
  "Galaxy S24+": 80000,
  "Galaxy S24": 70000,
  "Galaxy S23": 55000,
  "Galaxy A55": 40000,
  "Galaxy A35": 32000,
  "Xiaomi 14 Pro": 60000,
  "Pixel 9 Pro": 75000,
  "Pixel 9": 60000,
  "OnePlus 12": 65000,
};

const conditionMultipliers: Record<string, number> = {
  excellent: 0.75,
  good: 0.65,
  fair: 0.5,
  poor: 0.3,
};

const batteryMultipliers: Record<string, number> = {
  "100–90%": 1.0,
  "89–80%": 0.95,
  "79–70%": 0.88,
  "Below 70%": 0.8,
  Unknown: 0.85,
};

export default function SellPhone() {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    storage: "",
    condition: "",
    battery: "",
    accessories: [] as string[],
  });
  const [estimate, setEstimate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof form, value: string | string[]) =>
    setForm((p) => ({ ...p, [field]: value }));

  const toggleAccessory = (acc: string) => {
    setForm((p) => ({
      ...p,
      accessories: p.accessories.includes(acc)
        ? p.accessories.filter((a) => a !== acc)
        : [...p.accessories, acc],
    }));
  };

  const calculateEstimate = async () => {
    if (!form.brand || !form.model || !form.condition) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const base = basePrices[form.model] || 20000;
    const condMult = conditionMultipliers[form.condition] || 0.5;
    const battMult = batteryMultipliers[form.battery] || 0.9;
    const accessoryBonus = form.accessories.length * 500;
    const calculated = Math.round(base * condMult * battMult + accessoryBonus);
    setEstimate(calculated);
    setLoading(false);
  };

  const isReady = form.brand && form.model && form.condition;

  return (
    <section id="sell" className="py-24 sm:py-32 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-cyan-400 text-sm font-medium uppercase tracking-[0.2em] mb-4">
              Sell Your Phone
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Turn Your Old
              <br />
              Phone Into Cash.
            </h2>
            <p className="text-[#A1A1AA] text-lg mb-8">
              Get a fair value for your used phone — without the hassle. We buy
              phones in any condition.
            </p>

            {/* Steps */}
            <div className="space-y-4">
              {[
                {
                  n: "01",
                  title: "Fill in the details",
                  desc: "Brand, model, condition",
                },
                {
                  n: "02",
                  title: "Get your estimate",
                  desc: "Instant valuation",
                },
                {
                  n: "03",
                  title: "Bring it in",
                  desc: "Physical inspection",
                },
                {
                  n: "04",
                  title: "Get paid",
                  desc: "Cash on the spot",
                },
              ].map((step) => (
                <div key={step.n} className="flex items-center gap-4">
                  <span className="text-cyan-400 font-bold text-sm w-8 flex-shrink-0">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {step.title}
                    </p>
                    <p className="text-[#A1A1AA] text-xs">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  const el = document.querySelector("#shop");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-xs font-semibold transition-all"
              >
                <span>Want to list your phone with photo &amp; 3D details in the Shop?</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Right — Estimator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-[#0a0a0a] border border-white/10 p-6 sm:p-8"
          >
            {submitted ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-full bg-emerald-400/10 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </motion.div>
                <h3 className="text-white text-xl font-bold mb-2">
                  Quote Request Sent!
                </h3>
                <p className="text-[#A1A1AA] text-sm">
                  We&apos;ll contact you shortly with a final offer.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEstimate(null);
                    setForm({
                      brand: "",
                      model: "",
                      storage: "",
                      condition: "",
                      battery: "",
                      accessories: [],
                    });
                  }}
                  className="mt-6 text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
                >
                  Value another phone
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-white font-bold text-xl mb-6">
                  Trade-In Estimator
                </h3>

                <div className="space-y-4">
                  {/* Brand */}
                  <div>
                    <label className="block text-[#A1A1AA] text-xs mb-2">
                      Brand
                    </label>
                    <select
                      value={form.brand}
                      onChange={(e) => {
                        update("brand", e.target.value);
                        update("model", "");
                        setEstimate(null);
                      }}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      aria-label="Select brand"
                    >
                      <option value="">Select brand...</option>
                      {brandOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Model */}
                  {form.brand && (
                    <div>
                      <label className="block text-[#A1A1AA] text-xs mb-2">
                        Model
                      </label>
                      <select
                        value={form.model}
                        onChange={(e) => {
                          update("model", e.target.value);
                          setEstimate(null);
                        }}
                        className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                        aria-label="Select model"
                      >
                        <option value="">Select model...</option>
                        {(modelsByBrand[form.brand] || ["Other"]).map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Storage */}
                  <div>
                    <label className="block text-[#A1A1AA] text-xs mb-2">
                      Storage
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {storageOptions.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            update("storage", s);
                            setEstimate(null);
                          }}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                            form.storage === s
                              ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                              : "border-white/10 text-[#A1A1AA] hover:border-white/25"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="block text-[#A1A1AA] text-xs mb-2">
                      Condition
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {conditionOptions.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => {
                            update("condition", c.value);
                            setEstimate(null);
                          }}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            form.condition === c.value
                              ? "border-cyan-400 bg-cyan-400/10"
                              : "border-white/10 hover:border-white/20"
                          }`}
                        >
                          <p
                            className={`text-sm font-medium ${
                              form.condition === c.value
                                ? "text-cyan-400"
                                : "text-white"
                            }`}
                          >
                            {c.label}
                          </p>
                          <p className="text-[#555] text-xs">{c.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Battery */}
                  <div>
                    <label className="block text-[#A1A1AA] text-xs mb-2">
                      Battery Health
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {batteryOptions.map((b) => (
                        <button
                          key={b}
                          onClick={() => {
                            update("battery", b);
                            setEstimate(null);
                          }}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                            form.battery === b
                              ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                              : "border-white/10 text-[#A1A1AA] hover:border-white/25"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accessories */}
                  <div>
                    <label className="block text-[#A1A1AA] text-xs mb-2">
                      Accessories Included
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Box", "Charger", "Earphones", "Case"].map((acc) => (
                        <button
                          key={acc}
                          onClick={() => {
                            toggleAccessory(acc);
                            setEstimate(null);
                          }}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                            form.accessories.includes(acc)
                              ? "border-emerald-400 bg-emerald-400/10 text-emerald-400"
                              : "border-white/10 text-[#A1A1AA] hover:border-white/25"
                          }`}
                        >
                          {acc}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Estimate result */}
                {estimate !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-2xl bg-cyan-400/5 border border-cyan-400/20"
                  >
                    <p className="text-[#A1A1AA] text-xs mb-1">
                      Estimated Trade-In Value
                    </p>
                    <p className="text-cyan-400 text-3xl font-bold">
                      PKR {estimate.toLocaleString()}
                    </p>
                    <p className="text-[#555] text-xs mt-1">
                      * Final offer subject to in-store inspection
                    </p>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {estimate === null ? (
                    <button
                      onClick={calculateEstimate}
                      disabled={!isReady || loading}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-cyan-400 hover:bg-cyan-300 disabled:bg-white/10 disabled:text-white/30 text-black font-semibold rounded-xl transition-all text-sm"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        <>
                          Get My Quote
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setSubmitted(true)}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-xl transition-all text-sm"
                      >
                        Claim This Quote
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button className="flex-1 py-3.5 border border-white/15 hover:border-white/30 text-white font-semibold rounded-xl transition-all text-sm">
                        Sell In Store
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
