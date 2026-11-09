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
import { PatternBand } from "@/components/site/patterns";
import { Programs } from "@/components/site/programs";
import { Reviews } from "@/components/site/reviews";
import { SummerShifts } from "@/components/site/seasons";
import { Sport } from "@/components/site/sport";

export default function Home() {
  return (
    <>
      <SiteHeader />
      {/* overflow-x-clip: плитки у краёв не дают горизонтальной прокрутки и не ломают sticky. */}
      <main className="overflow-x-clip">
        <Hero />
        <PatternBand variant="heroSeasons" />
        <SummerShifts />
        <PatternBand variant="seasonsAbout" />
        <About />
        <PatternBand variant="aboutAdvantages" />
        <Advantages />
        <PatternBand variant="advantagesPrograms" />
        <Programs />
        <PatternBand variant="programsSport" />
        <Sport />
        <PatternBand variant="sportKnowledge" />
        <Knowledge />
        <PatternBand variant="knowledgePartners" />
        <Partners />
        <PatternBand variant="partnersReviews" />
        <Reviews />
        <PatternBand variant="reviewsFaq" />
        <Faq />
        <PatternBand variant="faqBooking" />
        <Booking />
        <Contacts />
      </main>
      <Footer />
      <ChapterIndicator />
    </>
  );
}
