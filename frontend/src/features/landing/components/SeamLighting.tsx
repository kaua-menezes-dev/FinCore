import type { CSSProperties } from 'react'

/**
 * Lighting shared by Section 06 (FAQ) and Section 07 (final CTA).
 *
 * Figma draws Section 06's lower-right bloom and the "Seam Bridge ·
 * S06→S07" glows once, in Section 06's 1440 × 1030 frame, and places a copy
 * in each section offset by the frame height. Here both sections render the
 * same canvas: the FAQ anchors it to its bottom edge, the CTA stacks it
 * directly above its top edge. Each section clips its own half, so the
 * glows meet at the seam without a visible edge.
 *
 * Glows are radial gradients (no blur filters). Sizes add the Figma layer
 * blur to the ellipse; positions come from the desktop frame.
 */
interface Glow {
  /** Left / bottom edge and size on the 1440 × 1030 canvas. */
  left: number
  bottom: number
  width: number
  height: number
  rgb: string
  opacity: number
  rotate?: number
}

const GLOWS: Glow[] = [
  // Section 06 lower-right bloom: deep violet, soft purple, muted lavender.
  { left: 768, bottom: -120, width: 1144, height: 984, rgb: '59 31 158', opacity: 0.38 },
  { left: 950, bottom: 52, width: 780, height: 720, rgb: '139 92 246', opacity: 0.17 },
  { left: 855, bottom: 37, width: 690, height: 550, rgb: '183 166 232', opacity: 0.08 },
  { left: 1142, bottom: 344, width: 496, height: 536, rgb: '192 132 252', opacity: 0.07 },
  // Seam bridge: the bloom drifts toward the centre and gathers into the beam origin.
  { left: 100, bottom: -410, width: 1560, height: 780, rgb: '59 31 158', opacity: 0.14 },
  { left: 695, bottom: -94, width: 970, height: 354, rgb: '59 31 158', opacity: 0.16, rotate: -20 },
  { left: 388, bottom: -242, width: 864, height: 524, rgb: '140 92 245', opacity: 0.13 },
  { left: 478, bottom: -218, width: 636, height: 406, rgb: '204 189 255', opacity: 0.17 },
  { left: 655, bottom: -121, width: 282, height: 212, rgb: '204 189 255', opacity: 0.13 },
]

/**
 * `faq`: canvas sits on the section's bottom edge.
 * `final-cta`: canvas sits just above the section's top edge.
 * The parent must be a positioned, clipped layer covering the section.
 */
export function SeamLighting({ section }: { section: 'faq' | 'final-cta' }) {
  return (
    <div
      className={`absolute left-1/2 h-[1030px] w-[1440px] origin-bottom -translate-x-1/2 scale-[0.6] md:scale-[0.8] lg:scale-100 ${
        section === 'faq' ? 'bottom-0' : 'bottom-full'
      }`}
    >
      {GLOWS.map((glow, index) => (
        <div key={index} className="absolute rounded-full" style={glowStyle(glow)} />
      ))}
    </div>
  )
}

function glowStyle({ left, bottom, width, height, rgb, opacity, rotate }: Glow): CSSProperties {
  return {
    left,
    bottom,
    width,
    height,
    rotate: rotate ? `${rotate}deg` : undefined,
    backgroundImage: `radial-gradient(closest-side, rgb(${rgb} / ${opacity}), transparent)`,
  }
}
