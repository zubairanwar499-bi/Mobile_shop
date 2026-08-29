import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zubair Mobile Shop | Buy, Sell & Repair Phones",
  description:
    "Buy smartphones, sell your used phone, and get professional mobile repair services. Pakistan's premium smartphone destination.",
  keywords: [
    "mobile repair",
    "buy phone",
    "sell phone",
    "screen repair",
    "battery replacement",
    "Pakistan",
    "Zubair Mobile Shop",
  ],
  openGraph: {
    title: "Zubair Mobile Shop | Buy, Sell & Repair Phones",
    description:
      "Buy smartphones, sell your used phone, and get professional mobile repair services.",
    type: "website",
    locale: "en_PK",
    siteName: "Zubair Mobile Shop",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zubair Mobile Shop | Buy, Sell & Repair Phones",
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-300 antialiased`}>
        <ThemeProvider>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
