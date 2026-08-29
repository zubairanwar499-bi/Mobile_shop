import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Qasir Mobile Shop | Buy, Sell & Repair Phones",
  description:
    "Buy smartphones, sell your used phone, and get professional mobile repair services. Pakistan's premium smartphone destination.",
  keywords: [
    "mobile repair",
    "buy phone",
    "sell phone",
    "screen repair",
    "battery replacement",
    "Pakistan",
    "Qasir Mobile Shop",
  ],
  openGraph: {
    title: "Qasir Mobile Shop | Buy, Sell & Repair Phones",
    description:
      "Buy smartphones, sell your used phone, and get professional mobile repair services.",
    type: "website",
    locale: "en_PK",
    siteName: "Qasir Mobile Shop",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qasir Mobile Shop | Buy, Sell & Repair Phones",
    description:
      "Buy smartphones, sell your used phone, and get professional mobile repair services.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-[#050505] text-white antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
