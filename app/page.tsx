"use client";

import React, { useState } from "react";
import { products } from "@/data/products";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TrustBar } from "@/components/TrustBar";
import { CategoryPills } from "@/components/CategoryPills";
import { ProductGrid } from "@/components/ProductGrid";
import { CustomerReviews } from "@/components/CustomerReviews";
import { JewelryCareGuide } from "@/components/JewelryCareGuide";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { MobileStickyBar } from "@/components/MobileStickyBar";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    setSearchQuery(""); // Clear search filter when picking a category
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#faf8f5]">
      {/* 1 & 2. Unified Sticky Header (Announcement Bar + Brand Navbar) */}
      <div className="sticky top-0 z-40 shadow-xs">
        <AnnouncementBar onSaleClick={() => handleSelectCategory("299-sale")} />
        <Header
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* 3. Hero Section (Lifestyle Banner + Strong CTA: "Shop the 299 Sale") */}
      <HeroSection onSelectCategory={handleSelectCategory} />

      {/* 4. Trust Badges (COD, Nationwide Delivery, 100% Same as Picture) */}
      <TrustBar />

      {/* 5. Category Pills / Slider (Horizontally Scrollable) */}
      <CategoryPills
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 6. Product Grid (2-col mobile, 4-col desktop, Badges, Psychological Pricing) */}
      <ProductGrid
        products={products}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onClearSearch={handleClearSearch}
        onSelectCategory={handleSelectCategory}
      />

      {/* 7. Social Proof & Customer Reviews */}
      <CustomerReviews />

      {/* 8. Jewelry Care Instructions Guide */}
      <JewelryCareGuide />

      {/* 9. Brand Footer */}
      <Footer />

      {/* 10. Slide-Over Cart Drawer & WhatsApp Checkout Redirection */}
      <CartDrawer />

      {/* 11. Product Quick View Modal */}
      <QuickViewModal />

      {/* 12. Sticky Mobile Bottom Navigation & WhatsApp Checkout Bar */}
      <MobileStickyBar />
    </main>
  );
}
