'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Check, TriangleAlert, Info, Loader2, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'loading';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (options: { message: string; type: ToastType }) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [dismissing, setDismissing] = useState<Set<string>>(new Set());

  const toast = useCallback(({ message, type }: { message: string; type: ToastType }) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setDismissing((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      setDismissing((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 300);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      
      <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 w-full max-w-[380px] pointer-events-none">
        {toasts.map((t) => (
          <ToastItem 
            key={t.id} 
            toast={t} 
            isDismissing={dismissing.has(t.id)} 
            onDismiss={() => dismiss(t.id)} 
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        .toast-animate-in {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .toast-animate-out {
          animation: slideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      ` }} />
    </ToastContext.Provider>
  );
}

function ToastItem({ 
  toast, 
  isDismissing, 
  onDismiss 
}: { 
  toast: Toast; 
  isDismissing: boolean; 
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (toast.type !== 'loading') {
      const timer = setTimeout(() => {
        onDismiss();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.type, onDismiss]);

  const icons = {
    success: <Check className="w-5 h-5 text-[#08755e]" />,
    error: <TriangleAlert className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-teal-600" />,
    loading: <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
  };

  const bgColors = {
    success: 'bg-[#eaf7f2] border-[#08755e]/20 text-[#08755e]',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-teal-50 border-teal-200 text-teal-800',
    loading: 'bg-white border-gray-200 text-gray-800'
  };

  return (
    <div 
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-[14px] border shadow-lg bg-opacity-95 backdrop-blur-sm ${bgColors[toast.type]} ${isDismissing ? 'toast-animate-out' : 'toast-animate-in'}`}
      role="alert"
    >
      <div className="shrink-0 mt-0.5">
        {icons[toast.type]}
      </div>
      <div className="flex-1 text-sm font-medium">
        {toast.message}
      </div>
      <button 
        onClick={onDismiss}
        className="shrink-0 opacity-50 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
