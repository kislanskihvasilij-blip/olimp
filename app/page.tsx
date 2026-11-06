import { About } from "@/components/site/about";
import { Advantages } from "@/components/site/advantages";
import { Booking } from "@/components/site/booking";
import { ChapterIndicator } from "@/components/site/chapter-indicator";
import { Contacts } from "@/components/site/contacts";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Knowledge } from "@/components/site/knowledge";
import { Partners } from "@/components/site/partners";
import { Programs } from "@/components/site/programs";
import { Reviews } from "@/components/site/reviews";
import { Seasons } from "@/components/site/seasons";
import { Sport } from "@/components/site/sport";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Seasons />
        <About />
        <Advantages />
        <Programs />
        <Sport />
        <Knowledge />
        <Partners />
        <Reviews />
        <Faq />
        <Booking />
        <Contacts />
      </main>
      <Footer />
      <ChapterIndicator />
    </>
  );
}
