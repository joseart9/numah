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
  title: "Numah Coffee | Where Every Sip Feels Like Home",
  description:
    "Discover Numah — a premium coffee experience rooted in warmth, craftsmanship, and community. Specialty beans, artisan brews, and a space designed for connection.",
  keywords: [
    "numah coffee",
    "specialty coffee",
    "artisan coffee",
    "coffee shop",
    "premium coffee",
    "craft coffee",
  ],
  openGraph: {
    title: "Numah Coffee | Where Every Sip Feels Like Home",
    description:
      "Discover Numah — a premium coffee experience rooted in warmth, craftsmanship, and community.",
    type: "website",
    locale: "en_US",
    siteName: "Numah Coffee",
  },
  twitter: {
    card: "summary_large_image",
    title: "Numah Coffee | Where Every Sip Feels Like Home",
    description:
      "Discover Numah — a premium coffee experience rooted in warmth, craftsmanship, and community.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable} h-full antialiased bg-primary`}
    >
      <body className="min-h-full flex flex-col font-body bg-primary">
        {children}
      </body>
    </html>
  );
}
