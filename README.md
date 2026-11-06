# ДК «Олимпиец» — сайт

Сайт детского оздоровительного комплекса «Олимпиец» (Анапа).
Структура — по мотивам vitakurort.ru, стиль — Freshman (кинотитры на чёрном), анимации — в духе baba.com,
в hero — WebGL-рябь воды.

## Стек

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui (Base UI) · motion · lenis.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production-сборка
npm run typecheck  # проверка типов
npm run lint
```

## Где что менять

| Что | Где |
|-----|-----|
| Тексты, телефон, e-mail, цены, смены, FAQ, отзывы | `lib/content.ts` |
| Фотографии | `lib/content.ts` → `PHOTOS` |
| Цвета и шрифты | `app/globals.css` (`@theme`) и `app/layout.tsx` |
| Маскот «Олимпик» | `lib/brand/mascot.ts` |
| Секции страницы | `components/site/*` |
| WebGL-рябь | `components/ui/water-ripple-image.tsx` |

**Перед запуском** замените демо-данные в `lib/content.ts`: телефон, e-mail, цены, даты смен
и примеры отзывов.

### Фотографии

Фото взяты из Instagram [@olimpiec_anapa](https://www.instagram.com/olimpiec_anapa/), сжаты до 1080 px
и лежат в `public/photos/`. Чтобы заменить снимок, положите новый файл туда же и пропишите имя в `PHOTOS`
(`lib/content.ts`), например `beachRun: photo("beach-run")`.

## Логотип

Страница `/brand` — логотип на разных фонах, маскот, цвета и ссылки на SVG.
Файлы лежат в `public/brand/`, иконка сайта — `app/icon.svg`.
Пересобрать после правок маскота (текст переводится в кривые):

```bash
npm run logo
```

## Заявки

Форма отправляет данные на `POST /api/lead`. Чтобы заявки доходили до менеджера, задайте переменную
окружения `LEAD_WEBHOOK_URL` — адрес, который принимает JSON (Telegram-бот, CRM, Make/Zapier и т.п.):

```json
{ "name": "…", "phone": "+79001234567", "childAge": "10", "shift": "Морской бриз", "receivedAt": "2026-11-06T12:00:00.000Z" }
```

Без переменной: в разработке заявка пишется в лог, в продакшене API отвечает 503
и форма предлагает позвонить, чтобы заявки не терялись молча.
