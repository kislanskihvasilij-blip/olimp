import type { CSSProperties, ReactNode } from "react";
import { MaskLines } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type WithChildren = { children: ReactNode; className?: string };

export function Container({ children, className }: WithChildren) {
  return <div className={cn("mx-auto w-full max-w-[1600px] px-4 md:px-8", className)}>{children}</div>;
}

/** Рукописная пометка в квадратных скобках (Freshman → Caveat). */
export function HandNote({ children, className }: WithChildren) {
  return (
    <span className={cn("inline-block -rotate-2 font-hand text-[1.5rem] leading-none text-blaze", className)}>
      [ {children} ]
    </span>
  );
}

type KickerProps = WithChildren & { index?: string };

/** Маленькая подпись раздела: «§ 02 —— Каникулы». */
export function Kicker({ index, children, className }: KickerProps) {
  return (
    <p className={cn("flex items-center gap-3 font-cond text-[0.8rem] uppercase leading-[0.88] tracking-[0.12em] text-paper/60", className)}>
      {index ? <span className="text-blaze">§ {index}</span> : null}
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}

type SectionHeadingProps = {
  index: string;
  kicker: string;
  lines: string[];
  note?: string;
  className?: string;
};

export function SectionHeading({ index, kicker, lines, note, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Kicker index={index}>{kicker}</Kicker>
      <MaskLines
        lines={lines}
        className="font-serif text-[clamp(2.75rem,6.4vw,6.25rem)] font-light italic leading-[0.92] tracking-[-0.01em]"
      />
      {note ? <HandNote className="self-start">{note}</HandNote> : null}
    </div>
  );
}

const CTA_VARIANTS = {
  solid: "bg-paper text-ink hover:bg-blaze",
  ghost: "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  dark: "bg-ink text-paper hover:bg-shale",
} as const;

type CtaLinkProps = WithChildren & { href: string; variant?: keyof typeof CTA_VARIANTS };

export function CtaLink({ href, children, variant = "solid", className }: CtaLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 px-6 py-4 text-sm uppercase tracking-[0.06em] transition-colors duration-300",
        CTA_VARIANTS[variant],
        className,
      )}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  duration?: number;
  isReversed?: boolean;
};

/** Бегущая строка-«титры»: два одинаковых ряда, сдвиг на -50%. */
export function Marquee({ items, className, itemClassName, duration = 40, isReversed = false }: MarqueeProps) {
  const renderRow = (isClone: boolean) => (
    <ul aria-hidden={isClone || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className={cn("flex items-center whitespace-nowrap", itemClassName)}>
          <span>{item}</span>
          <span aria-hidden="true" className="mx-[0.45em] text-blaze">
            ✱
          </span>
        </li>
      ))}
    </ul>
  );
  const style = { "--marquee-duration": `${duration}s` } as CSSProperties;

  return (
    <div className={cn("marquee-pause relative flex overflow-hidden", className)}>
      <div className="marquee-track flex w-max" data-reverse={isReversed || undefined} style={style}>
        {renderRow(false)}
        {renderRow(true)}
      </div>
    </div>
  );
}
