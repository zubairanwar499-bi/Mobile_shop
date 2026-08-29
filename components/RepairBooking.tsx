"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, Loader2 } from "lucide-react";

const brands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "OnePlus",
  "Google",
  "Oppo",
  "Vivo",
  "Other",
];

const modelsByBrand: Record<string, string[]> = {
  Apple: [
    "iPhone 16 Pro Max",
    "iPhone 16 Pro",
    "iPhone 16",
    "iPhone 15 Pro Max",
    "iPhone 15 Pro",
    "iPhone 15",
    "iPhone 14 Pro Max",
    "iPhone 14 Pro",
    "iPhone 14",
    "iPhone 13 Pro Max",
    "iPhone 13 Pro",
    "iPhone 13",
    "iPhone 12",
    "iPhone 11",
    "Other Apple",
  ],
  Samsung: [
    "Galaxy S25 Ultra",
    "Galaxy S25+",
    "Galaxy S25",
    "Galaxy S24 Ultra",
    "Galaxy S24+",
    "Galaxy S24",
    "Galaxy S23",
    "Galaxy A55",
    "Galaxy A35",
    "Galaxy A15",
    "Other Samsung",
  ],
  Xiaomi: [
    "Xiaomi 14 Ultra",
    "Xiaomi 14 Pro",
    "Xiaomi 14",
    "Redmi Note 13 Pro+",
    "Redmi Note 13 Pro",
    "Redmi Note 13",
    "POCO X6 Pro",
    "Other Xiaomi",
  ],
  OnePlus: [
    "OnePlus 13",
    "OnePlus 12",
    "OnePlus 12R",
    "OnePlus Nord 4",
    "OnePlus Nord CE 4",
    "Other OnePlus",
  ],
  Google: ["Pixel 9 Pro XL", "Pixel 9 Pro", "Pixel 9", "Pixel 8a", "Pixel 8", "Other Google"],
  Oppo: ["Find X8 Pro", "Find X8", "Reno 12 Pro", "Reno 12", "A3 Pro", "Other Oppo"],
  Vivo: ["X200 Pro", "X200", "V30 Pro", "V30", "Y200", "Other Vivo"],
  Other: ["Other Brand"],
};

const problems = [
  "Broken Screen",
  "Battery Replacement",
  "Charging Port",
  "Camera",
  "Speaker / Microphone",
  "Back Glass",
  "Water Damage",
  "Software Issue",
  "Other",
];

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];

interface FormData {
  brand: string;
  model: string;
  problem: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  notes: string;
}

const INITIAL: FormData = {
  brand: "",
  model: "",
  problem: "",
  name: "",
  phone: "",
  date: "",
  time: "",
  notes: "",
};

export default function RepairBooking() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (step === 1 && !form.brand) newErrors.brand = "Please select a brand";
    if (step === 2 && !form.model) newErrors.model = "Please select a model";
    if (step === 3 && !form.problem) newErrors.problem = "Please select a problem";
    if (step === 4) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.phone.trim()) newErrors.phone = "Phone number is required";
      if (!form.date) newErrors.date = "Date is required";
      if (!form.time) newErrors.time = "Time is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 4));
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    // Mock submit delay
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const stepLabels = ["Device", "Model", "Problem", "Details"];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <section id="booking" className="py-24 sm:py-32 bg-[#050505]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="text-cyan-400 text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Book a Repair
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Let&apos;s Fix Your Phone.
          </h2>
          <p className="text-[#A1A1AA] text-base">
            Fill in the details below and we&apos;ll confirm your booking via
            WhatsApp or phone.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-12 rounded-3xl bg-[#0f1f1a] border border-emerald-500/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 rounded-full bg-emerald-400/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Repair Request Received!
              </h3>
              <p className="text-[#A1A1AA] text-base mb-2">
                We&apos;ll contact you shortly to confirm your appointment.
              </p>
              <p className="text-emerald-400 text-sm font-medium">
                {form.brand} {form.model} · {form.problem}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setForm(INITIAL);
                }}
                className="mt-8 px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-full text-sm transition-colors"
              >
                Book Another Repair
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="rounded-3xl bg-[#111111] border border-white/8 overflow-hidden"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between p-6 border-b border-white/8">
                {stepLabels.map((label, i) => (
                  <div key={label} className="flex items-center gap-2 flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        step > i + 1
                          ? "bg-emerald-400 text-black"
                          : step === i + 1
                          ? "bg-cyan-400 text-black"
                          : "bg-white/10 text-[#A1A1AA]"
                      }`}
                    >
                      {step > i + 1 ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-sm font-medium hidden sm:block transition-colors ${
                        step === i + 1 ? "text-white" : "text-[#A1A1AA]"
                      }`}
                    >
                      {label}
                    </span>
                    {i < stepLabels.length - 1 && (
                      <div className="flex-1 h-px bg-white/8 ml-2" />
                    )}
                  </div>
                ))}
              </div>

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Brand */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-white text-xl font-semibold mb-6">
                        Select your device brand
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {brands.map((brand) => (
                          <button
                            key={brand}
                            onClick={() => update("brand", brand)}
                            className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 ${
                              form.brand === brand
                                ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                                : "border-white/10 text-[#A1A1AA] hover:border-white/25 hover:text-white"
                            }`}
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                      {errors.brand && (
                        <p className="text-red-400 text-sm mt-3">
                          {errors.brand}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Step 2: Model */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-white text-xl font-semibold mb-6">
                        Select your model
                      </h3>
                      <select
                        value={form.model}
                        onChange={(e) => update("model", e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                        aria-label="Select model"
                      >
                        <option value="">Choose a model...</option>
                        {(modelsByBrand[form.brand] || ["Other"]).map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      {errors.model && (
                        <p className="text-red-400 text-sm mt-3">
                          {errors.model}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Problem */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-white text-xl font-semibold mb-6">
                        What&apos;s the problem?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {problems.map((problem) => (
                          <button
                            key={problem}
                            onClick={() => update("problem", problem)}
                            className={`py-3.5 px-4 rounded-xl border text-sm font-medium text-left transition-all duration-200 ${
                              form.problem === problem
                                ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                                : "border-white/10 text-[#A1A1AA] hover:border-white/25 hover:text-white"
                            }`}
                          >
                            {problem}
                          </button>
                        ))}
                      </div>
                      {errors.problem && (
                        <p className="text-red-400 text-sm mt-3">
                          {errors.problem}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Step 4: Details */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-white text-xl font-semibold mb-6">
                        Your details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[#A1A1AA] text-sm mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Your name"
                            className="w-full bg-[#0a0a0a] border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm placeholder-[#555] focus:outline-none focus:border-cyan-400 transition-colors"
                            aria-label="Full name"
                          />
                          {errors.name && (
                            <p className="text-red-400 text-xs mt-1.5">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[#A1A1AA] text-sm mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="+92 XXX XXXXXXX"
                            className="w-full bg-[#0a0a0a] border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm placeholder-[#555] focus:outline-none focus:border-cyan-400 transition-colors"
                            aria-label="Phone number"
                          />
                          {errors.phone && (
                            <p className="text-red-400 text-xs mt-1.5">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[#A1A1AA] text-sm mb-2">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            value={form.date}
                            onChange={(e) => update("date", e.target.value)}
                            min={minDate}
                            className="w-full bg-[#0a0a0a] border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                            aria-label="Preferred date"
                          />
                          {errors.date && (
                            <p className="text-red-400 text-xs mt-1.5">
                              {errors.date}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-[#A1A1AA] text-sm mb-2">
                            Preferred Time *
                          </label>
                          <select
                            value={form.time}
                            onChange={(e) => update("time", e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                            aria-label="Preferred time"
                          >
                            <option value="">Select time...</option>
                            {timeSlots.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                          {errors.time && (
                            <p className="text-red-400 text-xs mt-1.5">
                              {errors.time}
                            </p>
                          )}
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[#A1A1AA] text-sm mb-2">
                            Additional Notes (optional)
                          </label>
                          <textarea
                            value={form.notes}
                            onChange={(e) => update("notes", e.target.value)}
                            placeholder="Any additional details about the problem..."
                            rows={3}
                            className="w-full bg-[#0a0a0a] border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm placeholder-[#555] focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                            aria-label="Additional notes"
                          />
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="mt-6 p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/15">
                        <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                          Repair Summary
                        </p>
                        <p className="text-white text-sm">
                          {form.brand} {form.model} · {form.problem}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
                  {step > 1 ? (
                    <button
                      onClick={back}
                      className="px-5 py-2.5 border border-white/15 hover:border-white/30 text-white rounded-full text-sm transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      onClick={next}
                      disabled={
                        (step === 1 && !form.brand) ||
                        (step === 2 && !form.model) ||
                        (step === 3 && !form.problem)
                      }
                      className="flex items-center gap-2 px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 disabled:bg-white/20 disabled:text-white/40 text-black font-semibold rounded-full text-sm transition-all duration-200"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={submit}
                      disabled={submitting}
                      className="flex items-center gap-2 px-8 py-3 bg-cyan-400 hover:bg-cyan-300 disabled:bg-cyan-400/50 text-black font-semibold rounded-full text-sm transition-all duration-200"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Request Repair"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
