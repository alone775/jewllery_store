"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Truck,
  Sparkles,
  ShieldCheck,
  Tag,
  ChevronDown,
  ChevronUp,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    promoCode,
    promoApplied,
    applyPromoCode,
    removePromoCode,
    shippingFee,
    freeShippingThreshold,
    finalTotal,
    totalItems,
    customerDetails,
    updateCustomerDetails,
    generateWhatsAppCheckoutUrl,
    checkoutOnWhatsApp,
  } = useCart();

  const [inputPromo, setInputPromo] = useState("");
  const [promoError, setPromoError] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showMessagePreview, setShowMessagePreview] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingDifference = freeShippingThreshold - subtotal;
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const success = applyPromoCode(inputPromo);
    if (!success) {
      setPromoError("Invalid code. Try ZAVI11 for 10% OFF!");
    } else {
      setInputPromo("");
    }
  };

  const generatedWhatsAppUrl = generateWhatsAppCheckoutUrl();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#faf8f5] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200/80 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-xl font-bold text-stone-900 tracking-wide">
                Your Shopping Cart
              </span>
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] text-stone-400 hover:text-rose-600 transition-colors ml-2 underline"
                >
                  Clear All
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-amber-50 px-4 py-3 border-b border-amber-200/60">
            {freeShippingDifference > 0 ? (
              <div>
                <p className="text-xs text-stone-700 flex items-center gap-1.5 font-medium">
                  <Truck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    Add{" "}
                    <strong className="text-amber-900 font-bold">
                      Rs. {freeShippingDifference}
                    </strong>{" "}
                    more for <span className="text-emerald-700 font-bold">FREE DELIVERY!</span>
                  </span>
                </p>
                <div className="w-full bg-amber-200/70 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-emerald-800 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                🎉 Congratulations! You have unlocked FREE Nationwide Delivery!
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                  <Truck className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-lg font-bold text-stone-800">
                  Your cart is empty
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Looks like you haven&apos;t added anything yet. Check out our viral 299 sale!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 inline-flex items-center gap-2 bg-stone-900 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-stone-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2.5">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white p-3 rounded-xl border border-stone-200/70 shadow-xs flex gap-3 items-center"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info & Quantity controls */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-rose-600 font-extrabold text-xs">
                            Rs. {item.product.price}
                          </span>
                          <del className="text-stone-400 text-[10px]">
                            Rs. {item.product.original_price}
                          </del>
                        </div>

                        {/* Quantity Increment/Decrement */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-l transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-stone-900 font-mono">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-r transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold text-stone-900">
                              Rs. {item.product.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors ml-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="bg-white p-3 rounded-xl border border-stone-200/70 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-600" />
                      Discount Promo Code
                    </span>
                    <span className="text-[11px] text-stone-400 font-normal">
                      Try: <code className="text-amber-800 font-bold">ZAVI11</code>
                    </span>
                  </div>

                  {promoApplied ? (
                    <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 p-2 rounded-lg text-xs font-semibold border border-emerald-200">
                      <span>✓ Code applied: {promoCode} (10% OFF)</span>
                      <button
                        onClick={removePromoCode}
                        className="text-stone-500 hover:text-rose-600 text-[11px] underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={inputPromo}
                        onChange={(e) => setInputPromo(e.target.value)}
                        placeholder="Enter Promo (e.g. ZAVI11)"
                        className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-800 uppercase focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        type="submit"
                        className="bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-stone-800 transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-rose-600 font-medium">
                      {promoError}
                    </p>
                  )}
                </div>

                {/* Optional Customer Delivery Details for WhatsApp Message */}
                <div className="bg-white rounded-xl border border-stone-200/70 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="w-full p-3 flex items-center justify-between text-xs font-bold text-stone-800 hover:bg-stone-50 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      Add Delivery Details (Optional for WhatsApp)
                    </span>
                    {showAddressForm ? (
                      <ChevronUp className="w-4 h-4 text-stone-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-500" />
                    )}
                  </button>

                  {showAddressForm && (
                    <div className="p-3 pt-0 border-t border-stone-100 space-y-2 text-xs">
                      <p className="text-[11px] text-stone-500 pb-1">
                        Pre-fills your address in the WhatsApp message so our team can dispatch right away!
                      </p>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-600 uppercase">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={customerDetails.name}
                          onChange={(e) =>
                            updateCustomerDetails({ name: e.target.value })
                          }
                          placeholder="e.g. Fatima Ali"
                          className="w-full mt-0.5 bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 uppercase">
                            Phone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            value={customerDetails.phone}
                            onChange={(e) =>
                              updateCustomerDetails({ phone: e.target.value })
                            }
                            placeholder="0300-1234567"
                            className="w-full mt-0.5 bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 uppercase">
                            City
                          </label>
                          <input
                            type="text"
                            value={customerDetails.city}
                            onChange={(e) =>
                              updateCustomerDetails({ city: e.target.value })
                            }
                            placeholder="Lahore / Karachi"
                            className="w-full mt-0.5 bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-600 uppercase">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          value={customerDetails.address}
                          onChange={(e) =>
                            updateCustomerDetails({ address: e.target.value })
                          }
                          placeholder="House / Street / Area"
                          className="w-full mt-0.5 bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* WhatsApp Message Preview Toggle */}
                <div className="bg-stone-100 p-2.5 rounded-lg border border-stone-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setShowMessagePreview(!showMessagePreview)}
                    className="w-full flex items-center justify-between font-semibold text-stone-700"
                  >
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      View WhatsApp Message Preview
                    </span>
                    {showMessagePreview ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {showMessagePreview && (
                    <div className="mt-2 p-2 bg-emerald-50/80 rounded border border-emerald-200/80 font-mono text-[11px] text-emerald-950 whitespace-pre-wrap leading-relaxed">
                      {decodeURIComponent(
                        generatedWhatsAppUrl.split("text=")[1] || ""
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer & Primary WhatsApp Checkout Button */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-white space-y-3 shadow-lg">
              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-stone-900 font-mono">
                    Rs. {subtotal}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount (ZAVI11):</span>
                    <span className="font-mono">-Rs. {discount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Nationwide Delivery:</span>
                  <span className="font-semibold font-mono">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `Rs. ${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-stone-900">Total Payable:</span>
                  <div className="text-right">
                    <span className="font-extrabold text-base sm:text-lg text-rose-600 font-mono">
                      Rs. {finalTotal}
                    </span>
                    <p className="text-[10px] text-stone-400 font-normal">
                      Cash on Delivery (COD)
                    </p>
                  </div>
                </div>
              </div>

              {/* High-Converting Green WhatsApp Checkout Button */}
              <button
                type="button"
                onClick={checkoutOnWhatsApp}
                className="w-full relative group bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-700/30 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
                <MessageCircle className="w-5 h-5 fill-white" />
                <span className="text-sm sm:text-base tracking-wide">
                  Checkout on WhatsApp • Rs. {finalTotal}
                </span>
                <ExternalLink className="w-4 h-4 ml-0.5 opacity-80" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-stone-500 font-medium pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  100% Genuine Quality
                </span>
                <span>•</span>
                <span>Cash on Delivery</span>
                <span>•</span>
                <span>Fast Dispatch</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
