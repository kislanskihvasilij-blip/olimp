"use client";

/**
 * «Счётчик главы» в духе Freshman: внизу слева показывает текущий раздел.
 * Секции помечаются атрибутами data-chapter / data-chapter-index.
 */

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE_OUT_EXPO } from "@/components/motion/reveal";

type Chapter = { index: string; label: string };

export function ChapterIndicator() {
  const [chapter, setChapter] = useState<Chapter | null>(null);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-chapter]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const data = (entry.target as HTMLElement).dataset;
          const label = data.chapter ?? "";
          setChapter(label ? { index: data.chapterIndex ?? "", label } : null);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-5 left-4 z-40 hidden overflow-hidden font-cond text-[0.75rem] uppercase leading-[0.88] tracking-[0.14em] text-paper/80 md:left-8 md:block"
    >
      <AnimatePresence mode="wait" initial={false}>
        {chapter ? (
          <motion.span
            key={chapter.index}
            className="block py-0.5"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-110%" }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          >
            <span className="text-blaze">§ {chapter.index}</span> — {chapter.label}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
