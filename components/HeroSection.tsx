"use client";

import React from "react";
import Image from "next/image";
import { Flame, MessageCircle, Star, ShieldCheck, Truck } from "lucide-react";

export const HeroSection: React.FC<{
  onSelectCategory?: (cat: string) => void;
}> = ({ onSelectCategory }) => {
  const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";

  const scrollToCatalog = (catId?: string) => {
    if (onSelectCategory && catId) {
      onSelectCategory(catId);
    }
    const el = document.getElementById("catalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-stone-900 text-white">
      {/* Background Lifestyle Image with gradient darkening for maximum contrast */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner.jpg"
          alt="ZAVI Jewellery Festive Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-stone-900/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/40 to-stone-950/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-28 flex flex-col justify-center min-h-[460px] sm:min-h-[540px]">
        <div className="max-w-2xl space-y-4 sm:space-y-6">
          {/* Urgency Pill */}
          <div className="inline-flex items-center gap-2 bg-rose-600/90 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg border border-rose-400/40 animate-pulse">
            <Flame className="w-4 h-4 fill-current text-amber-200" />
            <span>🔥 PAKISTAN&apos;S CRAZIEST 299 SALE IS LIVE</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-stone-50 drop-shadow-sm">
            Luxury Jewellery <br />
            <span className="italic text-amber-200 font-serif">
              Crafted for Daily Glow.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-light">
            Premium 24K gold-plated zircon necklaces, royal jhumkas & solitaire
            rings. 100% same as shown picture guarantee with{" "}
            <span className="font-semibold text-white">
              Cash on Delivery nationwide
            </span>
            .
          </p>

          {/* Conversion CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => scrollToCatalog("299-sale")}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-lg shadow-rose-900/50 hover:shadow-rose-700/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Flame className="w-5 h-5 fill-current text-amber-300" />
              <span>Shop the 299 Sale</span>
            </button>

            <a
              href={`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(
                "Hello ZAVI! I want to view today's special deals and order via WhatsApp."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-lg shadow-emerald-950/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Order via WhatsApp</span>
            </a>
          </div>

          {/* Social Proof & Trust Badges */}
          <div className="pt-4 sm:pt-6 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-8 text-xs text-stone-300">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-white">4.9/5</span>
              <span className="text-stone-400">(15,000+ Orders)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-300" />
              <span>2-4 Days Nationwide Delivery</span>
            </div>

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Same as Picture</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
