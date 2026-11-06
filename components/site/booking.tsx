"use client";

/**
 * Оранжевый блок бронирования (акцентный «красный экран» как у baba.com) с формой заявки.
 */

import { useState, type FormEvent, type ReactNode } from "react";
import { Mascot } from "@/components/brand/mascot";
import { Scribble } from "@/components/motion/reveal";
import { CHILD_AGES, SHIFTS, SITE } from "@/lib/content";
import { EMPTY_LEAD, formatPhone, validateLead, type LeadErrors, type LeadInput } from "@/lib/lead";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";
type ApiResult = { success: boolean; error?: string };

const INPUT =
  "w-full border-0 border-b border-paper/25 bg-transparent px-0 py-3 text-base text-paper placeholder:text-paper/30 focus:border-blaze focus:outline-none aria-invalid:border-blaze";

export function Booking() {
  return (
    <section id="zayavka" data-chapter="Заявка" data-chapter-index="11" className="relative overflow-hidden bg-blaze text-ink">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-4 py-24 md:px-8 md:py-32 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col">
          <p className="flex items-center gap-3 font-cond text-[0.8rem] uppercase tracking-[0.12em] text-ink/70">
            <span>§ 11</span>
            <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
            <span>Бронирование</span>
          </p>
          <h2 className="mt-6 font-serif text-[clamp(3rem,7vw,7rem)] font-light italic leading-[0.9] tracking-[-0.01em]">
            Забронируйте путёвку уже сейчас!
          </h2>
          <p className="mt-8 max-w-md text-base leading-[1.6] text-ink/80">
            Оставьте контакты — менеджер свяжется в течение суток, уточнит детали и поможет выбрать смену.
          </p>
          <div className="relative mt-auto hidden pt-16 lg:block">
            <Mascot isAnimated className="size-56" label="Маскот Олимпик бежит с факелом" />
            <span className="absolute left-64 top-28 -rotate-3 font-hand text-[2rem] leading-none">
              мы уже бежим
              <br />к вам навстречу!
            </span>
            <Scribble variant="arrow" className="absolute left-52 top-44 h-14 w-24 -scale-x-100 text-ink" delay={0.4} />
          </div>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}

function BookingForm() {
  const [values, setValues] = useState<LeadInput>(EMPTY_LEAD);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = <K extends keyof LeadInput>(key: K, value: LeadInput[K]) =>
    setValues((previous) => ({ ...previous, [key]: value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLead(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as ApiResult;
      if (!response.ok || !result.success) throw new Error(result.error ?? `HTTP ${response.status}`);
      setStatus("success");
      setValues(EMPTY_LEAD);
    } catch (error) {
      console.error("[booking] Заявка не отправлена", error);
      setStatus("error");
    }
  }

  if (status === "success") return <SuccessPanel onReset={() => setStatus("idle")} />;

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6 self-start bg-ink p-6 text-paper md:p-10">
      <p className="font-cond text-xs uppercase tracking-[0.12em] text-paper/50">Заявка на путёвку</p>
      <Field id="lead-name" label="Имя родителя" error={errors.name}>
        <input
          id="lead-name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          placeholder="Как к вам обращаться"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "lead-name-error" : undefined}
          className={INPUT}
        />
      </Field>
      <Field id="lead-phone" label="Телефон" error={errors.phone}>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => update("phone", formatPhone(event.target.value))}
          placeholder="+7 (___) ___-__-__"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "lead-phone-error" : undefined}
          className={INPUT}
        />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="lead-age" label="Возраст ребёнка" error={errors.childAge}>
          <select
            id="lead-age"
            name="childAge"
            value={values.childAge}
            onChange={(event) => update("childAge", event.target.value)}
            aria-invalid={Boolean(errors.childAge)}
            aria-describedby={errors.childAge ? "lead-age-error" : undefined}
            className={cn(INPUT, "appearance-none [&>option]:bg-ink")}
          >
            <option value="">Выберите</option>
            {CHILD_AGES.map((age) => (
              <option key={age} value={age}>
                {age} лет
              </option>
            ))}
          </select>
        </Field>
        <Field id="lead-shift" label="Смена" error={errors.shift}>
          <select
            id="lead-shift"
            name="shift"
            value={values.shift}
            onChange={(event) => update("shift", event.target.value)}
            className={cn(INPUT, "appearance-none [&>option]:bg-ink")}
          >
            <option value="">Пока не знаю</option>
            {SHIFTS.map((shift) => (
              <option key={shift.title} value={shift.title}>
                «{shift.title}» · {shift.dates}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 text-xs leading-[1.5] text-paper/60">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.5 size-4 shrink-0 accent-blaze"
          />
          <span>
            Согласен(на) на обработку персональных данных в соответствии с{" "}
            <a href="#" className="underline underline-offset-2 hover:text-blaze">
              политикой конфиденциальности
            </a>
          </span>
        </label>
        {errors.consent ? (
          <p role="alert" className="text-xs text-blaze">
            {errors.consent}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="group flex items-center justify-between bg-blaze px-6 py-5 text-left text-sm uppercase tracking-[0.06em] text-ink transition-colors hover:bg-paper disabled:opacity-60"
      >
        <span>{status === "sending" ? "Отправляем…" : "Отправить заявку"}</span>
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
      <p role="status" aria-live="polite" className="min-h-4 text-xs text-blaze">
        {status === "error" ? `Не удалось отправить заявку. Позвоните нам: ${SITE.phone}` : ""}
      </p>
    </form>
  );
}

type FieldProps = { id: string; label: string; error?: string; children: ReactNode };

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-cond text-xs uppercase tracking-[0.12em] text-paper/60">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-blaze">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div role="status" className="flex flex-col items-start justify-center gap-6 self-start bg-ink p-8 text-paper md:p-12">
      <Scribble variant="check" className="size-16 text-blaze" strokeWidth={3} />
      <p className="font-serif text-4xl font-light italic leading-none">Спасибо! Заявка принята.</p>
      <p className="text-sm text-paper/70">Менеджер свяжется с вами в течение суток.</p>
      <button type="button" onClick={onReset} className="text-sm uppercase underline underline-offset-4 hover:text-blaze">
        Отправить ещё одну
      </button>
    </div>
  );
}
