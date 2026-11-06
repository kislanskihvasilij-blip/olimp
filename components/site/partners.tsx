import { Reveal } from "@/components/motion/reveal";
import { Container, CtaLink, SectionHeading } from "@/components/site/primitives";
import { PARTNER_OFFERS, SITE } from "@/lib/content";

const CAREER_SUBJECT = encodeURIComponent("Работа в «Олимпийце»");

export function Partners() {
  return (
    <section id="partneram" data-chapter="Партнёрам" data-chapter-index="08" className="border-t border-paper/10 py-16 md:py-36">
      <Container>
        <SectionHeading index="08" kicker="Партнёрские программы" lines={["Партнёрам"]} note="для школ, клубов и компаний" />

        <div className="mt-16 grid gap-px border border-paper/15 bg-paper/15 md:grid-cols-2">
          {PARTNER_OFFERS.map((offer, i) => (
            <Reveal key={offer.index} delay={i * 0.1} className="bg-ink">
              <article className="flex h-full flex-col gap-6 p-6 md:p-10">
                <span className="font-cond text-sm text-blaze">{offer.index}</span>
                <h3 className="font-serif text-[clamp(1.9rem,3vw,2.8rem)] font-light italic leading-none">{offer.title}</h3>
                <p className="max-w-lg text-[0.95rem] leading-[1.65] md:text-base text-paper/65">{offer.text}</p>
                <CtaLink href="#zayavka" variant="ghost" className="mt-auto self-start">
                  Обсудить
                </CtaLink>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="flex flex-col gap-8 border-y border-paper/15 py-10 md:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-4">
              <span className="font-cond text-[0.85rem] uppercase tracking-[0.14em] text-paper/50">Карьера</span>
              <h3 className="font-serif text-[clamp(2.4rem,5vw,4.5rem)] font-light italic leading-none">Работа в «Олимпийце»</h3>
              <p className="max-w-lg text-base leading-[1.6] text-paper/65 md:text-lg">
                Ищем вожатых, тренеров и медиков. Расскажите о себе — ответим каждому.
              </p>
            </div>
            <a
              href={`mailto:${SITE.email}?subject=${CAREER_SUBJECT}`}
              className="group inline-flex w-full shrink-0 items-center justify-between gap-8 bg-blaze px-8 py-6 text-lg uppercase tracking-[0.06em] text-ink transition-colors duration-300 hover:bg-paper sm:w-auto md:px-10 md:py-7 md:text-xl"
            >
              Напишите нам
              <span aria-hidden="true" className="text-2xl transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
