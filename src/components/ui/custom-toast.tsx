import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Toast, ToastType, ToastContextProps } from './custom-toast-types';

import { ToastContext } from './custom-toast-context';

export const CustomToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type, duration }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div className="fixed z-50 bottom-6 right-6 flex flex-col gap-2 items-end">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded-xl shadow-lg text-white font-medium animate-fade-in-down ${
              toast.type === 'success' ? 'bg-green-600' :
              toast.type === 'error' ? 'bg-red-600' :
              toast.type === 'warning' ? 'bg-yellow-600' :
              'bg-blue-600'
            }`}
            role="alert"
            tabIndex={0}
          >
            {toast.message}
            <button
              className="ml-3 text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30"
              onClick={() => removeToast(toast.id)}
              aria-label="Tutup"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

