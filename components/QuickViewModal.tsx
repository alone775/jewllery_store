"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  ShoppingBag,
  MessageCircle,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  Heart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
    generateSingleProductWhatsAppUrl,
  } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const savings = product.original_price - product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
  };

  const handleWhatsApp = () => {
    const url = generateSingleProductWhatsAppUrl(product);
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-stone-200">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setQuickViewProduct(null)}
            className="absolute right-3 top-3 z-20 rounded-full bg-white/80 p-1.5 text-stone-500 hover:text-stone-900 hover:bg-white shadow-xs transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Product Image */}
            <div className="relative aspect-square sm:aspect-auto sm:h-full min-h-[280px] bg-stone-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 380px"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                <span className="bg-rose-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-md shadow-md uppercase">
                  -{product.discount_percentage}% OFF
                </span>
              </div>
            </div>

            {/* Product Details & Purchase Actions */}
            <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-amber-800">
                    {product.category}
                  </span>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                    aria-label="Wishlist toggle"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavorited ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                  </button>
                </div>

                <h3 className="font-serif-luxury text-xl sm:text-2xl font-semibold text-stone-900 mt-1 leading-snug">
                  {product.name}
                </h3>

                {/* Pricing */}
                <div className="flex items-baseline gap-2.5 mt-2">
                  <del className="text-stone-400 text-sm">
                    Rs. {product.original_price}
                  </del>
                  <span className="text-rose-600 font-extrabold text-xl tracking-tight">
                    Rs. {product.price}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Save Rs. {savings}
                  </span>
                </div>

                {/* Description */}
                <div className="mt-4 pt-3 border-t border-stone-100">
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="mt-4 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60 space-y-1.5 text-[11px] text-stone-700">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span>24K Micro Gold Plating (Anti-Tarnish)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-600">
                    <Truck className="w-3.5 h-3.5 text-stone-500" />
                    <span>Cash on Delivery across Pakistan (2-4 Days)</span>
                  </div>
                </div>
              </div>

              {/* Quantity and Action Buttons */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">Quantity</span>
                  <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-l transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold font-mono">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-r transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (Rs. {product.price * quantity})</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Order Directly on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
