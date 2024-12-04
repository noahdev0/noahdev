"use client";

import { Session } from "@prisma/client";
import { SessionProvider as Provider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session: Session | null | undefined;
};

export default function SessionProvider({ children, session }: Props) {
  return <Provider session={session ? { ...session, expires: session.expires.toISOString() } : null}>{children}</Provider>;
}
