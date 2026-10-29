import { decodeMaskToSVGPath, type SegmentationMask } from "@meta-sam/parser";

/** A photo of a place with what SAM 3.1 found in it: numbered steps (1 = nearest), puddles, icy ground
 * and ramps. Each outline is SAM's mask, decoded with Meta's parser and drawn over the photo; `size` is
 * the image SAM saw (the same photo, scaled), so one viewBox maps both. */
export type OutlineItem = {
  kind: string; label: string; c: number; n?: number;
  box: [number, number, number, number];  // fractions of the photo
  px?: [number, number, number, number];  // pixels of the image SAM saw
  mask?: SegmentationMask;
};
export type Outline = { model: string; size?: [number, number]; steps: number; patches: number; ramps: number; items: OutlineItem[] };

/** The mask as [transform, path] in the image's pixels, or null (no mask, or it would not decode). */
function shape(it: OutlineItem): [string, string] | null {
  if (it.mask && it.px) {
    try {
      const [x1, y1, x2, y2] = it.px;
      const d = decodeMaskToSVGPath(it.mask);
      if (d) return [`translate(${x1} ${y1}) scale(${(x2 - x1) / it.mask.width} ${(y2 - y1) / it.mask.height})`, d];
    } catch { /* fall back to the box */ }
  }
  return null;
}

export default function PlaceOutline({ src, outline, className = "" }: { src: string; outline?: Outline | null; className?: string }) {
  const items = outline?.items || [];
  const [w, h] = outline?.size?.[0] ? outline.size : [1000, 1000];
  return (
    <div className={`relative w-fit overflow-hidden rounded-lg ${className}`}>
      <img src={src} alt="" className="block h-full max-h-[inherit] w-auto" />
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full">
        {items.map((it, i) => {
          const step = it.kind === "step";
          const color = step ? "var(--color-acid)" : it.kind === "ramp" ? "var(--color-peri)" : "#7cc4ff";
          const mask = shape(it);
          const style = { animationDelay: `${i * 140}ms` };
          if (mask)
            return <path key={i} d={mask[1]} transform={mask[0]} fill={color} fillOpacity={step ? 0.18 : 0.28} stroke={color} strokeWidth={2}
              vectorEffect="non-scaling-stroke" className="rise" style={style} />;
          const [x1, y1, x2, y2] = it.box;
          return <rect key={i} x={x1 * w} y={y1 * h} width={(x2 - x1) * w} height={(y2 - y1) * h} rx={4} fill={color}
            fillOpacity={step ? 0.12 : 0.22} stroke={color} strokeWidth={2} strokeDasharray={step ? undefined : "5 4"}
            vectorEffect="non-scaling-stroke" className="rise" style={style} />;
        })}
      </svg>
      {items.map((it, i) => {
        const [x1, y1, , y2] = it.box;
        const style = { left: `${x1 * 100}%`, top: `${((y1 + y2) / 2) * 100}%`, animationDelay: `${i * 140}ms` };
        return it.kind === "step" ? (
          <span key={i} style={style}
            className="rise absolute grid size-3.5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-acid font-mono text-[9px] font-medium text-black ring-1 ring-black/40">
            {it.n}
          </span>
        ) : (
          <span key={i} style={{ ...style, top: `${y1 * 100}%` }} className="rise absolute mt-1 ml-1 rounded bg-black/60 px-1 font-mono text-[10px] text-ink">
            {it.label}
          </span>
        );
      })}
      {items.length > 0 && (
        <span className="absolute right-2 bottom-2 rounded-full bg-black/65 px-2 py-0.5 font-mono text-[10px] text-ink">SAM 3.1</span>
      )}
    </div>
  );
}
