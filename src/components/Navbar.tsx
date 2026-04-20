"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, ShoppingCart, Menu, X, Zap, ChevronDown } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

interface NavbarProps {
  cartCount?: number;
  variant?: "landing" | "shop" | "dashboard";
}

export default function Navbar({ cartCount = 0, variant = "landing" }: NavbarProps) {
  const { lang, toggleLang, T } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white border-b border-gray-100"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF8C42] to-[#E87030] flex items-center justify-center shadow-orange transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-black text-[#0F172A] tracking-tight">Whoosh</span>
          </Link>

          {/* Location pill */}
          {variant !== "landing" && (
            <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors text-sm font-semibold text-[#1E293B] border border-orange-100">
              <MapPin className="w-3.5 h-3.5 text-[#FF8C42]" />
              <span>Lucknow, UP</span>
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </button>
          )}

          {/* Center links */}
          {variant === "landing" && (
            <div className="hidden md:flex items-center gap-1">
              {[
                { label: T.browseShops, href: "/shops" },
                { label: T.howItWorks, href: "/#how-it-works" },
                { label: T.pricing, href: "/#pricing" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-gray-50 transition-all duration-150"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 active:scale-95"
              style={lang === "hi"
                ? { background: "#6B46C1", color: "#fff", borderColor: "#6B46C1" }
                : { background: "#fff", color: "#6B46C1", borderColor: "#DDD6FE" }
              }
              title={lang === "en" ? "Switch to Hindi" : "Switch to English"}
            >
              {lang === "en" ? "हिं" : "EN"}
            </button>

            {/* Cart */}
            {cartCount > 0 && (
              <button className="flex items-center gap-2 bg-[#FF8C42] hover:brightness-105 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-orange active:scale-95">
                <ShoppingCart className="w-4 h-4" />
                <span>{cartCount}</span>
              </button>
            )}

            {variant === "landing" && (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="text-sm font-semibold text-[#6B46C1] hover:text-purple-800 px-3 py-2 rounded-xl hover:bg-purple-50 transition-all duration-150"
                >
                  {T.forShops}
                </Link>
                <Link
                  href="/shops"
                  className="bg-[#FF8C42] hover:brightness-105 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-orange active:scale-95"
                >
                  {T.orderNow}
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 space-y-1 animate-fade-up">
            <Link href="/shops" className="flex items-center px-4 py-3 rounded-xl hover:bg-orange-50 text-sm font-semibold text-[#1E293B] transition-colors" onClick={() => setMenuOpen(false)}>
              {T.browseShops}
            </Link>
            <Link href="/#how-it-works" className="flex items-center px-4 py-3 rounded-xl hover:bg-orange-50 text-sm font-medium text-[#1E293B] transition-colors" onClick={() => setMenuOpen(false)}>
              {T.howItWorks}
            </Link>
            <Link href="/#pricing" className="flex items-center px-4 py-3 rounded-xl hover:bg-orange-50 text-sm font-medium text-[#1E293B] transition-colors" onClick={() => setMenuOpen(false)}>
              {T.pricing}
            </Link>
            <Link href="/dashboard" className="flex items-center px-4 py-3 rounded-xl hover:bg-purple-50 text-sm font-bold text-[#6B46C1] transition-colors" onClick={() => setMenuOpen(false)}>
              {T.shopOwnerLogin}
            </Link>
            <Link href="/shops" className="flex items-center justify-center px-4 py-3 rounded-xl bg-[#FF8C42] text-white text-sm font-bold mt-1 shadow-orange transition-all active:scale-95" onClick={() => setMenuOpen(false)}>
              {T.orderNow} — {T.freeDelivery}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
