import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
// import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
// import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "noahDev0 || Noah BenZina ",
  description: "noahdev0 fullstack developer .",
  icons: "/favicon.ico",
  keywords: "noah, noahdev0 , Fullstack,  MERN stack, NextJs",
  openGraph: {
    title: "NoahDev0 Portfolio",
    url: "https://noahdev0.me",
    description: "fullStack web Developer.",
    images: [
      {
        url: "https://noahdev0.me/noah.png",
        width: 500,
        height: 500,
        alt: "CSEN Logo",
      },
    ],
  },
  metadataBase: new URL("https://noahdev0.me/"),
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={cn(inter.className)}>{children}</body>
      </SessionProvider>
    </html>
  );
}
