import Link from "next/link";
import { Logo } from "@/components/brand/mascot";
import { Container, CtaLink } from "@/components/site/primitives";
import { NAV, SITE } from "@/lib/content";

const INFO_LINKS: { href: string; label: string }[] = [
  { href: "#", label: "Медицинская лицензия" },
  { href: "#", label: "Свидетельство о регистрации" },
  { href: "#", label: "Политика конфиденциальности" },
  { href: "/brand", label: "Логотип и фирменный стиль" },
];

const HEADING = "mb-5 font-cond text-xs uppercase tracking-[0.14em] text-paper/45";
const LINK = "text-sm text-paper/75 transition-colors hover:text-blaze";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-paper/15 pt-20">
      <Container className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-6">
          <Logo />
          <p className="max-w-sm text-sm leading-[1.6] text-paper/60">
            {SITE.fullName}. {SITE.address}, Черноморское побережье.
          </p>
          <CtaLink href="#zayavka">Оставить заявку</CtaLink>
        </div>
        <nav aria-label="Разделы сайта в подвале">
          <p className={HEADING}>Меню</p>
          <ul className="flex flex-col gap-2.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={LINK}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className={HEADING}>Информация</p>
          <ul className="flex flex-col gap-2.5">
            {INFO_LINKS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={LINK}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className={HEADING}>Связь</p>
          <a href={SITE.phoneHref} className={LINK}>
            {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className={LINK}>
            {SITE.email}
          </a>
          <span className="text-sm text-paper/50">{SITE.hours}</span>
          <a href="#top" className={`${LINK} mt-4`}>
            Наверх ↑
          </a>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="mt-16 select-none whitespace-nowrap text-center font-serif text-[22vw] font-light italic leading-[0.8] tracking-[-0.03em] text-paper/[0.07]"
      >
        Олимпиец
      </div>

      <Container className="flex flex-col gap-2 border-t border-paper/15 py-6 text-xs text-paper/45 md:flex-row md:justify-between">
        <span>© 2026 {SITE.short}</span>
        <span>Фотографии-заглушки: Unsplash</span>
      </Container>
    </footer>
  );
}
