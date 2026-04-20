"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart, Tag, Sparkles } from "lucide-react";
import type { Product } from "@/lib/data";
import { useLang } from "@/context/LanguageContext";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: (product: Product) => void;
  onRemove: (productId: string) => void;
}

export default function ProductCard({ product, quantity, onAdd, onRemove }: ProductCardProps) {
  const { T } = useLang();
  const [popping, setPopping] = useState(false);
  const hasDiscount = product.discount > 0;

  function handleAdd() {
    onAdd(product);
    setPopping(true);
    setTimeout(() => setPopping(false), 350);
  }

  return (
    <div
      className={`bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-col gap-2 relative group
        transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-orange-100
        ${!product.inStock ? "opacity-55" : ""}`}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        {product.isBestSeller && (
          <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
            <Sparkles className="w-2.5 h-2.5" /> {T.bestSeller}
          </span>
        )}
        {product.isNew && (
          <span className="bg-purple-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {T.new}
          </span>
        )}
        {!product.inStock && (
          <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {T.outOfStock}
          </span>
        )}
      </div>

      {/* Discount */}
      {hasDiscount && product.inStock && (
        <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10 shadow-sm">
          -{product.discount}%
        </span>
      )}

      {/* Image */}
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wide">{product.brand}</p>
        <h4 className="text-sm font-semibold text-[#0F172A] leading-tight line-clamp-2 mt-0.5">{product.name}</h4>
        <p className="text-[10px] text-[#64748B] mt-0.5">{product.unit}</p>
      </div>

      {/* Price + action */}
      <div className="flex items-end justify-between gap-1">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-[15px] font-black text-[#0F172A]">
              {product.price === 0 ? T.free : `₹${product.price}`}
            </span>
            {hasDiscount && product.mrp > product.price && (
              <span className="text-[11px] text-[#94A3B8] line-through">₹{product.mrp}</span>
            )}
          </div>
          {hasDiscount && (
            <div className="flex items-center gap-0.5">
              <Tag className="w-2.5 h-2.5 text-emerald-500" />
              <span className="text-[10px] text-emerald-600 font-semibold">{T.save} ₹{product.mrp - product.price}</span>
            </div>
          )}
        </div>

        {product.inStock ? (
          quantity === 0 ? (
            <button
              onClick={handleAdd}
              className={`flex items-center gap-1 bg-[#FF8C42] hover:brightness-105 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-90 shadow-sm shrink-0
                ${popping ? "animate-pop" : ""}`}
            >
              <Plus className="w-3 h-3" /> {T.addToCart}
            </button>
          ) : (
            <div className={`flex items-center gap-1 bg-orange-50 rounded-xl p-0.5 border border-orange-100 shrink-0 ${popping ? "animate-pop" : ""}`}>
              <button
                onClick={() => onRemove(product.id)}
                className="w-6 h-6 rounded-lg bg-[#FF8C42] text-white flex items-center justify-center hover:brightness-110 transition-all active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-5 text-center text-sm font-black text-[#0F172A]">{quantity}</span>
              <button
                onClick={handleAdd}
                className="w-6 h-6 rounded-lg bg-[#FF8C42] text-white flex items-center justify-center hover:brightness-110 transition-all active:scale-90"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )
        ) : (
          <button className="flex items-center gap-1 bg-gray-100 text-gray-400 px-3 py-1.5 rounded-xl text-xs font-medium cursor-not-allowed shrink-0">
            <ShoppingCart className="w-3 h-3" /> {T.na}
          </button>
        )}
      </div>
    </div>
  );
}
