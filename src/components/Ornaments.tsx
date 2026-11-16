import type { CSSProperties, ReactNode } from "react";

/** Tête de cheval — le logo du site (même dessin que l'icône d'onglet). */
export const HORSE_HEAD_PATH =
  "M47 56H21c0-7 3.5-11 6.5-15.5 2-3 1.5-6-1-7.5-2.5 1-5 4-8.5 5.5-3.5 1.5-7-.5-7.5-4-.3-2 .5-4 2-5.800l9.500-11c2.300-2.700 5-5 8.500-6.700L29.500 5l7 4.500C47 11 54.500 20 54.500 33c0 9-2.500 16.500-7.500 23z";

export function HorseMark({ size = 22, color = "currentColor", style }: { size?: number; color?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="6 2 52 58" fill="none" aria-hidden="true" style={{ flexShrink: 0, ...style }}>
      <path d={HORSE_HEAD_PATH} fill={color} />
    </svg>
  );
}

/** Filet décoratif : deux traits et un petit soleil (clin d'œil au Roi-Soleil). Se dessine à l'apparition. */
export function SunDivider({ color = "#8B7355", style }: { color?: string; style?: CSSProperties }) {
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const r1 = 7.500;
    const r2 = i % 2 === 0 ? 11.500 : 10;
    const f = (n: number) => n.toFixed(2);
    return `M${f(80 + Math.cos(a) * r1)} ${f(14 + Math.sin(a) * r1)}L${f(80 + Math.cos(a) * r2)} ${f(14 + Math.sin(a) * r2)}`;
  }).join("");
  return (
    <svg
      className="ornament"
      viewBox="0 0 160 28"
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
      style={{ display: "block", width: "min(160px, 44vw)", height: "auto", margin: "0 auto", ...style }}
    >
      <path className="draw" pathLength={1} d="M62 14H6" />
      <path className="draw" pathLength={1} d="M98 14h56" />
      <circle className="draw" pathLength={1} cx="80" cy="14" r="4.500" />
      <path className="draw draw-late" pathLength={1} d={rays} />
    </svg>
  );
}

export type LineIconName =
  | "car"
  | "chateau"
  | "cloche"
  | "horse"
  | "trianon"
  | "plane"
  | "clock"
  | "horseshoe"
  | "ticket"
  | "calendar";

const ICONS: Record<LineIconName, ReactNode> = {
  car: (
    <>
      <path d="M3 14.500l1.900-4.700A2 2 0 0 1 6.750 8.500h10.500a2 2 0 0 1 1.850 1.300l1.900 4.700v3.500h-2.200M5.200 18H3v-3.500M9.200 18h5.600" />
      <path d="M3 14.500h18" />
      <circle cx="7.200" cy="18" r="1.800" />
      <circle cx="16.800" cy="18" r="1.800" />
    </>
  ),
  chateau: (
    <>
      <path d="M2.500 20.500h19M4.500 20.500V11l7.500-4 7.500 4v9.500" />
      <path d="M9.500 20.500V15.500a2.500 2.500 0 0 1 5 0v5M12 7V3l3 1.200-3 1.200M7 13.500h1M16 13.500h1" />
    </>
  ),
  cloche: (
    <>
      <path d="M3 17.500h18M5 17.500a7 7 0 0 1 14 0M3.500 20.500h17" />
      <circle cx="12" cy="8.500" r="1.200" />
      <path d="M8.200 14.200a4.200 4.200 0 0 1 2.300-2.200" />
    </>
  ),
  horse: (
    <g transform="translate(-1.5 -0.5) scale(0.4)" strokeWidth={3.500}>
      <path d={HORSE_HEAD_PATH} />
      <path d="M38 13c6 3.500 9.500 10 9.500 19" />
    </g>
  ),
  trianon: (
    <>
      <path d="M3 20.500h18M4 9.500h16M12 4l8 5.500H4z" />
      <path d="M6.500 9.500v11M10.200 9.500v11M13.800 9.500v11M17.500 9.500v11" />
    </>
  ),
  plane: (
    <>
      <path d="M21 3.500L3 10.500l6.500 2.800L21 3.500zM9.500 13.300V19l3-3.600" />
      <path d="M9.500 13.300l7 5.200L21 3.500" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.500" />
      <path d="M12 7.500V12l3 2" />
    </>
  ),
  horseshoe: (
    <>
      <path d="M6.500 20V11a5.500 5.500 0 0 1 11 0v9M4.500 20h4M15.500 20h4" />
      <path d="M9.500 20V11.200a2.500 2.500 0 0 1 5 0V20" />
    </>
  ),
  ticket: (
    <>
      <path d="M4 8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2.200a1.800 1.800 0 0 0 0 3.600V16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2.200a1.800 1.800 0 0 0 0-3.600z" />
      <path d="M14.500 7v1.500M14.500 11v2M14.500 15.500V17" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.500" width="16" height="14.500" rx="1.500" />
      <path d="M4 10h16M8 3.500v4M16 3.500v4M9 14.800l2.200 2.200 4-4.200" />
    </>
  ),
};

/** Petits dessins au trait, vectoriels : nets à toutes les tailles d'écran. */
export function LineIcon({ name, size = 28, color = "currentColor", style }: { name: LineIconName; size?: number; color?: string; style?: CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.200"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, ...style }}
    >
      {ICONS[name]}
    </svg>
  );
}
