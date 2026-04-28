"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Send, RotateCcw, ArrowLeft, Sparkles,
  ShoppingBag, Pill, Store, Clock, Star, Mic, Bike,
} from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { renderMarkdown } from "@/lib/renderMarkdown";
import { useToast } from "@/components/Toast";
import SahayakOrderCard, { parseOrderDirective, resolveOrder, type ResolvedOrder } from "@/components/SahayakOrderCard";

type Message = {
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
  order?: ResolvedOrder;
  orderStatus?: "pending" | "placed" | "cancelled";
};

const WELCOME_EN = `Namaste! 🙏 I'm **Sahayak** — your personal AI shopping assistant from Whoosh.

I can help you:
• 🛒 Find grocery shops near you in Lucknow
• 💰 Compare prices across kiranas
• 🚀 Place orders with FREE delivery
• 💊 Find medicines & daily essentials
• 📦 Track your orders

What do you need today?`;

const WELCOME_HI = `नमस्ते! 🙏 मैं **सहायक** हूँ — Whoosh का आपका पर्सनल AI शॉपिंग असिस्टेंट।

मैं आपकी मदद कर सकता हूँ:
• 🛒 लखनऊ में पास की किराना दुकानें ढूंढने में
• 💰 दुकानों के बीच दाम तुलना करने में
• 🚀 मुफ्त डिलीवरी के साथ ऑर्डर करने में
• 💊 दवाइयाँ और ज़रूरी सामान खोजने में
• 📦 अपने ऑर्डर ट्रैक करने में

आज क्या चाहिए?`;

const QUICK_PROMPTS_EN = [
  { icon: Store,        text: "Shops open near me right now" },
  { icon: ShoppingBag,  text: "Order atta 5kg, dal 1kg" },
  { icon: Pill,         text: "I need Paracetamol 500mg" },
  { icon: Clock,        text: "Fastest delivery available?" },
  { icon: Star,         text: "Best rated kirana in Aminabad" },
  { icon: Sparkles,     text: "Cheapest milk 1L near me" },
];

const QUICK_PROMPTS_HI = [
  { icon: Store,        text: "अभी पास में कौन सी दुकानें खुली हैं?" },
  { icon: ShoppingBag,  text: "5 किलो आटा, 1 किलो दाल चाहिए" },
  { icon: Pill,         text: "Paracetamol 500mg कहाँ मिलेगी?" },
  { icon: Clock,        text: "सबसे जल्दी डिलीवरी कहाँ से होगी?" },
  { icon: Star,         text: "अमीनाबाद में सबसे अच्छी किराना दुकान" },
  { icon: Sparkles,     text: "पास में सबसे सस्ता दूध 1L" },
];

/* Custom Sahayak avatar — gradient ring + sparkle */
function SahayakAvatar({ size = 40 }: { size?: number }) {
  return (
    <span
      className="relative flex items-center justify-center rounded-full shrink-0"
      style={{
        width: size,
        height: size,
        background: "conic-gradient(from 200deg, #5D3FD3, #8366E4, #00D395, #5D3FD3)",
      }}
    >
      <span className="absolute inset-[2px] rounded-full bg-gradient-to-br from-whoosh-purple to-whoosh-purple-dark flex items-center justify-center">
        <Sparkles
          style={{ width: size * 0.5, height: size * 0.5 }}
          className="text-white"
          strokeWidth={2.4}
        />
      </span>
    </span>
  );
}

export default function SahayakPage() {
  const { lang, toggleLang } = useLang();
  const { showToast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: lang === "hi" ? WELCOME_HI : WELCOME_EN },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  async function sendMessage(text?: string) {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", content: userText };
    const loadingMsg: Message = { role: "assistant", content: "", loading: true };
    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setLoading(true);

    const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/sahayak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, language: lang, userLocation: "Lucknow, UP" }),
      });
      if (!res.ok || !res.body) throw new Error("Failed");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      setMessages((prev) => prev.map((m, i) => i === prev.length - 1 ? { ...m, loading: false, content: "▌" } : m));

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value, { stream: true }).split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const { text } = JSON.parse(data);
              fullText += text;
              const orderStart = fullText.indexOf("<ORDER");
              const displayText = orderStart >= 0 ? fullText.slice(0, orderStart).trim() : fullText;
              setMessages((prev) => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: displayText + "▌" } : m));
            } catch {}
          }
        }
      }

      const { clean, draft } = parseOrderDirective(fullText);
      const resolved = draft ? resolveOrder(draft) : null;
      setMessages((prev) => prev.map((m, i) => i === prev.length - 1
        ? { ...m, content: clean || fullText, order: resolved ?? undefined, orderStatus: resolved ? "pending" : undefined }
        : m
      ));
    } catch {
      setMessages((prev) => prev.map((m, i) =>
        i === prev.length - 1
          ? { ...m, loading: false, content: lang === "hi" ? "माफ करें, कोई तकनीकी समस्या हुई। कृपया दोबारा कोशिश करें। 🙏" : "Sorry, something went wrong. Please try again. 🙏" }
          : m
      ));
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function resetChat() {
    setMessages([{ role: "assistant", content: lang === "hi" ? WELCOME_HI : WELCOME_EN }]);
    setInput("");
  }

  function confirmOrder(index: number) {
    setMessages((prev) => prev.map((m, i) => i === index ? { ...m, orderStatus: "placed" } : m));
    const msg = messages[index];
    const total = msg?.order?.total ?? 0;
    showToast(lang === "hi" ? `ऑर्डर कन्फर्म ✅ ₹${total}` : `Order placed ✅ ₹${total}`, "success");
  }

  function cancelOrder(index: number) {
    setMessages((prev) => prev.map((m, i) => i === index ? { ...m, orderStatus: "cancelled" } : m));
  }

  const quickPrompts = lang === "hi" ? QUICK_PROMPTS_HI : QUICK_PROMPTS_EN;
  const showQuickPrompts = messages.length <= 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/50 to-white flex flex-col">
      {/* Top bar — dark + purple */}
      <header
        className="relative px-4 py-3.5 flex items-center gap-3 sticky top-0 z-20 text-white"
        style={{ background: "linear-gradient(135deg, #1B1245 0%, #2A1B66 40%, #5D3FD3 100%)" }}
      >
        <div className="absolute inset-0 bg-mesh-purple opacity-50 mix-blend-screen pointer-events-none" />
        <Link
          href="/shops"
          className="relative p-2 rounded-xl hover:bg-white/15 transition-colors text-white/90"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Agent identity */}
        <div className="relative flex items-center gap-3 flex-1">
          <SahayakAvatar size={42} />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-extrabold text-white text-base tracking-tight">Sahayak</p>
              <span className="hindi text-xs text-purple-200">सहायक</span>
              <span className="text-[10px] bg-whoosh-green/20 text-whoosh-green border border-whoosh-green/40 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-whoosh-green animate-pulse inline-block" />
                AI · Online
              </span>
            </div>
            <p className="text-[11px] text-purple-100/90 font-medium">
              {lang === "hi" ? "आपका AI शॉपिंग असिस्टेंट · Whoosh" : "Your AI Shopping Assistant · Whoosh"}
            </p>
          </div>
        </div>

        <div className="relative flex items-center gap-2">
          <button
            onClick={toggleLang}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 active:scale-95 backdrop-blur-sm ${
              lang === "hi"
                ? "bg-white text-whoosh-purple border-white"
                : "bg-white/15 text-white border-white/30 hover:bg-white/25"
            }`}
          >
            {lang === "en" ? "हिं" : "EN"}
          </button>
          <button
            onClick={resetChat}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors text-white backdrop-blur-sm"
            title="Reset chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero strip */}
      <div className="bg-cream border-b border-whoosh-orange/15 px-6 py-3.5 flex items-center gap-3">
        <span className="icon-tile icon-tile-orange w-9 h-9 rounded-xl">
          <Sparkles className="w-4 h-4" strokeWidth={2.4} />
        </span>
        <p className="text-whoosh-dark text-sm font-semibold flex-1 leading-tight">
          {lang === "hi"
            ? "हिंदी या English — जैसे चाहें बात करें। मुफ्त डिलीवरी हर ऑर्डर पर।"
            : "Talk in Hindi or English — however you like. Free delivery on every order."}
        </p>
        <Link href="/shops" className="shrink-0 chip chip-purple hover:bg-purple-100 transition-colors">
          <ShoppingBag className="w-3.5 h-3.5" />
          {lang === "hi" ? "दुकानें" : "Browse"}
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-2xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="mt-1">
                <SahayakAvatar size={32} />
              </div>
            )}
            <div className="max-w-[80%] sm:max-w-[70%] flex flex-col gap-0">
              {(msg.loading || msg.content) && (
                <div
                  className={`text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user" ? "bubble-user" : "bubble-bot"
                  }`}
                >
                  {msg.loading ? (
                    <div className="flex gap-1.5 items-center py-1">
                      {[0, 150, 300].map((delay) => (
                        <span
                          key={delay}
                          className={`w-2 h-2 rounded-full bg-whoosh-purple animate-bounce`}
                          style={{ animationDelay: `${delay}ms`, opacity: 0.4 + delay / 600 }}
                        />
                      ))}
                    </div>
                  ) : msg.role === "user" ? (
                    msg.content
                  ) : (
                    renderMarkdown(msg.content)
                  )}
                </div>
              )}
              {msg.order && msg.orderStatus && (
                <SahayakOrderCard
                  order={msg.order}
                  status={msg.orderStatus}
                  onConfirm={() => confirmOrder(i)}
                  onCancel={() => cancelOrder(i)}
                />
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-whoosh-dark flex items-center justify-center shrink-0 mt-1 text-white text-xs font-extrabold shadow-soft border-2 border-whoosh-purple/30">
                U
              </div>
            )}
          </div>
        ))}

        {/* Quick prompts */}
        {showQuickPrompts && (
          <div className="mt-6">
            <p className="text-xs text-whoosh-muted font-extrabold mb-3 text-center uppercase tracking-wider flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-whoosh-purple" />
              {lang === "hi" ? "जल्दी पूछें" : "Quick ask"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {quickPrompts.map(({ icon: Icon, text }) => (
                <button
                  key={text}
                  onClick={() => sendMessage(text)}
                  className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200 hover:border-whoosh-purple hover:bg-whoosh-purple-light/40 transition-all text-left group shadow-soft active:scale-[0.98]"
                >
                  <span className="icon-tile icon-tile-purple w-9 h-9 group-hover:icon-tile-solid-purple">
                    <Icon className="w-4 h-4" strokeWidth={2.2} />
                  </span>
                  <span className="text-sm text-whoosh-dark font-semibold leading-tight flex-1">{text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-3 shadow-card">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 items-center bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-whoosh-purple focus-within:bg-white focus-within:shadow-ring transition-all px-2">
            <Sparkles className="w-4 h-4 text-whoosh-purple ml-2 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder={lang === "hi" ? "कुछ भी पूछें — हिंदी या English..." : "Ask Sahayak — Hindi or English..."}
              disabled={loading}
              className="flex-1 px-2 py-3 bg-transparent text-sm focus:outline-none text-whoosh-dark placeholder:text-slate-400 disabled:opacity-60"
            />
            <button
              type="button"
              disabled
              className="w-9 h-9 rounded-xl text-slate-400 flex items-center justify-center"
              aria-label="Voice (coming soon)"
              title="Voice (coming soon)"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-whoosh-purple text-white flex items-center justify-center hover:brightness-110 transition-all shadow-purple disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none active:scale-90 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-whoosh-muted text-center mt-2 flex items-center justify-center gap-1">
            <Bike className="w-2.5 h-2.5 text-whoosh-green" />
            {lang === "hi"
              ? "Claude AI द्वारा संचालित · हर ऑर्डर पर मुफ्त डिलीवरी"
              : "Powered by Claude AI · Free delivery on every order"}
          </p>
        </div>
      </div>
    </div>
  );
}
