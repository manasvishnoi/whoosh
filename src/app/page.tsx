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

const HOW_IT_WORKS_CONSUMER = [
  { step: "01", icon: MessageCircle, title: "Send a WhatsApp message", hindi: "व्हाट्सएप पर लिखें", desc: "Text, voice note, or even send a photo of your shopping list. Sahayak understands Hindi & English." },
  { step: "02", icon: Store, title: "Sahayak finds the best shop", hindi: "सहायक दुकान चुनता है", desc: "Your AI agent scans nearby kiranas, compares prices, and picks the best option for you." },
  { step: "03", icon: Truck, title: "Free delivery in 15–30 min", hindi: "मुफ्त डिलीवरी 15-30 मिनट में", desc: "Order placed, delivery partner assigned. You get live updates — in plain language, no jargon." },
];

const HOW_IT_WORKS_SHOP = [
  { step: "01", icon: Store, title: "Sign up in 5 minutes", hindi: "5 मिनट में रजिस्टर करें", desc: "Share your shop name, address, and a basic price list via WhatsApp. Muneem builds your storefront." },
  { step: "02", icon: Bot, title: "Muneem runs your digital shop", hindi: "मुनीम संभालता है", desc: "Muneem handles customer queries, sends promos, tracks udhaar, and manages your inventory." },
  { step: "03", icon: TrendingUp, title: "Watch your orders grow", hindi: "ऑर्डर बढ़ते देखें", desc: "Track everything in your dashboard. Get daily reports. More customers, less effort." },
];

const FEATURES_CONSUMER = [
  { icon: Zap, title: "Free Delivery", hindi: "मुफ्त डिलीवरी", desc: "Always free. No minimum, no surprises, no delivery charges ever." },
  { icon: MessageCircle, title: "WhatsApp First", hindi: "व्हाट्सएप पर", desc: "No app download needed. Order in Hindi, English, or both." },
  { icon: Bot, title: "Sahayak AI Agent", hindi: "सहायक एआई", desc: "Your personal shopping agent — auto-reorders, medicine reminders, price comparison." },
  { icon: BadgeIndianRupee, title: "Digital Udhaar", hindi: "डिजिटल उधार", desc: "The trusted khata system, now digital. Shop on credit from your regular kirana." },
  { icon: Users, title: "Group Buying", hindi: "ग्रुप खरीदारी", desc: "Sahayak clubs your order with neighbours for extra discounts." },
  { icon: Phone, title: "Voice Ordering", hindi: "आवाज़ से ऑर्डर", desc: "Just speak — Sahayak understands Hindi voice notes perfectly." },
];

const FEATURES_SHOP = [
  { icon: Store, title: "Your Storefront", hindi: "आपकी दुकान ऑनलाइन", desc: "A full mini-website for your shop on Whoosh. Customize, promote, share the link." },
  { icon: Bot, title: "Muneem AI Agent", hindi: "मुनीम एआई", desc: "24/7 sales assistant on WhatsApp. Takes orders, sends promos, manages udhaar." },
  { icon: Package, title: "Stock Management", hindi: "स्टॉक मैनेजमेंट", desc: "Auto-tracks inventory, predicts restock needs, draft orders from distributors." },
  { icon: BarChart3, title: "Smart Analytics", hindi: "स्मार्ट एनालिटिक्स", desc: "Daily reports on revenue, top products, repeat customers, dead stock." },
  { icon: TrendingUp, title: "Auto Promotions", hindi: "ऑटो प्रमोशन", desc: "Muneem sends targeted WhatsApp offers based on customer buying patterns." },
  { icon: Shield, title: "ONDC Ready", hindi: "ONDC तैयार", desc: "Get discovered by consumers beyond your immediate area on India's open network." },
];

const PLANS = [
  {
    name: "Starter",
    hindi: "शुरुआती",
    price: 299,
    color: "border-gray-200",
    buttonClass: "bg-whoosh-dark hover:bg-gray-800 text-white",
    features: ["Your shop storefront", "WhatsApp ordering", "Basic Muneem AI", "Up to 100 products", "Email support"],
  },
  {
    name: "Pro",
    hindi: "प्रो",
    price: 699,
    color: "border-whoosh-orange ring-2 ring-whoosh-orange",
    buttonClass: "bg-whoosh-orange hover:bg-orange-500 text-white shadow-orange",
    popular: true,
    features: ["Everything in Starter", "Full Muneem AI agent", "Auto-promotions", "Udhaar ledger", "Inventory management", "Customer analytics", "Priority support"],
  },
  {
    name: "Elite",
    hindi: "एलीट",
    price: 1499,
    color: "border-whoosh-purple ring-2 ring-whoosh-purple",
    buttonClass: "bg-whoosh-purple hover:bg-purple-700 text-white shadow-purple",
    features: ["Everything in Pro", "Festival demand forecasting", "ONDC integration", "Micro-insurance add-on", "B2B wholesale layer", "Dedicated onboarding manager", "24/7 WhatsApp support"],
  },
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"consumer" | "shop">("consumer");

  return (
    <div className="min-h-screen bg-white">
      <Navbar variant="landing" />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-hero pt-16 pb-20 px-4">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-7">
              {/* Pill */}
              <div className="inline-flex items-center gap-2 bg-white border border-orange-200 px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 rounded-full bg-whoosh-green animate-pulse" />
                <span className="text-sm font-semibold text-whoosh-dark">Lucknow Pilot — Now Live</span>
                <Sparkles className="w-4 h-4 text-whoosh-orange" />
              </div>

              <div className="space-y-3">
                <h1 className="text-5xl lg:text-6xl font-black text-whoosh-dark leading-tight tracking-tight">
                  Whoosh —{" "}
                  <span className="gradient-text">और वो आ गया!</span>
                </h1>
                <p className="text-xl text-whoosh-muted font-medium leading-relaxed">
                  India&apos;s first hyperlocal agentic commerce platform.
                  <br />
                  <span className="text-whoosh-orange font-bold">Free delivery</span> from your neighbourhood kirana.
                  <br />
                  <span className="text-whoosh-purple font-bold">AI agents</span> for shops and consumers.
                </p>
                <p className="text-base text-whoosh-muted hindi">
                  दुकान आपकी, तकनीक हमारी। डिलीवरी मुफ्त।
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/shops"
                  className="flex items-center gap-2 bg-whoosh-orange hover:bg-orange-500 text-white px-7 py-3.5 rounded-2xl font-bold text-base shadow-orange hover:shadow-orange transition-all hover:scale-105 active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Order Now — Free
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 bg-white border-2 border-whoosh-purple text-whoosh-purple hover:bg-purple-50 px-7 py-3.5 rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-95"
                >
                  <Store className="w-5 h-5" />
                  List My Shop
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-2">
                  {["PM", "RS", "SA", "MV"].map((initials, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: ["#FF8C42", "#6B46C1", "#10B981", "#3B82F6"][i] }}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-xs text-whoosh-muted">500+ happy consumers in Lucknow</p>
                </div>
              </div>
            </div>

            {/* Right — Phone mockup */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative w-72 animate-float">
                {/* Phone frame */}
                <div className="bg-whoosh-dark rounded-[2.5rem] p-3 shadow-2xl">
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    {/* WhatsApp-style chat */}
                    <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-whoosh-orange flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white fill-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">Sahayak by Whoosh</p>
                        <p className="text-green-300 text-xs">online</p>
                      </div>
                    </div>
                    <div className="bg-[#ECE5DD] p-3 h-[340px] space-y-2 overflow-hidden">
                      {/* Chat bubbles */}
                      <div className="flex justify-start">
                        <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[85%]">
                          <p className="text-xs text-whoosh-dark">Namaste Priya ji! 🙏 Aata 2 din mein khatam ho sakta hai. Order kar dun?</p>
                          <p className="text-[10px] text-whoosh-muted text-right mt-1">10:24 AM</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-[#DCF8C6] rounded-xl rounded-tr-sm px-3 py-2 shadow-sm max-w-[80%]">
                          <p className="text-xs text-whoosh-dark">Haan kar do! 5kg Aashirvaad</p>
                          <p className="text-[10px] text-whoosh-muted text-right mt-1">10:25 AM</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[90%]">
                          <p className="text-xs text-whoosh-dark">✅ Done! Ordered from Rajesh General Store.</p>
                          <p className="text-xs text-whoosh-dark font-semibold text-whoosh-orange">₹255 • Free Delivery • ~12 min</p>
                          <p className="text-[10px] text-whoosh-muted text-right mt-1">10:25 AM ✓✓</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[90%]">
                          <p className="text-xs text-whoosh-dark">📦 Delivery partner assigned. Estimated arrival: 10:38 AM</p>
                          <p className="text-[10px] text-whoosh-muted text-right mt-1">10:26 AM ✓✓</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[90%]">
                          <p className="text-xs text-whoosh-dark">🛵 Raju bhai is 3 min away! Step outside 😊</p>
                          <p className="text-[10px] text-whoosh-muted text-right mt-1">10:35 AM ✓✓</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -right-10 top-8 bg-white rounded-2xl px-3 py-2 shadow-card border border-green-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-green-600 fill-green-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-whoosh-dark">Free Delivery</p>
                      <p className="text-[9px] text-whoosh-muted">Always ₹0</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-12 bottom-12 bg-white rounded-2xl px-3 py-2 shadow-card border border-orange-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <Clock className="w-3.5 h-3.5 text-whoosh-orange" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-whoosh-dark">12 min</p>
                      <p className="text-[9px] text-whoosh-muted">Avg delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-whoosh-dark py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="text-3xl font-black text-whoosh-orange mb-1">{stat.value}</p>
              <p className="text-sm text-gray-300">{stat.label}</p>
              <p className="text-xs text-gray-500 hindi mt-0.5">{stat.hindiLabel}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-whoosh-orange font-semibold text-sm mb-2 tracking-wide uppercase">How it works</p>
            <h2 className="text-4xl font-black text-whoosh-dark mb-3">Kaise kaam karta hai?</h2>
            <p className="text-whoosh-muted text-lg">Designed for both sides of the hyperlocal economy.</p>

            {/* Tab switcher */}
            <div className="inline-flex mt-8 bg-gray-100 p-1 rounded-2xl gap-1">
              <button
                onClick={() => setActiveTab("consumer")}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "consumer" ? "bg-whoosh-orange text-white shadow-sm" : "text-whoosh-muted hover:text-whoosh-dark"}`}
              >
                For Consumers
              </button>
              <button
                onClick={() => setActiveTab("shop")}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "shop" ? "bg-whoosh-purple text-white shadow-sm" : "text-whoosh-muted hover:text-whoosh-dark"}`}
              >
                For Shop Owners
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {(activeTab === "consumer" ? HOW_IT_WORKS_CONSUMER : HOW_IT_WORKS_SHOP).map((step) => (
              <div key={step.step} className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${activeTab === "consumer" ? "bg-orange-50" : "bg-purple-50"}`}>
                  <step.icon className={`w-6 h-6 ${activeTab === "consumer" ? "text-whoosh-orange" : "text-whoosh-purple"}`} />
                </div>
                <div className={`absolute top-4 right-4 text-4xl font-black opacity-10 ${activeTab === "consumer" ? "text-whoosh-orange" : "text-whoosh-purple"}`}>
                  {step.step}
                </div>
                <h3 className="font-bold text-whoosh-dark text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-whoosh-muted hindi mb-2">{step.hindi}</p>
                <p className="text-sm text-whoosh-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI AGENTS ── */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-whoosh-purple font-semibold text-sm mb-2 tracking-wide uppercase">AI Agents</p>
            <h2 className="text-4xl font-black text-whoosh-dark mb-3">Meet Sahayak & Muneem</h2>
            <p className="text-whoosh-muted text-lg">Two autonomous AI agents — one for consumers, one for shops. Not chatbots. Agents.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sahayak */}
            <div className="bg-white rounded-3xl p-8 shadow-card border border-orange-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-saffron flex items-center justify-center shadow-orange">
                  <Bot className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-whoosh-dark">Sahayak</h3>
                  <p className="text-sm text-whoosh-muted">सहायक — Consumer AI Agent</p>
                </div>
              </div>
              <p className="text-whoosh-muted text-sm leading-relaxed mb-5">
                Your personal shopping agent on WhatsApp. Sahayak knows when your aata is about to run out, finds the best price, places the order, and tracks delivery — without you lifting a finger.
              </p>
              <ul className="space-y-2.5">
                {["Auto-reorders essentials before they run out", "Voice ordering in Hindi", "Medicine & prescription tracker", "Price comparison across shops", "Group buying with neighbours"].map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-whoosh-orange shrink-0 mt-0.5" />
                    <span className="text-whoosh-dark">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Muneem */}
            <div className="bg-white rounded-3xl p-8 shadow-card border border-purple-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-purple flex items-center justify-center shadow-purple">
                  <BarChart3 className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-whoosh-dark">Muneem</h3>
                  <p className="text-sm text-whoosh-muted">मुनीम — Shop AI Agent</p>
                </div>
              </div>
              <p className="text-whoosh-muted text-sm leading-relaxed mb-5">
                Your 24/7 digital accountant and sales assistant. Muneem builds product listings from photos, sends promos, manages udhaar, restocks inventory — all while you sleep.
              </p>
              <ul className="space-y-2.5">
                {["Creates product listings from a single photo", "Sends targeted WhatsApp promotions", "Tracks udhaar with smart reminders", "Auto-predicts festival demand", "Re-engages sleeping customers"].map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-whoosh-purple shrink-0 mt-0.5" />
                    <span className="text-whoosh-dark">{feat}</span>
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
          {/* Consumer features */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-whoosh-orange" />
              </div>
              <h2 className="text-2xl font-black text-whoosh-dark">For Consumers</h2>
              <span className="text-sm text-whoosh-muted hindi">— ग्राहकों के लिए</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES_CONSUMER.map((feat) => (
                <div key={feat.title} className="p-5 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-3 group-hover:bg-orange-100 transition-colors">
                    <feat.icon className="w-5 h-5 text-whoosh-orange" />
                  </div>
                  <h4 className="font-bold text-whoosh-dark mb-0.5">{feat.title}</h4>
                  <p className="text-[11px] text-whoosh-muted hindi mb-1">{feat.hindi}</p>
                  <p className="text-sm text-whoosh-muted leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shop features */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
                <Store className="w-4 h-4 text-whoosh-purple" />
              </div>
              <h2 className="text-2xl font-black text-whoosh-dark">For Shop Owners</h2>
              <span className="text-sm text-whoosh-muted hindi">— दुकानदारों के लिए</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES_SHOP.map((feat) => (
                <div key={feat.title} className="p-5 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-3 group-hover:bg-purple-100 transition-colors">
                    <feat.icon className="w-5 h-5 text-whoosh-purple" />
                  </div>
                  <h4 className="font-bold text-whoosh-dark mb-0.5">{feat.title}</h4>
                  <p className="text-[11px] text-whoosh-muted hindi mb-1">{feat.hindi}</p>
                  <p className="text-sm text-whoosh-muted leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 bg-whoosh-dark">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-whoosh-orange font-semibold text-sm mb-2 uppercase tracking-wide">Real Stories</p>
            <h2 className="text-4xl font-black text-white mb-2">Log kya keh rahe hain</h2>
            <p className="text-gray-400">लोग क्या कह रहे हैं — What people are saying</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <Quote className="w-6 h-6 text-whoosh-orange mb-4 opacity-60" />
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
            <p className="text-whoosh-orange font-semibold text-sm mb-2 uppercase tracking-wide">Pricing</p>
            <h2 className="text-4xl font-black text-whoosh-dark mb-3">For Shop Owners</h2>
            <p className="text-whoosh-muted text-lg">Consumers pay zero. Shop owners pay only for services that drive revenue.</p>
            <p className="text-sm text-whoosh-muted hindi mt-1">ग्राहक — बिल्कुल मुफ्त। दुकानदार — सिर्फ उसके लिए जो फायदेमंद हो।</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`relative bg-white rounded-3xl p-7 border-2 ${plan.color} flex flex-col`}>
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-whoosh-orange text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-orange">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-black text-whoosh-dark">{plan.name}</h3>
                  <p className="text-sm text-whoosh-muted hindi">{plan.hindi}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-whoosh-dark">₹{plan.price}</span>
                    <span className="text-whoosh-muted text-sm">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-7">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-whoosh-green shrink-0 mt-0.5" />
                      <span className="text-whoosh-dark">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard" className={`w-full py-3 rounded-2xl font-bold text-sm text-center transition-all hover:scale-105 active:scale-95 ${plan.buttonClass}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-gradient-whoosh">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <h2 className="text-4xl font-black leading-tight">
            Apni dukaan ka digital safar shuru karein
          </h2>
          <p className="text-lg opacity-90 hindi">अपनी दुकान का डिजिटल सफर शुरू करें</p>
          <p className="text-base opacity-80">
            Join 100+ kirana shops already earning more with Whoosh. Free onboarding. First month free.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/shops" className="flex items-center gap-2 bg-white text-whoosh-orange px-7 py-3.5 rounded-2xl font-bold hover:shadow-lg transition-all hover:scale-105">
              <ShoppingCart className="w-5 h-5" />
              Start Shopping Free
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2 bg-white/20 border border-white/40 text-white px-7 py-3.5 rounded-2xl font-bold hover:bg-white/30 transition-all hover:scale-105">
              <Store className="w-5 h-5" />
              List My Shop
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
            <MessageCircle className="w-4 h-4" />
            <span>Or WhatsApp us: <strong className="text-white">+91 98765 00000</strong></span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-whoosh-dark text-gray-400 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-whoosh-orange flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="text-white font-black text-lg">Whoosh</span>
              </div>
              <p className="text-sm leading-relaxed">India&apos;s hyperlocal agentic commerce platform. Empowering kirana shops with AI, while consumers get free delivery.</p>
              <p className="text-xs mt-2 hindi text-gray-500">दुकान आपकी, तकनीक हमारी।</p>
            </div>

            <div>
              <p className="text-white font-semibold text-sm mb-3">Platform</p>
              <ul className="space-y-2 text-sm">
                {["Browse Shops", "How it works", "Free Delivery", "Sahayak AI"].map(l => <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>)}
              </ul>
            </div>

            <div>
              <p className="text-white font-semibold text-sm mb-3">For Shops</p>
              <ul className="space-y-2 text-sm">
                {["List Your Shop", "Muneem AI", "Pricing", "Dashboard"].map(l => <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>)}
              </ul>
            </div>

            <div>
              <p className="text-white font-semibold text-sm mb-3">Company</p>
              <ul className="space-y-2 text-sm">
                {["About Us", "Blog", "Contact", "Privacy Policy"].map(l => <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>)}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <p>© 2025 Whoosh Technologies Pvt Ltd. Made with ❤️ in Lucknow, UP</p>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Aminabad, Gomti Nagar, Hazratganj — Lucknow Pilot</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
