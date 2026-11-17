"use client";

import React from "react";
import { Truck, ShieldCheck, Banknote, Sparkles } from "lucide-react";

export const TrustBar: React.FC = () => {
  const trustFeatures = [
    {
      icon: Banknote,
      title: "Cash on Delivery",
      description: "Pay conveniently at your doorstep anywhere in Pakistan",
      highlight: "100% Secure",
    },
    {
      icon: Truck,
      title: "Fast 2-4 Days Delivery",
      description: "Dispatched via top couriers: TCS, Leopards & Trax",
      highlight: "Nationwide",
    },
    {
      icon: ShieldCheck,
      title: "100% Same as Picture",
      description: "Zero filter photos. Exactly what you see is what you get",
      highlight: "Verified",
    },
    {
      icon: Sparkles,
      title: "Anti-Tarnish Polish",
      description: "Long-lasting 24K gold and rhodium silver plating",
      highlight: "Premium",
    },
  ];

  return (
    <section className="bg-white border-y border-stone-200/80 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trustFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 sm:gap-4 p-2 rounded-xl hover:bg-stone-50 transition-colors"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200/60">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                      {item.title}
                    </h4>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-mono">
                      {item.highlight}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-500 mt-1 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
