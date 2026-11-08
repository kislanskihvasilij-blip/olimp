import type { Metadata } from "next";
import Link from "next/link";
import { Logo, Mascot } from "@/components/brand/mascot";
import { HandNote } from "@/components/site/primitives";
import { BRAND_COLORS } from "@/lib/brand/mascot";

export const metadata: Metadata = {
  title: "Логотип — ДОК «Олимпиец»",
  description: "Логотип и фирменные цвета детского оздоровительного комплекса «Олимпиец».",
};

const FILES: { href: string; label: string }[] = [
  { href: "/brand/olimpiec-logo-horizontal-dark.svg", label: "Горизонтальный — для тёмного фона" },
  { href: "/brand/olimpiec-logo-horizontal-light.svg", label: "Горизонтальный — для светлого фона" },
  { href: "/brand/olimpiec-logo-stacked-light.svg", label: "Вертикальный — для светлого фона" },
  { href: "/brand/olimpiec-mark.svg", label: "Знак-маскот" },
];

const SWATCHES: { name: string; hex: string }[] = [
  { name: "Ядерный оранжевый", hex: BRAND_COLORS.blaze },
  { name: "Пламя", hex: BRAND_COLORS.flame },
  { name: "Уголь", hex: BRAND_COLORS.ink },
  { name: "Белый", hex: BRAND_COLORS.paper },
];

export default function BrandPage() {
  return (
    <main className="min-h-screen bg-ink px-4 py-12 text-paper md:px-8 md:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-14">
        <Link href="/" className="self-start text-sm uppercase tracking-[0.06em] text-paper/70 hover:text-blaze">
          ← На сайт
        </Link>

        <header className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div className="flex flex-col gap-6">
            <h1 className="font-serif text-[clamp(3rem,8vw,7.5rem)] font-light italic leading-[0.9]">Логотип «Олимпиец»</h1>
            <HandNote className="self-start">бежит к рекордам с факелом</HandNote>
          </div>
          <p className="max-w-md text-sm leading-[1.7] text-paper/70">
            Мультяшный ребёнок бежит с олимпийским факелом — без колец, только движение, спорт и радость. Ядерно-оранжевый круг,
            пламя вырывается за его край. Надпись «Олимпиец» набрана шрифтом Unbounded, подпись «Детский оздоровительный комплекс» — Oswald.
          </p>
        </header>

        <section aria-label="Логотип на разных фонах" className="grid gap-px overflow-hidden border border-paper/15 bg-paper/15">
          <div className="grid min-h-[280px] place-items-center bg-ink p-10">
            <Logo size="lg" isAnimated />
          </div>
          <div className="grid min-h-[280px] place-items-center bg-paper p-10">
            <Logo size="lg" tone="light" />
          </div>
          <div className="grid min-h-[280px] place-items-center bg-blaze p-10">
            <Logo size="lg" tone="orange" />
          </div>
        </section>

        <section aria-label="Знак-маскот" className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
          <Mascot isAnimated className="size-64 md:size-80" label="Маскот Олимпик бежит с факелом" />
          <div className="flex flex-col gap-6">
            <h2 className="font-serif text-5xl font-light italic">Олимпик</h2>
            <p className="max-w-lg text-sm leading-[1.7] text-paper/70">
              Маскот работает отдельно: на аватарках соцсетей, в иконке сайта, на сувенирке и в анимации. На сайте он бежит —
              руки и ноги в движении, пламя факела дрожит.
            </p>
            <ul className="flex flex-col border-t border-paper/15">
              {FILES.map((file) => (
                <li key={file.href} className="border-b border-paper/15">
                  <a href={file.href} download className="flex items-center justify-between py-4 text-sm hover:text-blaze">
                    {file.label}
                    <span aria-hidden="true">↓ SVG</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-label="Фирменные цвета" className="grid grid-cols-2 gap-px border border-paper/15 bg-paper/15 md:grid-cols-4">
          {SWATCHES.map((swatch) => (
            <div key={swatch.hex} className="flex flex-col bg-ink">
              <div className="h-32 border-b border-paper/15" style={{ backgroundColor: swatch.hex }} />
              <div className="flex flex-col gap-1 p-4">
                <span className="text-sm">{swatch.name}</span>
                <span className="font-cond text-xs uppercase tracking-[0.12em] text-paper/50">{swatch.hex}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
