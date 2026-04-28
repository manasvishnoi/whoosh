"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, ShoppingBag, Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

interface NavbarProps {
  cartCount?: number;
  variant?: "landing" | "shop" | "dashboard";
}

/* Whoosh wordmark — gradient "W" tile + bold lettering */
function WhooshMark({ size = 36 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2 shrink-0 group">
      <span
        className="relative flex items-center justify-center rounded-2xl shadow-purple transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, #5D3FD3 0%, #8366E4 60%, #00D395 130%)",
        }}
      >
        <span className="absolute inset-[2px] rounded-[14px] bg-gradient-to-br from-white/15 to-transparent" />
        <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" className="relative">
          <path
            d="M3 6.5l3.2 11 3.5-7.2L13.2 17.5l3.6-7L20 17"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-xl font-extrabold tracking-tight text-whoosh-dark">
        Whoosh<span className="text-whoosh-purple">.</span>
      </span>
    </span>
  );
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
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-slate-100/70 shadow-sm"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" aria-label="Whoosh home">
            <WhooshMark />
          </Link>

          {/* Location pill */}
          {variant !== "landing" && (
            <button className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-whoosh-purple-light hover:bg-purple-100 transition-colors text-sm font-bold text-whoosh-dark border border-whoosh-purple/15">
              <span className="icon-tile icon-tile-solid-purple w-6 h-6 rounded-lg">
                <MapPin className="w-3 h-3" />
              </span>
              <span>Lucknow, UP</span>
              <ChevronDown className="w-3.5 h-3.5 text-whoosh-muted" />
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
                  className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-whoosh-purple hover:bg-whoosh-purple-light transition-all duration-150"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle — aesthetic pill */}
            <button
              onClick={toggleLang}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 active:scale-95 ${
                lang === "hi"
                  ? "bg-whoosh-purple text-white border-whoosh-purple shadow-purple"
                  : "bg-white text-whoosh-purple border-whoosh-purple/25 hover:bg-whoosh-purple-light"
              }`}
              title={lang === "en" ? "Switch to Hindi" : "Switch to English"}
            >
              {lang === "en" ? "हिं" : "EN"}
            </button>

            {/* Cart */}
            {cartCount > 0 && (
              <button className="relative flex items-center gap-2 bg-whoosh-purple hover:brightness-110 text-white px-3.5 py-2 rounded-2xl text-sm font-bold transition-all shadow-purple active:scale-95">
                <ShoppingBag className="w-4 h-4" />
                <span className="min-w-[1ch]">{cartCount}</span>
              </button>
            )}

            {variant === "landing" && (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/sahayak"
                  className="text-sm font-bold px-3.5 py-2 rounded-xl transition-all duration-150 flex items-center gap-1.5 bg-whoosh-green-light text-whoosh-green-dark hover:bg-emerald-100 border border-whoosh-green/15"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {T.chatWithSahayak}
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm font-semibold text-whoosh-purple hover:bg-whoosh-purple-light px-3.5 py-2 rounded-xl transition-all duration-150"
                >
                  {T.forShops}
                </Link>
                <Link href="/shops" className="btn-primary text-sm py-2 px-4">
                  {T.orderNow}
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-xl hover:bg-whoosh-purple-light transition-colors active:scale-95 text-whoosh-dark"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 space-y-1 animate-fade-up">
            <Link href="/shops" className="flex items-center px-4 py-3 rounded-2xl hover:bg-whoosh-purple-light text-sm font-semibold text-whoosh-dark transition-colors" onClick={() => setMenuOpen(false)}>
              {T.browseShops}
            </Link>
            <Link href="/#how-it-works" className="flex items-center px-4 py-3 rounded-2xl hover:bg-whoosh-purple-light text-sm font-medium text-whoosh-dark transition-colors" onClick={() => setMenuOpen(false)}>
              {T.howItWorks}
            </Link>
            <Link href="/#pricing" className="flex items-center px-4 py-3 rounded-2xl hover:bg-whoosh-purple-light text-sm font-medium text-whoosh-dark transition-colors" onClick={() => setMenuOpen(false)}>
              {T.pricing}
            </Link>
            <Link href="/dashboard" className="flex items-center px-4 py-3 rounded-2xl hover:bg-whoosh-purple-light text-sm font-bold text-whoosh-purple transition-colors" onClick={() => setMenuOpen(false)}>
              {T.shopOwnerLogin}
            </Link>
            <Link href="/shops" className="btn-primary w-full mt-1" onClick={() => setMenuOpen(false)}>
              {T.orderNow} — {T.freeDelivery}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
