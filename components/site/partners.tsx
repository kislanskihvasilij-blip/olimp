import { Reveal } from "@/components/motion/reveal";
import { Container, CtaLink, SectionHeading } from "@/components/site/primitives";
import { PARTNER_OFFERS, SITE } from "@/lib/content";

const CAREER_SUBJECT = encodeURIComponent("Работа в «Олимпийце»");

export function Partners() {
  return (
    <section id="partneram" data-chapter="Партнёрам" data-chapter-index="08" className="border-t border-paper/10 py-24 md:py-36">
      <Container>
        <SectionHeading index="08" kicker="Партнёрские программы" lines={["Партнёрам"]} note="для школ, клубов и компаний" />

        <div className="mt-16 grid gap-px border border-paper/15 bg-paper/15 md:grid-cols-2">
          {PARTNER_OFFERS.map((offer, i) => (
            <Reveal key={offer.index} delay={i * 0.1} className="bg-ink">
              <article className="flex h-full flex-col gap-6 p-6 md:p-10">
                <span className="font-cond text-sm text-blaze">{offer.index}</span>
                <h3 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] font-light italic leading-none">{offer.title}</h3>
                <p className="max-w-lg text-sm leading-[1.65] text-paper/65">{offer.text}</p>
                <CtaLink href="#zayavka" variant="ghost" className="mt-auto self-start">
                  Обсудить
                </CtaLink>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <a
            href={`mailto:${SITE.email}?subject=${CAREER_SUBJECT}`}
            className="group flex flex-col gap-4 border-y border-paper/15 py-10 md:flex-row md:items-center md:justify-between"
          >
            <span className="font-cond text-xs uppercase tracking-[0.14em] text-paper/50">Карьера</span>
            <span className="font-serif text-[clamp(2.2rem,5vw,4.5rem)] font-light italic leading-none transition-colors duration-300 group-hover:text-blaze">
              Работа в «Олимпийце»
            </span>
            <span className="max-w-xs text-sm leading-[1.6] text-paper/60">
              Ищем вожатых, тренеров и медиков на {SITE.season.toLowerCase()} — напишите нам
              <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
