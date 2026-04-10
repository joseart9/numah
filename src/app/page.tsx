import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { MenuPreview } from "@/components/menu-preview";
import { Location } from "@/components/location";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <section className="flex scroll-snap-y-mandatory overflow-x-hidden flex-col">
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuPreview />
        <Location />
        <Newsletter />
      </main>
      <Footer />
    </section>
  );
}
