"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Hammer,
  Send,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
// import { AuthButton } from "./auth-button";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Code },
  { href: "/skills", label: "Skills", icon: Hammer },
  { href: "/contact", label: "Contact", icon: Send },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "unset" : "hidden";
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -16 },
    open: { opacity: 1, x: 0 },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
        staggerDirection: 1,
        when: "beforeChildren",
      },
    },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/70 ${
        scrolled
          ? "bg-background/80 shadow-sm backdrop-blur-lg supports-[backdrop-filter]:bg-background/60"
          : "md:bg-background/0"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="relative text-2xl font-bold text-primary hover:text-primary/90 transition-colors"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2"
            >
              <Code className="h-6 w-6" />
              <span>Nouh Ben Zina</span>
            </motion.div>
            {pathname === "/" && (
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                layoutId="navbar-underline"
              />
            )}
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {/* <AuthButton /> */}
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md font-medium
                    ${
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }
                    transition-colors duration-200
                  `}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </motion.div>
                {pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                    layoutId="navbar-underline"
                  />
                )}
              </Link>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          <motion.button
            onClick={toggleMenu}
            className="md:hidden relative z-9999 p-2 rounded-md hover:bg-primary transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                className="fixed inset-0  bg-background backdrop-blur-sm min-h-screen md:hidden flex items-center justify-center"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <motion.div className="flex flex-col items-center gap-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      variants={itemVariants}
                      className="relative"
                      custom={index}
                    >
                      <Link href={item.href}>
                        <motion.div
                          onClick={toggleMenu}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`
                            flex items-center gap-4 text-2xl font-bold
                            ${
                              pathname === item.href
                                ? "text-primary"
                                : "text-foreground hover:text-primary"
                            }
                            transition-colors duration-200
                          `}
                        >
                          <item.icon className="h-8 w-8" />
                          <span>{item.label}</span>
                        </motion.div>
                      </Link>
                      {pathname === item.href && (
                        <motion.div
                          className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary"
                          layoutId="mobile-navbar-underline"
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
