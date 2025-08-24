import { useContext } from 'react';
import { ToastContext } from './custom-toast-context';

export function useCustomToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useCustomToast must be used within CustomToastProvider');
  return ctx;
}
