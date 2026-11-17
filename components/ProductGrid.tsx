"use client";

import React, { useState, useMemo } from "react";
import { Product, useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { ArrowUpDown, Sparkles, X, Heart } from "lucide-react";

type SortOption = "featured" | "price-asc" | "price-desc" | "discount";

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
  searchQuery?: string;
  onClearSearch?: () => void;
  onSelectCategory?: (catId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  searchQuery = "",
  onClearSearch,
  onSelectCategory,
}) => {
  const { wishlist } = useCart();
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Search Query first if present
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Filter by Category or Wishlist
    if (activeCategory === "299-sale") {
      list = list.filter(
        (p) => p.category === "299 Sale" || p.price <= 299
      );
    } else if (activeCategory === "wishlist") {
      list = list.filter((p) => wishlist.includes(p.id));
    } else if (activeCategory !== "all") {
      const catClean = activeCategory.replace("-", " ").toLowerCase();
      list = list.filter(
        (p) =>
          p.category.toLowerCase().includes(catClean) ||
          p.name.toLowerCase().includes(catClean) ||
          p.description.toLowerCase().includes(catClean)
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "discount") {
      list.sort((a, b) => b.discount_percentage - a.discount_percentage);
    }

    return list;
  }, [products, activeCategory, searchQuery, sortBy, wishlist]);

  const getSectionTitle = () => {
    if (searchQuery.trim()) {
      return `Search: "${searchQuery}"`;
    }
    if (activeCategory === "wishlist") {
      return "My Wishlist Items ❤️";
    }
    if (activeCategory === "all") {
      return "Trending Collection";
    }
    if (activeCategory === "299-sale") {
      return "299 Clearance Sale 🔥";
    }
    return `${activeCategory.replace("-", " ")} Collection`;
  };

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Search notification banner if search is active */}
      {searchQuery.trim() && (
        <div className="mb-4 bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-stone-800">
            Showing results matching &ldquo;<strong>{searchQuery}</strong>&rdquo;
          </span>
          {onClearSearch && (
            <button
              onClick={onClearSearch}
              className="text-xs font-bold text-amber-900 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Header controls: category title, items count & sort dropdown */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight capitalize">
              {getSectionTitle()}
            </h2>
            {activeCategory === "299-sale" && !searchQuery && (
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                Crazy Deals
              </span>
            )}
            {activeCategory === "wishlist" && (
              <span className="bg-rose-50 text-rose-600 text-xs font-bold px-2 py-0.5 rounded-full">
                Saved Items
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Showing {filteredProducts.length} items with instant WhatsApp checkout
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label
            htmlFor="sort-select"
            className="text-xs font-semibold text-stone-600 flex items-center gap-1"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sort by:</span>
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-xs sm:text-sm bg-white border border-stone-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-stone-800 cursor-pointer"
          >
            <option value="featured">Featured / Best Deals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      {/* Product Grid: 2-column grid on mobile, 4-column on desktop */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 p-8">
          {activeCategory === "wishlist" ? (
            <>
              <Heart className="w-10 h-10 text-rose-400 mx-auto mb-3" />
              <h3 className="font-serif-luxury text-xl font-semibold text-stone-800">
                Your Wishlist is Empty
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Tap the heart icon on any jewelry card to save your favorites here!
              </p>
              {onSelectCategory && (
                <button
                  onClick={() => onSelectCategory("all")}
                  className="mt-4 bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-stone-800 transition-colors"
                >
                  Browse All Jewellery
                </button>
              )}
            </>
          ) : (
            <>
              <Sparkles className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h3 className="font-serif-luxury text-xl font-semibold text-stone-800">
                No products found
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Try searching for something else or browse our popular 299 Sale!
              </p>
              {onClearSearch && searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="mt-4 bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-stone-800 transition-colors"
                >
                  Clear Search & View All
                </button>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
};
