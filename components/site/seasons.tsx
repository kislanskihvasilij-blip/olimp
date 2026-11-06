import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/site/primitives";
import { SEASONS } from "@/lib/content";

export function Seasons() {
  return (
    <section id="kanikuly" data-chapter="Каникулы" data-chapter-index="02" className="py-16 md:py-36">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <SectionHeading
            index="02"
            kicker="Каникулы круглый год"
            lines={["Отдых, который", "точно нужен", "вашему ребёнку"]}
            note="бронируйте заранее"
          />
          <Reveal className="max-w-md md:justify-self-end">
            <p className="text-base leading-[1.65] text-paper/70 md:text-lg">
              Четыре сезона — четыре настроения. Летом — море и спорт, осенью — открытия, зимой — новогодняя сказка, весной —
              перезагрузка перед финалом учебного года.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
          {SEASONS.map((season, i) => (
            <li key={season.key} className="bg-ink">
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group flex h-full flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={season.photo}
                      alt={season.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale-[40%] transition duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <span className="absolute left-4 top-4 bg-ink/70 px-2 py-1 font-cond text-[0.8rem] uppercase tracking-[0.14em] text-paper">
                      {String(i + 1).padStart(2, "0")} / {season.label}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
                    <p className="font-cond text-[0.8rem] uppercase leading-[0.88] tracking-[0.12em] text-blaze">{season.months}</p>
                    <h3 className="font-serif text-[2rem] font-light italic leading-none">{season.title}</h3>
                    <p className="text-[0.95rem] leading-[1.6] md:text-base text-paper/65">{season.text}</p>
                    <a
                      href="#zayavka"
                      className="mt-auto inline-flex items-center gap-2 pt-2 text-sm uppercase tracking-[0.06em] text-paper/90 transition-colors hover:text-blaze"
                    >
                      Подробнее
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
