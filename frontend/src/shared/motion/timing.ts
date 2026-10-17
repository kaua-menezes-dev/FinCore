/** Shared easing curves for the landing page animation system. */
export const EASE_OUT_SOFT = [0.16, 1, 0.3, 1] as const
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const

export interface RevealTiming {
  /** Seconds before the element starts animating. */
  delay: number
  /** Seconds the fade + rise takes. */
  duration: number
  /** Starting vertical offset in px (positive = starts lower). */
  y: number
}

/**
 * Hero entrance sequence, run once on page load:
 * Navbar → Headline → Description → CTA → Card artwork.
 * Timings overlap on purpose so the reveal reads as one movement.
 */
export const HERO_ENTRANCE = {
  navbar: { delay: 0, duration: 0.6, y: 8 },
  headline: { delay: 0.2, duration: 0.7, y: 16 },
  description: { delay: 0.35, duration: 0.65, y: 12 },
  cta: { delay: 0.45, duration: 0.65, y: 12 },
  visual: { delay: 0.6, duration: 0.85, y: 24 },
} satisfies Record<string, RevealTiming>

/** Approved headline rotation spec (Figma: Hero Headline / Rotator). */
export const HEADLINE_ROTATION = {
  /** Time between phrase changes. */
  intervalMs: 2500,
  /** Vertical slide + fade between phrases. */
  transition: { duration: 0.5, ease: EASE_STANDARD },
  /** Phrase offset as a share of the line box (≈ 40/72 px on desktop). */
  offset: '56%',
  /** Rotation starts once the headline entrance has finished. */
  startDelayMs:
    (HERO_ENTRANCE.headline.delay + HERO_ENTRANCE.headline.duration) * 1000,
} as const
