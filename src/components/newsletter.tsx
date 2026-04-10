"use client";

import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";

export function Newsletter() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-secondary relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <ScrollReveal>
          <Image
            src="/isotype-primary.png"
            alt=""
            width={56}
            height={56}
            className="mx-auto mb-6 h-12 w-12 opacity-60"
            aria-hidden="true"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
            Join the Numah Family
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-4 text-primary/60 text-lg max-w-lg mx-auto leading-relaxed">
            Be the first to know about seasonal blends, community events, and
            exclusive offers. No spam — just warmth in your inbox.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <label htmlFor="email-input" className="sr-only">
              Email address
            </label>
            <input
              id="email-input"
              type="email"
              placeholder="your@email.com"
              required
              className="w-full sm:flex-1 rounded-full bg-primary/10 border border-primary/15 px-6 py-3.5 text-sm text-primary placeholder:text-primary/40 outline-none transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:border-primary/30 focus:bg-primary/15"
            />
            <button
              type="submit"
              className="w-full sm:w-auto rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-secondary transition-all duration-300 hover:shadow-xl hover:shadow-primary/15 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p className="mt-4 text-primary/40 text-xs">
            By subscribing, you agree to our Privacy Policy. Unsubscribe
            anytime.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
