"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";

const navLinks = [
  { label: "Inicio", href: "#home" },
  { label: "Nosotros", href: "#about" },
  { label: "Menú", href: "#menu" },
  { label: "Ubicación", href: "#location" },
  { label: "Contacto", href: "#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const paddingY = useTransform(scrollY, [0, 100], [0, 6]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    },
    [],
  );

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
    >
      <div
        className={`absolute inset-0 border-b transition-all duration-500 ${
          scrolled
            ? "bg-primary/85 backdrop-blur-xl border-secondary/10 shadow-sm"
            : "bg-transparent border-transparent"
        }`}
      />

      <nav className="relative mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="relative z-10"
        >
          <Image
            src={scrolled ? "/logo-secondary.png" : "/logo-primary.png"}
            alt="Numah Coffee"
            width={120}
            height={48}
            className="h-22 w-auto transition-opacity duration-300 object-contain"
            priority
          />
        </a>

        <ul className="hidden md:flex items-center gap-8 relative z-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors duration-300 tracking-wide uppercase ${
                  scrolled
                    ? "text-secondary/70 hover:text-secondary"
                    : "text-primary/70 hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#menu"
          onClick={(e) => handleNavClick(e, "#menu")}
          className={`hidden md:inline-flex relative z-10 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-lg ${
            scrolled
              ? "bg-secondary text-primary hover:bg-secondary-dark hover:shadow-secondary/20"
              : "bg-primary text-secondary hover:bg-primary/90 hover:shadow-primary/20"
          }`}
        >
          Order Now
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-10 flex flex-col gap-1.5 p-2"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className={`block h-0.5 w-6 origin-center ${
              scrolled ? "bg-secondary" : "bg-primary"
            }`}
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className={`block h-0.5 w-6 ${
              scrolled ? "bg-secondary" : "bg-primary"
            }`}
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className={`block h-0.5 w-6 origin-center ${
              scrolled ? "bg-secondary" : "bg-primary"
            }`}
          />
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-xl border-b border-secondary/10 shadow-xl"
        >
          <ul className="flex flex-col px-6 py-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block text-base font-medium text-secondary/80 hover:text-secondary transition-colors py-2 tracking-wide uppercase"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#menu"
                onClick={(e) => handleNavClick(e, "#menu")}
                className="block text-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-primary"
              >
                Order Now
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
