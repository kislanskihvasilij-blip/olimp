/**
 * Маскот «Олимпик» — мультяшный ребёнок, бегущий с факелом.
 *
 * Разметка хранится строкой, потому что её используют и React-компонент
 * (components/brand/mascot.tsx), и скрипт генерации файлов логотипа
 * (scripts/build-logo.mjs). Строка статична и не содержит пользовательского
 * ввода, поэтому безопасна для innerHTML.
 *
 * Классы m-* нужны для CSS-анимации бега (см. app/globals.css → .mascot-run).
 */

export const BRAND_COLORS = {
  blaze: "#FF5A00",
  ink: "#141414",
  paper: "#FFFFFF",
  skin: "#FFD2A6",
  flame: "#FFC21A",
  flameCore: "#FF3D00",
  cheek: "#FF8A5C",
  mouth: "#7A1E00",
} as const;

export const MASCOT_VIEWBOX = "0 0 200 200";

const C = BRAND_COLORS;
const OUTLINE_EXTRA = 5.5;

/** Рука/нога: тёмный контур + телесная заливка поверх — мультяшная обводка. */
function limb(d: string, width: number): string {
  const common = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';
  return (
    `<path d="${d}" ${common} stroke="${C.ink}" stroke-width="${width + OUTLINE_EXTRA}"/>` +
    `<path d="${d}" ${common} stroke="${C.skin}" stroke-width="${width}"/>`
  );
}

const SHOE = `fill="${C.paper}" stroke="${C.ink}" stroke-width="3.5"`;
const JOIN = 'stroke-linejoin="round"';

const BADGE = [
  `<circle cx="100" cy="112" r="82" fill="${C.blaze}"/>`,
  `<ellipse cx="94" cy="190" rx="34" ry="4.5" fill="${C.ink}" opacity=".22"/>`,
  `<g class="m-speed" stroke="${C.paper}" stroke-width="5" stroke-linecap="round" fill="none">`,
  `<path d="M32 118 H54"/><path d="M24 132 H48"/><path d="M34 146 H50"/>`,
  `</g>`,
].join("");

const BACK_LIMBS = [
  `<g class="m-leg-back">${limb("M90 148 L75 168 L56 165", 7.5)}`,
  `<ellipse cx="49" cy="161" rx="11" ry="6.5" transform="rotate(-25 49 161)" ${SHOE}/></g>`,
  `<g class="m-arm-back">${limb("M98 110 L80 121 L69 110", 6.5)}`,
  `<circle cx="69" cy="110" r="5.5" fill="${C.skin}" stroke="${C.ink}" stroke-width="3"/></g>`,
  `<g class="m-leg-front">${limb("M102 150 L124 161 L120 180", 7.5)}`,
  `<ellipse cx="128" cy="184" rx="12" ry="6.5" transform="rotate(6 128 184)" ${SHOE}/></g>`,
].join("");

const TORSO = [
  `<path d="M87 101 Q102 98 119 106 L111 147 Q96 147 82 141 Z" fill="${C.paper}" stroke="${C.ink}" stroke-width="4" ${JOIN}/>`,
  `<circle cx="102" cy="120" r="6.5" fill="${C.blaze}" stroke="${C.ink}" stroke-width="2.5"/>`,
  `<path d="M82 139 L111 145 L109 160 L97 157 L95 162 L80 157 Z" fill="${C.ink}" stroke="${C.ink}" stroke-width="3" ${JOIN}/>`,
].join("");

const HEAD = [
  `<g class="m-head">`,
  `<circle cx="113" cy="80" r="19" fill="${C.skin}" stroke="${C.ink}" stroke-width="4"/>`,
  `<g class="m-hair"><path d="M99 63 L84 57 L96 55 L88 47 L103 52 Z" fill="${C.ink}" stroke="${C.ink}" stroke-width="2" ${JOIN}/></g>`,
  `<path d="M95 78 C93 62 106 57 118 58 C126 59 131 63 132 69 C124 66 116 67 110 64 C108 70 101 73 95 78 Z" fill="${C.ink}"/>`,
  `<ellipse cx="101" cy="82" rx="4" ry="5" fill="${C.skin}" stroke="${C.ink}" stroke-width="3"/>`,
  `<path d="M117 72 Q120.5 69.5 124 72" fill="none" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>`,
  `<ellipse cx="120" cy="79" rx="2.3" ry="3.2" fill="${C.ink}"/>`,
  `<ellipse cx="128.5" cy="78" rx="2.3" ry="3.2" fill="${C.ink}"/>`,
  `<circle cx="120.8" cy="77.8" r=".8" fill="${C.paper}"/>`,
  `<circle cx="129.3" cy="76.8" r=".8" fill="${C.paper}"/>`,
  `<circle cx="111" cy="88" r="3.6" fill="${C.cheek}" opacity=".85"/>`,
  `<path d="M117 86 Q124 96 131 84 Z" fill="${C.mouth}" stroke="${C.ink}" stroke-width="2.5" ${JOIN}/>`,
  `</g>`,
].join("");

const TORCH_ARM = [
  `<g class="m-arm-front">`,
  limb("M112 108 L128 98 L134 76", 6.5),
  `<path d="M106 102 L120 105 L118 116 L107 113 Z" fill="${C.paper}" stroke="${C.ink}" stroke-width="3.5" ${JOIN}/>`,
  `<g transform="translate(134 76) rotate(12)">`,
  `<path d="M-3.5 10 L3.5 10 L5.5 -22 L-5.5 -22 Z" fill="${C.ink}" stroke="${C.ink}" stroke-width="2" ${JOIN}/>`,
  `<g class="m-flame">`,
  `<path d="M0 -30 C-15 -36 -13 -52 -3 -66 C-1 -56 5 -57 6 -50 C12 -54 13 -44 11 -39 C9 -33 5 -30 0 -30 Z" fill="${C.flame}" stroke="${C.ink}" stroke-width="3" ${JOIN}/>`,
  `<path d="M0 -33 C-7 -37 -6 -46 -1 -53 C1 -47 5 -47 5 -42 C6 -37 3 -34 0 -33 Z" fill="${C.flameCore}"/>`,
  `</g>`,
  `<path d="M-10 -22 L10 -22 L7 -31 L-7 -31 Z" fill="${C.flame}" stroke="${C.ink}" stroke-width="3" ${JOIN}/>`,
  `<circle cx="0" cy="0" r="6" fill="${C.skin}" stroke="${C.ink}" stroke-width="3"/>`,
  `</g>`,
  `</g>`,
].join("");

/** Внутренности <svg viewBox="0 0 200 200"> — значок с маскотом. */
export const MASCOT_SVG_INNER = [
  BADGE,
  `<g class="m-body">`,
  BACK_LIMBS,
  TORSO,
  HEAD,
  TORCH_ARM,
  `</g>`,
].join("");
