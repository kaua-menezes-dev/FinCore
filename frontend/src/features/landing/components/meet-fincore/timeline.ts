import { MEET_FINCORE_SCROLL as SCROLL } from '../../../../shared/motion/timing'
import type { DashboardTarget } from '../../dashboard-preview/canvas'
import { POPUPS } from '../../meetFincore'

/*
 * Pure math for the Section 03 storyboard. Every value is a function of
 * the pinned scroll progress (0–1) and the measured stage geometry, so
 * scrolling back simply evaluates the same functions in reverse.
 */

export type StageLayout = 'desktop' | 'tablet' | 'mobile'

export interface Point {
  x: number
  y: number
}

export interface StageGeometry {
  ready: boolean
  layout: StageLayout
  /** Showcase panel size (px). */
  width: number
  height: number
  /** Dashboard canvas scale inside the showcase. */
  scale: number
  /** Dashboard canvas origin inside the showcase (px). */
  origin: Point
  /** Destination components, in native dashboard px. */
  targets: Record<DashboardTarget, Point>
}

export const EMPTY_GEOMETRY: StageGeometry = {
  ready: false,
  layout: 'desktop',
  width: 0,
  height: 0,
  scale: 0,
  origin: { x: 0, y: 0 },
  targets: {
    transaction: { x: 0, y: 0 },
    categories: { x: 0, y: 0 },
    result: { x: 0, y: 0 },
  },
}

/** Desktop showcase width the Figma rest positions are expressed in. */
const DESIGN_SHOWCASE_WIDTH = 736

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)

/** Progress inside one pop-up segment; < 0 before it starts, > 1 once done. */
function segmentProgress(progress: number, index: number) {
  return (progress - index * SCROLL.segment) / SCROLL.segment
}

/** Step whose text block is highlighted at this progress. */
export function activeStepAt(progress: number, stepCount: number) {
  return Math.min(stepCount - 1, Math.max(0, Math.floor(progress / SCROLL.segment)))
}

/** Where a pop-up floats before integrating (showcase px + absolute scale). */
function restOf(target: DashboardTarget, geometry: StageGeometry) {
  const spec = POPUPS[target]

  if (geometry.layout === 'desktop') {
    const k = geometry.width / DESIGN_SHOWCASE_WIDTH
    return { x: spec.rest.x * k, y: spec.rest.y * k, scale: spec.rest.scale * k }
  }

  // Tablet / mobile: centered over the showcase, on the side away from the destination.
  const scale = Math.min(
    spec.rest.scale,
    (geometry.width * 0.92) / spec.width,
    (geometry.height * 0.9) / spec.height,
  )
  const height = spec.height * scale
  const destinationCenter =
    geometry.origin.y + (geometry.targets[target].y + spec.height / 2) * geometry.scale
  const margin = geometry.height * 0.05
  return {
    x: (geometry.width - spec.width * scale) / 2,
    y: destinationCenter > geometry.height / 2 ? margin : geometry.height - height - margin,
    scale,
  }
}

/** Pop-up position that lines its content up with the destination component. */
function destinationOf(target: DashboardTarget, geometry: StageGeometry) {
  const spec = POPUPS[target]
  const { origin, scale, targets } = geometry
  return {
    x: origin.x + (targets[target].x - spec.inset.x) * scale,
    y: origin.y + (targets[target].y - spec.inset.y) * scale,
    scale,
  }
}

export interface PopupFrame {
  x: number
  y: number
  scale: number
  opacity: number
  /** Floating panel background + elevation; fades while it docks. */
  chrome: number
}

/** Pop-up transform/opacity for the pinned progress. */
export function popupFrameAt(
  target: DashboardTarget,
  index: number,
  progress: number,
  geometry: StageGeometry,
): PopupFrame {
  const u = segmentProgress(progress, index)
  const rest = restOf(target, geometry)

  if (!geometry.ready || u <= 0 || u >= 1) {
    return { x: rest.x, y: rest.y, scale: rest.scale, opacity: 0, chrome: 1 }
  }

  const { appearEnd, moveStart, handoffStart } = SCROLL.phases
  const appear = easeOutCubic(clamp01(u / appearEnd))
  const move = easeInOutCubic(clamp01((u - moveStart) / (1 - moveStart)))
  const destination = destinationOf(target, geometry)
  const lift = (1 - appear) * SCROLL.appearLift * (geometry.width / DESIGN_SHOWCASE_WIDTH)
  const restScale = rest.scale * lerp(SCROLL.appearScale, 1, appear)

  // The docked copy hides only after the destination underneath is fully visible.
  const vanish = clamp01((u - 0.97) / 0.03)

  return {
    x: lerp(rest.x, destination.x, move),
    y: lerp(rest.y + lift, destination.y, move),
    scale: lerp(restScale, destination.scale, move),
    opacity: appear * (1 - vanish),
    chrome: 1 - clamp01((u - moveStart) / (handoffStart - moveStart)),
  }
}

/**
 * Opacity of a destination component: hidden until its pop-up lands, then
 * shown in its original state. Without a pop-up (mobile, first step) it
 * simply fades in place across the segment.
 */
export function destinationOpacityAt(index: number, progress: number, withPopup: boolean) {
  const u = segmentProgress(progress, index)
  if (!withPopup) return clamp01((u - 0.3) / 0.6)
  return clamp01((u - SCROLL.phases.handoffStart) / (0.97 - SCROLL.phases.handoffStart))
}
