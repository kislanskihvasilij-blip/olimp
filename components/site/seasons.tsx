import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/site/primitives";
import { SHIFTS } from "@/lib/content";

/** Каталог летних смен — комплекс работает только летом. */
export function SummerShifts() {
  return (
    <section id="smeny" data-chapter="Смены" data-chapter-index="02" className="py-16 md:py-36">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <SectionHeading
            index="02"
            kicker="Летние смены"
            lines={["Лето, которое", "точно нужно", "вашему ребёнку"]}
            note="бронируйте заранее"
          />
          <Reveal className="max-w-md md:justify-self-end">
            <p className="text-base leading-[1.65] text-paper/70 md:text-lg">
              Смены с июня по август: у каждой своя тема, а море, спорт и вечерние праздники — в каждой.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SHIFTS.map((shift, i) => (
            <li key={shift.number}>
              <Reveal delay={i * 0.07} className="h-full">
                <article className="group flex h-full flex-col border border-paper/15 bg-ink transition-colors duration-500 hover:border-blaze/60">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={shift.photo}
                      alt={shift.alt}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale-[35%] transition duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <span className="absolute left-3 top-3 bg-ink/75 px-2 py-1 font-cond text-[0.8rem] uppercase tracking-[0.14em] text-paper">
                      Смена {shift.number}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <p className="font-cond text-[0.8rem] uppercase leading-[0.88] tracking-[0.12em] text-blaze">
                      {shift.dates} · {shift.tag}
                    </p>
                    <h3 className="font-serif text-[1.85rem] font-light italic leading-none">«{shift.title}»</h3>
                    <p className="text-[0.95rem] leading-[1.6] text-paper/65">{shift.text}</p>
                    <a
                      href="#zayavka"
                      className="mt-auto inline-flex items-center gap-2 pt-2 text-sm uppercase tracking-[0.06em] text-paper/90 transition-colors hover:text-blaze"
                    >
                      Забронировать
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
