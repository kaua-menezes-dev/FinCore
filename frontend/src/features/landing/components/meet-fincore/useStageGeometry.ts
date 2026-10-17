import { useMotionValue } from 'motion/react'
import { useLayoutEffect, useState, type RefObject } from 'react'
import { DASHBOARD_SIZE, type DashboardTarget } from '../../dashboard-preview/canvas'
import { EMPTY_GEOMETRY, type Point, type StageGeometry, type StageLayout } from './timeline'

const TARGETS: DashboardTarget[] = ['transaction', 'categories', 'result']

/** Smallest viewport height that can hold the pinned presentation. */
const MIN_PIN_HEIGHT = 560

/** Offset of `element` inside `root`, ignoring CSS transforms. */
function offsetWithin(element: HTMLElement, root: HTMLElement): Point {
  let x = 0
  let y = 0
  let node: HTMLElement | null = element
  while (node && node !== root) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y }
}

interface StageRefs {
  content: RefObject<HTMLElement | null>
  showcase: RefObject<HTMLElement | null>
  frame: RefObject<HTMLElement | null>
  canvas: RefObject<HTMLElement | null>
}

/**
 * Measures the showcase and dashboard (only on resize / font load) and
 * exposes the result as a motion value, so scroll-driven transforms can
 * read it without re-rendering. Also reports whether the sticky content
 * fits the viewport, which decides if the section can pin.
 */
export function useStageGeometry(layout: StageLayout, refs: StageRefs) {
  const geometry = useMotionValue<StageGeometry>(EMPTY_GEOMETRY)
  const [fitsViewport, setFitsViewport] = useState(false)

  useLayoutEffect(() => {
    let frameRequest = 0

    const measure = () => {
      frameRequest = 0
      const content = refs.content.current
      const showcase = refs.showcase.current
      const frame = refs.frame.current
      const root = refs.canvas.current?.firstElementChild
      if (!content || !showcase || !frame || !(root instanceof HTMLElement)) return

      const scale = frame.clientWidth / DASHBOARD_SIZE.width
      frame.style.setProperty('--dashboard-scale', String(scale))

      const targets = { ...EMPTY_GEOMETRY.targets }
      for (const target of TARGETS) {
        const element = root.querySelector<HTMLElement>(`[data-dashboard-target="${target}"]`)
        if (element) targets[target] = offsetWithin(element, root)
      }

      geometry.set({
        ready: true,
        layout,
        width: showcase.offsetWidth,
        height: showcase.offsetHeight,
        scale,
        origin: { x: frame.offsetLeft, y: frame.offsetTop },
        targets,
      })

      const viewport = window.innerHeight
      setFitsViewport(viewport >= MIN_PIN_HEIGHT && content.offsetHeight <= viewport - 32)
    }

    const schedule = () => {
      if (!frameRequest) frameRequest = requestAnimationFrame(measure)
    }

    measure()
    const resizeObserver = new ResizeObserver(schedule)
    if (refs.content.current) resizeObserver.observe(refs.content.current)
    if (refs.showcase.current) resizeObserver.observe(refs.showcase.current)
    window.addEventListener('resize', schedule)
    let active = true
    document.fonts?.ready.then(() => {
      if (active) schedule()
    })

    return () => {
      active = false
      resizeObserver.disconnect()
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frameRequest)
    }
  }, [layout, geometry, refs.content, refs.showcase, refs.frame, refs.canvas])

  return { geometry, fitsViewport }
}
