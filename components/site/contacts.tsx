import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/site/primitives";
import { SITE } from "@/lib/content";

const LINK = "transition-colors hover:text-blaze";

const CONTACTS: { label: string; value: ReactNode }[] = [
  {
    label: "Адрес",
    value: (
      <>
        {SITE.address}
        <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className={`mt-3 block text-sm text-blaze ${LINK}`}>
          Открыть на карте ↗
        </a>
      </>
    ),
  },
  {
    label: "Телефон",
    value: (
      <a href={SITE.phoneHref} className={LINK}>
        {SITE.phone}
      </a>
    ),
  },
  {
    label: "E-mail",
    value: (
      <a href={`mailto:${SITE.email}`} className={LINK}>
        {SITE.email}
      </a>
    ),
  },
  {
    label: "Instagram",
    value: (
      <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={LINK}>
        @olimpiec_anapa ↗
      </a>
    ),
  },
  { label: "Режим работы", value: SITE.hours },
  { label: "Приём руководителя", value: SITE.directorHours },
];

export function Contacts() {
  return (
    <section id="kontakty" data-chapter="Контакты" data-chapter-index="12" className="py-16 md:py-36">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
        <SectionHeading index="12" kicker="Как к нам добраться" lines={["Локация"]} note="Анапа, Черноморское побережье" />
        <Reveal>
          <dl className="grid gap-px border border-paper/15 bg-paper/15 sm:grid-cols-2">
            {CONTACTS.map((item) => (
              <div key={item.label} className="flex flex-col gap-3 bg-ink p-6 md:p-8">
                <dt className="font-cond text-[0.8rem] uppercase tracking-[0.12em] text-paper/50">{item.label}</dt>
                <dd className="text-lg leading-[1.4]">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
