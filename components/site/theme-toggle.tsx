"use client";

import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "theme";

/** Фон сайта: тёмный ↔ светлый. Выбор читается в app/layout.tsx до первой отрисовки. */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const isLight = root.dataset.theme !== "light";
    if (isLight) root.dataset.theme = "light";
    else delete root.dataset.theme;
    try {
      localStorage.setItem(STORAGE_KEY, isLight ? "light" : "dark");
    } catch {
      // Приватный режим: тема работает, просто не запомнится.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Переключить фон: светлый или тёмный"
      title="Светлый / тёмный фон"
      className="grid size-9 place-items-center text-paper/80 transition-colors hover:text-blaze"
    >
      <Sun aria-hidden="true" className="size-5 light:hidden" />
      <Moon aria-hidden="true" className="hidden size-5 light:block" />
    </button>
  );
}
