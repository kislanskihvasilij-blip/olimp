import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Container, Marquee, SectionHeading } from "@/components/site/primitives";
import { CLUBS, KNOWLEDGE } from "@/lib/content";

export function Knowledge() {
  return (
    <section id="znaniya" data-chapter="Знания" data-chapter-index="07" className="border-t border-paper/10 py-24 md:py-36">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <SectionHeading
            index="07"
            kicker="Знания и творчество"
            lines={["Каникулы, после", "которых хочется", "учиться"]}
            note="кружки на любой вкус"
          />
          <Reveal className="max-w-md md:justify-self-end">
            <p className="text-[0.95rem] leading-[1.65] text-paper/70">
              На смене можно попробовать себя в новых профессиях: программы подбираем по возрасту, способностям и интересам
              ребёнка.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3 md:gap-4">
          {KNOWLEDGE.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 0.08}>
                <article className="group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.photo}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover grayscale-[30%] transition duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="border-b border-paper/15 py-5">
                    <h3 className="font-serif text-[1.9rem] font-light italic leading-none">{item.title}</h3>
                    <p className="mt-3 text-sm leading-[1.6] text-paper/65">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      <Marquee
        items={CLUBS}
        isReversed
        duration={55}
        className="mt-20"
        itemClassName="font-serif text-[clamp(2.5rem,7vw,6.5rem)] font-light italic leading-[1.1] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.55)]"
      />
    </section>
  );
}
