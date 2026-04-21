"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap, Star, MapPin, MessageCircle, ShoppingCart, ArrowRight,
  CheckCircle2, ChevronRight, Bot, BarChart3, Package,
  Users, Shield, Sparkles, BadgeIndianRupee, Truck,
  Store, Phone, Clock, TrendingUp, Quote,
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
    { step: "03", icon: Truck,         title: T.step3ConsumerTitle, desc: T.step3ConsumerDesc },
  ];

  const HOW_IT_WORKS_SHOP = [
    { step: "01", icon: Store,     title: T.step1ShopTitle, desc: T.step1ShopDesc },
    { step: "02", icon: Bot,       title: T.step2ShopTitle, desc: T.step2ShopDesc },
    { step: "03", icon: TrendingUp,title: T.step3ShopTitle, desc: T.step3ShopDesc },
  ];

  const FEATURES_CONSUMER = [
    { icon: Zap,              title: T.freeDelivery,  desc: T.freeDeliveryDesc },
    { icon: MessageCircle,    title: T.whatsappFirst, desc: T.whatsappFirstDesc },
    { icon: Bot,              title: T.sahayakAI,     desc: T.sahayakAIDesc },
    { icon: BadgeIndianRupee, title: T.digitalUdhaar, desc: T.digitalUdhaarDesc },
    { icon: Users,            title: T.groupBuying,   desc: T.groupBuyingDesc },
    { icon: Phone,            title: T.voiceOrdering, desc: T.voiceOrderingDesc },
  ];

  const FEATURES_SHOP = [
    { icon: Store,    title: T.yourStorefront, desc: T.yourstorefrontDesc },
    { icon: Bot,      title: T.muneemAI,       desc: T.muneemAIDesc },
    { icon: Package,  title: T.stockMgmt,      desc: T.stockMgmtDesc },
    { icon: BarChart3,title: T.smartAnalytics, desc: T.smartAnalyticsDesc },
    { icon: TrendingUp,title: T.autoPromos,    desc: T.autoPromosDesc },
    { icon: Shield,   title: T.ondcReady,      desc: T.ondcReadyDesc },
  ];

  const PLANS = [
    {
      name: T.starter,
      price: 299,
      color: "border-gray-200",
      buttonClass: "bg-[#1E293B] hover:bg-gray-800 text-white",
      features: [T.starterFeat1, T.starterFeat2, T.starterFeat3, T.starterFeat4, T.starterFeat5],
    },
    {
      name: T.pro,
      price: 699,
      color: "border-[#FF8C42] ring-2 ring-[#FF8C42]",
      buttonClass: "bg-[#FF8C42] hover:bg-orange-500 text-white shadow-orange",
      popular: true,
      features: [T.proFeat1, T.proFeat2, T.proFeat3, T.proFeat4, T.proFeat5, T.proFeat6, T.proFeat7],
    },
    {
      name: T.elite,
      price: 1499,
      color: "border-[#6B46C1] ring-2 ring-[#6B46C1]",
      buttonClass: "bg-[#6B46C1] hover:bg-purple-700 text-white",
      features: [T.eliteFeat1, T.eliteFeat2, T.eliteFeat3, T.eliteFeat4, T.eliteFeat5, T.eliteFeat6, T.eliteFeat7],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar variant="landing" />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-hero pt-16 pb-20 px-4">
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 bg-white border border-orange-200 px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-sm font-semibold text-[#1E293B]">{T.lucknowPilot}</span>
                <Sparkles className="w-4 h-4 text-[#FF8C42]" />
              </div>

              <div className="space-y-3">
                <h1 className="text-5xl lg:text-6xl font-black text-[#1E293B] leading-tight tracking-tight">
                  {T.heroTitle}{" "}
                  <span className="gradient-text">{T.heroTitleAccent}</span>
                </h1>
                <p className="text-xl text-[#64748B] font-medium leading-relaxed">
                  {T.heroSubtitle}
                  <br />
                  <span className="text-[#FF8C42] font-bold">{T.heroSub2}</span>
                  <br />
                  <span className="text-[#6B46C1] font-bold">{T.heroSub3}</span>
                </p>
                <p className="text-base text-[#64748B]">{T.heroHindi}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/shops" className="flex items-center gap-2 bg-[#FF8C42] hover:bg-orange-500 text-white px-7 py-3.5 rounded-2xl font-bold text-base shadow-orange hover:shadow-orange transition-all hover:scale-105 active:scale-95">
                  <ShoppingCart className="w-5 h-5" />
                  {T.orderNowFree}
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 bg-white border-2 border-[#6B46C1] text-[#6B46C1] hover:bg-purple-50 px-7 py-3.5 rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-95">
                  <Store className="w-5 h-5" />
                  {T.listMyShop}
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-2">
                  {["PM", "RS", "SA", "MV"].map((initials, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: ["#FF8C42", "#6B46C1", "#10B981", "#3B82F6"][i] }}>
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-xs text-[#64748B]">{T.socialProof}</p>
                </div>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative w-72 animate-float">
                <div className="bg-[#1E293B] rounded-[2.5rem] p-3 shadow-2xl">
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#FF8C42] flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white fill-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">Sahayak by Whoosh</p>
                        <p className="text-green-300 text-xs">online</p>
                      </div>
                    </div>
                    <div className="bg-[#ECE5DD] p-3 h-[340px] space-y-2 overflow-hidden">
                      <div className="flex justify-start">
                        <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[85%]">
                          <p className="text-xs text-[#1E293B]">Namaste Priya ji! 🙏 Aata 2 din mein khatam ho sakta hai. Order kar dun?</p>
                          <p className="text-[10px] text-[#64748B] text-right mt-1">10:24 AM</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-[#DCF8C6] rounded-xl rounded-tr-sm px-3 py-2 shadow-sm max-w-[80%]">
                          <p className="text-xs text-[#1E293B]">Haan kar do! 5kg Aashirvaad</p>
                          <p className="text-[10px] text-[#64748B] text-right mt-1">10:25 AM</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[90%]">
                          <p className="text-xs text-[#1E293B]">✅ Done! Ordered from Rajesh General Store.</p>
                          <p className="text-xs font-semibold text-[#FF8C42]">₹255 • Free Delivery • ~12 min</p>
                          <p className="text-[10px] text-[#64748B] text-right mt-1">10:25 AM ✓✓</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[90%]">
                          <p className="text-xs text-[#1E293B]">📦 Delivery partner assigned. Estimated arrival: 10:38 AM</p>
                          <p className="text-[10px] text-[#64748B] text-right mt-1">10:26 AM ✓✓</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[90%]">
                          <p className="text-xs text-[#1E293B]">🛵 Raju bhai is 3 min away! Step outside 😊</p>
                          <p className="text-[10px] text-[#64748B] text-right mt-1">10:35 AM ✓✓</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-10 top-8 bg-white rounded-2xl px-3 py-2 shadow-card border border-green-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-green-600 fill-green-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#1E293B]">{T.freeDelivery}</p>
                      <p className="text-[9px] text-[#64748B]">Always ₹0</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -left-12 bottom-12 bg-white rounded-2xl px-3 py-2 shadow-card border border-orange-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <Clock className="w-3.5 h-3.5 text-[#FF8C42]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#1E293B]">12 min</p>
                      <p className="text-[9px] text-[#64748B]">{lang === "en" ? "Avg delivery" : "औसत डिलीवरी"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#1E293B] py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="text-3xl font-black text-[#FF8C42] mb-1">{stat.value}</p>
              <p className="text-sm text-gray-300">{lang === "en" ? stat.label : stat.hindiLabel}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#FF8C42] font-semibold text-sm mb-2 tracking-wide uppercase">{T.howItWorksTag}</p>
            <h2 className="text-4xl font-black text-[#1E293B] mb-3">{T.howItWorksTitle}</h2>
            <p className="text-[#64748B] text-lg">{T.howItWorksSubtitle}</p>
            <div className="inline-flex mt-8 bg-gray-100 p-1 rounded-2xl gap-1">
              <button onClick={() => setActiveTab("consumer")}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "consumer" ? "bg-[#FF8C42] text-white shadow-sm" : "text-[#64748B] hover:text-[#1E293B]"}`}>
                {T.forConsumers}
              </button>
              <button onClick={() => setActiveTab("shop")}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "shop" ? "bg-[#6B46C1] text-white shadow-sm" : "text-[#64748B] hover:text-[#1E293B]"}`}>
                {T.forShopOwners}
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(activeTab === "consumer" ? HOW_IT_WORKS_CONSUMER : HOW_IT_WORKS_SHOP).map((step) => (
              <div key={step.step} className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${activeTab === "consumer" ? "bg-orange-50" : "bg-purple-50"}`}>
                  <step.icon className={`w-6 h-6 ${activeTab === "consumer" ? "text-[#FF8C42]" : "text-[#6B46C1]"}`} />
                </div>
                <div className={`absolute top-4 right-4 text-4xl font-black opacity-10 ${activeTab === "consumer" ? "text-[#FF8C42]" : "text-[#6B46C1]"}`}>
                  {step.step}
                </div>
                <h3 className="font-bold text-[#1E293B] text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI AGENTS ── */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#6B46C1] font-semibold text-sm mb-2 tracking-wide uppercase">{T.aiAgentsTag}</p>
            <h2 className="text-4xl font-black text-[#1E293B] mb-3">{T.agentsTitle}</h2>
            <p className="text-[#64748B] text-lg">{T.agentsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-card border border-orange-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#E87030] flex items-center justify-center shadow-orange">
                  <Bot className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#1E293B]">{lang === "en" ? "Sahayak" : "सहायक"}</h3>
                  <p className="text-sm text-[#64748B]">{T.sahayakConsumerAgent}</p>
                </div>
              </div>
              <p className="text-[#64748B] text-sm leading-relaxed mb-5">{T.sahayakDesc}</p>
              <ul className="space-y-2.5">
                {[T.autoReorders, T.voiceOrdering, T.medicineTracker, T.priceComparison, T.groupBuying].map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#FF8C42] shrink-0 mt-0.5" />
                    <span className="text-[#1E293B]">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-card border border-purple-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6B46C1] to-[#553C9A] flex items-center justify-center">
                  <BarChart3 className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#1E293B]">{lang === "en" ? "Muneem" : "मुनीम"}</h3>
                  <p className="text-sm text-[#64748B]">{T.muneemShopAgent}</p>
                </div>
              </div>
              <p className="text-[#64748B] text-sm leading-relaxed mb-5">{T.muneemDesc}</p>
              <ul className="space-y-2.5">
                {[T.listingsFromPhoto, T.targetedPromos, T.udhaarTracking, T.festivalDemand, T.reEngages].map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#6B46C1] shrink-0 mt-0.5" />
                    <span className="text-[#1E293B]">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-[#FF8C42]" />
              </div>
              <h2 className="text-2xl font-black text-[#1E293B]">{T.featConsumers}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES_CONSUMER.map((feat) => (
                <div key={feat.title} className="p-5 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-3 group-hover:bg-orange-100 transition-colors">
                    <feat.icon className="w-5 h-5 text-[#FF8C42]" />
                  </div>
                  <h4 className="font-bold text-[#1E293B] mb-1">{feat.title}</h4>
                  <p className="text-sm text-[#64748B] leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
                <Store className="w-4 h-4 text-[#6B46C1]" />
              </div>
              <h2 className="text-2xl font-black text-[#1E293B]">{T.featShops}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES_SHOP.map((feat) => (
                <div key={feat.title} className="p-5 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-3 group-hover:bg-purple-100 transition-colors">
                    <feat.icon className="w-5 h-5 text-[#6B46C1]" />
                  </div>
                  <h4 className="font-bold text-[#1E293B] mb-1">{feat.title}</h4>
                  <p className="text-sm text-[#64748B] leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 bg-[#1E293B]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#FF8C42] font-semibold text-sm mb-2 uppercase tracking-wide">{T.realStoriesTag}</p>
            <h2 className="text-4xl font-black text-white mb-2">{T.testimonialsTitle}</h2>
            <p className="text-gray-400">{T.realStoriesSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <Quote className="w-6 h-6 text-[#FF8C42] mb-4 opacity-60" />
                <p className="text-gray-300 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role} · {t.area}</p>
                  </div>
                  <div className="ml-auto flex">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#FF8C42] font-semibold text-sm mb-2 uppercase tracking-wide">{T.pricingTag}</p>
            <h2 className="text-4xl font-black text-[#1E293B] mb-3">{T.pricingTitle}</h2>
            <p className="text-[#64748B] text-lg">{T.pricingSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`relative bg-white rounded-3xl p-7 border-2 ${plan.color} flex flex-col`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF8C42] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-orange">
                    {T.mostPopular}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-black text-[#1E293B]">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-[#1E293B]">₹{plan.price}</span>
                    <span className="text-[#64748B] text-sm">{T.perMonth}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-7">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="text-[#1E293B]">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard" className={`w-full py-3 rounded-2xl font-bold text-sm text-center transition-all hover:scale-105 active:scale-95 ${plan.buttonClass}`}>
                  {T.getStarted}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#FF8C42] to-[#E87030]">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <h2 className="text-4xl font-black leading-tight">{T.ctaTitle}</h2>
          <p className="text-base opacity-80">{T.ctaDesc}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/shops" className="flex items-center gap-2 bg-white text-[#FF8C42] px-7 py-3.5 rounded-2xl font-bold hover:shadow-lg transition-all hover:scale-105">
              <ShoppingCart className="w-5 h-5" />
              {T.startShoppingFreeBtn}
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2 bg-white/20 border border-white/40 text-white px-7 py-3.5 rounded-2xl font-bold hover:bg-white/30 transition-all hover:scale-105">
              <Store className="w-5 h-5" />
              {T.listMyShop}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
            <MessageCircle className="w-4 h-4" />
            <span>{T.orWhatsapp} <strong className="text-white">+91 98765 00000</strong></span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1E293B] text-gray-400 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-[#FF8C42] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="text-white font-black text-lg">Whoosh</span>
              </div>
              <p className="text-sm leading-relaxed">{T.footerDesc}</p>
              <p className="text-xs mt-2 text-gray-500">{T.footerSlogan}</p>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-3">{T.platformFooter}</p>
              <ul className="space-y-2 text-sm">
                {[T.footerBrowseShops, T.footerHowItWorks, T.footerFreeDelivery, T.footerSahayakAI].map(l => (
                  <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-3">{T.forShopsFooter}</p>
              <ul className="space-y-2 text-sm">
                {[T.footerListShop, T.footerMuneemAI, T.footerPricing, T.footerDashboard].map(l => (
                  <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-3">{T.companyFooter}</p>
              <ul className="space-y-2 text-sm">
                {[T.footerAbout, T.footerBlog, T.footerContact, T.footerPrivacy].map(l => (
                  <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <p>© 2026 Whoosh Technologies Pvt Ltd. Made with ❤️ in Lucknow, UP</p>
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
