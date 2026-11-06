/**
 * Заявка на путёвку: тип, форматирование телефона и валидация.
 * Используется и формой (components/site/booking.tsx), и API (app/api/lead/route.ts).
 */

import { SHIFT_TITLES } from "@/lib/content";

export type LeadInput = {
  name: string;
  phone: string;
  childAge: string;
  shift: string;
  consent: boolean;
};

export type LeadErrors = Partial<Record<keyof LeadInput, string>>;

export const EMPTY_LEAD: LeadInput = { name: "", phone: "", childAge: "", shift: "", consent: false };

const NAME_MIN = 2;
const NAME_MAX = 80;
const PHONE_DIGITS = 11;
const AGE_MIN = 7;
const AGE_MAX = 17;

/** Цифры российского номера, нормализованные к виду 7XXXXXXXXXX. */
export function phoneDigits(value: string): string {
  const raw = value.replace(/\D/g, "");
  if (!raw) return "";
  const normalized = raw.startsWith("8") ? `7${raw.slice(1)}` : raw.startsWith("7") ? raw : `7${raw}`;
  return normalized.slice(0, PHONE_DIGITS);
}

/** Маска «+7 (XXX) XXX-XX-XX» по мере ввода. */
export function formatPhone(value: string): string {
  const digits = phoneDigits(value);
  if (!digits) return "";
  const rest = digits.slice(1);
  const parts = [
    "+7",
    rest.length > 0 ? ` (${rest.slice(0, 3)}` : "",
    rest.length > 3 ? `) ${rest.slice(3, 6)}` : "",
    rest.length > 6 ? `-${rest.slice(6, 8)}` : "",
    rest.length > 8 ? `-${rest.slice(8, 10)}` : "",
  ];
  return parts.join("");
}

export function validateLead(input: LeadInput): LeadErrors {
  const name = input.name.trim();
  const age = Number(input.childAge);
  const checks: [keyof LeadInput, boolean, string][] = [
    ["name", name.length < NAME_MIN || name.length > NAME_MAX, "Укажите имя (от 2 символов)"],
    ["phone", phoneDigits(input.phone).length !== PHONE_DIGITS, "Введите номер полностью: +7 (XXX) XXX-XX-XX"],
    ["childAge", !Number.isInteger(age) || age < AGE_MIN || age > AGE_MAX, "Выберите возраст ребёнка"],
    ["shift", input.shift !== "" && !SHIFT_TITLES.includes(input.shift), "Выберите смену из списка"],
    ["consent", !input.consent, "Нужно согласие на обработку персональных данных"],
  ];
  return Object.fromEntries(checks.filter(([, isInvalid]) => isInvalid).map(([field, , message]) => [field, message]));
}

/** Безопасный разбор тела запроса: только ожидаемые поля нужных типов. */
export function parseLead(raw: unknown): LeadInput | null {
  if (typeof raw !== "object" || raw === null) return null;
  const record = raw as Record<string, unknown>;
  const { name, phone, childAge, shift, consent } = record;
  if (
    typeof name !== "string" ||
    typeof phone !== "string" ||
    typeof childAge !== "string" ||
    typeof shift !== "string" ||
    typeof consent !== "boolean"
  ) {
    return null;
  }
  return { name, phone, childAge, shift, consent };
}
