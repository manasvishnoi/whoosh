"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star, MapPin, MessageCircle, ShoppingBag, ArrowRight,
  CheckCircle2, ChevronRight, Sparkles, BarChart3, Package,
  Users, Shield, BadgeIndianRupee, Bike, Store, Phone, Clock,
  TrendingUp, Quote, Apple, Cookie, Pill, Carrot,
  Mic, Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { STATS, TESTIMONIALS } from "@/lib/data";
import { useLang } from "@/context/LanguageContext";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"consumer" | "shop">("consumer");
  const { T, lang } = useLang();

  const HOW_IT_WORKS_CONSUMER = [
    { step: "01", icon: MessageCircle, title: T.step1ConsumerTitle, desc: T.step1ConsumerDesc },
    { step: "02", icon: Store,         title: T.step2ConsumerTitle, desc: T.step2ConsumerDesc },
    { step: "03", icon: Bike,          title: T.step3ConsumerTitle, desc: T.step3ConsumerDesc },
  ];

  const HOW_IT_WORKS_SHOP = [
    { step: "01", icon: Store,      title: T.step1ShopTitle, desc: T.step1ShopDesc },
    { step: "02", icon: Sparkles,   title: T.step2ShopTitle, desc: T.step2ShopDesc },
    { step: "03", icon: TrendingUp, title: T.step3ShopTitle, desc: T.step3ShopDesc },
  ];

  const FEATURES_CONSUMER = [
    { icon: Bike,             title: T.freeDelivery,  desc: T.freeDeliveryDesc,  tone: "purple" },
    { icon: MessageCircle,    title: T.whatsappFirst, desc: T.whatsappFirstDesc, tone: "mint" },
    { icon: Sparkles,         title: T.sahayakAI,     desc: T.sahayakAIDesc,     tone: "purple" },
    { icon: BadgeIndianRupee, title: T.digitalUdhaar, desc: T.digitalUdhaarDesc, tone: "orange" },
    { icon: Users,            title: T.groupBuying,   desc: T.groupBuyingDesc,   tone: "mint" },
    { icon: Mic,              title: T.voiceOrdering, desc: T.voiceOrderingDesc, tone: "purple" },
  ] as const;

  const FEATURES_SHOP = [
    { icon: Store,      title: T.yourStorefront, desc: T.yourstorefrontDesc, tone: "purple" },
    { icon: Sparkles,   title: T.muneemAI,       desc: T.muneemAIDesc,       tone: "mint"   },
    { icon: Package,    title: T.stockMgmt,      desc: T.stockMgmtDesc,      tone: "orange" },
    { icon: BarChart3,  title: T.smartAnalytics, desc: T.smartAnalyticsDesc, tone: "purple" },
    { icon: TrendingUp, title: T.autoPromos,     desc: T.autoPromosDesc,     tone: "mint"   },
    { icon: Shield,     title: T.ondcReady,      desc: T.ondcReadyDesc,      tone: "orange" },
  ] as const;

  const PLANS = [
    {
      name: T.starter,
      price: 299,
      style: "border-slate-200",
      btn: "btn-inverted w-full",
      features: [T.starterFeat1, T.starterFeat2, T.starterFeat3, T.starterFeat4, T.starterFeat5],
    },
    {
      name: T.pro,
      price: 699,
      style: "border-whoosh-purple ring-4 ring-whoosh-purple/10",
      btn: "btn-primary w-full",
      popular: true,
      features: [T.proFeat1, T.proFeat2, T.proFeat3, T.proFeat4, T.proFeat5, T.proFeat6, T.proFeat7],
    },
    {
      name: T.elite,
      price: 1499,
      style: "border-whoosh-dark",
      btn: "w-full inline-flex items-center justify-center bg-whoosh-dark hover:bg-whoosh-dark-2 text-white font-bold px-6 py-3 rounded-2xl transition-all duration-200 active:scale-95",
      features: [T.eliteFeat1, T.eliteFeat2, T.eliteFeat3, T.eliteFeat4, T.eliteFeat5, T.eliteFeat6, T.eliteFeat7],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar variant="landing" />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-12 pb-24 px-4">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-mesh-purple" />
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-whoosh-purple/15 blur-3xl" />
        <div className="absolute bottom-10 left-0 w-96 h-96 rounded-full bg-whoosh-green/15 blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-whoosh-purple/15 px-3 py-1.5 rounded-full shadow-soft">
                <span className="w-2 h-2 rounded-full bg-whoosh-green animate-pulse" />
                <span className="text-xs font-bold text-whoosh-dark tracking-wide">{T.lucknowPilot}</span>
                <Sparkles className="w-3.5 h-3.5 text-whoosh-purple" />
              </div>

              <div className="space-y-4">
                <h1 className="font-display text-5xl lg:text-[64px] font-extrabold text-whoosh-dark leading-[1.05] tracking-tight">
                  {T.heroTitle}{" "}
                  <span className="gradient-text">{T.heroTitleAccent}</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  {T.heroSubtitle}{" "}
                  <span className="text-whoosh-purple font-bold">{T.heroSub2}</span>{" "}
                  <span className="text-whoosh-green-dark font-bold">{T.heroSub3}</span>
                </p>
                <p className="text-base text-slate-500 hindi">{T.heroHindi}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/shops" className="btn-primary text-base px-7 py-3.5 hover:scale-105">
                  <ShoppingBag className="w-5 h-5" />
                  {T.orderNowFree}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/dashboard" className="btn-outlined text-base px-7 py-3.5 hover:scale-105">
                  <Store className="w-5 h-5" />
                  {T.listMyShop}
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-2.5">
                  {["PM", "RS", "SA", "MV"].map((initials, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-extrabold text-white shadow-sm"
                      style={{ background: ["#5D3FD3", "#00D395", "#C45828", "#0F172A"][i] }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-whoosh-orange fill-whoosh-orange" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{T.socialProof}</p>
                </div>
              </div>
            </div>

            {/* AI-native phone mockup */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative w-[320px] animate-float">
                {/* Phone shell */}
                <div className="bg-whoosh-dark rounded-[42px] p-3 shadow-card-hover relative">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-whoosh-dark rounded-b-2xl z-20" />
                  <div className="bg-white rounded-[34px] overflow-hidden">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-bold text-whoosh-dark">
                      <span>9:41</span>
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-sm bg-whoosh-dark/80" />
                        <span className="w-2.5 h-2.5 rounded-sm bg-whoosh-green" />
                      </span>
                    </div>
                    {/* App header */}
                    <div className="px-5 py-3 flex items-center justify-between border-b border-slate-100">
                      <div>
                        <p className="text-[11px] text-slate-500">Namaste,</p>
                        <p className="font-extrabold text-whoosh-dark text-sm tracking-tight">Lucknow! 👋</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="w-8 h-8 rounded-xl bg-whoosh-purple-light flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-whoosh-purple" />
                        </span>
                      </div>
                    </div>

                    {/* Search */}
                    <div className="mx-4 mt-3 mb-3 px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-whoosh-purple" />
                      <span className="text-[11px] text-slate-400 flex-1">Search atta, dudh, paneer...</span>
                      <span className="px-1.5 py-0.5 rounded-md bg-whoosh-purple text-white text-[9px] font-bold">RKLBS</span>
                    </div>

                    {/* Weekly essentials card */}
                    <div className="mx-4 mb-3 rounded-2xl bg-gradient-to-br from-whoosh-purple-light to-emerald-50 p-3 border border-whoosh-purple/15">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[11px] font-extrabold text-whoosh-dark">Your Weekly Essentials</p>
                        <span className="text-[9px] font-bold bg-whoosh-purple text-white px-1.5 py-0.5 rounded-md">+2</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        {[
                          { label: "Milk", icon: "🥛" },
                          { label: "Bread", icon: "🍞" },
                          { label: "Eggs", icon: "🥚" },
                        ].map((item) => (
                          <div key={item.label} className="bg-white rounded-xl p-1.5 text-center shadow-sm">
                            <div className="text-xl">{item.icon}</div>
                            <p className="text-[9px] font-bold text-whoosh-dark mt-0.5">{item.label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-whoosh-purple text-white rounded-xl py-2 text-center text-[11px] font-extrabold flex items-center justify-center gap-1">
                        <ShoppingBag className="w-3 h-3" />
                        Add all to Cart · ₹345
                      </div>
                    </div>

                    {/* Categories */}
                    <p className="px-4 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Categories</p>
                    <div className="grid grid-cols-4 gap-2 px-4 py-2">
                      {[
                        { Icon: Carrot, label: "Fresh", tone: "icon-tile-mint" },
                        { Icon: Cookie, label: "Bread", tone: "icon-tile-orange" },
                        { Icon: Apple,  label: "Meals", tone: "icon-tile-purple" },
                        { Icon: Pill,   label: "Pharma", tone: "icon-tile-cream" },
                      ].map((c) => (
                        <div key={c.label} className="text-center">
                          <span className={`icon-tile ${c.tone} w-11 h-11 mx-auto`}>
                            <c.Icon className="w-5 h-5" />
                          </span>
                          <p className="text-[10px] font-bold text-whoosh-dark mt-1">{c.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Bottom suggestion */}
                    <div className="mx-4 my-3 rounded-2xl bg-whoosh-dark p-3 text-white">
                      <div className="flex items-center gap-2 text-[10px] mb-1">
                        <Sparkles className="w-3 h-3 text-whoosh-green" />
                        <span className="font-bold">Dinner in 12 mins</span>
                      </div>
                      <p className="text-[11px] font-extrabold leading-tight">
                        Make <span className="text-whoosh-green">Lucknowi Paneer</span> tonight
                      </p>
                      <div className="flex gap-1 mt-2">
                        {["Paneer", "Tomato", "Spices"].map((t) => (
                          <span key={t} className="bg-white/10 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating chips */}
                <div className="absolute -right-6 top-16 bg-white rounded-2xl px-3 py-2 shadow-card-hover border border-whoosh-green/20 animate-fade-up">
                  <div className="flex items-center gap-2">
                    <span className="icon-tile icon-tile-mint w-7 h-7">
                      <Bike className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <p className="text-[10px] font-extrabold text-whoosh-dark">{T.freeDelivery}</p>
                      <p className="text-[9px] text-whoosh-green-dark font-bold">Always ₹0</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -left-6 bottom-24 bg-white rounded-2xl px-3 py-2 shadow-card-hover border border-whoosh-purple/20 animate-fade-up">
                  <div className="flex items-center gap-2">
                    <span className="icon-tile icon-tile-purple w-7 h-7">
                      <Clock className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <p className="text-[10px] font-extrabold text-whoosh-dark">12 min</p>
                      <p className="text-[9px] text-whoosh-purple font-bold">{lang === "en" ? "Avg delivery" : "औसत डिलीवरी"}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-3 bottom-6 bg-white rounded-2xl px-3 py-2 shadow-card-hover border border-whoosh-orange/20">
                  <div className="flex items-center gap-2">
                    <span className="icon-tile icon-tile-orange w-7 h-7">
                      <Zap className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <p className="text-[10px] font-extrabold text-whoosh-dark">AI Shopper</p>
                      <p className="text-[9px] text-whoosh-orange-dark font-bold">Live now</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-whoosh-dark py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-purple opacity-30" />
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative">
          {STATS.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="text-4xl font-extrabold gradient-text mb-1 tracking-tight">{stat.value}</p>
              <p className="text-sm text-slate-400 font-medium">{lang === "en" ? stat.label : stat.hindiLabel}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="chip chip-purple mb-4">{T.howItWorksTag}</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-whoosh-dark mb-3 tracking-tight">
              {T.howItWorksTitle}
            </h2>
            <p className="text-slate-500 text-lg">{T.howItWorksSubtitle}</p>
            <div className="inline-flex mt-8 bg-slate-100 p-1 rounded-2xl gap-1">
              <button
                onClick={() => setActiveTab("consumer")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "consumer" ? "bg-whoosh-purple text-white shadow-purple" : "text-slate-500 hover:text-whoosh-dark"
                }`}
              >
                {T.forConsumers}
              </button>
              <button
                onClick={() => setActiveTab("shop")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "shop" ? "bg-whoosh-dark text-white" : "text-slate-500 hover:text-whoosh-dark"
                }`}
              >
                {T.forShopOwners}
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(activeTab === "consumer" ? HOW_IT_WORKS_CONSUMER : HOW_IT_WORKS_SHOP).map((step) => (
              <div key={step.step} className="card relative p-7 group">
                <span className={`icon-tile w-14 h-14 mb-5 ${activeTab === "consumer" ? "icon-tile-solid-purple" : "icon-tile-dark"}`}>
                  <step.icon className="w-6 h-6" />
                </span>
                <div className="absolute top-5 right-5 text-5xl font-extrabold opacity-5 text-whoosh-dark">
                  {step.step}
                </div>
                <h3 className="font-extrabold text-whoosh-dark text-lg mb-2 tracking-tight">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI AGENTS ── */}
      <section className="py-24 px-4 bg-gradient-hero relative">
        <div className="absolute inset-0 bg-mesh-purple opacity-50" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-14">
            <span className="chip chip-mint mb-4">{T.aiAgentsTag}</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-whoosh-dark mb-3 tracking-tight">
              {T.agentsTitle}
            </h2>
            <p className="text-slate-500 text-lg">{T.agentsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-8 group">
              <div className="flex items-center gap-4 mb-6">
                <span className="icon-tile w-16 h-16 rounded-3xl shadow-purple-lg" style={{ background: "conic-gradient(from 200deg, #5D3FD3, #8366E4, #00D395, #5D3FD3)" }}>
                  <span className="w-[58px] h-[58px] rounded-[1.25rem] bg-whoosh-purple flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-white" />
                  </span>
                </span>
                <div>
                  <h3 className="text-2xl font-extrabold text-whoosh-dark tracking-tight">{lang === "en" ? "Sahayak" : "सहायक"}</h3>
                  <p className="text-sm text-whoosh-muted font-medium">{T.sahayakConsumerAgent}</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">{T.sahayakDesc}</p>
              <ul className="space-y-2.5">
                {[T.autoReorders, T.voiceOrdering, T.medicineTracker, T.priceComparison, T.groupBuying].map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-whoosh-purple shrink-0 mt-0.5" />
                    <span className="text-whoosh-dark">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-8 group">
              <div className="flex items-center gap-4 mb-6">
                <span className="icon-tile icon-tile-solid-mint w-16 h-16 rounded-3xl">
                  <BarChart3 className="w-8 h-8" />
                </span>
                <div>
                  <h3 className="text-2xl font-extrabold text-whoosh-dark tracking-tight">{lang === "en" ? "Muneem" : "मुनीम"}</h3>
                  <p className="text-sm text-whoosh-muted font-medium">{T.muneemShopAgent}</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">{T.muneemDesc}</p>
              <ul className="space-y-2.5">
                {[T.listingsFromPhoto, T.targetedPromos, T.udhaarTracking, T.festivalDemand, T.reEngages].map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-whoosh-green-dark shrink-0 mt-0.5" />
                    <span className="text-whoosh-dark">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="icon-tile icon-tile-purple w-10 h-10">
                <ShoppingBag className="w-5 h-5" />
              </span>
              <h2 className="font-display text-3xl font-extrabold text-whoosh-dark tracking-tight">{T.featConsumers}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES_CONSUMER.map((feat) => (
                <div key={feat.title} className="p-6 rounded-3xl border border-slate-100 hover:border-whoosh-purple/30 hover:bg-whoosh-purple-light/40 transition-all group">
                  <span className={`icon-tile icon-tile-${feat.tone} w-12 h-12 mb-4`}>
                    <feat.icon className="w-5 h-5" />
                  </span>
                  <h4 className="font-extrabold text-whoosh-dark mb-1 tracking-tight">{feat.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="icon-tile icon-tile-mint w-10 h-10">
                <Store className="w-5 h-5" />
              </span>
              <h2 className="font-display text-3xl font-extrabold text-whoosh-dark tracking-tight">{T.featShops}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES_SHOP.map((feat) => (
                <div key={feat.title} className="p-6 rounded-3xl border border-slate-100 hover:border-whoosh-green/30 hover:bg-whoosh-green-light/40 transition-all group">
                  <span className={`icon-tile icon-tile-${feat.tone} w-12 h-12 mb-4`}>
                    <feat.icon className="w-5 h-5" />
                  </span>
                  <h4 className="font-extrabold text-whoosh-dark mb-1 tracking-tight">{feat.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-4 bg-whoosh-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-purple opacity-40" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="chip chip-mint mb-4 !bg-whoosh-green/15 !text-whoosh-green !border-whoosh-green/30">{T.realStoriesTag}</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">{T.testimonialsTitle}</h2>
            <p className="text-slate-400">{T.realStoriesSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 hover:bg-white/[0.07] hover:border-whoosh-purple/30 transition-all backdrop-blur-sm">
                <Quote className="w-7 h-7 text-whoosh-purple mb-4 opacity-80" />
                <p className="text-slate-200 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border-2 border-whoosh-purple/30" />
                  <div>
                    <p className="font-extrabold text-white text-sm tracking-tight">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role} · {t.area}</p>
                  </div>
                  <div className="ml-auto flex">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-whoosh-orange fill-whoosh-orange" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-4 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="chip chip-orange mb-4">{T.pricingTag}</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-whoosh-dark mb-3 tracking-tight">{T.pricingTitle}</h2>
            <p className="text-slate-500 text-lg">{T.pricingSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`relative bg-white rounded-3xl p-7 border-2 ${plan.style} flex flex-col`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-whoosh-purple text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-purple flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {T.mostPopular}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-extrabold text-whoosh-dark tracking-tight">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-whoosh-dark tracking-tight">₹{plan.price}</span>
                    <span className="text-slate-500 text-sm">{T.perMonth}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-7">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-whoosh-green-dark shrink-0 mt-0.5" />
                      <span className="text-whoosh-dark">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard" className={plan.btn}>
                  {T.getStarted}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 relative overflow-hidden bg-whoosh-dark">
        <div className="absolute inset-0 bg-mesh-purple opacity-60" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 20% 50%, rgba(93,63,211,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,211,149,0.3) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center text-white space-y-6 relative">
          <span className="chip !bg-white/10 !border-white/20 !text-white">
            <Sparkles className="w-3 h-3" /> Whoosh AI · Live in Lucknow
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">{T.ctaTitle}</h2>
          <p className="text-base text-slate-300">{T.ctaDesc}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/shops" className="inline-flex items-center justify-center gap-2 bg-white text-whoosh-purple px-7 py-3.5 rounded-2xl font-extrabold hover:shadow-purple-lg transition-all hover:scale-105">
              <ShoppingBag className="w-5 h-5" />
              {T.startShoppingFreeBtn}
            </Link>
            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-7 py-3.5 rounded-2xl font-bold hover:bg-white/15 transition-all hover:scale-105">
              <Store className="w-5 h-5" />
              {T.listMyShop}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <MessageCircle className="w-4 h-4" />
            <span>{T.orWhatsapp} <strong className="text-white">+91 98765 00000</strong></span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-whoosh-dark text-slate-400 py-14 px-4 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="icon-tile icon-tile-solid-purple w-9 h-9 rounded-xl">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-white font-extrabold text-lg tracking-tight">
                  Whoosh<span className="text-whoosh-purple">.</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed">{T.footerDesc}</p>
              <p className="text-xs mt-2 text-slate-500">{T.footerSlogan}</p>
            </div>
            <div>
              <p className="text-white font-extrabold text-sm mb-3 tracking-tight">{T.platformFooter}</p>
              <ul className="space-y-2 text-sm">
                {[T.footerBrowseShops, T.footerHowItWorks, T.footerFreeDelivery, T.footerSahayakAI].map((l) => (
                  <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-extrabold text-sm mb-3 tracking-tight">{T.forShopsFooter}</p>
              <ul className="space-y-2 text-sm">
                {[T.footerListShop, T.footerMuneemAI, T.footerPricing, T.footerDashboard].map((l) => (
                  <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-extrabold text-sm mb-3 tracking-tight">{T.companyFooter}</p>
              <ul className="space-y-2 text-sm">
                {[T.footerAbout, T.footerBlog, T.footerContact, T.footerPrivacy].map((l) => (
                  <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© 2026 Whoosh Technologies Pvt Ltd. Made with 🚀 in Lucknow, UP</p>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Aminabad, Gomti Nagar, Hazratganj — Lucknow</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
