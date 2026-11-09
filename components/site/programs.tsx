"use client";

/**
 * Путёвки — список-«титры» с превью-фото, которое плывёт за курсором.
 */

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useState, type PointerEvent } from "react";
import { EASE_OUT_EXPO, Reveal } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/site/primitives";
import { PROGRAMS } from "@/lib/content";
import { cn } from "@/lib/utils";

const FOLLOW_SPRING = { stiffness: 220, damping: 26, mass: 0.6 };

export function Programs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, FOLLOW_SPRING);
  const y = useSpring(pointerY, FOLLOW_SPRING);
  const isActive = activeIndex !== null;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    pointerX.set(event.clientX);
    pointerY.set(event.clientY);
  };

  return (
    <section
      id="putevki"
      data-chapter="Путёвки"
      data-chapter-index="05"
      onPointerMove={handlePointerMove}
      className="border-t border-paper/10 py-16 md:py-36"
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <SectionHeading index="05" kicker="Путёвки" lines={["Всё для вас —", "этим летом"]} note="выберите свою смену" />
          <Reveal className="max-w-md md:justify-self-end">
            <p className="text-base leading-[1.65] text-paper/70 md:text-lg">
              Программы, в которых каждый найдёт своё: от оздоровительных смен у моря до спортивных сборов и выездов
              организованных групп.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-paper/15" onPointerLeave={() => setActiveIndex(null)}>
          {PROGRAMS.map((program, i) => (
            <li key={program.index} onPointerEnter={() => setActiveIndex(i)} className="border-b border-paper/15">
              <Reveal delay={i * 0.06}>
                <a
                  href="#zayavka"
                  className="group grid items-center gap-4 py-8 md:grid-cols-[72px_1.1fr_1.2fr_auto] md:gap-8 md:py-10"
                >
                  <span className="font-cond text-sm text-paper/40 transition-colors group-hover:text-blaze">{program.index}</span>
                  <span className="flex items-center gap-4">
                    <span className="relative size-16 shrink-0 overflow-hidden md:hidden">
                      <Image src={program.photo} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                    <span className="font-serif text-[clamp(2rem,3.6vw,3.4rem)] font-light italic leading-[0.95] transition-transform duration-500 group-hover:translate-x-3">
                      {program.title}
                    </span>
                  </span>
                  <span className="text-[0.95rem] leading-[1.6] md:text-base text-paper/60">{program.text}</span>
                  <span className="flex flex-col items-start gap-1.5 md:items-end">
                    <span className="font-cond text-xl uppercase leading-none">{program.price}</span>
                    <span className="font-cond text-[0.8rem] uppercase tracking-[0.12em] text-paper/50">{program.duration}</span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block" style={{ x, y }}>
        <motion.div
          className="relative h-[340px] w-[260px] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          initial={false}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8, rotate: isActive ? -4 : -10 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        >
          {PROGRAMS.map((program, i) => (
            <Image
              key={program.index}
              src={program.photo}
              alt=""
              fill
              sizes="260px"
              className={cn("object-cover transition-opacity duration-300", activeIndex === i ? "opacity-100" : "opacity-0")}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
