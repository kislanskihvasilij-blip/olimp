import type { Metadata, Viewport } from "next";
import { Caveat, Cormorant_Garamond, Onest, Oswald, Unbounded } from "next/font/google";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { cn } from "@/lib/utils";
import "./globals.css";

const onest = Onest({ variable: "--font-onest", subsets: ["latin", "cyrillic"], display: "swap" });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300"],
  style: ["italic"],
  display: "swap",
});
// Подписи и рукописные пометки не критичны для первого кадра — без preload, чтобы не мешать фото hero.
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin", "cyrillic"], weight: ["400"], display: "swap", preload: false });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin", "cyrillic"], weight: ["500"], display: "swap", preload: false });
const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin", "cyrillic"], weight: ["900"], display: "swap" });

const TITLE = "«Олимпиец» — детский оздоровительный комплекс в Анапе";
const DESCRIPTION =
  "Детский оздоровительный комплекс «Олимпиец» в Анапе: больше пяти гектаров зелени, 300 метров до моря и собственный пляж, спортгородок и пятиразовое питание. Смены круглый год.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, locale: "ru_RU", type: "website" },
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={cn(onest.variable, cormorant.variable, oswald.variable, caveat.variable, unbounded.variable, "dark")}
    >
      <body className="grain">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
