"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Zap, Mic, RotateCcw, ChevronDown } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
};

const QUICK_PROMPTS_EN = [
  "Show me grocery shops near me",
  "Who has the cheapest milk?",
  "Order atta 5kg",
  "I need BP medicine",
  "What shops are open now?",
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
  content: "Namaste! 🙏 Main Sahayak hoon — aapka personal shopping assistant.\n\nमैं आपकी मदद कर सकता हूँ:\n• नज़दीकी दुकानें ढूंढने में\n• सस्ते दामों में सामान\n• FREE डिलीवरी ऑर्डर करने में\n\nKya chahiye aaj? / What do you need today?",
};

export default function SahayakWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  async function sendMessage(text?: string) {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    setInput("");
    const userMsg: Message = { role: "user", content: userText };
    const loadingMsg: Message = { role: "assistant", content: "", loading: true };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setLoading(true);

    const history = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch("/api/sahayak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          language: lang,
          userLocation: "Lucknow, UP",
        }),
      });

      if (!res.ok || !res.body) throw new Error("Failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      // replace loading message with streaming content
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
              setMessages((prev) =>
                prev.map((m, i) => i === prev.length - 1 ? { ...m, content: fullText + "▌" } : m)
              );
            } catch {}
          }
        }
      }

      // remove cursor
      setMessages((prev) =>
        prev.map((m, i) => i === prev.length - 1 ? { ...m, content: fullText } : m)
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

  function resetChat() {
    setMessages([WELCOME_MSG]);
    setInput("");
  }

  const quickPrompts = lang === "hi" ? QUICK_PROMPTS_HI : QUICK_PROMPTS_EN;

  return (
    <>
      {/* Floating button */}
      <button
        id="sahayak-widget"
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-whoosh-orange hover:bg-orange-500 text-white px-4 py-3 rounded-2xl shadow-orange font-bold text-sm transition-all hover:scale-105 active:scale-95 ${open ? "hidden" : "flex"}`}
        aria-label="Open Sahayak AI"
      >
        <div className="relative">
          <Bot className="w-5 h-5" />
          {unread > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center">
              {unread}
            </span>
          )}
        </div>
        <span>Sahayak</span>
        <span className="text-orange-200 text-xs font-normal hindi">सहायक</span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-1.5rem)] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={{ height: "min(600px, calc(100vh - 6rem))" }}>

          {/* Header */}
          <div className="bg-gradient-saffron px-4 py-3.5 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-white text-sm">Sahayak</p>
                <span className="text-orange-200 text-xs hindi">सहायक</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse ml-1" />
              </div>
              <p className="text-orange-100 text-[11px]">Whoosh AI · Free Delivery Always</p>
            </div>
            <div className="flex items-center gap-1">
              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="px-2 py-1 rounded-lg bg-white/20 text-white text-[11px] font-bold hover:bg-white/30 transition-colors"
              >
                {lang === "en" ? "हिं" : "EN"}
              </button>
              <button onClick={resetChat} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors" title="Reset chat">
                <RotateCcw className="w-3.5 h-3.5 text-white" />
              </button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors">
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-lg bg-whoosh-orange flex items-center justify-center shrink-0 mr-2 mt-0.5">
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-whoosh-orange text-white rounded-tr-sm"
                      : "bg-white text-whoosh-dark shadow-sm border border-gray-100 rounded-tl-sm"
                  } ${msg.loading ? "animate-pulse2" : ""}`}
                >
                  {msg.loading ? (
                    <div className="flex gap-1 items-center py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  ) : msg.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts (only when 1 message = welcome) */}
          {messages.length <= 1 && (
            <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto shrink-0">
              {quickPrompts.slice(0, 3).map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="shrink-0 text-[11px] font-medium bg-orange-50 border border-orange-100 text-whoosh-orange px-2.5 py-1.5 rounded-full hover:bg-orange-100 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder={lang === "hi" ? "कुछ भी पूछें... (हिंदी या English)" : "Ask anything... (Hindi or English)"}
                disabled={loading}
                className="flex-1 px-3.5 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 text-whoosh-dark placeholder:text-gray-400 disabled:opacity-60"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-whoosh-orange text-white flex items-center justify-center hover:bg-orange-500 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-whoosh-muted text-center mt-1.5 flex items-center justify-center gap-1">
              <Zap className="w-2.5 h-2.5 text-whoosh-green fill-whoosh-green" />
              Powered by Claude AI · Free Delivery on every order
            </p>
          </div>
        </div>
      )}
    </>
  );
}
