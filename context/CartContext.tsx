"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price: number;
  discount_percentage: number;
  category: string;
  image: string;
  in_stock: boolean;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  promoCode: string;
  promoApplied: boolean;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  shippingFee: number;
  freeShippingThreshold: number;
  finalTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  customerDetails: CustomerDetails;
  updateCustomerDetails: (details: Partial<CustomerDetails>) => void;
  generateWhatsAppCheckoutUrl: () => string;
  generateSingleProductWhatsAppUrl: (product: Product) => string;
  checkoutOnWhatsApp: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const WHATSAPP_PHONE_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("zavi_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("zavi_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => {
    if (typeof window === "undefined") {
      return {
        name: "",
        phone: "",
        city: "Lahore",
        address: "",
        notes: "",
      };
    }
    try {
      const saved = localStorage.getItem("zavi_customer");
      return saved
        ? JSON.parse(saved)
        : {
            name: "",
            phone: "",
            city: "Lahore",
            address: "",
            notes: "",
          };
    } catch {
      return {
        name: "",
        phone: "",
        city: "Lahore",
        address: "",
        notes: "",
      };
    }
  });

  const [promoCode, setPromoCode] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem("zavi_promo") || "";
    } catch {
      return "";
    }
  });

  const [promoApplied, setPromoApplied] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("zavi_promo") === "ZAVI11";
    } catch {
      return false;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Synchronize state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("zavi_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("zavi_wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("zavi_customer", JSON.stringify(customerDetails));
    } catch {}
  }, [customerDetails]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#c59b2b", "#e11d48", "#10b981"],
      });
    } catch {}

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === "ZAVI11" || clean === "SAVE10") {
      setPromoCode(clean);
      setPromoApplied(true);
      try {
        localStorage.setItem("zavi_promo", clean);
      } catch {}
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode("");
    setPromoApplied(false);
    try {
      localStorage.removeItem("zavi_promo");
    } catch {}
  };

  const updateCustomerDetails = (details: Partial<CustomerDetails>) => {
    setCustomerDetails((prev) => ({ ...prev, ...details }));
  };

  // Calculations
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const freeShippingThreshold = 1499;
  const shippingFee =
    subtotal === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : 199;
  const finalTotal = subtotal - discount + shippingFee;

  const generateWhatsAppCheckoutUrl = (): string => {
    if (cart.length === 0) return `https://wa.me/${WHATSAPP_PHONE_NUMBER}`;

    const itemsList = cart
      .map(
        (item) =>
          `${item.quantity}x ${item.product.name} - Rs. ${
            item.product.price * item.quantity
          }`
      )
      .join("\n");

    let message = `Hello ZAVI! I would like to place an order:\n${itemsList}\n`;

    if (discount > 0) {
      message += `Subtotal: Rs. ${subtotal}\nDiscount (${promoCode}): -Rs. ${discount}\n`;
    }
    if (shippingFee > 0) {
      message += `Delivery Charges: Rs. ${shippingFee}\n`;
    } else if (subtotal > 0) {
      message += `Delivery: Free Delivery (Nationwide)\n`;
    }

    message += `Total: Rs. ${finalTotal}\n`;

    const hasDetails =
      customerDetails.name ||
      customerDetails.address ||
      customerDetails.phone;

    if (hasDetails) {
      message += `\nDelivery Details:\n`;
      if (customerDetails.name) message += `Name: ${customerDetails.name}\n`;
      if (customerDetails.phone) message += `Phone: ${customerDetails.phone}\n`;
      if (customerDetails.city) message += `City: ${customerDetails.city}\n`;
      if (customerDetails.address)
        message += `Address: ${customerDetails.address}\n`;
      if (customerDetails.notes) message += `Note: ${customerDetails.notes}\n`;
    }

    message += `Please confirm my order.`;

    return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
  };

  const generateSingleProductWhatsAppUrl = (product: Product): string => {
    const message = `Hello ZAVI! I would like to place a quick order:\n1x ${product.name} - Rs. ${product.price}\nTotal: Rs. ${product.price}\nPlease confirm my order.`;
    return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
  };

  const checkoutOnWhatsApp = () => {
    const url = generateWhatsAppCheckoutUrl();
    window.open(url, "_blank");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        promoCode,
        promoApplied,
        applyPromoCode,
        removePromoCode,
        shippingFee,
        freeShippingThreshold,
        finalTotal,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        wishlist,
        toggleWishlist,
        isInWishlist,
        customerDetails,
        updateCustomerDetails,
        generateWhatsAppCheckoutUrl,
        generateSingleProductWhatsAppUrl,
        checkoutOnWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
