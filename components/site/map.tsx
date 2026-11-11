import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/site/primitives";
import { PHOTOS } from "@/lib/content";

/** Карта комплекса (иллюстрация PHOTOS.map из public/photos). */
export function CampMap() {
  return (
    <section id="karta" data-chapter="Карта" data-chapter-index="05" className="border-t border-paper/10 py-16 md:py-36">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <SectionHeading index="05" kicker="Карта комплекса" lines={["Всё рядом —", "от корпусов до моря"]} note="пять гектаров в сосновом лесу" />
          <Reveal className="max-w-md md:justify-self-end">
            <p className="text-base leading-[1.65] text-paper/70 md:text-lg">
              Спальный и лечебный корпуса, столовая, открытая сцена «Колизей», футбольное поле, площадки для баскетбола и
              пляжного волейбола, а за дорогой и полосой соснового леса — собственный пляж.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          {/* На телефоне карту листают вбок, чтобы подписи на ней оставались читаемыми. */}
          <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
            <div className="relative aspect-[1538/1023] min-w-[720px] overflow-hidden border border-paper/15 md:min-w-0">
              <Image
                src={PHOTOS.map}
                alt="Карта комплекса «Олимпиец»: спальный, лечебный и административный корпуса, столовая, открытая сцена «Колизей», хоздвор, футбольное поле, площадки для пляжного волейбола и баскетбола, памятник Ленину, адрес — Пионерский проспект, 247; через дорогу — пляж у моря"
                fill
                sizes="(min-width: 1600px) 1536px, (min-width: 768px) 100vw, 720px"
                className="object-cover"
              />
            </div>
          </div>
          <p className="mt-3 font-cond text-[0.8rem] uppercase tracking-[0.14em] text-paper/45 md:hidden">← листайте карту →</p>
        </Reveal>
      </Container>
    </section>
  );
}
