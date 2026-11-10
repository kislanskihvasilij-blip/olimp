"use client";

/**
 * Плавающие узоры между секциями (по мотивам vitakurort.ru).
 *
 * Три вида полос на стыках секций (слой позади контента, z-index < 0):
 *  - cluster — кучка мелких плиток у края: каждая едет по своей оси (X или Y)
 *    и собирается в мозаику, когда стык проходит центр экрана;
 *  - ribbon  — горизонтальная лента плиток, едет вбок вместе с прокруткой;
 *  - column  — вертикальная колонка плиток у края (только на широких экранах).
 *
 * Оптимизация: двигается только transform, у лент и колонок — один motion value
 * на всю полосу; prefers-reduced-motion → узоры стоят на месте.
 */

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const COLORS = {
  blaze: "#FF5A00",
  flame: "#FFC21A",
  // paper/shale следуют теме, чтобы белые плитки не пропадали на белом фоне.
  paper: "var(--paper)",
  sea: "#22C3B5",
  shale: "var(--shale)",
} as const;

type Color = keyof typeof COLORS;
type TileKind = "quarter" | "arcs" | "waves" | "chevrons" | "steps" | "circle" | "half" | "plus" | "flame" | "checker" | "ring" | "stripes";
type Motif = { kind: TileKind; fg: Color; bg?: Color };
type Side = "left" | "right";

type ClusterTile = Motif & {
  col: number;
  row: number;
  /** Ось движения и размах (px): плитка проезжает от +travel до −travel. */
  axis: "x" | "y";
  travel: number;
  spin?: number;
  isDesktopOnly?: boolean;
};

type Band =
  | { type: "cluster"; side: Side; offset: string; tiles: ClusterTile[] }
  | { type: "ribbon"; direction: "left" | "right"; motifs: Motif[] }
  | { type: "column"; side: Side; offset: string; direction: "up" | "down"; motifs: Motif[] };

/** Размер плитки: мелкие абстракции, на телефоне ещё мельче. */
const TILE_SIZE = "clamp(22px, 2.5vw, 44px)";
const STRIP_GAP = 8;

const sideStyle = (side: Side, offset: string): CSSProperties => (side === "left" ? { left: offset } : { right: offset });

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
      <g fill="none" stroke={fg} strokeWidth="12">
        {[22, 50, 78].map((y) => (
          <path key={y} d={`M-5 ${y} Q7.5 ${y - 13} 20 ${y} T45 ${y} T70 ${y} T95 ${y} T120 ${y}`} />
        ))}
      </g>
    ),
    chevrons: (
      <g fill="none" stroke={fg} strokeWidth="12">
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
      <g stroke={fg} strokeWidth="11">
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

const M = (kind: TileKind, fg: Color, bg?: Color): Motif => ({ kind, fg, bg });

const tile = (
  motif: Motif,
  col: number,
  row: number,
  axis: "x" | "y",
  travel: number,
  extra: Partial<ClusterTile> = {},
): ClusterTile => ({ ...motif, col, row, axis, travel, ...extra });

/** Палитра мотивов для лент и колонок. */
const STRIP_MOTIFS: Motif[] = [
  M("waves", "sea"),
  M("quarter", "blaze"),
  M("chevrons", "paper", "shale"),
  M("circle", "flame"),
  M("steps", "blaze"),
  M("plus", "paper"),
  M("arcs", "blaze", "flame"),
  M("ring", "sea"),
  M("flame", "flame", "shale"),
  M("checker", "blaze"),
  M("half", "flame"),
  M("stripes", "sea", "shale"),
];

const rotateMotifs = (shift: number): Motif[] => [...STRIP_MOTIFS.slice(shift), ...STRIP_MOTIFS.slice(0, shift)];

const BANDS = {
  heroSeasons: {
    type: "cluster",
    side: "right",
    offset: "2.5%",
    tiles: [
      tile(M("arcs", "blaze", "flame"), 1, 0, "x", 180, { spin: 30 }),
      tile(M("waves", "sea"), 0, 1, "y", 120),
      tile(M("steps", "blaze"), 1, 1, "x", -150),
      tile(M("circle", "flame"), 2, 2, "y", -140, { isDesktopOnly: true }),
    ],
  },
  seasonsAbout: { type: "ribbon", direction: "left", motifs: rotateMotifs(0) },
  aboutAdvantages: {
    type: "cluster",
    side: "right",
    offset: "2%",
    tiles: [
      tile(M("half", "sea"), 0, 0, "y", 130),
      tile(M("stripes", "blaze", "shale"), 1, 0, "x", 170),
      tile(M("ring", "flame"), 1, 1, "y", -120, { spin: 45 }),
    ],
  },
  advantagesPrograms: { type: "column", side: "left", offset: "0.75%", direction: "down", motifs: rotateMotifs(3).slice(0, 7) },
  programsSport: {
    type: "cluster",
    side: "right",
    offset: "2%",
    tiles: [
      tile(M("ring", "paper"), 0, 0, "x", -160),
      tile(M("arcs", "sea", "paper"), 1, 1, "y", 140, { spin: -30 }),
      tile(M("quarter", "blaze"), 0, 1, "x", 190),
    ],
  },
  sportKnowledge: { type: "ribbon", direction: "right", motifs: rotateMotifs(5) },
  knowledgePartners: {
    type: "cluster",
    side: "left",
    offset: "2.5%",
    tiles: [
      tile(M("flame", "flame", "shale"), 1, 0, "y", -130),
      tile(M("steps", "blaze"), 0, 1, "x", -180),
      tile(M("waves", "sea"), 1, 1, "x", 150, { isDesktopOnly: true }),
    ],
  },
  partnersReviews: { type: "column", side: "right", offset: "0.75%", direction: "up", motifs: rotateMotifs(8).slice(0, 7) },
  reviewsFaq: {
    type: "cluster",
    side: "left",
    offset: "2%",
    tiles: [
      tile(M("checker", "flame"), 0, 0, "x", 170, { spin: 45 }),
      tile(M("arcs", "blaze", "flame"), 1, 1, "y", -140),
      tile(M("plus", "paper"), 2, 0, "y", 110, { isDesktopOnly: true }),
    ],
  },
  faqBooking: { type: "ribbon", direction: "left", motifs: rotateMotifs(9) },
} satisfies Record<string, Band>;

export type PatternBandVariant = keyof typeof BANDS;

/** Нулевая по высоте полоса на стыке секций; узоры свисают в отступы соседних секций. */
export function PatternBand({ variant }: { variant: PatternBandVariant }) {
  const ref = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const band: Band = BANDS[variant];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none relative -z-10 h-0", band.type === "column" && "max-lg:hidden")}
      style={{ "--tile": TILE_SIZE } as CSSProperties}
    >
      {band.type === "cluster" ? <Cluster band={band} progress={scrollYProgress} isReduced={isReduced} /> : null}
      {band.type === "ribbon" ? <Ribbon band={band} progress={scrollYProgress} isReduced={isReduced} /> : null}
      {band.type === "column" ? <Column band={band} progress={scrollYProgress} isReduced={isReduced} /> : null}
    </div>
  );
}

type PartProps<T extends Band["type"]> = {
  band: Extract<Band, { type: T }>;
  progress: MotionValue<number>;
  isReduced: boolean;
};

function Cluster({ band, progress, isReduced }: PartProps<"cluster">) {
  const rows = Math.max(...band.tiles.map((item) => item.row)) + 1;
  const cols = Math.max(...band.tiles.map((item) => item.col)) + 1;
  const style: CSSProperties = {
    ...sideStyle(band.side, band.offset),
    top: `calc(var(--tile) * ${-rows / 2})`,
    gridTemplateColumns: `repeat(${cols}, var(--tile))`,
    gridAutoRows: "var(--tile)",
  };

  return (
    <div className="absolute grid" style={style}>
      {band.tiles.map((item) => (
        <ClusterTileView key={`${item.kind}-${item.col}-${item.row}`} item={item} progress={progress} isReduced={isReduced} />
      ))}
    </div>
  );
}

function ClusterTileView({ item, progress, isReduced }: { item: ClusterTile; progress: MotionValue<number>; isReduced: boolean }) {
  // Едет по одной оси: от +travel (стык внизу экрана) через 0 (центр) к −travel (стык вверху).
  const shift = useTransform(progress, [0, 1], [item.travel, -item.travel]);
  const rotate = useTransform(progress, [0, 1], [item.spin ?? 0, -(item.spin ?? 0)]);
  const motionStyle = isReduced ? {} : item.axis === "x" ? { x: shift, rotate } : { y: shift, rotate };

  return (
    <motion.div
      className={cn(item.isDesktopOnly && "max-md:hidden")}
      style={{ gridColumn: item.col + 1, gridRow: item.row + 1, ...motionStyle }}
    >
      <div className="tile-float size-full" style={{ animationDelay: `${(item.col * 2 + item.row) * -1.1}s` }}>
        <TileArt kind={item.kind} fg={COLORS[item.fg]} bg={item.bg ? COLORS[item.bg] : undefined} />
      </div>
    </motion.div>
  );
}

function StripTiles({ motifs }: { motifs: Motif[] }) {
  return motifs.map((motif, i) => (
    <div key={`${motif.kind}-${i}`} className="size-(--tile) shrink-0">
      <TileArt kind={motif.kind} fg={COLORS[motif.fg]} bg={motif.bg ? COLORS[motif.bg] : undefined} />
    </div>
  ));
}

function Ribbon({ band, progress, isReduced }: PartProps<"ribbon">) {
  // Мотивы повторены трижды, чтобы лента перекрывала экран на любом размахе.
  const motifs = [...band.motifs, ...band.motifs, ...band.motifs];
  const x = useTransform(progress, [0, 1], band.direction === "left" ? ["-6%", "-30%"] : ["-30%", "-6%"]);

  return (
    <motion.div
      className="absolute left-0 flex w-max"
      style={{ top: "calc(var(--tile) / -2)", gap: STRIP_GAP, x: isReduced ? "-18%" : x }}
    >
      <StripTiles motifs={motifs} />
    </motion.div>
  );
}

function Column({ band, progress, isReduced }: PartProps<"column">) {
  const y = useTransform(progress, [0, 1], band.direction === "down" ? [-140, 220] : [220, -140]);

  return (
    <motion.div
      className="absolute flex flex-col"
      style={{ ...sideStyle(band.side, band.offset), top: 0, gap: STRIP_GAP, y: isReduced ? 0 : y }}
    >
      <StripTiles motifs={band.motifs} />
    </motion.div>
  );
}
