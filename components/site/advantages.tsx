import { Dumbbell, Megaphone, Stethoscope, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal, Scribble } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/site/primitives";
import { ADVANTAGES, type AdvantageId } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * «Преимущества» — бенто-карточки с мини-интерфейсами и рукописными пометками,
 * как на baba.com, но в чёрно-оранжевой палитре.
 */
export function Advantages() {
  return (
    <section id="preimushchestva" data-chapter="Преимущества" data-chapter-index="04" className="border-t border-paper/10 py-16 md:py-36">
      <Container>
        <SectionHeading index="04" kicker="Почему выбирают нас" lines={["Четыре причины", "выбрать «Олимпиец»"]} note="и ещё сто мелочей" />
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {ADVANTAGES.map((advantage, i) => (
            <Reveal key={advantage.id} delay={(i % 2) * 0.1}>
              <article className="group flex h-full flex-col border border-paper/12 bg-shale">
                <div className="relative flex h-[290px] items-center justify-center overflow-hidden border-b border-paper/10 px-4 pt-10 sm:h-[320px] sm:px-6 md:h-[360px]">
                  <span className="absolute left-5 top-5 font-cond text-[0.8rem] uppercase tracking-[0.14em] text-blaze">{advantage.label}</span>
                  {/* На узких телефонах мини-интерфейс чуть уменьшен, чтобы не обрезались пометки. */}
                  <div className="scale-[0.84] transition-transform duration-700 ease-out min-[400px]:scale-[0.92] sm:scale-100 sm:group-hover:-translate-y-1.5 sm:group-hover:scale-[1.02]">
                    {MOCKUPS[advantage.id]}
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-6 md:p-8">
                  <h3 className="text-xl font-medium leading-tight">{advantage.title}</h3>
                  <p className="max-w-md text-[0.95rem] leading-[1.6] md:text-base text-paper/65">{advantage.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const TEAM: { icon: LucideIcon; role: string; note: string }[] = [
  { icon: Megaphone, role: "Вожатые", note: "в каждом отряде" },
  { icon: Dumbbell, role: "Тренеры", note: "каждый день" },
  { icon: Stethoscope, role: "Медики", note: "24/7" },
];

function TeamMock() {
  return (
    <div className="relative w-[270px]">
      {TEAM.map(({ icon: Icon, role, note }, i) => (
        <div
          key={role}
          className="flex items-center gap-3 border border-ink/10 bg-paper p-3 text-ink"
          style={{ transform: `translateX(${i * 14}px) rotate(${(i - 1) * 2}deg)`, marginTop: i ? -4 : 0 }}
        >
          <span className="grid size-10 place-items-center rounded-full bg-blaze text-ink">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium">{role}</span>
          <span className="ml-auto font-cond text-[0.7rem] uppercase tracking-[0.08em] text-ink/55">{note}</span>
        </div>
      ))}
      <div className="absolute -right-6 -top-12 flex items-center gap-1 text-blaze">
        <span className="rotate-6 font-hand text-[1.4rem]">проверены!</span>
        <Scribble variant="check" className="size-8" delay={0.4} />
      </div>
    </div>
  );
}

const INTERESTS: { label: string; isOn: boolean }[] = [
  { label: "Футбол", isOn: true },
  { label: "Робототехника", isOn: true },
  { label: "Плавание", isOn: false },
  { label: "Театр", isOn: true },
  { label: "Шахматы", isOn: false },
];

function ApproachMock() {
  return (
    <div className="relative w-[290px] bg-paper p-5 text-ink">
      <div className="flex items-center justify-between font-cond text-[0.8rem] uppercase tracking-[0.12em] text-ink/50">
        <span>Маршрут участника</span>
        <span>смена 02</span>
      </div>
      <p className="mt-3 text-lg font-medium">Интересы ребёнка</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {INTERESTS.map((item) => (
          <li
            key={item.label}
            className={cn("border px-3 py-1.5 text-xs", item.isOn ? "border-blaze bg-blaze text-ink" : "border-ink/15 text-ink/60")}
          >
            {item.isOn ? "✓ " : "+ "}
            {item.label}
          </li>
        ))}
      </ul>
      <div className="absolute -bottom-10 -left-4 flex items-end gap-1 text-blaze">
        <span className="-rotate-3 font-hand text-[1.4rem]">подберём кружки</span>
      </div>
    </div>
  );
}

const FACILITIES: { name: string; tag: string }[] = [
  { name: "Собственный пляж", tag: "300 м" },
  { name: "Спортгородок", tag: "на территории" },
  { name: "Медпункт", tag: "24/7" },
  { name: "Столовая", tag: "5 раз в день" },
];

function InfraMock() {
  return (
    <ul className="flex w-[290px] flex-col gap-2">
      {FACILITIES.map((item, i) => (
        <li
          key={item.name}
          className={cn(
            "flex items-center justify-between border bg-paper px-4 py-3 text-sm text-ink",
            i === 1 ? "translate-x-3 border-blaze ring-2 ring-blaze/30" : "border-ink/10",
          )}
        >
          <span className="flex items-center gap-2">
            <span className="grid size-5 place-items-center border border-ink/20 text-[10px]">✓</span>
            {item.name}
          </span>
          <span className="bg-ink/5 px-2 py-0.5 font-cond text-[0.7rem] uppercase tracking-[0.08em] text-ink/70">{item.tag}</span>
        </li>
      ))}
    </ul>
  );
}

const DAY: { time: string; label: string; isDone: boolean }[] = [
  { time: "08:00", label: "Зарядка", isDone: true },
  { time: "09:00", label: "Завтрак", isDone: true },
  { time: "11:00", label: "Море и пляж", isDone: false },
  { time: "15:00", label: "Кружки и секции", isDone: false },
  { time: "21:00", label: "Дискотека", isDone: false },
];

function DailyMock() {
  return (
    <div className="relative">
      <div className="w-[270px] bg-paper p-5 text-ink">
        <p className="font-cond text-[0.8rem] uppercase tracking-[0.12em] text-ink/50">Распорядок дня</p>
        <ul className="mt-3 flex flex-col">
          {DAY.map((item) => (
            <li key={item.time} className="flex items-center gap-3 border-b border-ink/10 py-2 text-sm last:border-0">
              <span className="w-12 font-cond text-ink/50">{item.time}</span>
              <span className={cn(item.isDone && "text-ink/40 line-through decoration-blaze decoration-2")}>{item.label}</span>
              {item.isDone ? <Scribble variant="check" className="ml-auto size-5 text-blaze" /> : null}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute -right-10 -top-8 w-[124px] rotate-6 bg-blaze p-3 text-ink">
        <span className="font-hand text-[1.3rem] leading-none">Не забудь панамку!</span>
      </div>
    </div>
  );
}

const MOCKUPS: Record<AdvantageId, ReactNode> = {
  team: <TeamMock />,
  approach: <ApproachMock />,
  infra: <InfraMock />,
  daily: <DailyMock />,
};
