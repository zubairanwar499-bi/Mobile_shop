// ============================================================
// FAQ DATA — Configurable Q&A
// ============================================================

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqs: FAQItem[] = [
  {
    id: "f1",
    question: "How long does a screen repair take?",
    answer:
      "Most screen repairs are completed within 30 to 90 minutes, depending on the device model and parts availability. We'll give you an accurate estimate when you bring in your phone.",
    category: "Repairs",
  },
  {
    id: "f2",
    question: "Do you buy used phones?",
    answer:
      "Yes! We purchase used smartphones in all conditions — working, cracked screen, or even water damaged. Bring your phone in for a free assessment, or use our online estimator to get a rough idea of the trade-in value.",
    category: "Buy/Sell",
  },
  {
    id: "f3",
    question: "Can I sell a phone with a cracked screen?",
    answer:
      "Absolutely. We accept phones with cracked screens, though the condition will factor into the trade-in valuation. Cracked screens reduce the value slightly, but we'll still make you a fair offer.",
    category: "Buy/Sell",
  },
  {
    id: "f4",
    question: "Do you repair water-damaged phones?",
    answer:
      "Yes, we handle water damage recovery. The sooner you bring in a water-damaged phone, the better the chances of recovery. We start with a full diagnostic and cleaning before proceeding with any repair. Note: success depends on the severity of the damage.",
    category: "Repairs",
  },
  {
    id: "f5",
    question: "Do I need an appointment?",
    answer:
      "Walk-ins are always welcome. However, booking a repair in advance ensures your preferred time slot and helps us prepare parts if needed. You can book online through our repair booking form.",
    category: "General",
  },
  {
    id: "f6",
    question: "Do you sell refurbished phones?",
    answer:
      "Yes, we offer a range of quality-checked refurbished smartphones at competitive prices. Each refurbished device is tested for performance, battery health, and cosmetic condition before being listed for sale.",
    category: "Shop",
  },
  {
    id: "f7",
    question: "Can I book a repair online?",
    answer:
      "Yes! Use our online repair booking form to select your device, describe the issue, and pick a preferred date and time. We'll confirm your booking via phone or WhatsApp.",
    category: "Repairs",
  },
];
