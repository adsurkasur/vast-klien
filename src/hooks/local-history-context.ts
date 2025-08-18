import { createContext } from "react";
import type { LocalHistoryContextType } from "./local-history";

export const LocalHistoryContext = createContext<LocalHistoryContextType | undefined>(undefined);
