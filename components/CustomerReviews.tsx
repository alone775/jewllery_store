"use client";

import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Ayesha Siddiqui",
      city: "Lahore (Gulberg)",
      product: "Zircon Necklace-71 (Golden/Green)",
      rating: 5,
      comment:
        "Bohot hi khoobsurat necklace hai! Quality 100% same hai jese picture me dikhaya tha. Ordered on WhatsApp and received within 2 days in Lahore. Highly recommended!",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Mahnoor Khan",
      city: "Karachi (DHA Phase 6)",
      product: "Classic Jhumkay (Silver)",
      rating: 5,
      comment:
        "Unbelievable price for Rs. 299! Lightweight hain aur kaan me bilkul dard nahi hota. WhatsApp checkout process was so quick and seamless. Love ZAVI!",
      date: "3 days ago",
    },
    {
      id: 3,
      name: "Hiba Tariq",
      city: "Islamabad (F-10)",
      product: "Royal Solitaire Zircon Ring",
      rating: 5,
      comment:
        "The sparkle on the ring is mesmerizing! Looks like real 1 carat diamond. Best part is adjustable size. Cash on delivery courier was very professional.",
      date: "5 days ago",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Loved Across Pakistan 🇵🇰
        </span>
        <h2 className="font-serif-luxury text-2xl sm:text-4xl font-semibold text-stone-900 mt-2 tracking-tight">
          Over 15,000+ Happy Customers
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Real reviews from customers who ordered via WhatsApp and experienced ZAVI quality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
          >
            <Quote className="w-8 h-8 text-amber-200/80 absolute top-4 right-4 -z-0 pointer-events-none" />

            <div>
              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1">
                  <span>{rev.name}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                </h4>
                <p className="text-[10px] sm:text-[11px] text-stone-500">
                  {rev.city} • <span className="text-stone-400">{rev.date}</span>
                </p>
              </div>

              <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                Verified Buyer
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
