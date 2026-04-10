"use client";

import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";

const menuItems = [
  {
    name: "Yirgacheffe",
    description:
      "Notas cítricas brillantes, aroma floral, con un final limpio de miel",
    price: "$5.50",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
    alt: "Pour over coffee in a ceramic mug",
    tag: "Origen Único",
  },
  {
    name: "Blend de Casa",
    description:
      "Cuerpo rico de chocolate y caramelo, equilibrado con tonos de arándanos suaves",
    price: "$4.50",
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&q=80",
    alt: "Freshly brewed coffee with rich crema",
    tag: "Sello Signature",
  },
  {
    name: "Latte Ceremonial de Matcha",
    description:
      "Matcha japonés molido en piedra con leche de avena vaporizada y vainilla",
    price: "$6.00",
    image:
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=80",
    alt: "Vibrant green matcha latte",
    tag: "Popular",
  },
  {
    name: "Cold Brew Reserva",
    description:
      "24 horas de reposo lento, suave y naturalmente dulce con acidez baja",
    price: "$5.00",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
    alt: "Cold brew coffee in a clear glass",
    tag: "Refrescante",
  },
];

export function MenuPreview() {
  return (
    <section
      id="menu"
      className="py-24 md:py-32 bg-secondary relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')] bg-repeat" />

      <div className="relative mx-auto max-w-7xl px-6">
        <ScrollReveal className="text-center mb-16 md:mb-20">
          <span className="inline-block text-sm font-semibold text-accent-light tracking-widest uppercase mb-4">
            Nuestro Menú
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
            Hecho para Ti
          </h2>
          <p className="mt-4 text-primary/60 text-lg max-w-xl mx-auto">
            Desde tazas de origen único a especiales de temporada — cada bebida
            cuenta una historia.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <ScrollReveal
              key={item.name}
              animation="fadeInUp"
              delay={index * 0.1}
              className="h-full"
            >
              <div className="group relative h-full flex flex-col bg-secondary-dark/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/6 hover:border-primary/12 transition-all duration-500 hover:shadow-xl hover:shadow-black/10">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-secondary-dark/60 to-transparent" />
                  <span className="absolute top-4 left-4 inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-secondary">
                    {item.tag}
                  </span>
                </div>
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg text-primary leading-snug">
                      {item.name}
                    </h3>
                    <span className="text-accent-light font-semibold text-sm whitespace-nowrap pt-0.5">
                      {item.price}
                    </span>
                  </div>
                  <p className="mt-2 text-primary/50 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary/10 hover:border-primary/40"
          >
            Ver Menú Completo
            <svg
              className="w-4 h-4"
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
        </ScrollReveal>
      </div>
    </section>
  );
}
