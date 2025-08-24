import { createContext } from 'react';
import type { ToastContextProps } from './custom-toast-types';

export const ToastContext = createContext<ToastContextProps | undefined>(undefined);
