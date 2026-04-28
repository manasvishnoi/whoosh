"use client";

import { useState, useMemo } from "react";
import {
  Search, SlidersHorizontal, MapPin, ChevronDown, X, Sparkles, Bike,
  Carrot, Cookie, Pill, Apple, Beef, Coffee, Wheat, Flame,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ShopCard from "@/components/ShopCard";
import { getShops, CATEGORIES } from "@/lib/data";
import { useLang } from "@/context/LanguageContext";

/* Map category id/emoji → lucide icon + tone for the new icon-tile system */
const CATEGORY_VISUALS: Record<string, { Icon: React.ElementType; tone: string }> = {
  groceries:   { Icon: Wheat,  tone: "icon-tile-orange" },
  vegetables:  { Icon: Carrot, tone: "icon-tile-mint"   },
  dairy:       { Icon: Coffee, tone: "icon-tile-cream"  },
  medicines:   { Icon: Pill,   tone: "icon-tile-purple" },
  snacks:      { Icon: Cookie, tone: "icon-tile-orange" },
  beverages:   { Icon: Apple,  tone: "icon-tile-mint"   },
  household:   { Icon: Flame,  tone: "icon-tile-cream"  },
  meat:        { Icon: Beef,   tone: "icon-tile-orange" },
};

function categoryVisual(cat: { id: string; emoji?: string }) {
  return CATEGORY_VISUALS[cat.id?.toLowerCase()] ?? { Icon: Sparkles, tone: "icon-tile-purple" };
}

export default function ShopsPage() {
  const allShops = getShops();
  const { T, lang } = useLang();

  const [search, setSearch] = useState("");
  const [activeArea, setActiveArea] = useState("All Areas");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const AREAS = [
    { value: "All Areas",   label: T.allAreas },
    { value: "Aminabad",    label: "Aminabad" },
    { value: "Gomti Nagar", label: "Gomti Nagar" },
    { value: "Hazratganj",  label: "Hazratganj" },
  ];

  const SORT_OPTIONS = [
    { value: "Recommended",         label: T.recommended },
    { value: "Rating: High to Low", label: T.highestRated },
    { value: "Distance: Nearest",   label: T.nearestFirst },
    { value: "ETA: Fastest",        label: T.fastestETA },
  ];

  const FILTER_TAGS = [
    { value: "All",        label: lang === "en" ? "All" : "सभी" },
    { value: "Groceries",  label: lang === "en" ? "Groceries"  : "किराना" },
    { value: "Dairy",      label: lang === "en" ? "Dairy"      : "डेयरी" },
    { value: "Medicines",  label: lang === "en" ? "Medicines"  : "दवाइयाँ" },
    { value: "Snacks",     label: lang === "en" ? "Snacks"     : "स्नैक्स" },
    { value: "Vegetables", label: lang === "en" ? "Vegetables" : "सब्जियाँ" },
    { value: "Beverages",  label: lang === "en" ? "Beverages"  : "पेय पदार्थ" },
    { value: "Household",  label: lang === "en" ? "Household"  : "घरेलू" },
  ];

  const filtered = useMemo(() => {
    let shops = allShops;
    if (search.trim()) {
      const q = search.toLowerCase();
      shops = shops.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.hindiName.includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          s.area.toLowerCase().includes(q)
      );
    }
    if (activeArea !== "All Areas") shops = shops.filter((s) => s.area === activeArea);
    if (activeFilter !== "All") shops = shops.filter((s) => s.tags.includes(activeFilter));
    if (showOpenOnly) shops = shops.filter((s) => s.isOpen);
    if (sortBy === "Rating: High to Low") shops = [...shops].sort((a, b) => b.rating - a.rating);
    else if (sortBy === "Distance: Nearest") shops = [...shops].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    else if (sortBy === "ETA: Fastest") shops = [...shops].sort((a, b) => parseInt(a.eta) - parseInt(b.eta));
    return shops;
  }, [allShops, search, activeArea, activeFilter, sortBy, showOpenOnly]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar variant="shop" />

      {/* Hero / Search */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1B1245 0%, #2A1B66 40%, #5D3FD3 100%)",
          }}
        />
        <div className="absolute inset-0 bg-mesh-purple opacity-50 mix-blend-screen" />
        <div className="absolute inset-0 bg-grid opacity-40" />

        <div className="relative max-w-5xl mx-auto py-10 px-4">
          <div className="flex items-center gap-2 mb-3 text-purple-100">
            <span className="icon-tile bg-white/15 backdrop-blur-sm w-7 h-7 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="text-sm font-semibold">Lucknow, Uttar Pradesh</span>
            <ChevronDown className="w-4 h-4 opacity-70" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
            {T.nearbyShops}
          </h1>
          <p className="text-purple-100/90 text-sm mb-6 flex items-center gap-2">
            <Bike className="w-4 h-4 text-whoosh-green" />
            {T.freeDeliveryAllShops}
          </p>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={T.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-whoosh-purple shadow-card font-medium text-whoosh-dark placeholder:text-slate-400"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
                showFilters
                  ? "bg-whoosh-dark text-white"
                  : "bg-white/15 backdrop-blur-sm text-white border border-white/25 hover:bg-white/25"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:block">{T.filters}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters row */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag.value}
                onClick={() => setActiveFilter(tag.value)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${
                  activeFilter === tag.value
                    ? "bg-whoosh-purple text-white border-whoosh-purple shadow-purple"
                    : "bg-white text-slate-600 border-slate-200 hover:border-whoosh-purple/40 hover:text-whoosh-purple"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {showFilters && (
            <div className="pb-4 border-t border-slate-100 pt-3 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{lang === "en" ? "Area" : "क्षेत्र"}</span>
                <div className="flex gap-1.5">
                  {AREAS.map((area) => (
                    <button
                      key={area.value}
                      onClick={() => setActiveArea(area.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        activeArea === area.value
                          ? "bg-whoosh-dark text-white border-whoosh-dark"
                          : "bg-white text-slate-600 border-slate-200 hover:border-whoosh-purple/40"
                      }`}
                    >
                      {area.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{lang === "en" ? "Sort" : "क्रम"}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-whoosh-dark bg-white focus:outline-none focus:ring-2 focus:ring-whoosh-purple/30"
                >
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setShowOpenOnly(!showOpenOnly)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${showOpenOnly ? "bg-whoosh-green" : "bg-slate-200"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${showOpenOnly ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
                <span className="text-xs font-bold text-slate-600">{T.openNow}</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-slate-500">
            <span className="font-extrabold text-whoosh-dark text-base">{filtered.length}</span> {T.shopsNearYou}
          </p>
          <div className="badge-pulse">
            <Bike className="w-3 h-3" />
            {T.freeDeliveryAllShops}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="icon-tile icon-tile-purple w-20 h-20 mx-auto mb-5 rounded-3xl">
              <Search className="w-9 h-9" />
            </span>
            <h3 className="font-extrabold text-whoosh-dark text-lg mb-2 tracking-tight">{T.noShopsFound}</h3>
            <p className="text-slate-500 text-sm">{T.trySearching}</p>
            <button
              onClick={() => { setSearch(""); setActiveFilter("All"); setActiveArea("All Areas"); setShowOpenOnly(false); }}
              className="btn-primary mt-5"
            >
              {T.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((shop) => <ShopCard key={shop.id} shop={shop} />)}
          </div>
        )}

        {/* Category browsing — circular icon tiles */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-extrabold text-whoosh-dark tracking-tight">{T.browseByCategory}</h2>
            <Sparkles className="w-5 h-5 text-whoosh-purple" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map((cat) => {
              const v = categoryVisual(cat);
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.name.split(" ")[0])}
                  className="bg-white rounded-3xl p-4 border border-slate-100 hover:border-whoosh-purple/30 hover:shadow-card hover:-translate-y-1 transition-all text-center group"
                >
                  <span className={`icon-tile ${v.tone} w-14 h-14 mx-auto mb-2.5`}>
                    <v.Icon className="w-6 h-6" strokeWidth={2.2} />
                  </span>
                  <p className="text-xs font-extrabold text-whoosh-dark group-hover:text-whoosh-purple transition-colors leading-tight tracking-tight">
                    {lang === "en" ? cat.name : cat.hindiName}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sahayak CTA */}
        <div className="mt-16 relative overflow-hidden rounded-[28px] border border-whoosh-purple/15">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #1B1245 0%, #2A1B66 50%, #5D3FD3 100%)",
            }}
          />
          <div className="absolute inset-0 bg-mesh-purple opacity-50 mix-blend-screen" />
          <div className="relative p-10 text-center text-white">
            <div className="inline-flex w-16 h-16 mb-5 relative">
              <span
                className="absolute inset-0 rounded-3xl"
                style={{ background: "conic-gradient(from 200deg, #5D3FD3, #8366E4, #00D395, #5D3FD3)" }}
              />
              <span className="absolute inset-[3px] rounded-[1.25rem] bg-whoosh-purple flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold mb-2 tracking-tight">{T.letSahayakOrder}</h3>
            <p className="text-sm text-purple-100/90 mb-6 max-w-md mx-auto leading-relaxed">{T.sahayakOrderDesc}</p>
            <button
              onClick={() => { const w = document.getElementById("sahayak-widget"); if (w) w.click(); }}
              className="inline-flex items-center gap-2 bg-white text-whoosh-purple px-7 py-3.5 rounded-2xl font-extrabold text-sm transition-all shadow-card hover:scale-105 hover:shadow-purple-lg active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              {T.chatWithSahayak}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
