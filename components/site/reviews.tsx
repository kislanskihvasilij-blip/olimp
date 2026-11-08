import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/site/primitives";
import { REVIEWS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Reviews() {
  return (
    <section id="otzyvy" data-chapter="Отзывы" data-chapter-index="09" className="border-t border-paper/10 py-16 md:py-36">
      <Container>
        <SectionHeading index="09" kicker="Что о нас говорят" lines={["Отзывы", "родителей"]} note="читаем каждый" />
        <ul className="mt-16 grid gap-4 md:grid-cols-2 md:pb-12">
          {REVIEWS.map((review, i) => (
            <li key={review.name} className={cn(i % 2 === 1 && "md:translate-y-12")}>
              <Reveal delay={(i % 2) * 0.1} className="h-full">
                <figure className="flex h-full flex-col gap-8 border border-paper/12 bg-shale p-6 md:p-10">
                  <span aria-hidden="true" className="font-serif text-7xl italic leading-[0.5] text-blaze">
                    «
                  </span>
                  <blockquote className="font-serif text-[1.55rem] font-light italic leading-[1.25] md:text-[1.8rem]">
                    {review.quote}
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3">
                    <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-paper/10 font-cond text-sm">
                      {review.name.charAt(0)}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-sm">{review.name}</span>
                      <span className="font-cond text-[0.8rem] uppercase tracking-[0.12em] text-paper/50">{review.meta}</span>
                    </span>
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
