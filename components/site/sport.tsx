import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Container, Marquee, SectionHeading } from "@/components/site/primitives";
import { SPORT_WORDS, SPORTS, type Sport as SportItem, type SportArt, type SportTone } from "@/lib/content";
import { cn } from "@/lib/utils";

const TONES: Record<SportTone, string> = {
  blaze: "bg-blaze",
  flame: "bg-flame",
  sea: "bg-[#22C3B5]",
};

export function Sport() {
  return (
    <section id="sport" data-chapter="Спорт" data-chapter-index="06" className="border-t border-paper/10 py-16 md:py-36">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <SectionHeading
            index="06"
            kicker="Спорт"
            lines={["В «Олимпиец» —", "за спортивными", "свершениями"]}
            note="тренировки каждый день"
          />
          <Reveal className="max-w-md lg:justify-self-end">
            <p className="text-base leading-[1.65] text-paper/70 md:text-lg">
              Крытый зал для единоборств, поле для мини-футбола, площадки для баскетбола, волейбола и пляжного волейбола,
              настольный теннис. А «Олимпийские игры» открываются в «Олимпийце» каждый год.
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
                  <SportMedia sport={sport} />
                  <figcaption className="flex flex-col gap-1 border-b border-paper/15 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                    <span className="text-sm uppercase tracking-[0.02em] md:text-base">{sport.title}</span>
                    <span className="font-cond text-[0.8rem] uppercase tracking-[0.12em] text-paper/55">{sport.note}</span>
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

/** Реальное фото площадки или графическая карточка, если снимка нет. */
function SportMedia({ sport }: { sport: SportItem }) {
  if ("photo" in sport) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={sport.photo}
          alt={sport.alt}
          fill
          sizes="(min-width: 768px) 33vw, 50vw"
          className="object-cover transition duration-[1200ms] ease-out group-hover:scale-105"
        />
      </div>
    );
  }
  return (
    <div className={cn("relative grid aspect-[3/4] place-items-center overflow-hidden text-[#141414]", TONES[sport.tone])}>
      <SportIcon art={sport.art} />
    </div>
  );
}

function SportIcon({ art }: { art: SportArt }) {
  const className = "w-1/2 transition-transform duration-700 ease-out group-hover:-rotate-12 group-hover:scale-110";
  if (art === "ball") {
    return (
      <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="36" strokeWidth="6" />
        <path d="M50 14 V86 M14 50 H86" strokeWidth="5" />
        <path d="M27 22 C42 38 42 62 27 78 M73 22 C58 38 58 62 73 78" strokeWidth="5" />
      </svg>
    );
  }
  if (art === "belt") {
    return (
      <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="currentColor">
        <rect x="6" y="40" width="88" height="14" />
        <rect x="40" y="33" width="20" height="28" />
        <path d="M44 60 L34 90 L44 92 L52 62 Z M56 60 L66 90 L56 92 L48 62 Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="currentColor">
      <g transform="rotate(-35 46 46)">
        <circle cx="46" cy="38" r="26" />
        <rect x="40" y="60" width="12" height="30" rx="5" />
      </g>
      <circle cx="80" cy="22" r="7" fill="#FFFFFF" />
    </svg>
  );
}
