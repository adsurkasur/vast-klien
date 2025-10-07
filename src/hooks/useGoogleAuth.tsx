import { useContext } from "react";
import { GoogleAuthContext } from "./GoogleAuthContextExport";

export function useGoogleAuth() {
  const context = useContext(GoogleAuthContext);
  if (context === undefined) {
    throw new Error("useGoogleAuth must be used within a GoogleAuthContextProvider");
  }
  return context;
}
