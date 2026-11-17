"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";

  return (
    <footer className="bg-stone-950 text-stone-300 pt-12 pb-24 sm:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-serif-luxury text-3xl tracking-[0.25em] font-bold text-stone-100">
                ZAVI
              </span>
              <span className="block text-[9px] uppercase tracking-[0.35em] text-amber-400 font-bold -mt-0.5">
                Affordable Luxury
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed">
              ZAVI is Pakistan&apos;s premier destination for exquisite yet affordable
              jewelry. Premium 24K gold-plated sets, traditional jhumkas, and daily
              wear with seamless WhatsApp ordering.
            </p>
            <div className="pt-1">
              <a
                href={`https://wa.me/${WHATSAPP_NUM}?text=Hello%20ZAVI!`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-full transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: 0300-1234567</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100">
              Quick Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a
                  href="#catalog"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-rose-500 font-bold">🔥 299 Clearance Sale</span>
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-amber-300 transition-colors">
                  Traditional Jhumkay
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-amber-300 transition-colors">
                  Zircon & Pearl Necklaces
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-amber-300 transition-colors">
                  Solitaire & Adjustable Rings
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-amber-300 transition-colors">
                  Tennis Bracelets & Bangles
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100">
              Shopping Policy
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <span>🚚 Delivery: 2-4 Days Nationwide</span>
              </li>
              <li className="flex items-center gap-2">
                <span>💵 Payment: Cash on Delivery (COD)</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🔄 Easy 7-Day Exchange Policy</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📸 100% Same as Picture Guarantee</span>
              </li>
              <li className="flex items-center gap-2">
                <span>💬 Instant WhatsApp Order Dispatch</span>
              </li>
            </ul>
          </div>

          {/* Payment & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100">
              Get in Touch
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Gulberg III, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+92 (300) 1234567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>care@zavi.pk</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="block text-[10px] uppercase font-bold text-stone-500 mb-1.5">
                Supported Payment Methods
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-stone-300">
                <span className="bg-stone-900 border border-stone-800 px-2 py-1 rounded">
                  💵 Cash On Delivery
                </span>
                <span className="bg-stone-900 border border-stone-800 px-2 py-1 rounded">
                  JazzCash
                </span>
                <span className="bg-stone-900 border border-stone-800 px-2 py-1 rounded">
                  EasyPaisa
                </span>
                <span className="bg-stone-900 border border-stone-800 px-2 py-1 rounded">
                  Bank Transfer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-900 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 ZAVI Jewellery Pakistan. All Rights Reserved.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Designed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for Pakistani Fashion
          </p>
        </div>
      </div>
    </footer>
  );
};
