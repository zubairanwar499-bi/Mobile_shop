// ============================================================
// REPAIR SERVICES DATA
// ============================================================

export interface RepairService {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  startingPrice: string;
  icon: string;
  category: string;
  details?: string;
}

export const repairServices: RepairService[] = [
  {
    id: "screen",
    name: "Screen Replacement",
    description:
      "Restore clarity with a precision-fitted display. We work with compatible quality parts.",
    estimatedTime: "30–90 min",
    startingPrice: "From PKR 2,500",
    icon: "smartphone",
    category: "screen-repair",
    details: "Available for iPhone, Samsung, Xiaomi, and more brands.",
  },
  {
    id: "battery",
    name: "Battery Replacement",
    description:
      "Bring your phone back to full-day battery life with a fresh, tested battery.",
    estimatedTime: "30–60 min",
    startingPrice: "From PKR 1,500",
    icon: "battery-charging",
    category: "battery",
    details: "Tested for capacity and safety before installation.",
  },
  {
    id: "charging-port",
    name: "Charging Port Repair",
    description:
      "Fix slow charging, loose connectors, or dead ports — get powered up again.",
    estimatedTime: "45–90 min",
    startingPrice: "From PKR 1,200",
    icon: "plug",
    category: "charging-port",
    details: "Supports USB-C, Lightning, and Micro-USB ports.",
  },
  {
    id: "camera",
    name: "Camera Repair",
    description:
      "Blurry photos or cracked lens? We restore your camera to full shooting capability.",
    estimatedTime: "30–60 min",
    startingPrice: "From PKR 1,800",
    icon: "camera",
    category: "camera-repair",
    details: "Front and rear camera module replacement available.",
  },
  {
    id: "speaker",
    name: "Speaker & Microphone",
    description:
      "Muffled sound or mic issues? We diagnose and restore clear audio performance.",
    estimatedTime: "30–60 min",
    startingPrice: "From PKR 900",
    icon: "volume-2",
    category: "audio",
    details: "Speaker, earpiece, and microphone repairs covered.",
  },
  {
    id: "back-glass",
    name: "Back Glass Replacement",
    description:
      "Shattered back? We replace it with a matching quality panel for a clean finish.",
    estimatedTime: "60–120 min",
    startingPrice: "From PKR 2,000",
    icon: "shield",
    category: "back-glass",
    details: "Available for iPhone and Samsung models.",
  },
  {
    id: "water-damage",
    name: "Water Damage Recovery",
    description:
      "Dropped in water? Bring it in as soon as possible — we'll do a full inspection and cleaning.",
    estimatedTime: "2–24 hours",
    startingPrice: "From PKR 1,500",
    icon: "droplets",
    category: "water-damage",
    details: "Success depends on damage severity. Assessment required first.",
  },
  {
    id: "software",
    name: "Software Issues",
    description:
      "Stuck on boot loop, virus removal, OS reinstall — we diagnose and fix software faults.",
    estimatedTime: "30–90 min",
    startingPrice: "From PKR 800",
    icon: "code",
    category: "software",
    details: "Includes factory reset, OS flashing, and app issues.",
  },
  {
    id: "motherboard",
    name: "Motherboard / IC Repair",
    description:
      "Complex board-level repairs handled by experienced micro-soldering technicians.",
    estimatedTime: "1–3 days",
    startingPrice: "From PKR 3,500",
    icon: "cpu",
    category: "motherboard",
    details:
      "Micro-soldering, IC reballing, and component-level diagnostics available.",
  },
];

export const serviceCategories = [
  { id: "screen-repair", label: "Screen Repair", frames: 120 },
  { id: "battery", label: "Battery", frames: 120 },
  { id: "charging-port", label: "Charging Port", frames: 120 },
  { id: "camera-repair", label: "Camera Repair", frames: 120 },
  { id: "motherboard", label: "Motherboard", frames: 120 },
];
