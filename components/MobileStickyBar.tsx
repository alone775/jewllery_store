"use client";

import React from "react";
import { MessageCircle, ShoppingBag, Flame } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const MobileStickyBar: React.FC = () => {
  const { totalItems, finalTotal, setIsCartOpen, cart, checkoutOnWhatsApp } =
    useCart();
  const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";

  const handleWhatsAppAction = () => {
    if (cart.length > 0) {
      checkoutOnWhatsApp();
    } else {
      const msg = encodeURIComponent(
        "Hello ZAVI! I want to explore your jewellery collection and place an order."
      );
      window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, "_blank");
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-t border-stone-200/90 shadow-2xl py-2 px-3 sm:hidden transition-all">
      <div className="flex items-center gap-2">
        {/* Quick 299 sale trigger */}
        <button
          onClick={() => scrollToSection("catalog")}
          className="flex flex-col items-center justify-center p-1.5 text-rose-600 rounded-lg hover:bg-stone-100 shrink-0"
        >
          <Flame className="w-5 h-5 fill-current" />
          <span className="text-[9px] font-bold mt-0.5">299 Sale</span>
        </button>

        {/* Cart Drawer Trigger */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center p-1.5 text-stone-700 rounded-lg hover:bg-stone-100 shrink-0"
          aria-label="Open cart"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-0.5">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-0.5 right-0.5 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

        {/* Primary High-Converting WhatsApp Order Button */}
        <button
          type="button"
          onClick={handleWhatsAppAction}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-2.5 px-3 rounded-full flex items-center justify-center gap-2 shadow-md shadow-emerald-700/30 text-xs cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <MessageCircle className="w-4 h-4 fill-white shrink-0" />
          <span className="truncate">
            {cart.length > 0
              ? `Checkout (Rs. ${finalTotal})`
              : "Order on WhatsApp"}
          </span>
        </button>
      </div>
    </div>
  );
};
