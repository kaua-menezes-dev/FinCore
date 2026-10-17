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
  /** Cubic-bezier curve; defaults to EASE_OUT_SOFT. */
  ease?: readonly [number, number, number, number]
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

/**
 * "Como funciona" entrance, run once when the section scrolls into view:
 * Eyebrow + heading → Description → Card carousel.
 */
export const HOW_IT_WORKS_ENTRANCE = {
  heading: { delay: 0, duration: 0.7, y: 16 },
  description: { delay: 0.12, duration: 0.65, y: 12 },
  cards: { delay: 0.24, duration: 0.85, y: 24 },
} satisfies Record<string, RevealTiming>

/**
 * "Recursos em destaque" scroll reveal (Figma: Section 04 spec), run once
 * as each part enters the viewport: header items 80 ms apart, then the
 * mosaic cards 70 ms apart in reading order.
 */
export const FEATURED_FEATURES_REVEAL = {
  item: { delay: 0, duration: 0.6, y: 24, ease: [0.25, 0.46, 0.45, 0.94] },
  headerStagger: 0.08,
  cardStagger: 0.07,
  /** Starts when the element's top passes ~85% of the viewport height. */
  viewportMargin: '0px 0px -15% 0px',
} as const satisfies {
  item: RevealTiming
  headerStagger: number
  cardStagger: number
  viewportMargin: string
}

/**
 * "Conheça o FinCore" scroll storyboard (Figma: Section 03 spec).
 * Everything is scrubbed by scroll position — nothing runs on a timer.
 */
export const MEET_FINCORE_SCROLL = {
  /** Reference easing for the dashboard entrance and step changes. */
  ease: [0.25, 0.46, 0.45, 0.94] as const,
  /** Dashboard entrance: starts this many px above its final position. */
  entranceOffset: { desktop: 120, compact: 72 },
  /**
   * Entrance scroll range: it starts once the section top reaches 35% of
   * the viewport and finishes 55vh into the pin, so most of the descent
   * happens while the dashboard is fully on screen. Pop-ups start after it.
   */
  entrance: { startViewport: 0.35, pinnedVh: 55, fadeShare: 0.3 },
  /** Extra scroll distance while the section is pinned (vh): entrance + pop-up sequence. */
  pinDistanceVh: { desktop: 295, compact: 235 },
  /** Share of the pinned progress used by each pop-up; the rest is a final hold. */
  segment: 0.3,
  /** Phases inside one pop-up segment (0–1). */
  phases: { appearEnd: 0.25, moveStart: 0.5, handoffStart: 0.85 },
  /** Pop-up appear motion: rises this many px (desktop showcase px) and scales from 0.96. */
  appearLift: 16,
  appearScale: 0.96,
  /** Active step change (text opacity, indicator) — CSS transition. */
  stepTransitionMs: 800,
} as const

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
