"use client";

/**
 * Плавный скролл Lenis (как на baba.com). Отключается при prefers-reduced-motion.
 * Экземпляр хранится на уровне модуля, чтобы меню могло блокировать прокрутку.
 */

import Lenis from "lenis";
import { useEffect } from "react";

let lenisInstance: Lenis | null = null;

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, anchors: true, autoRaf: true });
    lenisInstance = lenis;
    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}

export function scrollToSelector(selector: string): void {
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) return;
  if (lenisInstance) {
    lenisInstance.start();
    lenisInstance.scrollTo(target, { duration: 1.4 });
    return;
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function setScrollLocked(isLocked: boolean): void {
  document.documentElement.style.overflow = isLocked ? "hidden" : "";
  if (!lenisInstance) return;
  if (isLocked) lenisInstance.stop();
  else lenisInstance.start();
}
