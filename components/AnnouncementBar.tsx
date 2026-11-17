"use client";

import React from "react";
import { Sparkles, Clock, Flame } from "lucide-react";

interface AnnouncementBarProps {
  onSaleClick?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onSaleClick }) => {
  return (
    <aside
      aria-label="Urgency announcement and sale countdown"
      className="bg-[#161210] text-[#fbf8f3] text-xs font-medium border-b border-[#2d2420] transition-all"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2 overflow-hidden">
        {/* Left marquee / highlight badge */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSaleClick}
            className="inline-flex items-center gap-1 bg-rose-600/90 hover:bg-rose-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider animate-pulse cursor-pointer"
          >
            <Flame className="w-3 h-3 fill-current" />
            11.11 Mega Sale
          </button>
          <span className="hidden sm:inline text-stone-300">
            Up to 50% OFF Storewide | Use Code:{" "}
            <strong className="text-amber-300 font-mono tracking-wider">
              ZAVI11
            </strong>
          </span>
        </div>

        {/* Center urgency banner for mobile */}
        <div className="sm:hidden text-center truncate text-[11px] font-semibold text-stone-200">
          🔥 Up to 50% OFF | Code:{" "}
          <span className="text-amber-300 font-mono">ZAVI11</span>
        </div>

        {/* Right countdown timer + Free shipping notice */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 text-stone-300 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Free Shipping on Rs. 1499+</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded border border-white/10 text-stone-200 font-mono text-[11px]">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Ends Today</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
