import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Numah Café | Donde Cada Trago Se Siente Como en Casa",
  description:
    "Descubre Numah — una experiencia de café premium basada en el calor, la artesanía y la comunidad. Granos especiales, bebidas artesanales y un espacio diseñado para la conexión.",
  keywords: [
    "numah café",
    "café premium",
    "artesanía",
    "café shop",
    "premium coffee",
    "craft coffee",
    "café",
    "café en monterrey",
    "café en san pedro",
    "café en san pedro garza garcia",
    "café en san pedro garza garcia garcia",
    "cafeteria numah",
    "cafeteria numah monterrey",
    "cafeteria numah san pedro",
    "cafeteria numah san pedro garza garcia",
    "cafeteria numah san pedro garza garcia garcia",
    "cafeteria numah monterrey",
    "cafeteria numah san pedro",
    "cafeteria numah san pedro garza garcia",
    "cafeteria numah san pedro garza garcia garcia",
  ],
  openGraph: {
    title: "Numah Café | Donde Cada Trago Se Siente Como en Casa",
    description:
      "Descubre Numah — una experiencia de café premium basada en el calor, la artesanía y la comunidad.",
    type: "website",
    locale: "es_ES",
    siteName: "Numah Café",
  },
  twitter: {
    card: "summary_large_image",
    title: "Numah Café | Donde Cada Trago Se Siente Como en Casa",
    description:
      "Descubre Numah — una experiencia de café premium basada en el calor, la artesanía y la comunidad.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} h-full antialiased bg-primary`}
    >
      <body className="min-h-full flex flex-col font-body bg-primary">
        {children}
      </body>
    </html>
  );
}
