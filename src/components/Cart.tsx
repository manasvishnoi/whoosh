"use client";

import { ShoppingCart, X, Plus, Minus, Zap, MessageCircle, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/data";

export type CartItem = {
  product: Product;
  quantity: number;
};

interface CartProps {
  items: CartItem[];
  shopName: string;
  onAdd: (product: Product) => void;
  onRemove: (productId: string) => void;
  onClose: () => void;
}

export default function Cart({ items, shopName, onAdd, onRemove, onClose }: CartProps) {
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const savings = items.reduce((s, i) => s + (i.product.mrp - i.product.price) * i.quantity, 0);

  if (items.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="font-bold text-lg text-whoosh-dark flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-whoosh-orange" />
              Your Cart
            </h3>
            <p className="text-xs text-whoosh-muted mt-0.5">from {shopName}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-whoosh-muted" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center gap-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 rounded-xl object-cover bg-gray-50 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-whoosh-dark leading-tight line-clamp-1">
                  {product.name}
                </p>
                <p className="text-xs text-whoosh-muted">{product.unit}</p>
                <p className="text-sm font-bold text-whoosh-dark mt-0.5">
                  ₹{product.price * quantity}
                  <span className="text-xs font-normal text-whoosh-muted ml-1">
                    ₹{product.price} × {quantity}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-orange-50 rounded-xl p-1 shrink-0">
                <button
                  onClick={() => onRemove(product.id)}
                  className="w-6 h-6 rounded-lg bg-whoosh-orange text-white flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-5 text-center text-sm font-bold text-whoosh-dark">{quantity}</span>
                <button
                  onClick={() => onAdd(product)}
                  className="w-6 h-6 rounded-lg bg-whoosh-orange text-white flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="p-5 border-t border-gray-100 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-whoosh-muted">Subtotal ({totalItems} items)</span>
              <span className="font-semibold text-whoosh-dark">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-whoosh-muted flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-whoosh-green fill-whoosh-green" />
                Delivery
              </span>
              <span className="font-bold text-whoosh-green">FREE</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-whoosh-muted">You save</span>
                <span className="font-semibold text-whoosh-green">₹{savings}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold border-t border-gray-100 pt-2">
              <span>Total</span>
              <span className="text-whoosh-dark">₹{subtotal}</span>
            </div>
          </div>

          {/* Place order */}
          <button className="w-full bg-whoosh-orange hover:bg-orange-500 text-white py-3.5 rounded-2xl font-bold text-base transition-all shadow-orange hover:shadow-orange flex items-center justify-center gap-2">
            Place Order — ₹{subtotal}
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* WhatsApp order */}
          <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold text-sm transition-all">
            <MessageCircle className="w-4 h-4" />
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
