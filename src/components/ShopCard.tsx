"use client";

import Link from "next/link";
import { Star, Clock, MapPin, MessageCircle, ArrowUpRight, Bike } from "lucide-react";
import type { Shop } from "@/lib/data";
import { useLang } from "@/context/LanguageContext";

interface ShopCardProps {
  shop: Shop;
}

const PLAN_STYLES: Record<"starter" | "pro" | "elite", { label: string; bg: string; text: string }> = {
  elite:   { label: "Elite",   bg: "bg-whoosh-purple",       text: "text-white" },
  pro:     { label: "Pro",     bg: "bg-whoosh-green-light",  text: "text-whoosh-green-dark" },
  starter: { label: "Starter", bg: "bg-slate-100",           text: "text-slate-600" },
};

export default function ShopCard({ shop }: ShopCardProps) {
  const { T } = useLang();
  const plan = PLAN_STYLES[shop.plan];

  return (
    <Link href={`/shop/${shop.id}`} className="block group">
      <div
        className="bg-white rounded-3xl overflow-hidden border border-slate-100
                   shadow-soft transition-all duration-300
                   group-hover:-translate-y-1.5 group-hover:shadow-card-hover
                   group-hover:border-whoosh-purple/20"
      >
        {/* Banner */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={shop.banner}
            alt={shop.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-whoosh-dark/70 via-whoosh-dark/15 to-transparent" />

          {/* Top row */}
          <div className="absolute top-3 inset-x-3 flex items-start justify-between">
            <span className={`${plan.bg} ${plan.text} px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wide backdrop-blur-md shadow-sm`}>
              {plan.label.toUpperCase()}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md flex items-center gap-1
              ${shop.isOpen
                ? "bg-whoosh-green/95 text-white shadow-green"
                : "bg-whoosh-dark/70 text-slate-200"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${shop.isOpen ? "bg-white animate-pulse2" : "bg-slate-400"}`} />
              {shop.isOpen ? T.open : T.closed}
            </span>
          </div>

          {/* Free delivery ribbon */}
          <span className="absolute bottom-3 right-3 chip chip-mint">
            <Bike className="w-3 h-3" />
            FREE
          </span>

          {/* Logo */}
          <img
            src={shop.logo}
            alt=""
            className="absolute bottom-0 left-4 translate-y-1/2 w-14 h-14 rounded-2xl border-[3px] border-white shadow-lg object-cover bg-white"
          />
        </div>

        {/* Content */}
        <div className="px-4 pt-9 pb-4">
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="min-w-0">
              <h3 className="font-extrabold text-whoosh-dark text-[15px] leading-tight truncate tracking-tight">
                {shop.name}
              </h3>
              <p className="text-[11px] text-whoosh-muted hindi truncate mt-0.5">{shop.hindiName}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0 bg-whoosh-green-light px-2 py-1 rounded-xl border border-whoosh-green/20">
              <Star className="w-3 h-3 text-whoosh-green-dark fill-whoosh-green" />
              <span className="text-xs font-extrabold text-whoosh-green-dark">{shop.rating}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-1.5 flex-wrap mb-3">
            {shop.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-slate-600 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-full font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3 text-whoosh-muted">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-whoosh-purple" />
                {shop.eta}
              </span>
              <span className="flex items-center gap-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-whoosh-orange" />
                {shop.distance}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-3">
            <span className="flex items-center gap-1.5 text-[11px] text-whoosh-muted font-semibold">
              <MessageCircle className="w-3.5 h-3.5 text-whoosh-green" />
              WhatsApp
            </span>
            <span className="flex items-center gap-1 text-whoosh-purple font-extrabold text-xs group-hover:gap-1.5 transition-all duration-200">
              Shop now
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
