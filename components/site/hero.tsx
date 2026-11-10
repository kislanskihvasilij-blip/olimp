"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { preload } from "react-dom";
import { AnimatedMascot } from "@/components/brand/animated-mascot";
import { EASE_OUT_EXPO, Scribble } from "@/components/motion/reveal";
import { CtaLink, HandNote } from "@/components/site/primitives";
import WaterRippleImage from "@/components/ui/water-ripple-image";
import { HERO_PHOTO, SHIFTS, SITE } from "@/lib/content";

const WORDMARK = Array.from("Олимпиец");
const LETTER_DELAY = 0.06;

export function Hero() {
  // Фон hero — самая крупная картинка первого экрана: грузим её с высоким приоритетом.
  preload(HERO_PHOTO, { as: "image", fetchPriority: "high" });
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay },
  });

  return (
    <section ref={ref} id="top" data-chapter="" className="theme-dark relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <WaterRippleImage
          src={HERO_PHOTO}
          fit="cover"
          blueish={0.3}
          scale={7}
          illumination={0.12}
          surfaceDistortion={0.045}
          waterDistortion={0.018}
          maxDpr={1.25}
          resolution={0.6}
          maxFps={45}
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-ink via-ink/70 to-transparent" />
      </div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-1 flex-col justify-center px-4 pt-28 pb-10 md:px-8"
      >
        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mb-5 max-w-[22rem] text-center font-cond text-[0.78rem] uppercase leading-[1.5] tracking-[0.22em] text-paper/75 md:max-w-none md:text-sm md:leading-[0.88]"
        >
          Детский оздоровительный комплекс · {SITE.city}
        </motion.p>

        <h1 className="sr-only">{SITE.fullName}</h1>
        <div
          aria-hidden="true"
          className="relative mx-auto select-none font-serif text-[clamp(4.6rem,21vw,21rem)] font-light italic leading-[0.82] tracking-[-0.02em]"
        >
          <span className="flex overflow-hidden pr-[0.08em] pb-[0.14em]">
            {WORDMARK.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                className="inline-block"
                initial={reduce ? false : { y: "110%", rotate: 8 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: 1.25, ease: EASE_OUT_EXPO, delay: 0.35 + i * LETTER_DELAY }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </div>

        <div className="mx-auto mt-8 grid w-full max-w-[1600px] items-end gap-8 md:mt-12 md:grid-cols-[1fr_auto_1fr]">
          <motion.div {...fadeUp(0.9)}>
            <p className="max-w-[480px] text-base leading-[1.55] md:text-lg text-paper/85">
              Твои лучшие каникулы начинаются здесь: больше пяти гектаров зелени, 300 метров до моря и собственный пляж,
              спорт и праздник каждый день.
            </p>
            <HandNote className="mt-4">мир, где всё — для детей</HandNote>
          </motion.div>
          <motion.div {...fadeUp(1.05)} className="flex flex-wrap gap-3 md:justify-center">
            <CtaLink href="#zayavka">Оставить заявку</CtaLink>
            <CtaLink href="#putevki" variant="ghost">
              Путёвки
            </CtaLink>
          </motion.div>
          <motion.div {...fadeUp(1.2)} className="hidden items-end justify-end gap-1 md:flex">
            <div className="relative mb-14 text-right">
              <span className="font-hand text-[1.6rem] leading-none text-paper">Привет! Я — Олимпик</span>
              <Scribble variant="arrow" className="absolute -bottom-12 right-2 h-11 w-20 text-blaze" delay={1.6} />
            </div>
            <AnimatedMascot className="size-28 lg:size-36" label="Маскот Олимпик бежит с факелом" />
          </motion.div>
        </div>
      </motion.div>

      <ShiftReel />
    </section>
  );
}

/** Лента смен внизу экрана — «титры кинофестиваля» из Freshman. */
function ShiftReel() {
  const style = { "--marquee-duration": "70s" } as CSSProperties;
  const renderRow = (isClone: boolean) => (
    <ul aria-hidden={isClone || undefined} className="flex shrink-0 items-center gap-10 py-4 pr-10">
      {SHIFTS.map((shift) => (
        <li key={shift.title}>
          <a href="#putevki" tabIndex={isClone ? -1 : undefined} className="group/item flex items-center gap-4">
            <span className="relative h-12 w-[72px] shrink-0 overflow-hidden">
              <Image
                src={shift.photo}
                alt=""
                fill
                sizes="72px"
                className="object-cover grayscale transition duration-500 group-hover/item:scale-110 group-hover/item:grayscale-0"
              />
            </span>
            <span className="flex flex-col gap-1.5 whitespace-nowrap">
              <span className="text-sm uppercase tracking-[0.02em] transition-colors group-hover/item:text-blaze">
                «{shift.title}»
              </span>
              <span className="font-cond text-[0.8rem] leading-[0.88] text-paper/55">
                {shift.dates} · {shift.tag}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative z-10 border-t border-paper/20 bg-ink/85">
      <div className="flex items-stretch">
        <div className="hidden shrink-0 flex-col justify-center border-r border-paper/20 px-6 font-cond text-[0.75rem] uppercase leading-[0.88] tracking-[0.12em] text-paper/60 md:flex">
          <span className="text-blaze">Смены</span>
          <span className="mt-1.5">лето</span>
        </div>
        <div className="marquee-pause relative flex-1 overflow-hidden pl-6">
          <div className="marquee-track flex w-max" style={style}>
            {renderRow(false)}
            {renderRow(true)}
          </div>
        </div>
      </div>
    </div>
  );
}
