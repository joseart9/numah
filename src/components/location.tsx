"use client";

import { ScrollReveal } from "./scroll-reveal";

const hours = [
  { day: "Lunes — Viernes", time: "7:00 AM — 8:00 PM" },
  { day: "Sábado", time: "8:00 AM — 9:00 PM" },
  { day: "Domingo", time: "8:00 AM — 6:00 PM" },
];

export function Location() {
  return (
    <section id="location" className="py-24 md:py-32 bg-primary">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <span className="inline-block text-sm font-semibold text-accent tracking-widest uppercase mb-4">
            Visítanos
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-secondary leading-tight">
            Encuentra Tu Camino a Casa
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <ScrollReveal animation="slideInLeft">
            <div className="overflow-hidden rounded-2xl shadow-lg shadow-secondary/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2614.8209637051223!2d-100.2412571!3d25.5752141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662c7797c82c03b%3A0xde4eaad60258ff66!2sThe%20Village%20At%20La%20Rioja!5e1!3m2!1ses-419!2smx!4v1775864173142!5m2!1ses-419!2smx"
                width="100%"
                height="400"
                className="border-0 w-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Numah Café ubicación"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slideInRight" delay={0.15}>
            <div className="space-y-10">
              <div>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-5 h-5 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-secondary mb-1">
                      Dirección
                    </h3>
                    <p className="text-foreground-muted leading-relaxed">
                      The Village At La Rioja
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-5 h-5 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-secondary mb-3">
                      Horarios de Apertura
                    </h3>
                    <ul className="space-y-2.5">
                      {hours.map((item) => (
                        <li
                          key={item.day}
                          className="flex items-center justify-between gap-6 text-sm"
                        >
                          <span className="text-foreground-muted">
                            {item.day}
                          </span>
                          <span className="font-medium text-secondary">
                            {item.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-5 h-5 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-secondary mb-1">
                      Contacto
                    </h3>
                    <p className="text-foreground-muted leading-relaxed">
                      hello@numahcoffee.com
                      <br />
                      +52 81 1234 5678
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
