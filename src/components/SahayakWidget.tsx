"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Mic, RotateCcw, ChevronDown } from "lucide-react";
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

const QUICK_PROMPTS_EN = [
  "Show me grocery shops near me",
  "Find the cheapest milk",
  "I need atta 5kg",
  "BP medicine please",
  "What's open right now?",
];

const QUICK_PROMPTS_HI = [
  "पास में किराना दुकान दिखाओ",
  "सबसे सस्ता दूध कहाँ मिलेगा?",
  "5 किलो आटा चाहिए",
  "BP की दवाई कहाँ मिलेगी?",
  "अभी कौन सी दुकानें खुली हैं?",
];

const WELCOME_MSG: Message = {
  role: "assistant",
  content:
    "Namaste! 🙏 Main Sahayak hoon — your personal shopping assistant.\n\nमैं आपकी मदद कर सकता हूँ:\n• नज़दीकी दुकानें ढूंढने में\n• सस्ते दामों में सामान\n• FREE डिलीवरी ऑर्डर करने में\n\nKya chahiye aaj? / What do you need today?",
};

/* Custom Sahayak avatar — sparkle in circle gradient */
function SahayakAvatar({ size = 32 }: { size?: number }) {
  return (
    <span
      className="relative flex items-center justify-center rounded-full shrink-0"
      style={{
        width: size,
        height: size,
        background:
          "conic-gradient(from 200deg, #5D3FD3, #8366E4, #00D395, #5D3FD3)",
      }}
    >
      <span className="absolute inset-[2px] rounded-full bg-white/15 backdrop-blur-sm" />
      <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-whoosh-purple to-whoosh-purple-dark" />
      <Sparkles
        className="relative text-white"
        style={{ width: size * 0.5, height: size * 0.5 }}
        strokeWidth={2.4}
      />
    </span>
  );
}

export default function SahayakWidget() {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 100); }
  }, [open]);

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
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const { text } = JSON.parse(data);
              fullText += text;
              const orderStart = fullText.indexOf("<ORDER");
              const displayText = orderStart >= 0 ? fullText.slice(0, orderStart).trim() : fullText;
              setMessages((prev) =>
                prev.map((m, i) => i === prev.length - 1 ? { ...m, content: displayText + "▌" } : m)
              );
            } catch {}
          }
        }
      }

      const { clean, draft } = parseOrderDirective(fullText);
      const resolved = draft ? resolveOrder(draft) : null;
      setMessages((prev) =>
        prev.map((m, i) => i === prev.length - 1
          ? { ...m, content: clean || fullText, order: resolved ?? undefined, orderStatus: resolved ? "pending" : undefined }
          : m
        )
      );
      if (!open) setUnread((u) => u + 1);
    } catch {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1
            ? { ...m, loading: false, content: lang === "hi" ? "माफ करें, कोई तकनीकी समस्या हुई। कृपया दोबारा कोशिश करें।" : "Sorry, something went wrong. Please try again." }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  }

  function resetChat() { setMessages([WELCOME_MSG]); setInput(""); }
  function confirmOrder(index: number) {
    setMessages((prev) => prev.map((m, i) => i === index ? { ...m, orderStatus: "placed" } : m));
    const total = messages[index]?.order?.total ?? 0;
    showToast(lang === "hi" ? `ऑर्डर कन्फर्म ✅ ₹${total}` : `Order placed ✅ ₹${total}`, "success");
  }
  function cancelOrder(index: number) {
    setMessages((prev) => prev.map((m, i) => i === index ? { ...m, orderStatus: "cancelled" } : m));
  }

  const quickPrompts = lang === "hi" ? QUICK_PROMPTS_HI : QUICK_PROMPTS_EN;

  return (
    <>
      {/* Floating button */}
      <button
        id="sahayak-widget"
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 group ${open ? "hidden" : "flex"}`}
        aria-label="Open Sahayak AI"
      >
        <span className="relative flex items-center gap-3 bg-whoosh-dark hover:bg-whoosh-dark-2 text-white pl-2 pr-5 py-2 rounded-full shadow-purple-lg transition-all hover:scale-105 active:scale-95 border border-whoosh-purple/30">
          <SahayakAvatar size={40} />
          <span className="flex flex-col items-start leading-tight">
            <span className="text-sm font-extrabold tracking-tight">Sahayak</span>
            <span className="text-[10px] font-medium text-whoosh-green flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-whoosh-green animate-pulse" />
              AI · Online
            </span>
          </span>
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-whoosh-orange rounded-full text-[10px] font-extrabold flex items-center justify-center shadow-orange">
              {unread}
            </span>
          )}
        </span>
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-1.5rem)] bg-white rounded-3xl shadow-card-hover border border-slate-100 flex flex-col overflow-hidden animate-bounce-in"
          style={{ height: "min(620px, calc(100vh - 6rem))" }}
        >
          {/* Header — dark with gradient overlay */}
          <div
            className="relative px-4 py-4 flex items-center gap-3 shrink-0 text-white"
            style={{
              background:
                "linear-gradient(135deg, #1B1245 0%, #2A1B66 40%, #5D3FD3 100%)",
            }}
          >
            <div className="absolute inset-0 bg-mesh-purple opacity-60 mix-blend-screen" />
            <div className="relative">
              <SahayakAvatar size={40} />
            </div>
            <div className="relative flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-extrabold text-white text-sm tracking-tight">Sahayak</p>
                <span className="hindi text-[11px] text-purple-200">सहायक</span>
              </div>
              <p className="text-[11px] text-purple-100/90 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-whoosh-green animate-pulse" />
                AI Shopper · Free Delivery
              </p>
            </div>
            <div className="relative flex items-center gap-1">
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="px-2 py-1 rounded-lg bg-white/15 text-white text-[11px] font-bold hover:bg-white/25 transition-colors backdrop-blur-sm"
              >
                {lang === "en" ? "हिं" : "EN"}
              </button>
              <button onClick={resetChat} className="p-1.5 rounded-lg hover:bg-white/15 transition-colors" title="Reset">
                <RotateCcw className="w-3.5 h-3.5 text-white" />
              </button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/15 transition-colors">
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-50/50 to-white">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="mr-2 mt-0.5">
                    <SahayakAvatar size={26} />
                  </div>
                )}
                <div className="max-w-[82%] flex flex-col gap-1.5">
                  {(msg.loading || msg.content) && (
                    <div
                      className={`text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bubble-user"
                          : "bubble-bot"
                      } ${msg.loading ? "animate-pulse2" : ""}`}
                    >
                      {msg.loading ? (
                        <div className="flex gap-1 items-center py-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-whoosh-purple/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-whoosh-purple/70 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-whoosh-purple animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      ) : msg.role === "user" ? msg.content : renderMarkdown(msg.content)}
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
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="px-3 py-2.5 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto shrink-0">
              {quickPrompts.slice(0, 3).map((p) => (
                <button key={p} onClick={() => sendMessage(p)} className="prompt-pill shrink-0">
                  <Sparkles className="w-3 h-3 text-whoosh-purple" />
                  <span>{p}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100 shrink-0">
            <div className="flex gap-2 items-center bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-whoosh-purple focus-within:bg-white focus-within:shadow-ring transition-all px-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder={lang === "hi" ? "कुछ भी पूछें..." : "Ask Sahayak anything..."}
                disabled={loading}
                className="flex-1 px-2 py-3 bg-transparent text-sm focus:outline-none text-whoosh-dark placeholder:text-slate-400 disabled:opacity-60"
              />
              <button
                type="button"
                disabled
                className="w-8 h-8 rounded-xl text-slate-400 flex items-center justify-center"
                aria-label="Voice"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-whoosh-purple text-white flex items-center justify-center hover:brightness-110 transition-all shadow-purple disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-whoosh-muted text-center mt-2 flex items-center justify-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-whoosh-purple" />
              Powered by Claude AI · Free Delivery on every order
            </p>
          </div>
        </div>
      )}
    </>
  );
}
