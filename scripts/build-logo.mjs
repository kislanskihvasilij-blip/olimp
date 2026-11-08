/**
 * Генерирует файлы логотипа «Олимпиец» в public/brand и иконку сайта app/icon.svg.
 * Надписи переводятся в кривые (opentype.js), поэтому SVG не зависят от шрифтов.
 *
 * Запуск: npm run logo   (Node 24+: импорт .ts работает без сборки)
 */

import { mkdir, writeFile } from "node:fs/promises";
import opentype from "opentype.js";
import { BRAND_COLORS, MASCOT_SVG_INNER } from "../lib/brand/mascot.ts";

const FONTS_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Unbounded:wght@900&family=Oswald:wght@500&display=swap";
const FACE_PATTERN = /font-family:\s*'([^']+)';[\s\S]*?font-weight:\s*(\d+);[\s\S]*?src:\s*url\(([^)]+)\)/g;

const MARK = 200;
const WORD = "ОЛИМПИЕЦ";
const SUBLINE = "ДЕТСКИЙ ОЗДОРОВИТЕЛЬНЫЙ КОМПЛЕКС";
const SUB_TRACKING = 0.12;

async function fetchOk(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Не удалось загрузить ${url}: ${response.status}`);
  return response;
}

async function loadFonts() {
  const css = await (await fetchOk(FONTS_CSS_URL)).text();
  const fonts = new Map();
  for (const [, family, weight, url] of css.matchAll(FACE_PATTERN)) {
    const buffer = await (await fetchOk(url)).arrayBuffer();
    fonts.set(`${family}-${weight}`, opentype.parse(buffer));
  }
  for (const key of ["Unbounded-900", "Oswald-500"]) {
    if (!fonts.has(key)) throw new Error(`Шрифт ${key} не найден в ответе Google Fonts`);
  }
  return fonts;
}

/*
 * Набор идёт посимвольно по глифам: шейпер opentype.js 2.x падает на ccmp
 * у этих шрифтов, а для заглавной кириллицы шейпинг и не нужен.
 */
function kerning(font, left, right) {
  try {
    return font.getKerningValue(left, right) || 0;
  } catch {
    return 0;
  }
}

/** Глифы строки и шаг курсора после каждого (с кернингом и трекингом). */
function layout(font, text, size, tracking = 0) {
  const scale = size / font.unitsPerEm;
  const glyphs = Array.from(text, (char) => font.charToGlyph(char));
  return glyphs.map((glyph, i) => {
    const next = glyphs[i + 1];
    const extra = next ? kerning(font, glyph, next) * scale + tracking * size : 0;
    return { glyph, step: glyph.advanceWidth * scale + extra };
  });
}

/** Ширина строки (трекинг — в долях кегля). */
function measure(font, text, size, tracking = 0) {
  return layout(font, text, size, tracking).reduce((sum, item) => sum + item.step, 0);
}

/** Строка в кривые. */
function textPath(font, text, x, y, size, tracking = 0) {
  let cursor = x;
  const parts = [];
  for (const { glyph, step } of layout(font, text, size, tracking)) {
    parts.push(glyph.getPath(cursor, y, size).toPathData(2));
    cursor += step;
  }
  return parts.join(" ");
}

function svg(width, height, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Math.ceil(width)} ${Math.ceil(height)}" width="${Math.ceil(width)}" height="${Math.ceil(height)}">${body}</svg>\n`;
}

const mark = (x, y, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})">${MASCOT_SVG_INNER}</g>`;

function wordmark(fonts, x, baseline, size, color) {
  const wordFont = fonts.get("Unbounded-900");
  return {
    width: measure(wordFont, WORD, size),
    body: `<path fill="${color}" d="${textPath(wordFont, WORD, x, baseline, size)}"/>`,
  };
}

function horizontal(fonts, subColor) {
  const sub = fonts.get("Oswald-500");
  const textX = MARK + 36;
  const word = wordmark(fonts, textX, 114, 84, BRAND_COLORS.blaze);
  const subSize = Math.min(28, (word.width / measure(sub, SUBLINE, 1, SUB_TRACKING)) * 0.98);
  const subBody = `<path fill="${subColor}" d="${textPath(sub, SUBLINE, textX + 2, 156, subSize, SUB_TRACKING)}"/>`;
  return svg(textX + word.width + 8, MARK, mark(0, 0) + word.body + subBody);
}

function stacked(fonts, subColor) {
  const sub = fonts.get("Oswald-500");
  const size = 72;
  const probe = wordmark(fonts, 0, 0, size, BRAND_COLORS.blaze);
  const width = Math.max(probe.width, MARK * 1.2) + 40;
  const word = wordmark(fonts, (width - probe.width) / 2, 300, size, BRAND_COLORS.blaze);
  const subSize = (probe.width / measure(sub, SUBLINE, 1, SUB_TRACKING)) * 0.98;
  const subWidth = measure(sub, SUBLINE, subSize, SUB_TRACKING);
  const subBody = `<path fill="${subColor}" d="${textPath(sub, SUBLINE, (width - subWidth) / 2, 342, subSize, SUB_TRACKING)}"/>`;
  return svg(width, 360, mark((width - MARK * 1.2) / 2, 0, 1.2) + word.body + subBody);
}

async function main() {
  const fonts = await loadFonts();
  await mkdir("public/brand", { recursive: true });

  const outputs = new Map([
    ["public/brand/olimpiec-logo-horizontal-dark.svg", horizontal(fonts, BRAND_COLORS.paper)],
    ["public/brand/olimpiec-logo-horizontal-light.svg", horizontal(fonts, BRAND_COLORS.ink)],
    ["public/brand/olimpiec-logo-stacked-light.svg", stacked(fonts, BRAND_COLORS.ink)],
    ["public/brand/olimpiec-mark.svg", svg(MARK, MARK, mark(0, 0))],
    ["app/icon.svg", svg(MARK, MARK, mark(0, 0))],
  ]);

  for (const [file, content] of outputs) {
    await writeFile(file, content, "utf8");
    console.info(`✓ ${file}`);
  }
}

main().catch((error) => {
  console.error("Не удалось собрать логотип:", error);
  process.exit(1);
});
