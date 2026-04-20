"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star, Clock, MapPin, Zap, MessageCircle, Share2, Heart,
  ChevronLeft, ShoppingCart, Search, X, Package, Info,
  CheckCircle2, Bot, Phone,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Cart, { CartItem } from "@/components/Cart";
import { getShopById, getProductsByShop, getProductCategories } from "@/lib/data";
import type { Product } from "@/lib/data";
import { useLang } from "@/context/LanguageContext";
import { useToast } from "@/components/Toast";

export default function ShopPage() {
  const { id } = useParams<{ id: string }>();
  const shop = getShopById(id);
  const products = getProductsByShop(id);
  const categories = getProductCategories(id);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0] || "");
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState(false);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { T } = useLang();
  const { showToast } = useToast();

  const cartTotal = cart.reduce((s, i) => s + i.quantity, 0);
  const cartValue = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      showToast(`${product.name} added!`, "cart");
      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === productId);
      if (!existing) return prev;
      if (existing.quantity === 1) return prev.filter((i) => i.product.id !== productId);
      return prev.map((i) => i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i);
    });
  }

  function getQuantity(productId: string) {
    return cart.find((i) => i.product.id === productId)?.quantity ?? 0;
  }

  function scrollToCategory(cat: string) {
    setActiveCategory(cat);
    const el = categoryRefs.current[cat];
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.getAttribute("data-category") || "");
          }
        });
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );
    Object.values(categoryRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredProducts = search.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.hindiName.includes(search) || p.brand.toLowerCase().includes(search.toLowerCase()))
    : products;

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold text-whoosh-dark mb-4">Shop not found</p>
          <Link href="/shops" className="text-whoosh-orange font-semibold hover:underline">← Back to shops</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="shop" cartCount={cartTotal} />

      {/* Shop Header Banner */}
      <div className="relative">
        <div className="h-52 bg-gray-200 overflow-hidden">
          <img src={shop.banner} alt={shop.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Back & actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link href="/shops" className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors">
            <ChevronLeft className="w-5 h-5 text-whoosh-dark" />
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => { setLiked(!liked); showToast(liked ? "Removed from favourites" : "Added to favourites ❤️", liked ? "info" : "success"); }}
              className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all active:scale-90"
            >
              <Heart className={`w-4 h-4 transition-colors ${liked ? "text-red-500 fill-red-500" : "text-[#1E293B]"}`} />
            </button>
            <button
              onClick={() => { if (navigator.share) { navigator.share({ title: shop.name, url: window.location.href }); } else { navigator.clipboard.writeText(window.location.href); showToast("Link copied!", "success"); } }}
              className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all active:scale-90"
            >
              <Share2 className="w-4 h-4 text-[#1E293B]" />
            </button>
          </div>
        </div>

        {/* Shop logo & name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="flex items-end gap-3">
            <img
              src={shop.logo}
              alt={shop.name}
              className="w-16 h-16 rounded-2xl border-3 border-white shadow-lg object-cover bg-white shrink-0"
            />
            <div>
              <h1 className="text-xl font-black text-white leading-tight">{shop.name}</h1>
              <p className="text-white/80 text-xs hindi">{shop.hindiName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Info Bar */}
      <div className="bg-white px-4 py-4 border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto">
          {/* Rating + details row */}
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-xl">
              <Star className="w-4 h-4 text-green-600 fill-green-600" />
              <span className="font-bold text-green-700 text-sm">{shop.rating}</span>
              <span className="text-xs text-green-600">({shop.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-whoosh-muted">
              <Clock className="w-4 h-4" />
              <span>{shop.eta}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-whoosh-muted">
              <MapPin className="w-4 h-4" />
              <span>{shop.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-whoosh-green fill-whoosh-green" />
              <span className="text-sm font-bold text-whoosh-green">Free Delivery</span>
            </div>
            <div className={`ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${shop.isOpen ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${shop.isOpen ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
              {shop.isOpen ? `Open · Closes ${shop.closeTime}` : `Closed · Opens ${shop.openTime}`}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-whoosh-muted mb-3">{shop.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {shop.features.map((f) => (
              <span key={f} className="flex items-center gap-1 text-xs font-medium bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full border border-orange-100">
                <CheckCircle2 className="w-3 h-3" /> {f}
              </span>
            ))}
            <a
              href={`https://wa.me/${shop.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100 hover:bg-green-100 transition-colors"
            >
              <MessageCircle className="w-3 h-3" /> WhatsApp
            </a>
            <a
              href={`tel:${shop.phone}`}
              className="flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors"
            >
              <Phone className="w-3 h-3" /> Call
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6 relative">
          {/* Left: Category sidebar (sticky) */}
          <aside className="hidden md:block w-48 shrink-0">
            <div className="sticky top-32 bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
              <div className="p-3 border-b border-gray-100">
                <p className="text-xs font-bold text-whoosh-muted uppercase tracking-wide">Categories</p>
              </div>
              <nav className="p-2 space-y-0.5">
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => scrollToCategory(cat)}
                      className={`category-nav-item w-full text-left flex items-center justify-between ${activeCategory === cat ? "active" : ""}`}
                    >
                      <span className="truncate">{cat}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ml-1 ${activeCategory === cat ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Shop contact mini card */}
              <div className="p-3 border-t border-gray-100 mt-1">
                <p className="text-[10px] font-bold text-whoosh-muted uppercase tracking-wide mb-2">Shop Info</p>
                <p className="text-xs text-whoosh-muted">{shop.address}</p>
                <p className="text-xs text-whoosh-muted mt-1">{shop.openTime} – {shop.closeTime}</p>
              </div>
            </div>
          </aside>

          {/* Right: Products */}
          <div className="flex-1 min-w-0">
            {/* Search bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Search products in ${shop.name}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-sm font-medium text-whoosh-dark placeholder:text-gray-400"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Mobile category chips */}
            <div className="md:hidden flex gap-2 overflow-x-auto pb-3 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => scrollToCategory(cat)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeCategory === cat ? "bg-whoosh-orange text-white border-whoosh-orange" : "bg-white text-whoosh-muted border-gray-200"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {search.trim() ? (
              /* Search results */
              <div>
                <p className="text-sm text-whoosh-muted mb-4">
                  <span className="font-bold text-whoosh-dark">{filteredProducts.length}</span> results for &ldquo;{search}&rdquo;
                </p>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-whoosh-muted font-medium">No products found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filteredProducts.map((p) => (
                      <ProductCard key={p.id} product={p} quantity={getQuantity(p.id)} onAdd={addToCart} onRemove={removeFromCart} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Categorized product sections */
              <div className="space-y-10">
                {categories.map((cat) => {
                  const catProducts = products.filter((p) => p.category === cat);
                  if (catProducts.length === 0) return null;
                  return (
                    <div
                      key={cat}
                      data-category={cat}
                      ref={(el) => { categoryRefs.current[cat] = el; }}
                    >
                      {/* Category heading */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="text-lg font-black text-whoosh-dark">{cat}</h2>
                          <p className="text-xs text-whoosh-muted">{catProducts.length} items</p>
                        </div>
                        <div className="h-0.5 flex-1 mx-4 bg-gray-100 rounded" />
                      </div>

                      {/* Products grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {catProducts.map((p) => (
                          <ProductCard key={p.id} product={p} quantity={getQuantity(p.id)} onAdd={addToCart} onRemove={removeFromCart} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Info footer */}
            <div className="mt-10 bg-orange-50 rounded-2xl p-5 border border-orange-100 flex gap-3">
              <Info className="w-5 h-5 text-whoosh-orange shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold text-whoosh-dark mb-1">Delivery & Pricing Info</p>
                <p className="text-whoosh-muted leading-relaxed">
                  All deliveries are <strong className="text-whoosh-green">FREE</strong> — Consumers never pay a delivery charge on Whoosh. Minimum order ₹{shop.minOrder}. Prices may vary slightly from in-store.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating cart button */}
      {cartTotal > 0 && !showCart && (
        <div className="cart-float">
          <button
            onClick={() => setShowCart(true)}
            className="flex items-center gap-3 bg-whoosh-orange hover:bg-orange-500 text-white px-5 py-3.5 rounded-2xl shadow-orange font-bold text-sm transition-all hover:scale-105 active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
            <div className="text-left">
              <div>{cartTotal} item{cartTotal > 1 ? "s" : ""}</div>
              <div className="text-xs opacity-90">₹{cartValue} · Free Delivery</div>
            </div>
          </button>
        </div>
      )}

      {/* Cart sheet */}
      {showCart && (
        <Cart
          items={cart}
          shopName={shop.name}
          whatsapp={shop.whatsapp}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onClose={() => setShowCart(false)}
        />
      )}

      {/* Sahayak order via WhatsApp CTA (mobile bottom bar) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 flex gap-2 z-40">
        <a
          href={`https://wa.me/${shop.whatsapp}?text=Hello! I want to order from ${shop.name} via Whoosh.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-2xl font-semibold text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp Order
        </a>
        {cartTotal === 0 ? (
          <button className="flex-1 flex items-center justify-center gap-2 bg-whoosh-orange text-white py-3 rounded-2xl font-semibold text-sm">
            <Bot className="w-4 h-4" />
            Ask Sahayak
          </button>
        ) : (
          <button
            onClick={() => setShowCart(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-whoosh-orange text-white py-3 rounded-2xl font-semibold text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Cart ({cartTotal}) · ₹{cartValue}
          </button>
        )}
      </div>
    </div>
  );
}
