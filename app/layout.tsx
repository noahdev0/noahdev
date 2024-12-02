import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeProvider } from "@/components/ui/themeProvider";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    default: "Noahdev0 - Portfolio",
    template: "%s | Noahdev0",
  },
  description:
    "Welcome to my professional portfolio showcasing web development and creative technology projects",
  keywords: [
    "web development",
    "portfolio",
    "frontend",
    "developer",
    "Noah Ofori",
  ],
  authors: [{ name: "Noah Ofori", url: "https://noahdev0.me" }],
  creator: "Noah Ofori",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://noahdev0.me",
    siteName: "Noahdev0 Portfolio",
    title: "Noahdev0 - Web Developer & Creative Technologist",
    description:
      "Welcome to my professional portfolio showcasing web development and creative technology projects",
    // firstName: "Noah",
    // lastName: "Ofori",
    emails: ["nouhbenzina@gmail.com"],
    images: [
      {
        url: "/ZED.jpg",
        width: 1200,
        height: 630,
        alt: "Noahdev0 - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noahdev0 - Web Developer & Creative Technologist",
    description:
      "Welcome to my professional portfolio showcasing web development and creative technology projects",
    images: ["/ZED.jpg"],
    creator: "@noahdev0",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const footerLinks = {
  social: [
    { name: "GitHub", href: "https://github.com/noahdev0" },
    { name: "Meta", href: "https://facebook.com/nouh.benzina.39" },
    { name: "LinkedIn", href: "https://linkedin.com/in/noahdev0" },
  ],
  contact: {
    email: "nouhbenzina@gmail.com",
    location: "Your Location",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" className={cn("antialiased", roboto.variable)}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased transition-colors ",
          roboto.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <div className="container mx-auto px-4 py-8">{children}</div>
            </main>
            <Toaster />

            <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Noah Ben Zina</h3>
                    <p className="text-sm text-muted-foreground">
                      Web Developer & Creative Technologist
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Connect</h3>
                    <ul className="space-y-2">
                      {footerLinks.social.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Contact</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>{footerLinks.contact.email}</p>
                      <p>{footerLinks.contact.location}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                  <p>© {currentYear} Noahdev0 . All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
