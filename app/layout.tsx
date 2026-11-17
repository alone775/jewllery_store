import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ZAVI | Affordable Luxury Jewellery Pakistan | 299 Sale",
  description:
    "Shop premium anti-tarnish rings, necklaces, jhumkay and bracelets at affordable prices in Pakistan. Cash on Delivery nationwide & instant WhatsApp checkout.",
  keywords: [
    "jewelry pakistan",
    "artificial jewellery",
    "zavi jewellery",
    "jhumkas",
    "zircon necklace",
    "rings",
    "299 sale",
    "rawayat jewellery"
  ],
  openGraph: {
    title: "ZAVI Jewellery - Affordable Luxury",
    description: "Shop trending jewellery starting at Rs. 299 with instant WhatsApp checkout.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#faf8f5] text-stone-900 font-sans antialiased flex flex-col selection:bg-amber-100 selection:text-amber-900 pb-16 sm:pb-0">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
