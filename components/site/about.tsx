import { CountUp, ParallaxImage, Reveal, Scribble } from "@/components/motion/reveal";
import { Container, CtaLink, SectionHeading } from "@/components/site/primitives";
import { ABOUT_STATS, PHOTOS, SITE } from "@/lib/content";

export function About() {
  return (
    <section id="o-komplekse" data-chapter="О комплексе" data-chapter-index="03" className="border-t border-paper/10 py-24 md:py-36">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="flex flex-col gap-10">
          <SectionHeading
            index="03"
            kicker="О комплексе"
            lines={["Пять гектаров", "детского счастья", "у самого моря"]}
            note="300 метров до пляжа"
          />
          <Reveal>
            <p className="max-w-xl text-base leading-[1.7] text-paper/80">
              «{SITE.name}» — детский оздоровительный комплекс в Анапе, где спорт, здоровье и дружба живут по одному расписанию.
              Зелёная территория больше пяти гектаров, собственный пляж в 300 метрах, спортгородок и пятиразовое питание, а рядом —
              команда вожатых, тренеров и медиков, которые знают, как сделать каникулы полезными и по-настоящему счастливыми.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <CtaLink href="#zayavka" variant="ghost">
              Забронировать смену
            </CtaLink>
          </Reveal>
        </div>

        <div className="relative">
          <ParallaxImage
            src={PHOTOS.kidField}
            alt="Ребёнок бежит по полю в лучах солнца"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/5] w-full"
            strength={70}
          />
          <div className="absolute -bottom-6 -left-2 -rotate-3 bg-blaze px-5 py-4 text-ink md:-left-10">
            <span className="block font-hand text-[1.7rem] leading-[0.95]">
              каждый день —
              <br />
              новый рекорд!
            </span>
          </div>
          <div className="absolute -top-6 right-2 text-blaze md:-right-6">
            <span className="relative block px-6 py-3 font-hand text-[1.6rem] leading-none text-paper">
              {SITE.season.toLowerCase()}
              <Scribble variant="circle" className="absolute inset-0 h-full w-full text-blaze" delay={0.3} />
            </span>
          </div>
        </div>
      </Container>

      <Container className="mt-24">
        <dl className="grid grid-cols-2 gap-px border-y border-paper/15 bg-paper/15 lg:grid-cols-4">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-4 bg-ink px-4 py-8 md:px-6 md:py-10">
              <dt className="order-2 font-cond text-xs uppercase leading-[1.2] tracking-[0.12em] text-paper/60">{stat.label}</dt>
              <dd className="order-1 font-serif text-[clamp(3.4rem,7vw,6.5rem)] font-light italic leading-none">
                {stat.text ?? <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
