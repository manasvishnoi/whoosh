"use client";

import { ShoppingBag, X, Plus, Minus, Bike, MessageCircle, ArrowRight, Tag, Sparkles } from "lucide-react";
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
    showToast(`${T.placeOrder} ✅ ${T.orderConfirmed}`, "success");
    onClose();
  }

  if (items.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-whoosh-dark/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full sm:max-w-md rounded-t-[28px] sm:rounded-[28px] shadow-2xl max-h-[88vh] flex flex-col animate-fade-up sm:animate-bounce-in overflow-hidden">
        {/* Header */}
        <div className="relative px-5 py-4 border-b border-slate-100 bg-gradient-to-br from-whoosh-purple-light to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="icon-tile icon-tile-solid-purple w-11 h-11">
                <ShoppingBag className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-extrabold text-lg text-whoosh-dark tracking-tight">{T.yourCart}</h3>
                <p className="text-xs text-whoosh-muted mt-0.5">
                  {T.from} <span className="font-semibold text-whoosh-dark">{shopName}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/70 transition-colors active:scale-90"
            >
              <X className="w-5 h-5 text-whoosh-muted" />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 rounded-2xl object-cover bg-slate-50 shrink-0 border border-slate-100"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-whoosh-dark leading-tight line-clamp-1">{product.name}</p>
                <p className="text-[11px] text-whoosh-muted">{product.unit}</p>
                <p className="text-sm font-extrabold text-whoosh-dark mt-0.5">
                  ₹{product.price * quantity}
                  <span className="text-[11px] font-normal text-slate-400 ml-1">
                    ₹{product.price} × {quantity}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-0.5 bg-whoosh-purple-light rounded-xl p-0.5 border border-whoosh-purple/15 shrink-0">
                <button
                  onClick={() => onRemove(product.id)}
                  className="w-7 h-7 rounded-lg bg-whoosh-purple text-white flex items-center justify-center hover:brightness-110 transition-all active:scale-90"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-extrabold text-whoosh-purple">{quantity}</span>
                <button
                  onClick={() => onAdd(product)}
                  className="w-7 h-7 rounded-lg bg-whoosh-purple text-white flex items-center justify-center hover:brightness-110 transition-all active:scale-90"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary + CTA */}
        <div className="px-5 pb-5 pt-3 border-t border-slate-100 space-y-3 bg-white">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm text-whoosh-muted">
              <span>{T.subtotal} ({totalItems} {T.itemsCount})</span>
              <span className="font-bold text-whoosh-dark">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-whoosh-muted flex items-center gap-1.5">
                <Bike className="w-3.5 h-3.5 text-whoosh-green" />
                {T.delivery}
              </span>
              <span className="font-extrabold text-whoosh-green-dark">FREE</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-whoosh-muted flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-whoosh-orange" />
                  {T.youSave}
                </span>
                <span className="font-bold text-whoosh-orange-dark">₹{savings}</span>
              </div>
            )}
            <div className="flex justify-between font-extrabold text-base border-t border-slate-100 pt-2 mt-1">
              <span className="text-whoosh-dark">{T.total}</span>
              <span className="text-whoosh-dark text-lg">₹{subtotal}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="btn-primary w-full py-3.5 text-base"
          >
            <Sparkles className="w-4 h-4" />
            {T.placeOrder} — ₹{subtotal}
            <ArrowRight className="w-5 h-5" />
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
