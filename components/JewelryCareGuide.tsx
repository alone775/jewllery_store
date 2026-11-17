"use client";

import React from "react";
import { Droplets, Wind, ShieldAlert, HeartHandshake } from "lucide-react";

export const JewelryCareGuide: React.FC = () => {
  const tips = [
    {
      icon: Droplets,
      title: "Avoid Direct Water & Moisture",
      desc: "Remove before bathing, washing hands, or swimming to preserve the lustrous gold finish.",
    },
    {
      icon: Wind,
      title: "Perfume Before Jewellery",
      desc: "Apply lotions, hairsprays, and perfumes first. Let them dry completely before putting on your pieces.",
    },
    {
      icon: ShieldAlert,
      title: "Store in Zip Lock Pouches",
      desc: "Keep each piece individually in air-tight pouches to avoid oxidation and scratch marks.",
    },
    {
      icon: HeartHandshake,
      title: "Gentle Clean with Soft Cloth",
      desc: "Wipe with a soft cotton cloth after wearing to remove skin oils before storing away.",
    },
  ];

  return (
    <section className="bg-stone-100/70 border-t border-stone-200 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mx-auto text-center mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full">
            Jewellery Longevity
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-stone-900 mt-2">
            Care Instructions for Lasting Shine
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Follow these simple steps to keep your ZAVI gold-plated jewelry shining bright for years.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col items-center text-center hover:translate-y-[-2px] transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-3 border border-amber-200/50">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">
                  {tip.title}
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
