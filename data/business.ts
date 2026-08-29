// ============================================================
// BUSINESS CONFIGURATION — Edit this file to update all
// contact info, brand name, and opening hours across the site.
// ============================================================

export const business = {
  name: "Zubair Mobile Shop",
  shortName: "ZMS",
  tagline: "Your Phone. Rebuilt Better.",
  subTagline: "Buy. Sell. Repair. Upgrade.",
  phone: "+92 XXX XXXXXXX",
  whatsapp: "+92XXXXXXXXXX",
  email: "hello@zubairmobileshop.com",
  address: "Your Shop Address, City, Pakistan",
  openingHours: "Mon–Sat: 10:00 AM – 8:00 PM",
  googleMapsUrl: "#",
  instagram: "#",
  facebook: "#",
  tiktok: "#",
  socialLinks: {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
    whatsapp: "https://wa.me/92XXXXXXXXXX",
  },
} as const;

export type Business = typeof business;
