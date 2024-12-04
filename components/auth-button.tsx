// In components/auth-button.tsx
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const AuthButton = () => {
  const { data: session } = useSession();

  return session ? (
    <Button onClick={() => signOut()}>Sign Out</Button>
  ) : (
    <Button onClick={() => signIn()}>Sign In</Button>
  );
};
