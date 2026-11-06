/**
 * POST /api/lead — приём заявки на путёвку.
 *
 * Доставка: если задан LEAD_WEBHOOK_URL (Telegram-бот, CRM, Make/Zapier и т.п.),
 * заявка пересылается туда JSON-ом. Без него в разработке заявка пишется в лог,
 * а в продакшене API честно отвечает 503, чтобы заявки не терялись молча.
 */

import { NextResponse } from "next/server";
import { parseLead, phoneDigits, validateLead } from "@/lib/lead";

type ApiResponse = { success: boolean; error?: string; fields?: Record<string, string> };

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 5;
const RATE_MAX_KEYS = 5_000;
const WEBHOOK_TIMEOUT_MS = 8_000;
const MAX_BODY_BYTES = 4_096;

/** Лимит в памяти одного инстанса: защищает от случайного спама, не от распределённой атаки. */
const hitsByClient = new Map<string, number[]>();

function pruneExpired(now: number): void {
  for (const [key, hits] of hitsByClient) {
    if (hits.every((time) => now - time >= RATE_WINDOW_MS)) hitsByClient.delete(key);
  }
}

function isRateLimited(clientKey: string, now: number): boolean {
  if (hitsByClient.size > RATE_MAX_KEYS) pruneExpired(now);
  const recent = (hitsByClient.get(clientKey) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  const isLimited = recent.length >= RATE_MAX_REQUESTS;
  hitsByClient.set(clientKey, isLimited ? recent : [...recent, now]);
  return isLimited;
}

/**
 * IP клиента: x-real-ip выставляет прокси (Vercel, nginx с $remote_addr),
 * иначе — последний адрес из x-forwarded-for (его дописал ближайший прокси).
 */
function clientKeyOf(request: Request): string {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = request.headers.get("x-forwarded-for")?.split(",").map((part) => part.trim()).filter(Boolean);
  return forwarded?.at(-1) ?? "local";
}

function reply(body: ApiResponse, status = 200): NextResponse<ApiResponse> {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  if (isRateLimited(clientKeyOf(request), Date.now())) {
    return reply({ success: false, error: "Слишком много заявок. Попробуйте через минуту." }, 429);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return reply({ success: false, error: "Слишком большой запрос" }, 413);
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return reply({ success: false, error: "Слишком большой запрос" }, 413);
    body = JSON.parse(text);
  } catch {
    return reply({ success: false, error: "Некорректный запрос" }, 400);
  }

  const lead = parseLead(body);
  if (!lead) return reply({ success: false, error: "Некорректные данные заявки" }, 400);

  const errors = validateLead(lead);
  if (Object.keys(errors).length > 0) {
    return reply({ success: false, error: "Проверьте поля формы", fields: errors }, 422);
  }

  const payload = {
    name: lead.name.trim(),
    phone: `+${phoneDigits(lead.phone)}`,
    childAge: lead.childAge,
    shift: lead.shift || "не выбрана",
    receivedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    if (process.env.NODE_ENV === "production") {
      console.error("[lead] LEAD_WEBHOOK_URL не задан — заявка не может быть доставлена");
      return reply({ success: false, error: "Приём заявок временно недоступен" }, 503);
    }
    console.info("[lead] DEV: заявка получена (LEAD_WEBHOOK_URL не задан)", {
      childAge: payload.childAge,
      shift: payload.shift,
      phoneTail: payload.phone.slice(-4),
    });
    return reply({ success: true });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!response.ok) throw new Error(`Webhook ответил ${response.status}`);
  } catch (error) {
    console.error("[lead] Ошибка доставки заявки", error);
    return reply({ success: false, error: "Не удалось отправить заявку" }, 502);
  }

  return reply({ success: true });
}
