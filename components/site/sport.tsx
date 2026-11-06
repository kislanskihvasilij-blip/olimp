import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Container, Marquee, SectionHeading } from "@/components/site/primitives";
import { SPORT_WORDS, SPORTS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Sport() {
  return (
    <section id="sport" data-chapter="Спорт" data-chapter-index="06" className="border-t border-paper/10 py-24 md:py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <SectionHeading
            index="06"
            kicker="Спорт"
            lines={["В «Олимпиец» —", "за спортивными", "свершениями"]}
            note="тренировки каждый день"
          />
          <Reveal className="max-w-md lg:justify-self-end">
            <p className="text-[0.95rem] leading-[1.65] text-paper/70">
              Спортгородок с двумя стадионами и море в шаге от корпусов. Тренеры помогут подтянуть технику, а «Олимпийские
              игры», которые открываются в «Олимпийце» каждый год, — почувствовать вкус настоящей победы.
            </p>
          </Reveal>
        </div>
      </Container>

      <Marquee
        items={SPORT_WORDS}
        duration={45}
        className="mt-16 border-y border-paper/15 py-5"
        itemClassName="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light italic leading-[1.05]"
      />

      <Container className="mt-16">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 md:pb-16">
          {SPORTS.map((sport, i) => (
            <li key={sport.title} className={cn(i % 3 === 1 && "md:translate-y-16")}>
              <Reveal delay={(i % 3) * 0.08}>
                <figure className="group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={sport.photo}
                      alt={sport.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="flex flex-col gap-1 border-b border-paper/15 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                    <span className="text-sm uppercase tracking-[0.02em] md:text-base">{sport.title}</span>
                    <span className="font-cond text-xs uppercase tracking-[0.12em] text-paper/55">{sport.note}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
