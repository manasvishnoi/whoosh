"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Search, ShoppingCart, Menu, X, ChevronDown, Zap } from "lucide-react";

interface NavbarProps {
  cartCount?: number;
  variant?: "landing" | "shop" | "dashboard";
}

export default function Navbar({ cartCount = 0, variant = "landing" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langHindi, setLangHindi] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-orange">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-black text-whoosh-dark tracking-tight">
              Whoosh
            </span>
          </Link>

          {/* Location (shop/discovery pages) */}
          {variant !== "landing" && (
            <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors text-sm font-medium text-whoosh-dark">
              <MapPin className="w-4 h-4 text-whoosh-orange" />
              <span>Lucknow, UP</span>
              <ChevronDown className="w-3.5 h-3.5 text-whoosh-muted" />
            </button>
          )}

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-6">
            {variant === "landing" && (
              <>
                <Link href="/shops" className="text-sm font-medium text-whoosh-muted hover:text-whoosh-dark transition-colors">
                  {langHindi ? "दुकानें" : "Browse Shops"}
                </Link>
                <Link href="/#how-it-works" className="text-sm font-medium text-whoosh-muted hover:text-whoosh-dark transition-colors">
                  {langHindi ? "कैसे काम करता है" : "How it works"}
                </Link>
                <Link href="/#pricing" className="text-sm font-medium text-whoosh-muted hover:text-whoosh-dark transition-colors">
                  {langHindi ? "मूल्य" : "Pricing"}
                </Link>
              </>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLangHindi(!langHindi)}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 hover:border-orange-300 transition-colors text-whoosh-muted hover:text-whoosh-orange"
            >
              {langHindi ? "EN" : "हिं"}
            </button>

            {variant !== "landing" && (
              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-whoosh-dark" />
              </button>
            )}

            {/* Cart */}
            {cartCount > 0 && (
              <button className="flex items-center gap-2 bg-whoosh-orange hover:bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-orange hover:shadow-orange">
                <ShoppingCart className="w-4 h-4" />
                <span>{cartCount} items</span>
              </button>
            )}

            {/* CTAs */}
            {variant === "landing" && (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="hidden sm:block text-sm font-semibold text-whoosh-purple hover:text-purple-700 transition-colors px-3 py-1.5"
                >
                  For Shops
                </Link>
                <Link
                  href="/shops"
                  className="bg-whoosh-orange hover:bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-orange"
                >
                  Order Now
                </Link>
              </div>
            )}

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-1">
            <Link href="/shops" className="block px-4 py-2.5 rounded-xl hover:bg-orange-50 text-sm font-medium text-whoosh-dark" onClick={() => setMenuOpen(false)}>
              Browse Shops
            </Link>
            <Link href="/#how-it-works" className="block px-4 py-2.5 rounded-xl hover:bg-orange-50 text-sm font-medium text-whoosh-dark" onClick={() => setMenuOpen(false)}>
              How it works
            </Link>
            <Link href="/#pricing" className="block px-4 py-2.5 rounded-xl hover:bg-orange-50 text-sm font-medium text-whoosh-dark" onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="/dashboard" className="block px-4 py-2.5 rounded-xl hover:bg-purple-50 text-sm font-semibold text-whoosh-purple" onClick={() => setMenuOpen(false)}>
              Shop Owner Login
            </Link>
            <Link href="/shops" className="block px-4 py-2.5 rounded-xl bg-whoosh-orange text-white text-sm font-semibold text-center mt-2" onClick={() => setMenuOpen(false)}>
              Order Now — Free Delivery
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
