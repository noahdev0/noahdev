import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "noahdev0 | Noah Ben Zina",
  description: "Personal website of Noah Ben Zina",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <main>
          <SessionProvider session={session}>{children}</SessionProvider>
        </main>
      </body>
    </html>
  );
}
