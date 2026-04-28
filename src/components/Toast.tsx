"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, X, AlertCircle, Info, Sparkles } from "lucide-react";

type ToastType = "success" | "error" | "info" | "cart";

type Toast = { id: number; message: string; type: ToastType };

type ToastContextType = { showToast: (message: string, type?: ToastType) => void };

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const removeToast = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const icons: Record<ToastType, JSX.Element> = {
    success: <CheckCircle2 className="w-4 h-4 text-whoosh-green-dark" />,
    error:   <AlertCircle className="w-4 h-4 text-red-500" />,
    info:    <Info className="w-4 h-4 text-whoosh-purple" />,
    cart:    <Sparkles className="w-4 h-4 text-whoosh-purple" />,
  };

  const styles: Record<ToastType, string> = {
    success: "border-whoosh-green/30 bg-whoosh-green-light",
    error:   "border-red-200 bg-red-50",
    info:    "border-whoosh-purple/30 bg-whoosh-purple-light",
    cart:    "border-whoosh-purple/30 bg-whoosh-purple-light",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border shadow-card text-sm font-semibold text-whoosh-dark pointer-events-auto max-w-xs animate-fade-up ${styles[toast.type]}`}
          >
            {icons[toast.type]}
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-1 p-0.5 rounded-full hover:bg-white/60 transition-colors"
            >
              <X className="w-3 h-3 text-whoosh-muted" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() { return useContext(ToastContext); }
