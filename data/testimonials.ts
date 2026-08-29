// ============================================================
// TESTIMONIALS — Replace with real customer reviews
// ============================================================

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  category: string;
  avatar?: string;
  date?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ahmed R.",
    rating: 5,
    review:
      "Got my iPhone 14 screen replaced in under an hour. Looks brand new — couldn't be happier. Will definitely come back.",
    category: "Screen Repair",
    date: "August 2026",
  },
  {
    id: "t2",
    name: "Sara M.",
    rating: 5,
    review:
      "Bought a refurbished Samsung S24 — it arrived in perfect condition, better than expected. Fair price too.",
    category: "Phone Purchase",
    date: "July 2026",
  },
  {
    id: "t3",
    name: "Bilal K.",
    rating: 5,
    review:
      "Sold my old iPhone 13 here. The process was super simple and I got a very fair price. No haggling needed.",
    category: "Phone Sale",
    date: "August 2026",
  },
  {
    id: "t4",
    name: "Fatima A.",
    rating: 4,
    review:
      "Battery replacement for my OnePlus was done in 45 minutes. Phone performance is like new again. Professional team.",
    category: "Battery Replacement",
    date: "July 2026",
  },
  {
    id: "t5",
    name: "Usman T.",
    rating: 5,
    review:
      "Water damage repair saved my Pixel. I thought it was gone for good — the technicians here are seriously skilled.",
    category: "Water Damage Recovery",
    date: "June 2026",
  },
];
