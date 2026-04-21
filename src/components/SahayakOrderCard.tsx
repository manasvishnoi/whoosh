"use client";

import { ShoppingCart, Zap, Check, X, MapPin, Clock } from "lucide-react";
import { SHOPS, getProductsByShop } from "@/lib/data";
import { useLang } from "@/context/LanguageContext";

export type OrderDraft = {
  shopId: string;
  items: { productId: string; quantity: number }[];
};

export type OrderLine = {
  name: string;
  unit: string;
  price: number;
  mrp: number;
  quantity: number;
  subtotal: number;
};

export type ResolvedOrder = {
  shopId: string;
  shopName: string;
  shopArea: string;
  whatsapp: string;
  lines: OrderLine[];
  total: number;
  savings: number;
  missingIds: string[];
};

export function resolveOrder(draft: OrderDraft): ResolvedOrder | null {
  const shop = SHOPS.find((s) => s.id === draft.shopId);
  if (!shop) return null;
  const products = getProductsByShop(draft.shopId);
  const missingIds: string[] = [];
  const lines: OrderLine[] = [];
  for (const it of draft.items) {
    const p = products.find((x) => x.id === it.productId);
    if (!p) { missingIds.push(it.productId); continue; }
    const qty = Math.max(1, Math.floor(it.quantity || 1));
    lines.push({ name: p.name, unit: p.unit, price: p.price, mrp: p.mrp, quantity: qty, subtotal: p.price * qty });
  }
  if (lines.length === 0) return null;
  const total = lines.reduce((s, l) => s + l.subtotal, 0);
  const savings = lines.reduce((s, l) => s + (l.mrp - l.price) * l.quantity, 0);

  return {
    shopId: shop.id,
    shopName: shop.name,
    shopArea: shop.area,
    whatsapp: shop.whatsapp,
    lines,
    total,
    savings,
    missingIds,
  };
}

interface Props {
  order: ResolvedOrder;
  status: "pending" | "placed" | "cancelled";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function SahayakOrderCard({ order, status, onConfirm, onCancel }: Props) {
  const { lang } = useLang();
  const isHi = lang === "hi";

  const header = status === "placed"
    ? (isHi ? "ऑर्डर कन्फर्म हो गया!" : "Order placed!")
    : status === "cancelled"
      ? (isHi ? "ऑर्डर रद्द" : "Order cancelled")
      : (isHi ? "ऑर्डर कन्फर्म करें" : "Confirm your order");

  return (
    <div className={`mt-2 rounded-2xl border bg-white shadow-sm overflow-hidden ${
      status === "placed" ? "border-emerald-200" : status === "cancelled" ? "border-gray-200 opacity-75" : "border-orange-200"
    }`}>
      <div className={`px-4 py-2.5 flex items-center gap-2 ${
        status === "placed" ? "bg-emerald-50" : status === "cancelled" ? "bg-gray-50" : "bg-orange-50"
      }`}>
        {status === "placed" ? (
          <Check className="w-4 h-4 text-emerald-600" />
        ) : status === "cancelled" ? (
          <X className="w-4 h-4 text-gray-500" />
        ) : (
          <ShoppingCart className="w-4 h-4 text-[#FF8C42]" />
        )}
        <p className={`text-xs font-black ${
          status === "placed" ? "text-emerald-700" : status === "cancelled" ? "text-gray-500" : "text-[#E87030]"
        }`}>
          {header}
        </p>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-2.5">
          <span className="font-bold text-[#1E293B]">{order.shopName}</span>
          <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{order.shopArea}</span>
          <span className="flex items-center gap-0.5 ml-auto font-bold text-emerald-600">
            <Zap className="w-3 h-3 fill-emerald-500 text-emerald-500" />Free
          </span>
        </div>

        <div className="space-y-1.5 mb-3">
          {order.lines.map((l, i) => (
            <div key={i} className="flex items-start justify-between text-sm gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-[#1E293B] font-medium leading-tight truncate">{l.name}</p>
                <p className="text-[11px] text-[#94A3B8]">{l.unit} × {l.quantity}</p>
              </div>
              <span className="font-bold text-[#1E293B] shrink-0">₹{l.subtotal}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-2.5 space-y-1 mb-3">
          {order.savings > 0 && (
            <div className="flex justify-between text-xs">
              <span className="text-[#64748B]">{isHi ? "आप बचाएँगे" : "You save"}</span>
              <span className="font-bold text-emerald-600">₹{order.savings}</span>
            </div>
          )}
          <div className="flex justify-between text-xs">
            <span className="text-[#64748B] flex items-center gap-1"><Clock className="w-3 h-3" />{isHi ? "डिलीवरी" : "Delivery"}</span>
            <span className="font-black text-emerald-600">FREE</span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-gray-50">
            <span className="text-sm font-black text-[#1E293B]">{isHi ? "कुल" : "Total"}</span>
            <span className="text-base font-black text-[#1E293B]">₹{order.total}</span>
          </div>
        </div>

        {status === "pending" && (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-[#64748B] hover:bg-gray-50 transition-colors active:scale-95"
            >
              {isHi ? "रद्द करें" : "Cancel"}
            </button>
            <button
              onClick={onConfirm}
              className="flex-[2] py-2.5 rounded-xl bg-[#FF8C42] hover:brightness-105 text-white text-sm font-black transition-all shadow-orange active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              {isHi ? `कन्फर्म — ₹${order.total}` : `Confirm — ₹${order.total}`}
            </button>
          </div>
        )}

        {status === "placed" && (
          <p className="text-xs text-emerald-600 font-semibold text-center">
            {isHi ? "जल्द ही डिलीवर होगा 🚀" : "Will be delivered soon 🚀"}
          </p>
        )}
      </div>
    </div>
  );
}

const ORDER_RE = /<ORDER>\s*([\s\S]*?)\s*<\/ORDER>/;

export function parseOrderDirective(text: string): { clean: string; draft: OrderDraft | null } {
  const match = text.match(ORDER_RE);
  if (!match) return { clean: text, draft: null };
  const clean = text.replace(ORDER_RE, "").trim();
  try {
    const parsed = JSON.parse(match[1]) as OrderDraft;
    if (!parsed?.shopId || !Array.isArray(parsed.items) || parsed.items.length === 0) {
      return { clean, draft: null };
    }
    return { clean, draft: parsed };
  } catch {
    return { clean, draft: null };
  }
}
