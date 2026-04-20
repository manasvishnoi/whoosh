"use client";

import { ShoppingCart, X, Plus, Minus, Zap, MessageCircle, ArrowRight, Tag } from "lucide-react";
import type { Product } from "@/lib/data";
import { useLang } from "@/context/LanguageContext";
import { useToast } from "@/components/Toast";

export type CartItem = { product: Product; quantity: number };

interface CartProps {
  items: CartItem[];
  shopName: string;
  whatsapp: string;
  onAdd: (product: Product) => void;
  onRemove: (productId: string) => void;
  onClose: () => void;
}

export default function Cart({ items, shopName, whatsapp, onAdd, onRemove, onClose }: CartProps) {
  const { T } = useLang();
  const { showToast } = useToast();

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const savings = items.reduce((s, i) => s + (i.product.mrp - i.product.price) * i.quantity, 0);

  function handlePlaceOrder() {
    showToast(
      T.placeOrder + " ✅ " + (T.yourCart === "Your Cart" ? "Order confirmed!" : "ऑर्डर कन्फर्म!"),
      "success"
    );
    onClose();
  }

  if (items.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[88vh] flex flex-col animate-fade-up sm:animate-bounce-in">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="font-black text-lg text-[#0F172A] flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#FF8C42]" />
              {T.yourCart}
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">{T.from} {shopName}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors active:scale-90">
            <X className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <img src={product.image} alt={product.name}
                className="w-14 h-14 rounded-xl object-cover bg-gray-50 shrink-0 border border-gray-100" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0F172A] leading-tight line-clamp-1">{product.name}</p>
                <p className="text-[11px] text-[#64748B]">{product.unit}</p>
                <p className="text-sm font-black text-[#0F172A] mt-0.5">
                  ₹{product.price * quantity}
                  <span className="text-[11px] font-normal text-[#94A3B8] ml-1">₹{product.price} × {quantity}</span>
                </p>
              </div>
              <div className="flex items-center gap-1 bg-orange-50 rounded-xl p-0.5 border border-orange-100 shrink-0">
                <button onClick={() => onRemove(product.id)}
                  className="w-6 h-6 rounded-lg bg-[#FF8C42] text-white flex items-center justify-center hover:brightness-110 transition-all active:scale-90">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center text-sm font-black text-[#0F172A]">{quantity}</span>
                <button onClick={() => onAdd(product)}
                  className="w-6 h-6 rounded-lg bg-[#FF8C42] text-white flex items-center justify-center hover:brightness-110 transition-all active:scale-90">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary + CTA */}
        <div className="px-5 pb-5 pt-3 border-t border-gray-100 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm text-[#64748B]">
              <span>{T.subtotal} ({totalItems} {T.itemsCount})</span>
              <span className="font-semibold text-[#0F172A]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B] flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />{T.delivery}
              </span>
              <span className="font-black text-emerald-600">FREE</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[#64748B] flex items-center gap-1"><Tag className="w-3.5 h-3.5" />{T.youSave}</span>
                <span className="font-bold text-emerald-600">₹{savings}</span>
              </div>
            )}
            <div className="flex justify-between font-black text-base border-t border-gray-100 pt-2 mt-1">
              <span>{T.total}</span>
              <span className="text-[#0F172A]">₹{subtotal}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-[#FF8C42] hover:brightness-105 text-white py-3.5 rounded-2xl font-black text-base transition-all shadow-orange active:scale-98 flex items-center justify-center gap-2"
          >
            {T.placeOrder} — ₹{subtotal} <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href={`https://wa.me/${whatsapp}?text=Hello! I want to place an order for ₹${subtotal} from ${shopName} via Whoosh.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:brightness-105 text-white py-3 rounded-2xl font-bold text-sm transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" /> {T.orderViaWhatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}
