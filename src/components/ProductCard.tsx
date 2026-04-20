"use client";

import { Plus, Minus, ShoppingCart, Tag } from "lucide-react";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: (product: Product) => void;
  onRemove: (productId: string) => void;
}

export default function ProductCard({ product, quantity, onAdd, onRemove }: ProductCardProps) {
  const hasDiscount = product.discount > 0;

  return (
    <div className={`bg-white rounded-2xl p-3 shadow-card flex flex-col gap-2 relative ${!product.inStock ? "opacity-60" : ""}`}>
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        {product.isBestSeller && (
          <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Best Seller
          </span>
        )}
        {product.isNew && (
          <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            New
          </span>
        )}
        {!product.inStock && (
          <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
            Out of Stock
          </span>
        )}
      </div>

      {/* Discount badge */}
      {hasDiscount && product.inStock && (
        <div className="absolute top-2 right-2 bg-whoosh-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10">
          {product.discount}% off
        </div>
      )}

      {/* Image */}
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-h-0">
        <p className="text-[11px] text-whoosh-muted font-medium mb-0.5">{product.brand}</p>
        <h4 className="text-sm font-semibold text-whoosh-dark leading-tight line-clamp-2 mb-0.5">
          {product.name}
        </h4>
        <p className="text-[11px] text-whoosh-muted hindi">{product.hindiName}</p>
        <p className="text-[11px] text-whoosh-muted mt-0.5">{product.unit}</p>
      </div>

      {/* Price */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-whoosh-dark">
              {product.price === 0 ? "Free" : `₹${product.price}`}
            </span>
            {hasDiscount && product.mrp > product.price && (
              <span className="text-xs text-whoosh-muted line-through">₹{product.mrp}</span>
            )}
          </div>
          {hasDiscount && (
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3 text-whoosh-green" />
              <span className="text-[11px] text-whoosh-green font-medium">
                Save ₹{product.mrp - product.price}
              </span>
            </div>
          )}
        </div>

        {/* Add/Remove */}
        {product.inStock ? (
          quantity === 0 ? (
            <button
              onClick={() => onAdd(product)}
              className="flex items-center gap-1 bg-whoosh-orange hover:bg-orange-500 text-white px-3 py-1.5 rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-sm hover:shadow-orange shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-orange-50 rounded-xl p-1 shrink-0">
              <button
                onClick={() => onRemove(product.id)}
                className="w-6 h-6 rounded-lg bg-whoosh-orange text-white flex items-center justify-center hover:bg-orange-500 transition-colors active:scale-95"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center text-sm font-bold text-whoosh-dark">
                {quantity}
              </span>
              <button
                onClick={() => onAdd(product)}
                className="w-6 h-6 rounded-lg bg-whoosh-orange text-white flex items-center justify-center hover:bg-orange-500 transition-colors active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )
        ) : (
          <button className="flex items-center gap-1 bg-gray-100 text-gray-400 px-3 py-1.5 rounded-xl text-sm font-medium cursor-not-allowed shrink-0">
            <ShoppingCart className="w-3.5 h-3.5" />
            N/A
          </button>
        )}
      </div>
    </div>
  );
}
