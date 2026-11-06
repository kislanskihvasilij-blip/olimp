'use client';

/**
 * Загрузчик картинок для next/image (next.config.ts → images.loaderFile).
 * Unsplash сам ресайзит фото по параметрам w/q, поэтому сервер Next.js
 * не скачивает их (и не зависит от сетевого доступа сервера).
 * Локальные фото из public/ отдаются как есть.
 */

type LoaderArgs = { src: string; width: number; quality?: number };

const DEFAULT_QUALITY = 75;
const UNSPLASH_ORIGIN = 'https://images.unsplash.com/';

export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  if (src.startsWith(UNSPLASH_ORIGIN)) {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality ?? DEFAULT_QUALITY));
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    return url.toString();
  }
  return `${src}${src.includes('?') ? '&' : '?'}w=${width}`;
}
