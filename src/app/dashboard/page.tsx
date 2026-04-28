"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles, BarChart3, Package, Users, MessageCircle, TrendingUp, TrendingDown,
  ShoppingBag, Star, Bell, Settings, LogOut, ChevronRight,
  Send, Plus, CheckCircle2,
  Clock, Bike, IndianRupee, RefreshCw, Edit3,
  LayoutDashboard, Receipt,
} from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useToast } from "@/components/Toast";

const SHOP = {
  name: "Rajesh General Store",
  owner: "Rajesh Gupta",
  area: "Aminabad, Lucknow",
  plan: "Pro",
  logo: "https://ui-avatars.com/api/?name=RG&background=5D3FD3&color=fff&size=80&bold=true",
  rating: 4.7,
  reviews: 248,
};

const STATS_DATA_BASE = [
  { key: "todayRevenue",       value: "₹2,840", delta: "+18%", deltaUp: true,  icon: IndianRupee, tile: "icon-tile-purple" },
  { key: "ordaysOrders",       value: "23",      delta: "+5",   deltaUp: true,  icon: ShoppingBag, tile: "icon-tile-mint" },
  { key: "activeCustomers",    value: "142",     delta: "+12",  deltaUp: true,  icon: Users,       tile: "icon-tile-orange" },
  { key: "pendingDeliveries",  value: "4",       delta: "-2",   deltaUp: false, icon: Bike,        tile: "icon-tile-dark" },
];

const ORDERS = [
  { id: "#W1042", customer: "Priya Mishra", items: "Aata 5kg, Dahi, Amul Butter", amount: 421, status: "delivered", time: "10:34 AM", eta: null },
  { id: "#W1041", customer: "Sunita Agarwal", items: "Parle-G x3, Tata Tea, Milk 2L", amount: 224, status: "out_for_delivery", time: "10:12 AM", eta: "~8 min" },
  { id: "#W1040", customer: "Ravi Kumar", items: "Surf Excel, Vim Bar, Lifebuoy", amount: 180, status: "preparing", time: "09:58 AM", eta: "~15 min" },
  { id: "#W1039", customer: "Meena Singh", items: "Rice 2kg, Arhar Dal, Oil 1L", amount: 352, status: "delivered", time: "09:22 AM", eta: null },
  { id: "#W1038", customer: "Anil Verma", items: "Lays x5, Pepsi 2L, Kurkure", amount: 195, status: "delivered", time: "08:45 AM", eta: null },
];

const LOW_STOCK = [
  { name: "Fortune Sunflower Oil 1L", stock: 3, threshold: 10, unit: "bottles" },
  { name: "Amul Ghee 500ml", stock: 2, threshold: 8, unit: "tins" },
  { name: "Pepsi 2L", stock: 0, threshold: 12, unit: "bottles" },
  { name: "Nescafe Classic 50g", stock: 4, threshold: 10, unit: "jars" },
];

const UDHAAR = [
  { name: "Rakesh Yadav", amount: 580, days: 12, phone: "+91 97654 xxxxx" },
  { name: "Pooja Sharma", amount: 320, days: 8, phone: "+91 98765 xxxxx" },
  { name: "Mohit Tiwari", amount: 150, days: 3, phone: "+91 96543 xxxxx" },
];

const MUNEEM_SUGGESTIONS = [
  { type: "promo", text: "Send Diwali offer broadcast to 87 regular customers?", cta: "Send Broadcast" },
  { type: "stock", text: "Pepsi 2L is out of stock. Draft reorder from distributor?", cta: "Draft Order" },
  { type: "customer", text: "14 customers haven't ordered in 3+ weeks. Re-engage them?", cta: "Send Message" },
];

const STATUS_STYLE: Record<string, { label: string; chip: string }> = {
  delivered: { label: "Delivered", chip: "chip chip-mint" },
  out_for_delivery: { label: "Out for delivery", chip: "chip chip-purple" },
  preparing: { label: "Preparing", chip: "chip chip-orange" },
  cancelled: { label: "Cancelled", chip: "chip chip-dark" },
};

// Reusable AI gradient sparkle avatar
function MuneemAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const wrap = size === "sm" ? "w-8 h-8 rounded-xl" : size === "lg" ? "w-12 h-12 rounded-2xl" : "w-10 h-10 rounded-2xl";
  const inner = size === "sm" ? "w-[28px] h-[28px] rounded-[10px]" : size === "lg" ? "w-[44px] h-[44px] rounded-[14px]" : "w-[36px] h-[36px] rounded-[12px]";
  const ic = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <span
      className={`icon-tile ${wrap} shadow-purple shrink-0`}
      style={{ background: "conic-gradient(from 200deg, #5D3FD3, #8366E4, #00D395, #5D3FD3)" }}
    >
      <span className={`${inner} bg-whoosh-purple flex items-center justify-center`}>
        <Sparkles className={`${ic} text-white`} />
      </span>
    </span>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "inventory" | "customers" | "muneem">("overview");
  const [muneemInput, setMuneemInput] = useState("");
  const [muneemChat, setMuneemChat] = useState([
    { role: "muneem", text: "Namaskar Rajesh bhai sahab! 🙏 Aaj ki updates: 23 orders, ₹2,840 revenue. Ek suggestion hai — Pepsi 2L out of stock hai, restocking karein?" },
  ]);
  const { T } = useLang();
  const { showToast } = useToast();
  const STATS_DATA = STATS_DATA_BASE.map((s) => ({ ...s, label: T[s.key as keyof typeof T] as string }));

  function sendMuneemMessage() {
    if (!muneemInput.trim()) return;
    const msg = muneemInput;
    setMuneemInput("");
    setMuneemChat((prev) => [...prev, { role: "owner", text: msg }]);
    setTimeout(() => {
      setMuneemChat((prev) => [...prev, {
        role: "muneem",
        text: "Ji Rajesh bhai! Main dekhta hoon. " + (msg.toLowerCase().includes("stock") ? "Inventory update kar raha hoon. Aapko 30 minute mein distributor order draft milega." : msg.toLowerCase().includes("promo") ? "Promotional broadcast draft ho raha hai — 87 regular customers ko Diwali offer bhejunga. Aapki approval ke baad send hoga." : "Samajh gaya. Processing kar raha hoon, thodi der mein update dunga. 📊"),
      }]);
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-slate-100 fixed h-full z-20">
        {/* Logo */}
        <div className="p-5 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="icon-tile icon-tile-solid-purple w-9 h-9">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-whoosh-dark">
              Whoosh<span className="text-whoosh-purple">.</span>
            </span>
          </Link>
        </div>

        {/* Shop info */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img src={SHOP.logo} alt={SHOP.name} className="w-10 h-10 rounded-2xl border-2 border-whoosh-purple/30" />
            <div className="min-w-0">
              <p className="font-extrabold text-sm text-whoosh-dark truncate tracking-tight">{SHOP.name}</p>
              <p className="text-xs text-whoosh-muted">{SHOP.area}</p>
              <span className="chip chip-purple text-[10px] mt-1">{SHOP.plan} Plan</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {[
            { id: "overview",  label: T.overview,    icon: LayoutDashboard },
            { id: "orders",    label: T.orders,      icon: ShoppingBag },
            { id: "inventory", label: T.inventory,   icon: Package },
            { id: "customers", label: T.customers,   icon: Users },
            { id: "muneem",    label: T.muneemAITab, icon: Sparkles },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as typeof activeTab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-whoosh-purple-light text-whoosh-purple font-extrabold border-l-[3px] border-whoosh-purple pl-[9px]"
                    : "text-slate-500 hover:bg-slate-50 font-medium"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="leading-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-slate-100 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium text-slate-500 hover:bg-slate-50 transition-all duration-200">
            <Settings className="w-4 h-4" /> {T.settings}
          </button>
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium text-slate-500 hover:bg-slate-50 transition-all duration-200">
            <LogOut className="w-4 h-4" /> {T.exitDashboard}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-60">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="font-display text-xl font-extrabold tracking-tight text-whoosh-dark capitalize">
              {activeTab === "muneem" ? T.muneemAITab : T[activeTab as keyof typeof T] as string}
            </h1>
            <p className="text-xs text-whoosh-muted">Monday, 21 April 2025</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast("3 new orders • 1 low stock alert • 1 udhaar due", "info")}
              className="relative icon-tile icon-tile-purple w-10 h-10 transition-all duration-200 active:scale-90"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-whoosh-green animate-pulse" />
            </button>
            <img src={SHOP.logo} alt="avatar" className="w-9 h-9 rounded-full border-2 border-whoosh-purple/30" />
          </div>
        </header>

        {/* Mobile nav tabs */}
        <div className="md:hidden bg-white border-b border-slate-100 flex overflow-x-auto px-4 py-3 gap-2">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "orders", label: "Orders", icon: ShoppingBag },
            { id: "inventory", label: "Inventory", icon: Package },
            { id: "customers", label: "Customers", icon: Users },
            { id: "muneem", label: "Muneem", icon: Sparkles },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as typeof activeTab)}
                className={`shrink-0 chip ${isActive ? "chip-purple bg-whoosh-purple text-white" : "bg-slate-50 text-whoosh-muted"} transition-all duration-200`}
              >
                <item.icon className="w-3.5 h-3.5" />{item.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome heading */}
              <div>
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-whoosh-dark">
                  Welcome back, {SHOP.owner.split(" ")[0]}
                </h2>
                <p className="text-sm text-whoosh-muted mt-1">Here's what's happening at your shop today.</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS_DATA.map((stat) => (
                  <div key={stat.label} className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`icon-tile ${stat.tile} w-11 h-11`}>
                        <stat.icon className="w-5 h-5" />
                      </span>
                      <span className={`chip ${stat.deltaUp ? "chip-mint" : "chip-orange"} text-[10px]`}>
                        {stat.deltaUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {stat.delta}
                      </span>
                    </div>
                    <p className="font-display text-3xl font-extrabold tracking-tight text-whoosh-dark">{stat.value}</p>
                    <p className="text-sm text-whoosh-muted font-medium mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent orders */}
                <div className="lg:col-span-2 card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-extrabold tracking-tight text-whoosh-dark text-lg">Recent Orders</h3>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-xs font-extrabold text-whoosh-purple hover:underline flex items-center gap-1 transition-all duration-200"
                    >
                      View all <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {ORDERS.slice(0, 3).map((order) => {
                      const st = STATUS_STYLE[order.status];
                      return (
                        <div key={order.id} className="py-3.5 flex items-center gap-3 transition-all duration-200">
                          <span className="icon-tile icon-tile-purple w-9 h-9 shrink-0">
                            <Receipt className="w-4 h-4" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-extrabold text-whoosh-dark tracking-tight">{order.customer}</p>
                              <span className="text-xs text-whoosh-muted">{order.id}</span>
                            </div>
                            <p className="text-xs text-whoosh-muted truncate">{order.items}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-extrabold text-whoosh-dark">₹{order.amount}</p>
                            <span className={st.chip + " text-[10px] mt-1"}>{st.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Muneem suggestions */}
                <div className="card p-6 bg-gradient-to-br from-whoosh-purple-light to-emerald-50 border border-whoosh-purple/15">
                  <div className="flex items-center gap-2.5 mb-4">
                    <MuneemAvatar size="sm" />
                    <h3 className="font-display font-extrabold tracking-tight text-whoosh-dark">
                      <span className="gradient-text-purple">Muneem</span> Suggests
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {MUNEEM_SUGGESTIONS.map((s, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/70 backdrop-blur border border-white">
                        <div className="flex gap-2 items-start mb-3">
                          <Sparkles className="w-3.5 h-3.5 text-whoosh-purple shrink-0 mt-0.5" />
                          <p className="text-xs text-whoosh-dark leading-relaxed">{s.text}</p>
                        </div>
                        <button
                          onClick={() => setActiveTab("muneem")}
                          className="btn-secondary text-xs px-3 py-1.5"
                        >
                          {s.cta} <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Low stock alert */}
              <div className="card p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="icon-tile icon-tile-orange w-9 h-9">
                    <Package className="w-4 h-4" />
                  </span>
                  <h3 className="font-display font-extrabold tracking-tight text-whoosh-dark text-lg">Low / Out of Stock Alert</h3>
                  <span className="chip chip-orange text-[10px] ml-1">{LOW_STOCK.length} items</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {LOW_STOCK.map((item) => (
                    <div key={item.name} className="rounded-2xl p-4 flex items-center justify-between gap-3 bg-cream border border-slate-100">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="icon-tile icon-tile-orange w-9 h-9 shrink-0">
                          <Package className="w-4 h-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-extrabold text-whoosh-dark truncate">{item.name}</p>
                          <p className="text-xs text-whoosh-orange-dark font-extrabold">
                            {item.stock === 0 ? "Out of stock" : `${item.stock} ${item.unit} left`}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => showToast("Reorder draft sent to distributor ✅", "success")}
                        className="btn-inverted shrink-0 text-xs px-3 py-1.5"
                      >
                        {T.reorder}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ORDERS ── */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-whoosh-muted">
                  <span className="font-extrabold text-whoosh-dark">{ORDERS.length}</span> orders today
                </p>
                <button
                  onClick={() => showToast("Orders refreshed ✅", "info")}
                  className="btn-ghost text-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> {T.refresh}
                </button>
              </div>
              <div className="space-y-3">
                {ORDERS.map((order) => {
                  const st = STATUS_STYLE[order.status];
                  return (
                    <div key={order.id} className="card p-4 flex items-center gap-4 transition-all duration-200">
                      <span className="icon-tile icon-tile-purple w-11 h-11 shrink-0">
                        <Receipt className="w-5 h-5" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-extrabold text-whoosh-dark text-sm tracking-tight">{order.customer}</p>
                          <span className="chip bg-slate-100 text-slate-600 text-[10px]">{order.id}</span>
                          <span className={st.chip + " text-[10px]"}>{st.label}</span>
                          {order.eta && (
                            <span className="chip chip-purple text-[10px]">
                              <Clock className="w-3 h-3" />{order.eta}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-whoosh-muted mt-0.5">{order.items}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{order.time}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-display font-extrabold text-whoosh-dark text-base">₹{order.amount}</p>
                        <p className="text-xs text-whoosh-green-dark font-extrabold">Free Delivery</p>
                      </div>
                      <button
                        onClick={() => showToast("Order details — coming soon", "info")}
                        className="btn-ghost text-xs shrink-0"
                      >
                        View
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── INVENTORY ── */}
          {activeTab === "inventory" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-whoosh-muted">
                  18 products · <span className="text-whoosh-orange-dark font-extrabold">4 low stock</span>
                </p>
                <button
                  onClick={() => showToast("Send a photo to Muneem on WhatsApp — it will create the listing automatically! 📸", "info")}
                  className="btn-primary text-xs"
                >
                  <Plus className="w-3.5 h-3.5" /> {T.addProduct}
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Aashirvaad Atta 5kg", sku: "ATT-5KG", price: 255, stock: 45, status: "ok" },
                  { name: "India Gate Basmati 1kg", sku: "BSM-1KG", price: 89, stock: 30, status: "ok" },
                  { name: "Amul Ghee 500ml", sku: "GHE-500", price: 285, stock: 2, status: "low" },
                  { name: "Fortune Oil 1L", sku: "OIL-1L", price: 138, stock: 3, status: "low" },
                  { name: "Pepsi 2L", sku: "PEP-2L", price: 95, stock: 0, status: "out" },
                  { name: "Parle-G 250g", sku: "PRL-250", price: 25, stock: 80, status: "ok" },
                  { name: "Surf Excel 500g", sku: "SRF-500", price: 85, stock: 33, status: "ok" },
                  { name: "Amul Taza Milk 1L", sku: "MLK-1L", price: 62, stock: 40, status: "ok" },
                ].map((item) => {
                  const stockChip =
                    item.status === "ok" ? "chip chip-mint" : item.status === "low" ? "chip chip-orange" : "chip chip-dark";
                  const stockLabel = item.status === "ok" ? "In Stock" : item.status === "low" ? "Low" : "Out";
                  return (
                    <div key={item.name} className="card p-4 flex items-center gap-4 transition-all duration-200">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-whoosh-purple-light to-emerald-50 flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 text-whoosh-purple" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-extrabold text-whoosh-dark tracking-tight">{item.name}</p>
                        <p className="text-xs text-whoosh-muted">SKU · {item.sku}</p>
                      </div>
                      <div className="text-right shrink-0 hidden sm:block">
                        <p className="text-sm font-extrabold text-whoosh-dark">₹{item.price}</p>
                        <p className="text-xs text-whoosh-muted">{item.stock} units</p>
                      </div>
                      <span className={`${stockChip} text-[10px]`}>{stockLabel}</span>
                      <button
                        onClick={() => showToast("Edit product — coming soon! Use Muneem on WhatsApp for now.", "info")}
                        className="btn-ghost text-xs shrink-0"
                      >
                        <span className="icon-tile bg-slate-100 text-slate-600 w-7 h-7">
                          <Edit3 className="w-3.5 h-3.5" />
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── CUSTOMERS ── */}
          {activeTab === "customers" && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Customers", value: "312", icon: Users, tile: "icon-tile-purple" },
                  { label: "Regular (monthly)", value: "142", icon: Star, tile: "icon-tile-mint" },
                  { label: "Udhaar Pending", value: "₹1,050", icon: IndianRupee, tile: "icon-tile-orange" },
                ].map((s) => (
                  <div key={s.label} className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`icon-tile ${s.tile} w-11 h-11`}>
                        <s.icon className="w-5 h-5" />
                      </span>
                    </div>
                    <p className="font-display text-3xl font-extrabold tracking-tight text-whoosh-dark">{s.value}</p>
                    <p className="text-sm text-whoosh-muted font-medium mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Udhaar ledger */}
              <div className="card p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="icon-tile icon-tile-orange w-9 h-9">
                    <IndianRupee className="w-4 h-4" />
                  </span>
                  <h3 className="font-display font-extrabold tracking-tight text-whoosh-dark text-lg">{T.udhaarLedger}</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {UDHAAR.map((u) => (
                    <div key={u.name} className="py-4 flex items-center gap-3 transition-all duration-200">
                      <div className="w-10 h-10 rounded-full bg-whoosh-purple-light flex items-center justify-center shrink-0 font-extrabold text-sm text-whoosh-purple border-2 border-whoosh-purple/20">
                        {u.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-sm text-whoosh-dark tracking-tight">{u.name}</p>
                        <p className="text-xs text-whoosh-muted">{u.days} days pending · {u.phone}</p>
                      </div>
                      <div className="text-right shrink-0 flex items-center gap-3">
                        <p className="font-display font-extrabold text-whoosh-orange-dark text-base">₹{u.amount}</p>
                        <button
                          onClick={() => showToast("Polite reminder sent via WhatsApp ✅", "success")}
                          className="btn-secondary text-xs px-3 py-1.5"
                        >
                          {T.sendReminder}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── MUNEEM AI ── */}
          {activeTab === "muneem" && (
            <div className="max-w-2xl space-y-5">
              {/* Suggestions banner */}
              <div className="card p-6 bg-gradient-to-br from-whoosh-purple-light to-emerald-50 border border-whoosh-purple/15">
                <div className="flex items-center gap-3 mb-3">
                  <MuneemAvatar size="lg" />
                  <div>
                    <p className="font-display font-extrabold tracking-tight text-whoosh-dark text-lg">
                      <span className="gradient-text-purple">Muneem</span>
                    </p>
                    <p className="text-xs text-whoosh-muted">{T.muneemShopAgent} • <span className="badge-pulse">Online</span></p>
                  </div>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {["Restock Pepsi 2L", "Send Diwali broadcast", "Re-engage 14 customers"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setMuneemInput(s)}
                      className="prompt-pill shrink-0"
                    >
                      <Sparkles className="w-3 h-3" />{s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat container */}
              <div className="card p-0 overflow-hidden flex flex-col" style={{ height: "calc(100vh - 360px)" }}>
                {/* Chat */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {muneemChat.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "owner" ? "justify-end" : "justify-start"} items-start gap-2`}>
                      {msg.role === "muneem" && <MuneemAvatar size="sm" />}
                      <div className={msg.role === "owner" ? "bubble-user" : "bubble-bot"}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-100">
                  <div className="bg-slate-50 rounded-2xl flex gap-2 p-2 focus-within:border-whoosh-purple focus-within:shadow-ring border border-transparent transition-all duration-200">
                    <input
                      type="text"
                      value={muneemInput}
                      onChange={(e) => setMuneemInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMuneemMessage()}
                      placeholder="Muneem se baat karein... (Hindi ya English)"
                      className="flex-1 px-3 py-2 bg-transparent text-sm focus:outline-none text-whoosh-dark placeholder:text-slate-400"
                    />
                    <button
                      onClick={sendMuneemMessage}
                      className="w-10 h-10 rounded-2xl bg-whoosh-purple text-white flex items-center justify-center shadow-purple hover:brightness-110 transition-all duration-200 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-whoosh-muted text-center mt-2">Muneem takes actions only after your approval</p>
                </div>
              </div>

              {/* Capabilities */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: TrendingUp, title: "Sales analytics", desc: "Daily & weekly reports", tile: "icon-tile-purple" },
                  { icon: Package, title: "Inventory alerts", desc: "Auto-restock drafts", tile: "icon-tile-mint" },
                  { icon: MessageCircle, title: "WhatsApp broadcasts", desc: "Targeted promos", tile: "icon-tile-orange" },
                  { icon: CheckCircle2, title: "Udhaar reminders", desc: "Polite collection messages", tile: "icon-tile-dark" },
                ].map((c) => (
                  <div key={c.title} className="card p-4 flex items-center gap-3 transition-all duration-200">
                    <span className={`icon-tile ${c.tile} w-10 h-10 shrink-0`}>
                      <c.icon className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-whoosh-dark tracking-tight">{c.title}</p>
                      <p className="text-xs text-whoosh-muted">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
