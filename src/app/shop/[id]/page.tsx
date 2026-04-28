"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star, Clock, MapPin, Bike, MessageCircle, Share2, Heart,
  ChevronLeft, ShoppingCart, Search, X, Package, Info,
  CheckCircle2, Sparkles, Phone,
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
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="icon-tile icon-tile-purple mx-auto mb-4 w-14 h-14">
            <Package className="w-6 h-6" />
          </div>
          <p className="text-xl font-extrabold tracking-tight text-whoosh-dark mb-4">Shop not found</p>
          <Link href="/shops" className="btn-primary inline-flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Back to shops
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar variant="shop" cartCount={cartTotal} />

      {/* Shop Header Banner */}
      <div className="relative">
        <div className="h-60 bg-whoosh-dark overflow-hidden">
          <img src={shop.banner} alt={shop.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-whoosh-dark/80 via-whoosh-dark/40 to-transparent" />
          <div className="absolute inset-0 bg-mesh-purple opacity-30 mix-blend-overlay" />
        </div>

        {/* Back & actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link href="/shops" className="w-10 h-10 rounded-2xl glass flex items-center justify-center shadow-card hover:shadow-card-hover transition-all duration-200">
            <ChevronLeft className="w-5 h-5 text-whoosh-dark" />
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => { setLiked(!liked); showToast(liked ? "Removed from favourites" : "Added to favourites", liked ? "info" : "success"); }}
              className="w-10 h-10 rounded-2xl glass flex items-center justify-center shadow-card hover:shadow-card-hover transition-all duration-200 active:scale-90"
            >
              <Heart className={`w-4 h-4 transition-colors ${liked ? "text-red-500 fill-red-500" : "text-whoosh-dark"}`} />
            </button>
            <button
              onClick={() => { if (navigator.share) { navigator.share({ title: shop.name, url: window.location.href }); } else { navigator.clipboard.writeText(window.location.href); showToast("Link copied!", "success"); } }}
              className="w-10 h-10 rounded-2xl glass flex items-center justify-center shadow-card hover:shadow-card-hover transition-all duration-200 active:scale-90"
            >
              <Share2 className="w-4 h-4 text-whoosh-dark" />
            </button>
          </div>
        </div>

        {/* Shop logo & name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
          <div className="max-w-6xl mx-auto flex items-end gap-3">
            <div className="icon-tile icon-tile-solid-purple w-20 h-20 rounded-3xl shadow-purple shrink-0 p-1">
              <img
                src={shop.logo}
                alt={shop.name}
                className="w-full h-full rounded-2xl object-cover bg-white"
              />
            </div>
            <div className="pb-1">
              <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">{shop.name}</h1>
              <p className="text-white/85 text-sm hindi">{shop.hindiName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Info Bar */}
      <div className="bg-white px-4 py-5 border-b border-slate-100 shadow-card">
        <div className="max-w-6xl mx-auto">
          {/* Rating + details row */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="chip chip-mint">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-extrabold text-sm">{shop.rating}</span>
              <span className="text-xs opacity-80">({shop.reviewCount})</span>
            </div>
            <div className="chip">
              <Clock className="w-4 h-4" />
              <span>{shop.eta}</span>
            </div>
            <div className="chip">
              <MapPin className="w-4 h-4" />
              <span>{shop.distance}</span>
            </div>
            <div className="badge-pulse">
              <Bike className="w-4 h-4" />
              <span className="font-extrabold">FREE Delivery</span>
            </div>
            <div className={`ml-auto chip ${shop.isOpen ? "chip-mint" : "chip-dark"}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${shop.isOpen ? "bg-whoosh-green animate-pulse" : "bg-slate-400"}`} />
              {shop.isOpen ? `Open · Closes ${shop.closeTime}` : `Closed · Opens ${shop.openTime}`}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-whoosh-muted mb-3 leading-relaxed">{shop.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {shop.features.map((f) => (
              <span key={f} className="chip chip-purple">
                <CheckCircle2 className="w-3 h-3" /> {f}
              </span>
            ))}
            <a
              href={`https://wa.me/${shop.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="chip chip-mint hover:scale-105 transition-all duration-200"
            >
              <MessageCircle className="w-3 h-3" /> WhatsApp
            </a>
            <a
              href={`tel:${shop.phone}`}
              className="chip chip-orange hover:scale-105 transition-all duration-200"
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
          <aside className="hidden md:block w-52 shrink-0">
            <div className="sticky top-32 card overflow-hidden p-0">
              <div className="p-4 border-b border-slate-100">
                <p className="text-[11px] font-extrabold text-whoosh-purple uppercase tracking-widest">Categories</p>
              </div>
              <nav className="p-2 space-y-0.5">
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => scrollToCategory(cat)}
                      className={`category-nav-item w-full text-left flex items-center justify-between transition-all duration-200 ${activeCategory === cat ? "active" : ""}`}
                    >
                      <span className="truncate">{cat}</span>
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ml-1 ${activeCategory === cat ? "bg-white/30 text-white" : "bg-slate-100 text-slate-400"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Shop contact mini card */}
              <div className="p-4 border-t border-slate-100 mt-1">
                <p className="text-[10px] font-extrabold text-whoosh-purple uppercase tracking-widest mb-2">Shop Info</p>
                <div className="flex items-start gap-2 mb-2">
                  <div className="icon-tile icon-tile-purple w-7 h-7 shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-whoosh-muted leading-relaxed">{shop.address}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="icon-tile icon-tile-mint w-7 h-7 shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-whoosh-muted">{shop.openTime} – {shop.closeTime}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right: Products */}
          <div className="flex-1 min-w-0">
            {/* Search bar */}
            <div className="relative mb-6 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-whoosh-purple focus-within:bg-white focus-within:shadow-ring transition-all duration-200">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={`Search products in ${shop.name}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-transparent border-0 text-sm focus:outline-none font-medium text-whoosh-dark placeholder:text-slate-400"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-full transition-all duration-200">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>

            {/* Mobile category chips */}
            <div className="md:hidden flex gap-2 overflow-x-auto pb-3 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => scrollToCategory(cat)}
                  className={`shrink-0 transition-all duration-200 ${activeCategory === cat ? "chip chip-purple !bg-whoosh-purple !text-white" : "chip"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {search.trim() ? (
              /* Search results */
              <div>
                <p className="text-sm text-whoosh-muted mb-4">
                  <span className="font-extrabold text-whoosh-dark">{filteredProducts.length}</span> results for &ldquo;{search}&rdquo;
                </p>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16 card">
                    <div className="icon-tile icon-tile-purple mx-auto mb-4 w-14 h-14">
                      <Package className="w-6 h-6" />
                    </div>
                    <p className="text-whoosh-dark font-extrabold tracking-tight mb-1">No products found</p>
                    <p className="text-whoosh-muted text-sm mb-4">Try a different search term</p>
                    <button onClick={() => setSearch("")} className="btn-primary">Clear search</button>
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
                          <h2 className="font-display text-xl font-extrabold tracking-tight text-whoosh-dark">{cat}</h2>
                          <p className="text-xs text-whoosh-muted">{catProducts.length} items</p>
                        </div>
                        <div className="h-0.5 flex-1 mx-4 bg-gradient-to-r from-whoosh-purple/30 to-transparent rounded" />
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
            <div className="mt-10 card p-5 flex gap-4 border border-whoosh-purple/10">
              <div className="icon-tile icon-tile-mint shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <p className="font-extrabold tracking-tight text-whoosh-dark mb-1">Delivery & Pricing Info</p>
                <p className="text-whoosh-muted leading-relaxed">
                  All deliveries are <strong className="text-whoosh-green-dark">FREE</strong> — Consumers never pay a delivery charge on Whoosh. Minimum order ₹{shop.minOrder}. Prices may vary slightly from in-store.
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
            className="relative flex items-center gap-3 bg-whoosh-purple hover:bg-whoosh-purple-dark text-white px-5 py-4 rounded-3xl shadow-purple-lg font-extrabold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <div className="icon-tile bg-white/15 text-white w-9 h-9">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div className="text-left tracking-tight">
              <div>{cartTotal} item{cartTotal > 1 ? "s" : ""}</div>
              <div className="text-xs opacity-90 font-semibold">₹{cartValue} · Free Delivery</div>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-whoosh-green opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-whoosh-green ring-2 ring-white" />
            </span>
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 p-3 flex gap-2 z-40 shadow-card">
        <a
          href={`https://wa.me/${shop.whatsapp}?text=Hello! I want to order from ${shop.name} via Whoosh.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-whoosh-green hover:bg-whoosh-green-dark text-white py-3 rounded-2xl font-extrabold text-sm shadow-green transition-all duration-200 active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
        {cartTotal === 0 ? (
          <button className="flex-1 flex items-center justify-center gap-2 btn-primary !rounded-2xl !py-3">
            <Sparkles className="w-4 h-4" />
            Ask Sahayak
          </button>
        ) : (
          <button
            onClick={() => setShowCart(true)}
            className="flex-1 flex items-center justify-center gap-2 btn-primary !rounded-2xl !py-3"
          >
            <ShoppingCart className="w-4 h-4" />
            Cart ({cartTotal}) · ₹{cartValue}
          </button>
        )}
      </div>
    </div>
  );
}
