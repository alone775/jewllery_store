"use client";

import React, { useRef } from "react";
import { categories } from "@/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryPillsProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white border-b border-stone-200 py-3 sm:py-4 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Navigation arrows for desktop */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-stone-200 items-center justify-center text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-stone-200 items-center justify-center text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Horizontally scrollable row */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const isSale = cat.id === "299-sale";

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? isSale
                      ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-500/50"
                      : "bg-stone-900 text-white shadow-md ring-2 ring-stone-900/30"
                    : isSale
                    ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                    : "bg-stone-100/90 text-stone-700 hover:bg-stone-200/90 border border-stone-200/60"
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.name}</span>
                {cat.tag && (
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                      isActive
                        ? "bg-white text-rose-600"
                        : "bg-rose-600 text-white"
                    }`}
                  >
                    {cat.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
