// ============================================================
// PRODUCTS DATA — Replace with real inventory as needed.
// ============================================================

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: "smartphone";
  price: number;
  oldPrice?: number;
  condition: "New" | "Refurbished" | "Used";
  storage?: string;
  ram?: string;
  image: string;
  description: string;
  featured?: boolean;
  discount?: number;
  color?: string;
}

export const products: Product[] = [
  {
    id: "iphone-15-pro-256",
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "smartphone",
    price: 159999,
    oldPrice: 179999,
    condition: "New",
    storage: "256GB",
    ram: "8GB",
    image: "/images/products/iphone-15-pro.webp",
    description:
      "The most powerful iPhone ever. Titanium design with the A17 Pro chip.",
    featured: true,
    discount: 11,
    color: "Natural Titanium",
  },
  {
    id: "iphone-14-128",
    name: "iPhone 14",
    brand: "Apple",
    category: "smartphone",
    price: 109999,
    oldPrice: 129999,
    condition: "Refurbished",
    storage: "128GB",
    ram: "6GB",
    image: "/images/products/iphone-14.webp",
    description:
      "Certified refurbished iPhone 14 — tested, cleaned, and ready to use.",
    featured: true,
    discount: 15,
    color: "Midnight",
  },
  {
    id: "samsung-s24-256",
    name: "Galaxy S24",
    brand: "Samsung",
    category: "smartphone",
    price: 134999,
    condition: "New",
    storage: "256GB",
    ram: "8GB",
    image: "/images/products/samsung-s24.webp",
    description:
      "Galaxy AI is here. The smartest Galaxy ever with Snapdragon 8 Gen 3.",
    featured: true,
    color: "Onyx Black",
  },
  {
    id: "samsung-a55-128",
    name: "Galaxy A55",
    brand: "Samsung",
    category: "smartphone",
    price: 64999,
    oldPrice: 74999,
    condition: "New",
    storage: "128GB",
    ram: "8GB",
    image: "/images/products/samsung-a55.webp",
    description:
      "Awesome display, pro-grade camera, and long-lasting battery life.",
    featured: false,
    discount: 13,
    color: "Awesome Navy",
  },
  {
    id: "pixel-9-128",
    name: "Pixel 9",
    brand: "Google",
    category: "smartphone",
    price: 119999,
    condition: "New",
    storage: "128GB",
    ram: "12GB",
    image: "/images/products/pixel-9.webp",
    description:
      "Google's most helpful phone ever — powered by Gemini AI on-device.",
    featured: true,
    color: "Obsidian",
  },
  {
    id: "oneplus-12-256",
    name: "OnePlus 12",
    brand: "OnePlus",
    category: "smartphone",
    price: 99999,
    oldPrice: 114999,
    condition: "New",
    storage: "256GB",
    ram: "12GB",
    image: "/images/products/oneplus-12.webp",
    description:
      "Flagship performance. Hasselblad camera. 100W SUPERVOOC charging.",
    featured: false,
    discount: 13,
    color: "Silky Black",
  },
  {
    id: "xiaomi-14-pro-256",
    name: "Xiaomi 14 Pro",
    brand: "Xiaomi",
    category: "smartphone",
    price: 94999,
    condition: "New",
    storage: "256GB",
    ram: "12GB",
    image: "/images/products/xiaomi-14-pro.webp",
    description:
      "Leica optics, Snapdragon 8 Gen 3, and ultra-fast 120W charging.",
    featured: false,
    color: "Black",
  },
  {
    id: "iphone-13-128-used",
    name: "iPhone 13",
    brand: "Apple",
    category: "smartphone",
    price: 79999,
    condition: "Used",
    storage: "128GB",
    ram: "6GB",
    image: "/images/products/iphone-13.webp",
    description:
      "Pre-owned iPhone 13 in excellent condition. Battery health 89%.",
    featured: false,
    color: "Starlight",
  },
];

export const brands = [...new Set(products.map((p) => p.brand))];
export const conditions = ["New", "Refurbished", "Used"] as const;
export const storageOptions = [
  ...new Set(products.map((p) => p.storage).filter(Boolean)),
] as string[];
