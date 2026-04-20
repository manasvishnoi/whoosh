"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, MapPin, ChevronDown, Zap, Star, X, Bot } from "lucide-react";
import Navbar from "@/components/Navbar";
import ShopCard from "@/components/ShopCard";
import { getShops, CATEGORIES } from "@/lib/data";
import Link from "next/link";

const AREAS = ["All Areas", "Aminabad", "Gomti Nagar", "Hazratganj"];
const SORT_OPTIONS = ["Recommended", "Rating: High to Low", "Distance: Nearest", "ETA: Fastest"];
const FILTER_TAGS = ["All", "Groceries", "Dairy", "Medicines", "Snacks", "Vegetables", "Beverages", "Household"];

export default function ShopsPage() {
  const allShops = getShops();
  const [search, setSearch] = useState("");
  const [activeArea, setActiveArea] = useState("All Areas");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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

    if (activeArea !== "All Areas") {
      shops = shops.filter((s) => s.area === activeArea);
    }

    if (activeFilter !== "All") {
      shops = shops.filter((s) => s.tags.includes(activeFilter));
    }

    if (showOpenOnly) {
      shops = shops.filter((s) => s.isOpen);
    }

    if (sortBy === "Rating: High to Low") {
      shops = [...shops].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Distance: Nearest") {
      shops = [...shops].sort(
        (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
      );
    } else if (sortBy === "ETA: Fastest") {
      shops = [...shops].sort(
        (a, b) => parseInt(a.eta) - parseInt(b.eta)
      );
    }

    return shops;
  }, [allShops, search, activeArea, activeFilter, sortBy, showOpenOnly]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar variant="shop" />

      {/* Hero / Search bar */}
      <div className="bg-gradient-to-br from-whoosh-orange to-orange-500 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-white/80" />
            <span className="text-white/90 font-medium text-sm">Lucknow, Uttar Pradesh</span>
            <ChevronDown className="w-4 h-4 text-white/80" />
          </div>
          <h1 className="text-2xl font-black text-white mb-1">
            Apni mohalla ki dukaan
          </h1>
          <p className="text-white/80 text-sm hindi mb-5">अपनी मोहल्ले की दुकान — Free Delivery, Always</p>

          {/* Search */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search shops, groceries, medicines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-sm font-medium text-whoosh-dark placeholder:text-gray-400"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-2xl font-semibold text-sm transition-colors flex items-center gap-2 ${showFilters ? "bg-whoosh-dark text-white" : "bg-white text-whoosh-dark"}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:block">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters row */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          {/* Category chips */}
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                  activeFilter === tag
                    ? "bg-whoosh-orange text-white border-whoosh-orange shadow-sm"
                    : "bg-white text-whoosh-muted border-gray-200 hover:border-orange-300 hover:text-whoosh-orange"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="pb-4 border-t border-gray-100 pt-3 flex flex-wrap gap-4 items-center">
              {/* Area */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-whoosh-muted uppercase tracking-wide">Area:</span>
                <div className="flex gap-1.5">
                  {AREAS.map((area) => (
                    <button
                      key={area}
                      onClick={() => setActiveArea(area)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                        activeArea === area
                          ? "bg-whoosh-purple text-white border-whoosh-purple"
                          : "bg-white text-whoosh-muted border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-whoosh-muted uppercase tracking-wide">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 rounded-lg border border-gray-200 text-xs font-medium text-whoosh-dark bg-white focus:outline-none focus:ring-1 focus:ring-orange-300"
                >
                  {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>

              {/* Open only */}
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setShowOpenOnly(!showOpenOnly)}
                  className={`w-9 h-5 rounded-full transition-colors relative ${showOpenOnly ? "bg-whoosh-green" : "bg-gray-200"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${showOpenOnly ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
                <span className="text-xs font-semibold text-whoosh-muted">Open Now</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Result count + free delivery banner */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="text-sm text-whoosh-muted">
              <span className="font-bold text-whoosh-dark">{filtered.length}</span> shops near you
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-2xl">
            <Zap className="w-4 h-4 text-whoosh-green fill-whoosh-green" />
            <span className="text-sm font-bold text-whoosh-green">Free Delivery on ALL shops</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="font-bold text-whoosh-dark text-lg mb-2">No shops found</h3>
            <p className="text-whoosh-muted text-sm">Try searching something else or clear filters</p>
            <button
              onClick={() => { setSearch(""); setActiveFilter("All"); setActiveArea("All Areas"); setShowOpenOnly(false); }}
              className="mt-4 px-6 py-2.5 bg-whoosh-orange text-white rounded-2xl text-sm font-semibold hover:bg-orange-500 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}

        {/* Category browsing section */}
        <div className="mt-14">
          <h2 className="text-xl font-black text-whoosh-dark mb-2">Browse by Category</h2>
          <p className="text-sm text-whoosh-muted hindi mb-6">श्रेणी के अनुसार देखें</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.name.split(" ")[0])}
                className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-orange-200 hover:shadow-card transition-all text-left group"
              >
                <div className="text-2xl mb-2">{cat.emoji}</div>
                <p className="text-sm font-bold text-whoosh-dark group-hover:text-whoosh-orange transition-colors">{cat.name}</p>
                <p className="text-xs text-whoosh-muted hindi">{cat.hindiName}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Sahayak CTA */}
        <div className="mt-14 bg-gradient-to-br from-orange-50 to-purple-50 rounded-3xl p-8 border border-orange-100 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-saffron flex items-center justify-center mx-auto mb-4 shadow-orange">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-black text-whoosh-dark mb-2">Let Sahayak order for you</h3>
          <p className="text-sm text-whoosh-muted mb-5 max-w-sm mx-auto">
            Just tell Sahayak what you need in Hindi or English — voice or text. Your AI agent handles the rest.
          </p>
          <button
            onClick={() => {
              const widget = document.getElementById("sahayak-widget");
              if (widget) widget.click();
            }}
            className="inline-flex items-center gap-2 bg-whoosh-orange hover:bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-orange hover:shadow-orange"
          >
            <Bot className="w-4 h-4" />
            Chat with Sahayak
          </button>
        </div>
      </div>
    </div>
  );
}
