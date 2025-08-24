// src/components/ui/GoogleAuthButton.tsx
import React from "react";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { Button } from "./button";

export function GoogleAuthButton() {
  const { user, loading, error, signIn, signOut } = useGoogleAuth();

  if (loading) return <Button disabled className="w-full bg-primary text-primary-foreground rounded-xl">Loading...</Button>;

  if (user) {
    return (
      <div className="flex flex-col items-center w-full py-2">
        <Button
          onClick={signOut}
          variant="outline"
          size="sm"
          className="w-full text-destructive border-card-border spring-tap font-semibold"
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-2 w-full">
      <Button
        onClick={signIn}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl spring-tap"
      >
        <span className="mr-2">G</span>
        Sign in with Google
      </Button>
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  );
}
