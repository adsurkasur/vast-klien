import { createContext } from "react";
import type { User } from "firebase/auth";

export interface GoogleAuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);