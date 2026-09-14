import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'info' | 'error';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 4000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastItem = { id, type, message, duration };

    setToasts(prev => [...prev.slice(-4), newToast]); // keep max 5

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Shelf */}
      <div
        aria-live="polite"
        className="fixed bottom-6 right-6 z-[10000] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        {toasts.map(toast => {
          const typeStyles = {
            success: 'bg-[#0D1520] border-emerald-500/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]',
            warning: 'bg-[#17120B] border-amber-500/40 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]',
            error: 'bg-[#180D0E] border-red-500/40 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.2)]',
            info: 'bg-[#0B131F] border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
          }[toast.type];

          const Icon = {
            success: CheckCircle2,
            warning: AlertTriangle,
            error: XCircle,
            info: Info
          }[toast.type];

          return (
            <div
              key={toast.id}
              role="alert"
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded border backdrop-blur-md transition-all duration-300 ${typeStyles}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-xs font-mono tracking-wide leading-relaxed">
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="opacity-60 hover:opacity-100 transition-opacity p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
