"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap, BarChart3, Package, Users, MessageCircle, TrendingUp,
  ShoppingBag, Star, Bell, Settings, LogOut, ChevronRight,
  ArrowUp, ArrowDown, Bot, Send, Plus, CheckCircle2,
  Clock, Truck, IndianRupee, RefreshCw, Eye, Edit3,
  Store, LayoutDashboard, Receipt,
} from "lucide-react";

const SHOP = {
  name: "Rajesh General Store",
  hindi: "राजेश जनरल स्टोर",
  owner: "Rajesh Gupta",
  area: "Aminabad, Lucknow",
  plan: "Pro",
  logo: "https://ui-avatars.com/api/?name=RG&background=FF8C42&color=fff&size=80&bold=true",
  rating: 4.7,
  reviews: 248,
};

const STATS_DATA = [
  { label: "Today's Revenue", hindi: "आज की कमाई", value: "₹2,840", delta: "+18%", deltaUp: true, icon: IndianRupee, color: "orange" },
  { label: "Orders Today", hindi: "आज के ऑर्डर", value: "23", delta: "+5", deltaUp: true, icon: ShoppingBag, color: "purple" },
  { label: "Active Customers", hindi: "सक्रिय ग्राहक", value: "142", delta: "+12", deltaUp: true, icon: Users, color: "blue" },
  { label: "Pending Deliveries", hindi: "बाकी डिलीवरी", value: "4", delta: "-2", deltaUp: false, icon: Truck, color: "green" },
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
  { type: "promo", text: "Send Diwali offer broadcast to 87 regular customers?", cta: "Send Broadcast", color: "orange" },
  { type: "stock", text: "Pepsi 2L is out of stock. Draft reorder from distributor?", cta: "Draft Order", color: "purple" },
  { type: "customer", text: "14 customers haven't ordered in 3+ weeks. Re-engage them?", cta: "Send Message", color: "blue" },
];

const STATUS_STYLE: Record<string, { label: string; bg: string; text: string }> = {
  delivered: { label: "Delivered", bg: "bg-green-50", text: "text-green-700" },
  out_for_delivery: { label: "Out for delivery", bg: "bg-blue-50", text: "text-blue-700" },
  preparing: { label: "Preparing", bg: "bg-orange-50", text: "text-orange-700" },
  cancelled: { label: "Cancelled", bg: "bg-red-50", text: "text-red-700" },
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "inventory" | "customers" | "muneem">("overview");
  const [muneemInput, setMuneemInput] = useState("");
  const [muneemChat, setMuneemChat] = useState([
    { role: "muneem", text: "Namaskar Rajesh bhai sahab! 🙏 Aaj ki updates: 23 orders, ₹2,840 revenue. Ek suggestion hai — Pepsi 2L out of stock hai, restocking karein?" },
  ]);

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 shadow-sm fixed h-full z-20">
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-black text-whoosh-dark text-lg">Whoosh</span>
          </Link>
        </div>

        {/* Shop info */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img src={SHOP.logo} alt={SHOP.name} className="w-10 h-10 rounded-xl" />
            <div className="min-w-0">
              <p className="font-bold text-sm text-whoosh-dark truncate">{SHOP.name}</p>
              <p className="text-xs text-whoosh-muted">{SHOP.area}</p>
              <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full">{SHOP.plan} Plan</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {[
            { id: "overview", label: "Overview", hindi: "सारांश", icon: LayoutDashboard },
            { id: "orders", label: "Orders", hindi: "ऑर्डर", icon: ShoppingBag },
            { id: "inventory", label: "Inventory", hindi: "स्टॉक", icon: Package },
            { id: "customers", label: "Customers", hindi: "ग्राहक", icon: Users },
            { id: "muneem", label: "Muneem AI", hindi: "मुनीम", icon: Bot },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === item.id ? "bg-orange-50 text-whoosh-orange font-semibold" : "text-whoosh-muted hover:bg-gray-50 hover:text-whoosh-dark"}`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <div className="text-left">
                <p className="leading-tight">{item.label}</p>
                <p className="text-[10px] opacity-60 hindi">{item.hindi}</p>
              </div>
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-gray-100 space-y-0.5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-whoosh-muted hover:bg-gray-50 hover:text-whoosh-dark transition-all">
            <Settings className="w-4 h-4" /> Settings
          </button>
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-whoosh-muted hover:bg-gray-50 hover:text-whoosh-dark transition-all">
            <LogOut className="w-4 h-4" /> Exit Dashboard
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-60">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-lg font-black text-whoosh-dark capitalize">
              {activeTab === "muneem" ? "Muneem AI Agent" : activeTab}
            </h1>
            <p className="text-xs text-whoosh-muted">Monday, 21 April 2025</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-whoosh-muted" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-whoosh-orange" />
            </button>
            <img src={SHOP.logo} alt="avatar" className="w-8 h-8 rounded-xl" />
          </div>
        </header>

        {/* Mobile nav tabs */}
        <div className="md:hidden bg-white border-b border-gray-100 flex overflow-x-auto px-4 py-2 gap-2">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "orders", label: "Orders", icon: ShoppingBag },
            { id: "inventory", label: "Inventory", icon: Package },
            { id: "customers", label: "Customers", icon: Users },
            { id: "muneem", label: "Muneem", icon: Bot },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${activeTab === item.id ? "bg-whoosh-orange text-white border-whoosh-orange" : "border-gray-200 text-whoosh-muted"}`}>
              <item.icon className="w-3.5 h-3.5" />{item.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS_DATA.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-card border border-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${stat.color}-50`}>
                        <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
                      </div>
                      <span className={`flex items-center gap-0.5 text-xs font-bold ${stat.deltaUp ? "text-green-600" : "text-red-500"}`}>
                        {stat.deltaUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {stat.delta}
                      </span>
                    </div>
                    <p className="text-2xl font-black text-whoosh-dark">{stat.value}</p>
                    <p className="text-xs text-whoosh-muted mt-0.5">{stat.label}</p>
                    <p className="text-[10px] text-whoosh-muted hindi opacity-70">{stat.hindi}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent orders */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-gray-50 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-whoosh-dark">Recent Orders</h3>
                    <button onClick={() => setActiveTab("orders")} className="text-xs font-semibold text-whoosh-orange hover:underline flex items-center gap-1">
                      View all <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {ORDERS.slice(0, 3).map((order) => {
                      const st = STATUS_STYLE[order.status];
                      return (
                        <div key={order.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                          <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                            <Receipt className="w-4 h-4 text-whoosh-orange" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-whoosh-dark">{order.customer}</p>
                              <span className="text-xs text-whoosh-muted">{order.id}</span>
                            </div>
                            <p className="text-xs text-whoosh-muted truncate">{order.items}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-whoosh-dark">₹{order.amount}</p>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${st.bg} ${st.text}`}>{st.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Muneem suggestions */}
                <div className="bg-white rounded-2xl shadow-card border border-gray-50 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-purple flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-whoosh-dark">Muneem Suggests</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {MUNEEM_SUGGESTIONS.map((s, i) => (
                      <div key={i} className={`p-3 rounded-xl bg-${s.color}-50 border border-${s.color}-100`}>
                        <p className="text-xs text-whoosh-dark leading-relaxed mb-2">{s.text}</p>
                        <button
                          onClick={() => setActiveTab("muneem")}
                          className={`text-xs font-bold text-${s.color}-600 hover:text-${s.color}-800 flex items-center gap-1 transition-colors`}
                        >
                          {s.cta} <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Low stock alert */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-whoosh-dark">Low / Out of Stock Alert</h3>
                  <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full ml-1">{LOW_STOCK.length} items</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {LOW_STOCK.map((item) => (
                    <div key={item.name} className="bg-white rounded-xl p-3 flex items-center justify-between gap-2 shadow-sm">
                      <div>
                        <p className="text-sm font-semibold text-whoosh-dark">{item.name}</p>
                        <p className={`text-xs font-bold ${item.stock === 0 ? "text-red-500" : "text-orange-500"}`}>
                          {item.stock === 0 ? "Out of stock" : `${item.stock} ${item.unit} left`}
                        </p>
                      </div>
                      <button className="shrink-0 px-3 py-1.5 rounded-lg bg-whoosh-dark text-white text-xs font-semibold hover:bg-gray-800 transition-colors">
                        Reorder
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
                <p className="text-sm text-whoosh-muted"><span className="font-bold text-whoosh-dark">{ORDERS.length}</span> orders today</p>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-whoosh-orange">
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow-card border border-gray-50 overflow-hidden">
                {ORDERS.map((order) => {
                  const st = STATUS_STYLE[order.status];
                  return (
                    <div key={order.id} className="px-5 py-4 flex items-center gap-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                        <Receipt className="w-5 h-5 text-whoosh-orange" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-whoosh-dark text-sm">{order.customer}</p>
                          <span className="text-xs text-whoosh-muted bg-gray-100 px-2 py-0.5 rounded-full">{order.id}</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${st.bg} ${st.text}`}>{st.label}</span>
                          {order.eta && <span className="flex items-center gap-1 text-xs text-blue-600"><Clock className="w-3 h-3" />{order.eta}</span>}
                        </div>
                        <p className="text-xs text-whoosh-muted mt-0.5">{order.items}</p>
                        <p className="text-[11px] text-whoosh-muted mt-0.5">{order.time}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-black text-whoosh-dark text-base">₹{order.amount}</p>
                        <p className="text-xs text-whoosh-green font-semibold">Free Delivery</p>
                      </div>
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
                <p className="text-sm text-whoosh-muted">18 products · <span className="text-red-500 font-semibold">4 low stock</span></p>
                <button className="flex items-center gap-1.5 bg-whoosh-orange text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-orange-500 transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add Product
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow-card border border-gray-50 overflow-hidden">
                <div className="grid grid-cols-12 px-5 py-2.5 text-[11px] font-bold text-whoosh-muted uppercase tracking-wide border-b border-gray-100 bg-gray-50/50">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-right">Stock</div>
                  <div className="col-span-2 text-right">Status</div>
                  <div className="col-span-1" />
                </div>
                {[
                  { name: "Aashirvaad Atta 5kg", price: 255, stock: 45, status: "ok" },
                  { name: "India Gate Basmati 1kg", price: 89, stock: 30, status: "ok" },
                  { name: "Amul Ghee 500ml", price: 285, stock: 2, status: "low" },
                  { name: "Fortune Oil 1L", price: 138, stock: 3, status: "low" },
                  { name: "Pepsi 2L", price: 95, stock: 0, status: "out" },
                  { name: "Parle-G 250g", price: 25, stock: 80, status: "ok" },
                  { name: "Surf Excel 500g", price: 85, stock: 33, status: "ok" },
                  { name: "Amul Taza Milk 1L", price: 62, stock: 40, status: "ok" },
                ].map((item) => (
                  <div key={item.name} className="grid grid-cols-12 px-5 py-3.5 items-center border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="col-span-5 text-sm font-semibold text-whoosh-dark">{item.name}</div>
                    <div className="col-span-2 text-right text-sm font-bold text-whoosh-dark">₹{item.price}</div>
                    <div className="col-span-2 text-right text-sm text-whoosh-muted">{item.stock}</div>
                    <div className="col-span-2 text-right">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${item.status === "ok" ? "bg-green-50 text-green-700" : item.status === "low" ? "bg-orange-50 text-orange-700" : "bg-red-50 text-red-600"}`}>
                        {item.status === "ok" ? "In Stock" : item.status === "low" ? "Low" : "Out"}
                      </span>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                        <Edit3 className="w-3.5 h-3.5 text-whoosh-muted" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CUSTOMERS ── */}
          {activeTab === "customers" && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Total Customers", value: "312", icon: Users, bg: "bg-blue-50", ic: "text-blue-500" },
                  { label: "Regular (monthly)", value: "142", icon: Star, bg: "bg-yellow-50", ic: "text-yellow-500" },
                  { label: "Udhaar Pending", value: "₹1,050", icon: IndianRupee, bg: "bg-red-50", ic: "text-red-500" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 shadow-card border border-gray-50 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center shrink-0`}>
                      <s.icon className={`w-6 h-6 ${s.ic}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-whoosh-dark">{s.value}</p>
                      <p className="text-xs text-whoosh-muted">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Udhaar ledger */}
              <div className="bg-white rounded-2xl shadow-card border border-gray-50 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-whoosh-dark">Udhaar Ledger</h3>
                  <p className="text-xs text-whoosh-muted hindi">उधार खाता</p>
                </div>
                {UDHAAR.map((u) => (
                  <div key={u.name} className="px-5 py-4 flex items-center gap-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center shrink-0 font-bold text-sm text-whoosh-orange">
                      {u.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-whoosh-dark">{u.name}</p>
                      <p className="text-xs text-whoosh-muted">{u.days} days pending · {u.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-red-600 text-base">₹{u.amount}</p>
                      <button className="text-xs font-semibold text-whoosh-orange hover:underline">Send reminder</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── MUNEEM AI ── */}
          {activeTab === "muneem" && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden flex flex-col" style={{ height: "calc(100vh - 200px)" }}>
                {/* Header */}
                <div className="bg-gradient-purple p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Muneem</p>
                    <p className="text-xs text-purple-200">मुनीम — Your AI Shop Agent • Online</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-purple-200">Active</span>
                  </div>
                </div>

                {/* Suggestions banner */}
                <div className="bg-purple-50 border-b border-purple-100 px-4 py-2.5 flex gap-2 overflow-x-auto">
                  {["Restock Pepsi 2L", "Send Diwali broadcast", "Re-engage 14 customers"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setMuneemInput(s)}
                      className="shrink-0 text-xs font-semibold bg-white border border-purple-200 text-whoosh-purple px-3 py-1.5 rounded-full hover:bg-purple-50 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Chat */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {muneemChat.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "owner" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "muneem" && (
                        <div className="w-7 h-7 rounded-lg bg-gradient-purple flex items-center justify-center shrink-0 mr-2 mt-0.5">
                          <BarChart3 className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "owner" ? "bg-whoosh-orange text-white rounded-tr-sm" : "bg-gray-100 text-whoosh-dark rounded-tl-sm"}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={muneemInput}
                      onChange={(e) => setMuneemInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMuneemMessage()}
                      placeholder="Muneem se baat karein... (Hindi ya English)"
                      className="flex-1 px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 text-whoosh-dark placeholder:text-gray-400"
                    />
                    <button
                      onClick={sendMuneemMessage}
                      className="w-10 h-10 rounded-2xl bg-whoosh-purple text-white flex items-center justify-center hover:bg-purple-700 transition-colors shadow-purple"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-whoosh-muted text-center mt-2">Muneem takes actions only after your approval</p>
                </div>
              </div>

              {/* Capabilities */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { icon: TrendingUp, title: "Sales analytics", desc: "Daily & weekly reports" },
                  { icon: Package, title: "Inventory alerts", desc: "Auto-restock drafts" },
                  { icon: MessageCircle, title: "WhatsApp broadcasts", desc: "Targeted promos" },
                  { icon: CheckCircle2, title: "Udhaar reminders", desc: "Polite collection messages" },
                ].map((c) => (
                  <div key={c.title} className="bg-white rounded-2xl p-4 shadow-card border border-gray-50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                      <c.icon className="w-4 h-4 text-whoosh-purple" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-whoosh-dark">{c.title}</p>
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
