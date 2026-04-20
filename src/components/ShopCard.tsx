import Link from "next/link";
import { Star, Clock, MapPin, Zap, MessageCircle, ChevronRight } from "lucide-react";
import type { Shop } from "@/lib/data";

interface ShopCardProps {
  shop: Shop;
}

const PLAN_BADGES: Record<string, { label: string; bg: string; text: string }> = {
  elite: { label: "Elite", bg: "bg-purple-100", text: "text-purple-700" },
  pro: { label: "Pro", bg: "bg-orange-100", text: "text-orange-700" },
  starter: { label: "Starter", bg: "bg-gray-100", text: "text-gray-600" },
};

export default function ShopCard({ shop }: ShopCardProps) {
  const plan = PLAN_BADGES[shop.plan];

  return (
    <Link href={`/shop/${shop.id}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 group-hover:-translate-y-0.5">
        {/* Banner */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-orange-50 to-purple-50">
          <img
            src={shop.banner}
            alt={shop.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Open/Closed badge */}
          <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${shop.isOpen ? "bg-green-500 text-white" : "bg-gray-800/80 text-gray-200"}`}>
            {shop.isOpen ? "Open" : "Closed"}
          </div>

          {/* Plan badge */}
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${plan.bg} ${plan.text}`}>
            {plan.label}
          </div>

          {/* Logo */}
          <div className="absolute bottom-0 left-4 translate-y-1/2">
            <img
              src={shop.logo}
              alt={shop.name}
              className="w-14 h-14 rounded-2xl border-2 border-white shadow-md object-cover bg-white"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pt-10">
          {/* Name + rating */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <h3 className="font-bold text-whoosh-dark text-base leading-tight truncate">
                {shop.name}
              </h3>
              <p className="text-xs text-whoosh-muted hindi mt-0.5">{shop.hindiName}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0 bg-green-50 px-2 py-1 rounded-lg">
              <Star className="w-3.5 h-3.5 text-green-600 fill-green-600" />
              <span className="text-sm font-bold text-green-700">{shop.rating}</span>
              <span className="text-xs text-green-600">({shop.reviewCount})</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-1.5 flex-wrap mb-3">
            {shop.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-whoosh-muted bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Delivery info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-whoosh-muted">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs">{shop.eta}</span>
              </div>
              <div className="flex items-center gap-1 text-whoosh-muted">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs">{shop.distance}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-whoosh-green fill-whoosh-green" />
              <span className="text-xs font-bold text-whoosh-green">Free Delivery</span>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs text-whoosh-muted">WhatsApp order</span>
            </div>
            <div className="flex items-center gap-1 text-whoosh-orange font-semibold text-xs group-hover:gap-2 transition-all">
              Shop now <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
