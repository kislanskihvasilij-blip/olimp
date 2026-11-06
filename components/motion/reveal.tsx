"use client";

/**
 * Анимационные примитивы сайта: появление при скролле, маска строк,
 * счётчики, параллакс и «рукописные» штрихи в духе baba.com.
 * Все учитывают prefers-reduced-motion.
 */

import Image from "next/image";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };

type RevealProps = { children: ReactNode; className?: string; delay?: number; y?: number };

export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

type MaskLinesProps = {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
};

/** Заголовок, строки которого «выезжают» из-под маски. */
export function MaskLines({ lines, as: Tag = "h2", className, delay = 0 }: MaskLinesProps) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={line} className="-mb-[0.1em] block overflow-hidden pr-[0.12em] pb-[0.1em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={VIEWPORT}
            transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: delay + i * 0.09 }}
          >
            {`${line} `}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

const numberFormat = new Intl.NumberFormat("ru-RU");

type CountUpProps = { value: number; prefix?: string; suffix?: string; className?: string };

export function CountUp({ value, prefix = "", suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce) return;
    const render = (current: number) => {
      node.textContent = `${prefix}${numberFormat.format(Math.round(current))}${suffix}`;
    };
    if (!isInView) {
      render(0);
      return;
    }
    const controls = animate(0, value, { duration: 1.8, ease: EASE_OUT_EXPO, onUpdate: render });
    return () => controls.stop();
  }, [isInView, reduce, value, prefix, suffix]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {`${prefix}${numberFormat.format(value)}${suffix}`}
    </span>
  );
}

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  strength?: number;
};

export function ParallaxImage({ src, alt, sizes, className, strength = 60 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="absolute inset-x-0" style={{ top: -strength, bottom: -strength, y: reduce ? 0 : y }}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}

const SCRIBBLES = {
  underline: { viewBox: "0 0 220 24", d: "M4 16 C 44 7, 98 5, 140 10 S 200 18, 216 8" },
  circle: {
    viewBox: "0 0 220 90",
    d: "M168 12 C 112 -2, 26 8, 10 40 C -2 70, 78 86, 144 79 C 204 72, 222 44, 202 24 C 188 10, 156 6, 124 9",
  },
  arrow: { viewBox: "0 0 120 80", d: "M8 8 C 26 54, 62 70, 104 58 M88 44 L106 58 L88 72" },
  check: { viewBox: "0 0 40 40", d: "M6 22 L16 32 L35 6" },
  star: { viewBox: "0 0 44 44", d: "M22 4 L26.5 17 L40 17 L29 25.5 L33 39 L22 30.5 L11 39 L15 25.5 L4 17 L17.5 17 Z" },
  squiggle: { viewBox: "0 0 160 20", d: "M4 10 Q 14 2, 24 10 T 44 10 T 64 10 T 84 10 T 104 10 T 124 10 T 144 10 T 156 10" },
} as const;

export type ScribbleVariant = keyof typeof SCRIBBLES;

type ScribbleProps = { variant: ScribbleVariant; className?: string; delay?: number; strokeWidth?: number };

/** «Рукописный» штрих, который прорисовывается при появлении в кадре. */
export function Scribble({ variant, className, delay = 0, strokeWidth = 2.5 }: ScribbleProps) {
  const reduce = useReducedMotion();
  const shape = SCRIBBLES[variant];
  return (
    <svg viewBox={shape.viewBox} fill="none" aria-hidden="true" className={cn("pointer-events-none overflow-visible", className)}>
      <motion.path
        d={shape.d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ pathLength: { duration: 1.2, ease: EASE_IN_OUT, delay }, opacity: { duration: 0.2, delay } }}
      />
    </svg>
  );
}
