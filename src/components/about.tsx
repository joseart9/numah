"use client";

import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";

const cards = [
  {
    title: "Crafted with Intention",
    description:
      "Every cup at Numah begins with a story — beans sourced directly from family farms across Colombia, Ethiopia, and Guatemala. Our roasters work in small batches to unlock flavors that honor the origin and the grower.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    alt: "Barista carefully pouring latte art in a ceramic cup",
  },
  {
    title: "A Space to Belong",
    description:
      "Numah isn't just a coffee shop — it's a living room for the neighborhood. Warm wood tones, natural light, and curated greenery create an atmosphere where you can slow down, reconnect, and feel at ease.",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    alt: "Warm and inviting coffee shop interior with natural light",
  },
  {
    title: "Rooted in Community",
    description:
      "From hosting local artists to partnering with nearby bakeries, Numah is built on the belief that great coffee brings people together. We're more than a brand — we're your neighbors.",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80",
    alt: "Community gathering at a cozy coffee shop",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-primary">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center mb-16 md:mb-24">
          <span className="inline-block text-sm font-semibold text-accent tracking-widest uppercase mb-4">
            The Numah Experience
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-secondary leading-tight">
            More Than Just Coffee
          </h2>
        </ScrollReveal>

        <div className="flex flex-col gap-20 md:gap-32">
          {cards.map((card, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={card.title}
                className={`flex flex-col gap-8 md:gap-16 items-center ${
                  isReversed ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <ScrollReveal
                  animation={isReversed ? "slideInRight" : "slideInLeft"}
                  delay={0.1}
                  className="flex-1 w-full"
                >
                  <div className="space-y-5">
                    <span className="inline-block text-xs font-bold text-accent/60 tracking-[0.2em] uppercase">
                      0{index + 1}
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl text-secondary leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-foreground-muted leading-relaxed text-base md:text-lg max-w-md">
                      {card.description}
                    </p>
                    <div className="pt-2">
                      <a
                        href="#menu"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-secondary group"
                      >
                        <span className="border-b border-secondary/30 group-hover:border-secondary transition-colors duration-300">
                          Discover more
                        </span>
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
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal
                  animation={isReversed ? "slideInLeft" : "slideInRight"}
                  delay={0.2}
                  className="flex-1 w-full"
                >
                  <div className="relative group overflow-hidden rounded-2xl">
                    <div className="aspect-4/3 relative">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
