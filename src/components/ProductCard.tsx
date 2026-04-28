"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingBag, Sparkles, Flame } from "lucide-react";
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
      className={`bg-white rounded-3xl p-3 border border-slate-100 shadow-soft flex flex-col gap-2.5 relative group
        transition-all duration-250 hover:-translate-y-1 hover:shadow-card-hover hover:border-whoosh-purple/20
        ${!product.inStock ? "opacity-55" : ""}`}
    >
      {/* Badges */}
      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
        {product.isBestSeller && (
          <span className="bg-whoosh-orange text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-orange">
            <Flame className="w-2.5 h-2.5" /> {T.bestSeller}
          </span>
        )}
        {product.isNew && (
          <span className="bg-whoosh-purple text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-purple flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" /> {T.new}
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
        <span className="absolute top-2.5 right-2.5 bg-whoosh-green text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full z-10 shadow-green">
          −{product.discount}%
        </span>
      )}

      {/* Image */}
      <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100/50 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="text-[10px] text-whoosh-muted font-bold uppercase tracking-wider">{product.brand}</p>
        <h4 className="text-sm font-bold text-whoosh-dark leading-tight line-clamp-2 mt-0.5 tracking-tight">
          {product.name}
        </h4>
        <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{product.unit}</p>
      </div>

      {/* Price + action */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-[16px] font-extrabold text-whoosh-dark tracking-tight">
              {product.price === 0 ? T.free : `₹${product.price}`}
            </span>
            {hasDiscount && product.mrp > product.price && (
              <span className="text-[11px] text-slate-400 line-through font-medium">₹{product.mrp}</span>
            )}
          </div>
          {hasDiscount && (
            <span className="text-[10px] text-whoosh-green-dark font-bold">
              {T.save} ₹{product.mrp - product.price}
            </span>
          )}
        </div>

        {product.inStock ? (
          quantity === 0 ? (
            <button
              onClick={handleAdd}
              className={`flex items-center gap-1 bg-whoosh-purple hover:brightness-110 text-white px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all active:scale-90 shadow-purple shrink-0
                ${popping ? "animate-pop" : ""}`}
            >
              <Plus className="w-3.5 h-3.5" /> ADD
            </button>
          ) : (
            <div
              className={`flex items-center gap-0.5 bg-whoosh-purple-light rounded-xl p-0.5 border border-whoosh-purple/15 shrink-0 ${
                popping ? "animate-pop" : ""
              }`}
            >
              <button
                onClick={() => onRemove(product.id)}
                className="w-7 h-7 rounded-lg bg-whoosh-purple text-white flex items-center justify-center hover:brightness-110 transition-all active:scale-90"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-extrabold text-whoosh-purple">{quantity}</span>
              <button
                onClick={handleAdd}
                className="w-7 h-7 rounded-lg bg-whoosh-purple text-white flex items-center justify-center hover:brightness-110 transition-all active:scale-90"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )
        ) : (
          <button className="flex items-center gap-1 bg-slate-100 text-slate-400 px-3 py-1.5 rounded-xl text-xs font-medium cursor-not-allowed shrink-0">
            <ShoppingBag className="w-3 h-3" /> {T.na}
          </button>
        )}
      </div>
    </div>
  );
}
