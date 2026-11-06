import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/site/primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ, SITE } from "@/lib/content";

export function Faq() {
  return (
    <section id="voprosy" data-chapter="Вопросы" data-chapter-index="10" className="border-t border-paper/10 py-16 md:py-36">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading index="10" kicker="Ваши вопросы" lines={["Ответы", "на частые", "вопросы"]} note="не нашли ответ? звоните" />
          <a href={SITE.phoneHref} className="self-start font-serif text-3xl font-light italic transition-colors hover:text-blaze">
            {SITE.phone}
          </a>
        </div>
        <Reveal>
          <Accordion className="border-t border-paper/15">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={item.q} className="border-b border-paper/15">
                <AccordionTrigger className="rounded-none py-6 text-base font-normal hover:no-underline md:text-lg **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-blaze">
                  <span className="flex gap-4">
                    <span className="pt-1 font-cond text-sm text-paper/40">{String(i + 1).padStart(2, "0")}</span>
                    <span>{item.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-10 text-[0.95rem] leading-[1.7] md:text-base text-paper/65">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
