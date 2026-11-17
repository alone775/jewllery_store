"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShoppingBag,
  Heart,
  Search,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const { totalItems, setIsCartOpen, wishlist, cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";

  const handleWhatsAppClick = () => {
    if (cart.length > 0) {
      setIsCartOpen(true);
    } else {
      const msg = encodeURIComponent(
        "Hello ZAVI! I have a question about your jewellery collection."
      );
      window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, "_blank");
    }
  };

  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId);
    setMobileMenuOpen(false);
    const target = document.getElementById("catalog");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWishlistClick = () => {
    onSelectCategory("wishlist");
    const target = document.getElementById("catalog");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "all", label: "All Jewellery" },
    { id: "299-sale", label: "299 Sale", isHot: true },
    { id: "jhumkay", label: "Jhumkay" },
    { id: "necklaces", label: "Necklaces" },
    { id: "rings", label: "Rings" },
    { id: "bracelets", label: "Bracelets" },
  ];

  return (
    <>
      <header className="bg-[#faf8f5]/98 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Main Header Bar: 3-Column Layout to Prevent Any Overlaps */}
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Mobile Hamburger & Desktop Search */}
            <div className="flex items-center gap-3 flex-1 justify-start">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-stone-700 hover:text-stone-900 rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Mobile quick search toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-stone-600 hover:text-stone-900 lg:hidden rounded-lg"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Desktop Search Bar */}
              <div className="hidden lg:block relative w-64">
                <input
                  type="text"
                  placeholder="Search rings, necklaces..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-7 py-1.5 text-xs rounded-full border border-stone-300 bg-white/90 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all placeholder:text-stone-400"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-700 text-xs font-bold"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Center: Brand Logo (ZAVI) with Guaranteed Dedicated Spacing */}
            <div className="shrink-0 text-center px-4">
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory("all");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-block group focus:outline-none"
              >
                <span className="block font-serif-luxury text-2xl sm:text-3xl lg:text-4xl tracking-[0.22em] font-semibold text-stone-900 group-hover:text-amber-900 transition-colors">
                  ZAVI
                </span>
                <span className="block text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-amber-700 font-bold -mt-0.5">
                  Affordable Luxury
                </span>
              </Link>
            </div>

            {/* Right: WhatsApp CTA Button + Wishlist + Cart */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
              {/* Highly Visible Order via WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                className="relative group inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full shadow-sm shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer"
                aria-label="Order via WhatsApp"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <MessageCircle className="w-4 h-4 fill-white" />
                <span className="hidden sm:inline">Order via WhatsApp</span>
                <span className="sm:hidden text-[11px]">WhatsApp</span>
              </button>

              {/* Wishlist Button with Indicator */}
              <button
                type="button"
                onClick={handleWishlistClick}
                className={`relative p-2 rounded-full transition-colors hidden sm:block ${
                  activeCategory === "wishlist"
                    ? "text-rose-600 bg-rose-50"
                    : "text-stone-700 hover:text-rose-600 hover:bg-stone-100"
                }`}
                aria-label="View Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlist.length > 0 || activeCategory === "wishlist"
                      ? "fill-rose-500 text-rose-500"
                      : ""
                  }`}
                />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Icon with Dynamic Count Badge */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-stone-800 hover:text-amber-800 transition-colors rounded-full hover:bg-stone-100 focus:outline-none cursor-pointer"
                aria-label={`View cart with ${totalItems} items`}
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-4.5 h-4.5 px-1 bg-amber-600 text-white text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Sub-Navigation Bar: Clean, Centered, No Overlaps */}
          <nav className="hidden lg:flex items-center justify-center gap-8 py-2.5 border-t border-stone-200/60 text-xs uppercase tracking-widest font-semibold text-stone-700">
            {navLinks.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className={`relative py-1 transition-colors flex items-center gap-1.5 cursor-pointer ${
                    item.isHot
                      ? isActive
                        ? "text-rose-600 font-extrabold"
                        : "text-rose-600 font-bold hover:text-rose-700"
                      : isActive
                      ? "text-amber-900 font-bold"
                      : "hover:text-amber-800"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.isHot && (
                    <span className="bg-rose-100 text-rose-700 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
                      HOT
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-amber-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Search Dropdown Bar */}
          {searchOpen && (
            <div className="pb-3 pt-1 border-t border-stone-200 lg:hidden">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search rings, necklaces, jhumkay..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-8 py-2 rounded-full border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  autoFocus
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="absolute right-3.5 top-2.5 text-stone-400 hover:text-stone-700 text-xs font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#faf8f5] shadow-2xl flex flex-col z-10 transform transition-transform">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-white">
              <div>
                <span className="font-serif-luxury text-2xl tracking-[0.2em] font-bold text-stone-900">
                  ZAVI
                </span>
                <span className="block text-[8px] uppercase tracking-widest text-amber-700 font-bold">
                  Affordable Luxury
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-100"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-1 overflow-y-auto flex-1">
              <div className="mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3">
                  Categories
                </span>
              </div>

              {navLinks.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left ${
                      cat.isHot
                        ? isActive
                          ? "bg-rose-100 text-rose-800 font-bold"
                          : "text-rose-600 bg-rose-50/70 hover:bg-rose-100/70 font-bold"
                        : isActive
                        ? "bg-amber-100 text-amber-900 font-bold"
                        : "text-stone-800 hover:bg-amber-50 hover:text-amber-900"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {cat.id === "all" && <Sparkles className="w-4 h-4 text-amber-600" />}
                      <span>{cat.label}</span>
                      {cat.isHot && (
                        <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                          HOT
                        </span>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>
                );
              })}

              {/* Wishlist Link in Mobile Drawer */}
              <button
                onClick={() => {
                  handleWishlistClick();
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left ${
                  activeCategory === "wishlist"
                    ? "bg-rose-100 text-rose-800 font-bold"
                    : "text-stone-800 hover:bg-rose-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Heart
                    className={`w-4 h-4 ${
                      wishlist.length > 0 ? "fill-rose-500 text-rose-500" : "text-stone-500"
                    }`}
                  />
                  <span>My Wishlist ({wishlist.length})</span>
                </span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>

              <div className="pt-6 border-t border-stone-200 mt-4 space-y-3">
                <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200/60">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    ZAVI 100% Quality Promise
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    Same as picture guarantee. Anti-tarnish polish. Cash on
                    Delivery all across Pakistan.
                  </p>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUM}?text=Hello%20ZAVI!%20I%20need%20assistance.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-lg text-xs shadow-sm hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  Chat on WhatsApp Hotline
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
