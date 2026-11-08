"use client";

/**
 * Плавающие узоры между секциями (по мотивам vitakurort.ru).
 *
 * Кучка плиток с геометрическими мотивами висит на стыке секций у края экрана.
 * Когда стык въезжает в экран, плитки прилетают с разных сторон и собираются
 * в мозаику к центру экрана, а дальше разлетаются вверх. Сверху — лёгкое
 * «покачивание» (CSS .tile-float). Слой лежит позади контента (z-index < 0).
 */

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const COLORS = {
  blaze: "#FF5A00",
  flame: "#FFC21A",
  paper: "#FFFFFF",
  sea: "#22C3B5",
  shale: "#1C1C1C",
} as const;

type Color = keyof typeof COLORS;
type TileKind = "quarter" | "arcs" | "waves" | "chevrons" | "steps" | "circle" | "half" | "plus" | "flame" | "checker" | "ring" | "stripes";

type Tile = {
  kind: TileKind;
  fg: Color;
  bg?: Color;
  col: number;
  row: number;
  /** Откуда плитка прилетает (px) и на сколько градусов повёрнута в начале. */
  from: [number, number];
  rotate: number;
  /** Скрывать на телефонах, чтобы кучка была компактнее. */
  isDesktopOnly?: boolean;
};

type Cluster = { side: "left" | "right"; offset: string; tiles: Tile[] };

function TileArt({ kind, fg, bg }: { kind: TileKind; fg: string; bg?: string }) {
  const art: Record<TileKind, ReactNode> = {
    quarter: <path d="M0 100 A100 100 0 0 1 100 0 V100 Z" fill={fg} />,
    arcs: (
      <>
        <path d="M0 100 A100 100 0 0 1 100 0 V100 Z" fill={fg} />
        <path d="M34 100 A66 66 0 0 1 100 34 V100 Z" fill={bg ?? COLORS.paper} />
        <path d="M67 100 A33 33 0 0 1 100 67 V100 Z" fill={fg} />
      </>
    ),
    waves: (
      <g fill="none" stroke={fg} strokeWidth="11">
        {[22, 50, 78].map((y) => (
          <path key={y} d={`M-5 ${y} Q7.5 ${y - 13} 20 ${y} T45 ${y} T70 ${y} T95 ${y} T120 ${y}`} />
        ))}
      </g>
    ),
    chevrons: (
      <g fill="none" stroke={fg} strokeWidth="11" strokeLinejoin="miter">
        {[22, 50, 78].map((y) => (
          <path key={y} d={`M0 ${y + 10} L50 ${y - 10} L100 ${y + 10}`} />
        ))}
      </g>
    ),
    steps: <path d="M0 100 V67 H33 V33 H67 V0 H100 V100 Z" fill={fg} />,
    circle: <circle cx="50" cy="50" r="42" fill={fg} />,
    half: (
      <>
        <path d="M6 94 A44 44 0 0 1 94 94 Z" fill={fg} />
        <circle cx="50" cy="26" r="11" fill={COLORS.paper} />
      </>
    ),
    plus: <path d="M38 8 H62 V38 H92 V62 H62 V92 H38 V62 H8 V38 H38 Z" fill={fg} />,
    flame: (
      <>
        <path d="M50 94 C24 86 22 58 42 30 C44 46 54 46 55 34 C68 44 76 60 73 74 C70 86 61 94 50 94 Z" fill={fg} />
        <path d="M50 88 C38 84 37 70 46 58 C48 66 54 66 55 60 C61 66 63 74 61 80 C59 86 55 88 50 88 Z" fill={COLORS.blaze} />
      </>
    ),
    checker: (
      <>
        <rect x="0" y="0" width="50" height="50" fill={fg} />
        <rect x="50" y="50" width="50" height="50" fill={fg} />
      </>
    ),
    ring: <circle cx="50" cy="50" r="33" fill="none" stroke={fg} strokeWidth="15" />,
    stripes: (
      <g stroke={fg} strokeWidth="10">
        {[-40, -10, 20, 50, 80, 110].map((shift) => (
          <path key={shift} d={`M${shift} 100 L${shift + 100} 0`} />
        ))}
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 100 100" className="block size-full" aria-hidden="true">
      {bg ? <rect width="100" height="100" fill={bg} /> : null}
      {art[kind]}
    </svg>
  );
}

const T = (kind: TileKind, fg: Color, col: number, row: number, from: [number, number], rotate: number, extra: Partial<Tile> = {}): Tile => ({
  kind,
  fg,
  col,
  row,
  from,
  rotate,
  ...extra,
});

/** Кучки плиток для стыков секций (по порядку сверху вниз). */
const CLUSTERS: Record<string, Cluster> = {
  heroSeasons: {
    side: "right",
    offset: "2%",
    tiles: [
      T("arcs", "blaze", 1, 0, [140, -90], 45, { bg: "flame" }),
      T("waves", "sea", 0, 1, [-110, 150], -30),
      T("steps", "blaze", 1, 1, [180, 120], 25),
      T("circle", "flame", 2, 2, [90, 240], 0, { isDesktopOnly: true }),
    ],
  },
  seasonsAbout: {
    side: "left",
    offset: "1.5%",
    tiles: [
      T("quarter", "flame", 0, 0, [-160, -60], -40),
      T("chevrons", "paper", 1, 1, [120, 180], 30, { bg: "shale" }),
      T("plus", "blaze", 0, 2, [-90, 220], 90, { isDesktopOnly: true }),
    ],
  },
  aboutAdvantages: {
    side: "right",
    offset: "1.5%",
    tiles: [
      T("half", "sea", 0, 0, [-120, -110], -35),
      T("stripes", "blaze", 1, 0, [160, -40], 20, { bg: "shale" }),
      T("ring", "flame", 1, 1, [110, 200], -60),
    ],
  },
  advantagesPrograms: {
    side: "left",
    offset: "2%",
    tiles: [
      T("steps", "flame", 0, 0, [-180, -80], -25),
      T("flame", "flame", 1, 0, [90, -160], 15, { bg: "shale" }),
      T("checker", "blaze", 1, 1, [150, 140], 45, { isDesktopOnly: true }),
      T("waves", "sea", 0, 1, [-130, 170], -20),
    ],
  },
  programsSport: {
    side: "right",
    offset: "1.5%",
    tiles: [
      T("ring", "paper", 0, 0, [-100, -150], 50),
      T("arcs", "sea", 1, 1, [170, 60], -45, { bg: "paper" }),
      T("quarter", "blaze", 0, 1, [-150, 160], 30),
    ],
  },
  sportKnowledge: {
    side: "left",
    offset: "1.5%",
    tiles: [
      T("chevrons", "flame", 0, 0, [-140, -100], 35),
      T("plus", "paper", 1, 1, [130, 170], -90),
      T("circle", "blaze", 0, 1, [-170, 120], 0, { isDesktopOnly: true }),
    ],
  },
  knowledgePartners: {
    side: "right",
    offset: "2%",
    tiles: [
      T("flame", "flame", 1, 0, [150, -130], -20, { bg: "shale" }),
      T("steps", "blaze", 0, 1, [-140, 90], 30),
      T("waves", "sea", 1, 1, [120, 190], -25, { isDesktopOnly: true }),
    ],
  },
  partnersReviews: {
    side: "left",
    offset: "2%",
    tiles: [
      T("half", "flame", 0, 0, [-150, -90], 40),
      T("stripes", "sea", 1, 0, [110, -170], -15),
      T("quarter", "paper", 1, 1, [170, 130], 60, { isDesktopOnly: true }),
    ],
  },
  reviewsFaq: {
    side: "right",
    offset: "1.5%",
    tiles: [
      T("checker", "flame", 0, 0, [-120, -140], -45),
      T("arcs", "blaze", 1, 1, [160, 150], 35, { bg: "flame" }),
    ],
  },
  faqBooking: {
    side: "left",
    offset: "2%",
    tiles: [
      T("circle", "sea", 0, 0, [-150, -120], 0),
      T("steps", "paper", 1, 0, [120, -180], 20, { isDesktopOnly: true }),
      T("chevrons", "blaze", 1, 1, [170, 120], -30, { bg: "shale" }),
    ],
  },
};

export type PatternBandVariant = keyof typeof CLUSTERS;

/** Нулевая по высоте полоса на стыке секций; плитки свисают в отступы соседних секций. */
export function PatternBand({ variant }: { variant: PatternBandVariant }) {
  const ref = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cluster = CLUSTERS[variant];
  const rows = Math.max(...cluster.tiles.map((tile) => tile.row)) + 1;
  const cols = Math.max(...cluster.tiles.map((tile) => tile.col)) + 1;

  const style = {
    "--tile": "clamp(40px, 5.4vw, 92px)",
    [cluster.side]: cluster.offset,
    top: `calc(var(--tile) * ${-rows / 2})`,
    gridTemplateColumns: `repeat(${cols}, var(--tile))`,
    gridAutoRows: "var(--tile)",
  } as CSSProperties;

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none relative -z-10 h-0">
      <div className="absolute grid" style={style}>
        {cluster.tiles.map((tile) => (
          <FloatingTile key={`${tile.kind}-${tile.col}-${tile.row}`} tile={tile} progress={scrollYProgress} isReduced={isReduced} />
        ))}
      </div>
    </div>
  );
}

type FloatingTileProps = { tile: Tile; progress: MotionValue<number>; isReduced: boolean };

function FloatingTile({ tile, progress, isReduced }: FloatingTileProps) {
  const [fromX, fromY] = tile.from;
  // Прилетают → собираются к центру экрана (0.5) → разлетаются вверх.
  const x = useTransform(progress, [0, 0.5, 1], [fromX, 0, -fromX * 0.5]);
  const y = useTransform(progress, [0, 0.5, 1], [fromY, 0, -Math.abs(fromY) * 0.9]);
  const rotate = useTransform(progress, [0, 0.5, 1], [tile.rotate, 0, -tile.rotate]);
  const opacity = useTransform(progress, [0, 0.25, 0.85, 1], [0, 1, 1, 0.2]);

  return (
    <motion.div
      className={cn(tile.isDesktopOnly && "max-md:hidden")}
      style={{ gridColumn: tile.col + 1, gridRow: tile.row + 1, ...(isReduced ? {} : { x, y, rotate, opacity }) }}
    >
      <div className="tile-float size-full" style={{ animationDelay: `${(tile.col * 2 + tile.row) * -1.1}s` }}>
        <TileArt kind={tile.kind} fg={COLORS[tile.fg]} bg={tile.bg ? COLORS[tile.bg] : undefined} />
      </div>
    </motion.div>
  );
}
