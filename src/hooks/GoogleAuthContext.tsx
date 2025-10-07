
"use client";
import React, { useEffect, useState, useCallback } from "react";
import { GoogleAuthProvider as FirebaseGoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { GoogleAuthContext } from "./GoogleAuthContextExport";

export const GoogleAuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = useCallback(async () => {
    setLoading(true);
    setError(null);
    const provider = new FirebaseGoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
  }
    } finally {
      setLoading(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred during sign out.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <GoogleAuthContext.Provider value={{ user, loading, error, signIn, signOut: signOutUser }}>
      {children}
    </GoogleAuthContext.Provider>
  );
};


