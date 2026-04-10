"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Hero() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 100);
  }, []);

  const bgY = useTransform(scrollY, [0, 800], [0, 300]);
  const contentY = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.1]);

  const handleScrollToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  const shouldAnimate = mounted && !shouldReduceMotion;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={shouldAnimate ? { y: bgY, scale } : {}}
      >
        <Image
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80"
          alt="Premium coffee beans arranged on a wooden surface"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-secondary/80 via-secondary/70 to-secondary-dark/90" />
        <div className="absolute inset-0 bg-linear-to-r from-secondary-dark/40 via-transparent to-secondary-dark/40" />
      </motion.div>

      <div className="absolute inset-0 z-1 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')] bg-repeat" />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        style={shouldAnimate ? { y: contentY, opacity } : {}}
      >
        <motion.div
          initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src="/isotype-primary.png"
            alt="Numah icon"
            width={80}
            height={80}
            className="mx-auto mb-6 h-auto w-8 md:h-auto md:w-24"
            priority
          />
        </motion.div>

        <motion.h1
          initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-primary leading-[1.05] tracking-tight"
        >
          Donde Cada Café
          <br />
          <span className="text-accent-light">Siente Como en Casa</span>
        </motion.h1>

        <motion.p
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-6 md:mt-8 text-lg md:text-xl text-primary/70 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Granos especiales, bebidas artesanales y un espacio diseñado para la
          conexión. Bienvenido a Numah.
        </motion.p>

        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#menu"
            onClick={handleScrollToMenu}
            className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-secondary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Menu
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-8 py-4 text-base font-medium text-primary/90 transition-all duration-300 hover:border-primary/60 hover:bg-primary/5"
          >
            Nosotros
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
