// ============================================================
// ACCESSORIES DATA
// ============================================================

export interface Accessory {
  id: string;
  name: string;
  brand?: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  featured?: boolean;
}

export const accessoryCategories = [
  { id: "cases", label: "Cases", icon: "smartphone" },
  { id: "screen-protectors", label: "Screen Protectors", icon: "shield" },
  { id: "chargers", label: "Chargers", icon: "zap" },
  { id: "cables", label: "USB-C Cables", icon: "cable" },
  { id: "power-banks", label: "Power Banks", icon: "battery-charging" },
  { id: "wireless-chargers", label: "Wireless Chargers", icon: "wifi" },
  { id: "earbuds", label: "Earbuds", icon: "headphones" },
  { id: "car-chargers", label: "Car Chargers", icon: "car" },
];

export const accessories: Accessory[] = [
  {
    id: "magsafe-case-iphone15",
    name: "MagSafe Silicone Case",
    brand: "Compatible",
    category: "cases",
    price: 1499,
    oldPrice: 1999,
    image: "/images/accessories/case-magsafe.webp",
    description:
      "Premium silicone case with MagSafe compatibility for iPhone 15 series.",
    featured: true,
  },
  {
    id: "tempered-glass-universal",
    name: "9H Tempered Glass",
    brand: "ProShield",
    category: "screen-protectors",
    price: 499,
    oldPrice: 799,
    image: "/images/accessories/tempered-glass.webp",
    description: "Ultra-clear, 9H hardness screen protector. Anti-fingerprint.",
    featured: true,
  },
  {
    id: "65w-charger",
    name: "65W GaN Charger",
    brand: "Fast Charge",
    category: "chargers",
    price: 2499,
    image: "/images/accessories/charger-65w.webp",
    description: "GaN technology — charge 3 devices at once. Foldable plug.",
    featured: true,
  },
  {
    id: "usbc-cable-1m",
    name: "USB-C to USB-C 1M",
    brand: "PowerLine",
    category: "cables",
    price: 799,
    image: "/images/accessories/usbc-cable.webp",
    description: "Braided nylon cable. 100W fast charging support.",
    featured: false,
  },
  {
    id: "power-bank-20000",
    name: "20,000mAh Power Bank",
    brand: "UltraCharge",
    category: "power-banks",
    price: 3999,
    oldPrice: 5499,
    image: "/images/accessories/power-bank.webp",
    description: "20,000mAh with 65W PD output. Charges laptops too.",
    featured: true,
  },
  {
    id: "wireless-charger-15w",
    name: "15W Wireless Charger",
    brand: "MagPad",
    category: "wireless-chargers",
    price: 1999,
    image: "/images/accessories/wireless-charger.webp",
    description:
      "15W MagSafe-compatible wireless charging pad. LED indicator.",
    featured: false,
  },
  {
    id: "tws-earbuds",
    name: "TWS Earbuds Pro",
    brand: "SoundCore",
    category: "earbuds",
    price: 4999,
    oldPrice: 6499,
    image: "/images/accessories/earbuds.webp",
    description:
      "Active noise cancellation. 30hr battery. IPX5 water resistant.",
    featured: true,
  },
  {
    id: "car-charger-45w",
    name: "45W Car Charger",
    brand: "DrivePower",
    category: "car-chargers",
    price: 1299,
    image: "/images/accessories/car-charger.webp",
    description: "Dual port — USB-C 45W + USB-A 18W. Quick Charge 3.0.",
    featured: false,
  },
];
