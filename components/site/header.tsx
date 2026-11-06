"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { Logo, Mascot } from "@/components/brand/mascot";
import { EASE_OUT_EXPO } from "@/components/motion/reveal";
import { HandNote } from "@/components/site/primitives";
import { scrollToSelector, setScrollLocked } from "@/components/site/smooth-scroll";
import { NAV, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

const SCROLLED_OFFSET = 40;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => setIsScrolled(value > SCROLLED_OFFSET));
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
          isScrolled ? "border-paper/10 bg-ink/80 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 md:px-8">
          <a href="#top" aria-label={`${SITE.short} — наверх`}>
            <Logo isAnimated />
          </a>
          <span className="hidden font-cond text-xs uppercase leading-[0.88] tracking-[0.16em] text-paper/60 lg:block">
            {SITE.season} · {SITE.city}
          </span>
          <div className="flex items-center gap-6">
            <a href={SITE.phoneHref} className="hidden text-sm text-paper/80 transition-colors hover:text-paper md:block">
              {SITE.phone}
            </a>
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              className="group flex items-center gap-2 py-2 text-[0.95rem] uppercase tracking-[0.06em] text-paper"
            >
              <span aria-hidden="true" className="text-xl leading-none text-blaze transition-transform duration-300 group-hover:rotate-90">
                +
              </span>
              Меню
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>{isMenuOpen ? <MenuOverlay onClose={closeMenu} /> : null}</AnimatePresence>
    </>
  );
}

function MenuOverlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    setScrollLocked(true);
    // Пока меню открыто, страница под ним недоступна для Tab и скринридеров.
    const background = document.querySelectorAll<HTMLElement>("body > header, main, body > footer");
    background.forEach((element) => element.setAttribute("inert", ""));
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      background.forEach((element) => element.removeAttribute("inert"));
      setScrollLocked(false);
    };
  }, [onClose]);

  const handleNavigate = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClose();
    requestAnimationFrame(() => scrollToSelector(href));
  };

  return (
    <motion.div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Меню сайта"
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-paper"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-3 md:px-8">
        <Logo />
        <button type="button" onClick={onClose} autoFocus className="py-2 text-[0.95rem] uppercase tracking-[0.06em]">
          <span aria-hidden="true" className="text-blaze">
            ×
          </span>{" "}
          Закрыть
        </button>
      </div>
      <div className="mx-auto grid w-full max-w-[1600px] flex-1 gap-12 border-t border-paper/15 px-4 py-8 md:grid-cols-[1.4fr_1fr] md:px-8 md:py-12">
        <nav aria-label="Разделы сайта">
          <ol className="flex flex-col">
            {NAV.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05, duration: 0.7, ease: EASE_OUT_EXPO }}
              >
                <a
                  href={item.href}
                  onClick={handleNavigate(item.href)}
                  className="group flex items-baseline gap-4 border-b border-paper/10 py-2 font-serif text-[clamp(2rem,5vw,4.2rem)] font-light italic leading-none transition-colors hover:text-blaze"
                >
                  <span className="font-cond text-xs not-italic text-paper/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-3">{item.label}</span>
                </a>
              </motion.li>
            ))}
          </ol>
        </nav>
        <aside className="flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-5">
            <HandNote className="self-start">звоните, мы на связи</HandNote>
            <a href={SITE.phoneHref} className="font-serif text-4xl font-light italic hover:text-blaze">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="text-paper/70 hover:text-paper">
              {SITE.email}
            </a>
            <p className="text-sm text-paper/50">
              {SITE.address}
              <br />
              {SITE.hours}
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-6">
            <Mascot isAnimated className="size-28" />
            <a
              href="#zayavka"
              onClick={handleNavigate("#zayavka")}
              className="bg-blaze px-6 py-4 text-sm uppercase tracking-[0.06em] text-ink transition-colors hover:bg-paper"
            >
              Оставить заявку →
            </a>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
