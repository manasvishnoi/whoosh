import Link from "next/link";
import { Star, Clock, MapPin, Zap, MessageCircle, ArrowRight } from "lucide-react";
import type { Shop } from "@/lib/data";

interface ShopCardProps {
  shop: Shop;
}

const PLAN_STYLES: Record<"starter" | "pro" | "elite", { label: string; bg: string; text: string }> = {
  elite: { label: "Elite", bg: "bg-purple-100", text: "text-purple-700" },
  pro:   { label: "Pro",   bg: "bg-orange-100", text: "text-orange-700" },
  starter: { label: "Starter", bg: "bg-slate-100", text: "text-slate-600" },
};

export default function ShopCard({ shop }: ShopCardProps) {
  const plan = PLAN_STYLES[shop.plan];

  return (
    <Link href={`/shop/${shop.id}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm
        transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-orange-100">

        {/* Banner */}
        <div className="relative h-36 overflow-hidden">
          <img
            src={shop.banner}
            alt={shop.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Status */}
          <div className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-sm
            ${shop.isOpen ? "bg-emerald-500/90 text-white" : "bg-black/60 text-gray-300"}`}>
            {shop.isOpen ? "● Open" : "Closed"}
          </div>

          {/* Plan */}
          <div className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-sm bg-white/90 ${plan.text}`}>
            {plan.label}
          </div>

          {/* Logo */}
          <img
            src={shop.logo}
            alt=""
            className="absolute bottom-0 left-3 translate-y-1/2 w-12 h-12 rounded-xl border-2 border-white shadow-md object-cover bg-white"
          />
        </div>

        {/* Content */}
        <div className="p-3 pt-8">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <h3 className="font-bold text-[#0F172A] text-sm leading-tight truncate">{shop.name}</h3>
              <p className="text-[10px] text-[#94A3B8] hindi truncate mt-0.5">{shop.hindiName}</p>
            </div>
            <div className="flex items-center gap-0.5 shrink-0 bg-emerald-50 px-1.5 py-1 rounded-lg">
              <Star className="w-3 h-3 text-emerald-600 fill-emerald-600" />
              <span className="text-xs font-black text-emerald-700">{shop.rating}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-1 flex-wrap mb-2.5">
            {shop.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] text-[#64748B] bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 text-[#64748B]">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{shop.eta}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{shop.distance}</span>
            </div>
            <span className="flex items-center gap-0.5 font-bold text-emerald-600">
              <Zap className="w-3 h-3 fill-emerald-500 text-emerald-500" />Free
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-50">
            <span className="flex items-center gap-1 text-[10px] text-[#64748B]">
              <MessageCircle className="w-3 h-3 text-green-500" />WhatsApp
            </span>
            <span className="flex items-center gap-0.5 text-[#FF8C42] font-bold text-xs group-hover:gap-1 transition-all duration-150">
              Shop now <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
