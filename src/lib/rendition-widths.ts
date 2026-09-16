export interface WidthSpec {
  /**
   * The image's rendered CSS width (px) at each breakpoint that matters. Read
   * these off the role's `sizes` string; collapse near-equal breakpoints to one
   * entry (object-cover makes a sub-20% overfetch negligible).
   */
  renderedWidths: number[];
  /** DPR multipliers to cover. Default [1, 2]. Use [1, 2, 3] for small elements. */
  dprSteps?: number[];
  /** Hard cap — renditions above this are never worth baking. Default 1600. */
  maxWidth?: number;
}

/** Cross renderedWidths x dprSteps, then dedupe / sort / cap. Pure. */
export function computeWidths(spec: WidthSpec): number[] {
  const dprSteps = spec.dprSteps ?? [1, 2];
  const maxWidth = spec.maxWidth ?? 1600;
  const raw = spec.renderedWidths.flatMap((w) =>
    dprSteps.map((dpr) => Math.round(w * dpr)),
  );
  return [...new Set(raw)]
    .filter((w) => w > 0 && w <= maxWidth)
    .sort((a, b) => a - b);
}
