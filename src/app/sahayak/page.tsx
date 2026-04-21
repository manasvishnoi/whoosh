"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bot, Send, Zap, RotateCcw, ArrowLeft, Sparkles,
  ShoppingCart, Pill, Store, Clock, Star, MessageCircle,
} from "lucide-react";
import { useLang } from "@/context/LanguageContext";

type Message = {
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
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
  { icon: ShoppingCart, text: "Order atta 5kg, dal 1kg" },
  { icon: Pill,         text: "I need Paracetamol 500mg" },
  { icon: Clock,        text: "Fastest delivery available?" },
  { icon: Star,         text: "Best rated kirana in Aminabad" },
  { icon: Zap,          text: "Cheapest milk 1L near me" },
];

const QUICK_PROMPTS_HI = [
  { icon: Store,        text: "अभी पास में कौन सी दुकानें खुली हैं?" },
  { icon: ShoppingCart, text: "5 किलो आटा, 1 किलो दाल चाहिए" },
  { icon: Pill,         text: "Paracetamol 500mg कहाँ मिलेगी?" },
  { icon: Clock,        text: "सबसे जल्दी डिलीवरी कहाँ से होगी?" },
  { icon: Star,         text: "अमीनाबाद में सबसे अच्छी किराना दुकान" },
  { icon: Zap,          text: "पास में सबसे सस्ता दूध 1L" },
];

export default function SahayakPage() {
  const { lang, toggleLang } = useLang();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: lang === "hi" ? WELCOME_HI : WELCOME_EN },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
              setMessages((prev) => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: fullText + "▌" } : m));
            } catch {}
          }
        }
      }

      setMessages((prev) => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: fullText } : m));
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

  const quickPrompts = lang === "hi" ? QUICK_PROMPTS_HI : QUICK_PROMPTS_EN;
  const showQuickPrompts = messages.length <= 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex flex-col">

      {/* Top bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-20 shadow-sm">
        <Link href="/shops" className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-[#64748B] hover:text-[#1E293B]">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Agent identity */}
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#E87030] flex items-center justify-center shadow-orange">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-black text-[#1E293B] text-base">Sahayak</p>
              <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                Online
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              {lang === "hi" ? "आपका AI शॉपिंग असिस्टेंट • Whoosh" : "Your AI Shopping Assistant • Whoosh"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 active:scale-95"
            style={lang === "hi"
              ? { background: "#6B46C1", color: "#fff", borderColor: "#6B46C1" }
              : { background: "#fff", color: "#6B46C1", borderColor: "#DDD6FE" }
            }
          >
            {lang === "en" ? "हिं" : "EN"}
          </button>
          <button
            onClick={resetChat}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-[#64748B]"
            title="Reset chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero strip */}
      <div className="bg-gradient-to-r from-[#FF8C42] to-[#E87030] px-6 py-4 flex items-center gap-4">
        <Sparkles className="w-5 h-5 text-white/80 shrink-0" />
        <p className="text-white text-sm font-semibold">
          {lang === "hi"
            ? "हिंदी या English — जैसे चाहें बात करें। मुफ्त डिलीवरी हर ऑर्डर पर।"
            : "Talk in Hindi or English — however you like. Free delivery on every order."}
        </p>
        <Link href="/shops" className="shrink-0 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1">
          <ShoppingCart className="w-3.5 h-3.5" />
          {lang === "hi" ? "दुकानें" : "Browse"}
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-2xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF8C42] to-[#E87030] flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
            )}
            <div className={`max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
              msg.role === "user"
                ? "bg-[#FF8C42] text-white rounded-tr-sm"
                : "bg-white text-[#1E293B] border border-gray-100 rounded-tl-sm"
            }`}>
              {msg.loading ? (
                <div className="flex gap-1.5 items-center py-1">
                  {[0, 150, 300].map((delay) => (
                    <span key={delay} className="w-2 h-2 rounded-full bg-orange-300 animate-bounce"
                      style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              ) : msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-xl bg-[#6B46C1] flex items-center justify-center shrink-0 mt-1 text-white text-xs font-bold shadow-sm">
                U
              </div>
            )}
          </div>
        ))}

        {/* Quick prompts */}
        {showQuickPrompts && (
          <div className="mt-6">
            <p className="text-xs text-[#64748B] font-semibold mb-3 text-center uppercase tracking-wide">
              {lang === "hi" ? "जल्दी पूछें" : "Quick ask"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickPrompts.map(({ icon: Icon, text }) => (
                <button
                  key={text}
                  onClick={() => sendMessage(text)}
                  className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all text-left group shadow-sm active:scale-95"
                >
                  <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                    <Icon className="w-4 h-4 text-[#FF8C42]" />
                  </div>
                  <span className="text-sm text-[#1E293B] font-medium leading-tight">{text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 py-3 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <MessageCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder={lang === "hi" ? "कुछ भी पूछें — हिंदी या English..." : "Ask anything — Hindi or English..."}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-[#1E293B] placeholder:text-gray-400 disabled:opacity-60 bg-white"
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="w-11 h-11 rounded-2xl bg-[#FF8C42] text-white flex items-center justify-center hover:bg-orange-500 transition-all shadow-orange disabled:opacity-40 disabled:cursor-not-allowed active:scale-90 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-[#94A3B8] text-center mt-2 flex items-center justify-center gap-1">
            <Zap className="w-2.5 h-2.5 text-[#10B981] fill-[#10B981]" />
            {lang === "hi" ? "Groq AI द्वारा संचालित • हर ऑर्डर पर मुफ्त डिलीवरी" : "Powered by Groq AI • Free delivery on every order"}
          </p>
        </div>
      </div>
    </div>
  );
}
