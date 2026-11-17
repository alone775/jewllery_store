"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Eye,
  Check,
  Flame,
} from "lucide-react";
import { Product, useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    generateSingleProductWhatsAppUrl,
  } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const savings = product.original_price - product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleQuickWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateSingleProductWhatsAppUrl(product);
    window.open(url, "_blank");
  };

  const isSuperSale =
    product.category === "299 Sale" || product.discount_percentage >= 35;

  return (
    <article
      onClick={() => setQuickViewProduct(product)}
      className="group relative bg-white rounded-xl sm:rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image & Overlays */}
      <div className="relative aspect-square sm:aspect-[4/5] w-full overflow-hidden bg-stone-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Absolute Top-Left Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10">
          <span
            className={`text-[10px] sm:text-xs font-extrabold uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-md text-white ${
              isSuperSale
                ? "bg-rose-600 shimmer-badge font-bold"
                : "bg-stone-900"
            }`}
          >
            -{product.discount_percentage}% OFF
          </span>

          {product.category === "299 Sale" && (
            <span className="bg-amber-500 text-stone-950 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm inline-flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5 fill-current text-rose-700" />
              Rs. 299
            </span>
          )}
        </div>

        {/* Absolute Top-Right Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-rose-600 transition-colors shadow-sm hover:scale-110 active:scale-95"
          aria-label={
            isFavorited ? "Remove from wishlist" : "Add to wishlist"
          }
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorited ? "fill-rose-500 text-rose-500" : ""
            }`}
          />
        </button>

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-x-2 bottom-2 z-10 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full bg-white/95 backdrop-blur-md text-stone-800 text-xs font-bold py-2 rounded-lg shadow-md flex items-center justify-center gap-1.5 hover:bg-stone-900 hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Details & Conversion Controls */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category Tag */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-stone-400">
              {product.category}
            </span>
            <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              In Stock
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-medium text-xs sm:text-sm text-stone-900 line-clamp-2 leading-snug group-hover:text-amber-800 transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="mt-2.5 pt-2 border-t border-stone-100 space-y-2">
          {/* Psychological Pricing Display: <del>Rs. 999</del> <span class="text-red-600 font-bold">Rs. 699</span> */}
          <div className="flex items-baseline flex-wrap gap-x-2 gap-y-0.5">
            <del className="text-stone-400 text-xs sm:text-sm">
              Rs. {product.original_price}
            </del>
            <span className="text-rose-600 font-extrabold text-sm sm:text-base tracking-tight">
              Rs. {product.price}
            </span>
            {savings > 0 && (
              <span className="hidden sm:inline text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">
                Save Rs. {savings}
              </span>
            )}
          </div>

          {/* Action Buttons: Add to Cart + WhatsApp Quick Buy */}
          <div className="flex items-center gap-1.5 pt-1">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 py-2 sm:py-2.5 px-2 rounded-lg font-bold text-xs sm:text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs ${
                isAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-stone-900 hover:bg-stone-800 text-white"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white animate-bounce" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            {/* Quick 1-click WhatsApp Buy */}
            <button
              type="button"
              onClick={handleQuickWhatsApp}
              title="Instant WhatsApp Order"
              className="p-2 sm:py-2.5 sm:px-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors border border-emerald-200 shadow-xs"
              aria-label="Order this item directly on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
