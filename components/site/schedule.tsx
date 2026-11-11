import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/site/primitives";
import { SHIFTS, shiftDates, type Shift } from "@/lib/content";
import { cn } from "@/lib/utils";

const DAY_MS = 86_400_000;
const YEAR = 2026; // любой год: считаем только дни внутри лета
const SEASON_START = Date.UTC(YEAR, 5, 1);
const MONTHS = [
  { name: "Июнь", days: 30 },
  { name: "Июль", days: 31 },
  { name: "Август", days: 31 },
];
const SEASON_DAYS = MONTHS.reduce((sum, month) => sum + month.days, 0);

/** «ДД.ММ» → номер дня от 1 июня (0 — первое июня). */
const dayIndex = (ddmm: string): number => {
  const [day, month] = ddmm.split(".").map(Number);
  return (Date.UTC(YEAR, month - 1, day) - SEASON_START) / DAY_MS;
};

const shiftLength = (shift: Shift): number => dayIndex(shift.end) - dayIndex(shift.start) + 1;

const daysWord = (n: number): string => {
  const last = n % 10;
  const lastTwo = n % 100;
  if (last === 1 && lastTwo !== 11) return "день";
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return "дня";
  return "дней";
};

/** Расписание летних смен: шкала лета и карточки смен. */
export function ShiftSchedule() {
  return (
    <section id="smeny" data-chapter="Расписание" data-chapter-index="02" className="py-16 md:py-36">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <SectionHeading index="02" kicker="Расписание смен" lines={["Четыре смены", "у моря"]} note="бронируйте заранее" />
          <Reveal className="max-w-md md:justify-self-end">
            <p className="text-base leading-[1.65] text-paper/70 md:text-lg">
              С июня по август: море, спорт, творческие студии и свои «Олимпийские игры» в каждой смене.
            </p>
          </Reveal>
        </div>

        {/* Шкала лета: отрезки смен в масштабе дат. Дублирует карточки, поэтому скрыта от скринридеров. */}
        <Reveal className="mt-16">
          <div aria-hidden="true">
            <div
              className="grid font-cond text-[0.8rem] uppercase tracking-[0.14em] text-paper/50"
              style={{ gridTemplateColumns: MONTHS.map((month) => `${month.days}fr`).join(" ") }}
            >
              {MONTHS.map((month) => (
                <span key={month.name} className="border-l border-paper/25 pb-3 pl-3">
                  {month.name}
                </span>
              ))}
            </div>
            <div className="relative h-16 border-y border-paper/15 md:h-20">
              {SHIFTS.map((shift, i) => (
                <div
                  key={shift.title}
                  className={cn(
                    "absolute inset-y-2 flex items-center justify-center font-serif text-2xl font-light italic text-[#000] md:text-4xl",
                    i % 2 === 0 ? "bg-blaze" : "bg-flame",
                  )}
                  style={{
                    left: `${(dayIndex(shift.start) / SEASON_DAYS) * 100}%`,
                    width: `${(shiftLength(shift) / SEASON_DAYS) * 100}%`,
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHIFTS.map((shift, i) => {
            const days = shiftLength(shift);
            return (
              <li key={shift.title}>
                <Reveal delay={i * 0.08} className="h-full">
                  <article className="group flex h-full flex-col border border-paper/15 bg-shale transition-colors duration-500 hover:border-blaze/60">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={shift.photo}
                        alt={shift.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover grayscale-[35%] transition duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-serif text-6xl font-light italic leading-none text-blaze">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-cond text-[0.8rem] uppercase tracking-[0.14em] text-paper/55">
                          {shift.title} · {days} {daysWord(days)}
                        </span>
                      </div>
                      <p className="font-cond text-2xl uppercase leading-none tracking-[0.02em] md:text-[1.75rem]">{shiftDates(shift)}</p>
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
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
