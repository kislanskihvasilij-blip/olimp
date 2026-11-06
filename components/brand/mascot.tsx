import { MASCOT_SVG_INNER, MASCOT_VIEWBOX } from "@/lib/brand/mascot";
import { cn } from "@/lib/utils";

type MascotProps = {
  className?: string;
  isAnimated?: boolean;
  /** Подпись для скринридеров; без неё значок декоративный. */
  label?: string;
};

/**
 * Значок-маскот «Олимпик». Разметка — статичная константа из lib/brand/mascot.ts
 * (без пользовательского ввода), поэтому innerHTML здесь безопасен.
 */
export function Mascot({ className, isAnimated = false, label }: MascotProps) {
  return (
    <svg
      viewBox={MASCOT_VIEWBOX}
      className={cn("mascot overflow-visible", isAnimated && "mascot-run", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: MASCOT_SVG_INNER }}
    />
  );
}

const LOGO_SIZES = {
  sm: {
    gap: "gap-2.5 md:gap-3",
    mark: "size-11 md:size-14",
    word: "text-[1rem] md:text-[1.3rem]",
    sub: "mt-1 text-[0.5rem] md:text-[0.58rem]",
  },
  lg: {
    gap: "gap-4 md:gap-6",
    mark: "size-24 md:size-32",
    word: "text-[1.8rem] md:text-[3rem]",
    sub: "mt-2 text-[0.66rem] md:text-[0.95rem]",
  },
} as const;

/** Фон, на котором стоит логотип: от него зависит цвет надписей. */
const LOGO_TONES = {
  dark: { word: "text-blaze", sub: "text-paper/70" },
  light: { word: "text-blaze", sub: "text-ink/70" },
  orange: { word: "text-ink", sub: "text-ink/75" },
} as const;

type LogoProps = {
  className?: string;
  isAnimated?: boolean;
  size?: keyof typeof LOGO_SIZES;
  tone?: keyof typeof LOGO_TONES;
};

export function Logo({ className, isAnimated = false, size = "sm", tone = "dark" }: LogoProps) {
  const sizes = LOGO_SIZES[size];
  const tones = LOGO_TONES[tone];
  return (
    <span className={cn("inline-flex items-center", sizes.gap, className)}>
      <Mascot isAnimated={isAnimated} className={cn("shrink-0", sizes.mark)} />
      <span className="flex flex-col">
        <span className={cn("whitespace-nowrap font-logo font-black uppercase leading-none tracking-[-0.03em]", sizes.word, tones.word)}>
          <span className="font-semibold">ДК</span> Олимпиец
        </span>
        <span className={cn("font-cond uppercase leading-none tracking-[0.12em]", sizes.sub, tones.sub)}>
          Детский оздоровительный комплекс
        </span>
      </span>
    </span>
  );
}
