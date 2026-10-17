import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../../shared/motion/usePrefersReducedMotion'
import type { Pillar } from '../pillars'

/** Index of the card at the start of the track (the last one once fully scrolled). */
function getActiveIndex(track: HTMLElement, maxScroll: number, count: number) {
  if (track.scrollLeft >= maxScroll - 2) return count - 1
  const step = getStep(track)
  if (!step) return 0
  return Math.min(count - 1, Math.max(0, Math.round(track.scrollLeft / step)))
}

/** Distance between two neighbouring cards (card width + gap). */
function getStep(track: HTMLElement) {
  const cards = track.querySelectorAll<HTMLElement>('[data-carousel-item]')
  return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 0
}

/**
 * Native scroll-snap carousel state. Carousel behavior (focusable track,
 * indicator, arrows) only exists while the track actually overflows, so
 * the desktop layout stays a static row.
 */
function useCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [scrollable, setScrollable] = useState(false)
  const reduceMotion = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    const measure = () => {
      frame = 0
      const maxScroll = track.scrollWidth - track.clientWidth
      setScrollable(maxScroll > 1)
      setIndex(getActiveIndex(track, maxScroll, count))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    track.addEventListener('scroll', schedule, { passive: true })
    const resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(track)

    return () => {
      track.removeEventListener('scroll', schedule)
      resizeObserver.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [count])

  const goTo = useCallback(
    (target: number) => {
      const track = trackRef.current
      if (!track) return
      const clamped = Math.min(count - 1, Math.max(0, target))
      track.scrollTo({ left: clamped * getStep(track), behavior: reduceMotion ? 'auto' : 'smooth' })
    },
    [count, reduceMotion],
  )

  return { trackRef, index, scrollable, goTo }
}

interface PillarCarouselProps {
  pillars: Pillar[]
}

/**
 * Pillar cards in one horizontal track (Figma: Section 02 carousel spec).
 * Desktop ≥ 1120 px: static row of three. Tablet: swipe + arrows.
 * Mobile: swipe only. Snapping, momentum and keyboard scrolling are native.
 */
export function PillarCarousel({ pillars }: PillarCarouselProps) {
  const trackId = useId()
  const { trackRef, index, scrollable, goTo } = useCarousel(pillars.length)
  const isFirst = index === 0
  const isLast = index === pillars.length - 1

  return (
    <div>
      <div
        ref={trackRef}
        id={trackId}
        {...(scrollable && {
          role: 'region',
          'aria-roledescription': 'carrossel',
          'aria-label': 'Pilares do FinCore',
          tabIndex: 0,
        })}
        className="snap-x snap-mandatory scroll-px-6 overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-offset-[-2px] md:scroll-px-10 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max gap-3 px-6 md:gap-4 md:px-10 lg:mx-auto lg:w-full lg:max-w-320 lg:gap-6">
          {pillars.map((pillar) => (
            <li
              key={pillar.step}
              data-carousel-item
              className="hairline-gradient relative h-43 w-75 shrink-0 snap-start snap-always rounded-[20px] bg-bg-secondary bg-[linear-gradient(to_bottom,rgb(245_247_251/0.035),rgb(245_247_251/0)_60%)] p-9 md:h-40.5 md:w-96 lg:w-auto lg:max-w-96 lg:flex-1"
            >
              <h3 className="text-[26px] leading-[1.2] font-medium tracking-[-0.02em] text-fg">
                {pillar.title}
              </h3>
              <p className="mt-3 max-w-70 text-base leading-normal text-fg-muted">
                {pillar.description}
              </p>
              <span
                aria-hidden="true"
                className="absolute right-[38px] bottom-2.5 font-mono text-[13px] leading-[17px] tracking-[0.04em] text-fg-muted opacity-60"
              >
                {pillar.step}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {scrollable && (
        <>
          <p className="sr-only" aria-live="polite">
            {`${pillars[index].title}, ${index + 1} de ${pillars.length}`}
          </p>

          <div className="mx-auto mt-9 flex h-10 max-w-320 items-center justify-center px-6 md:mt-12 md:justify-between md:px-10">
            <div aria-hidden="true" className="flex items-center gap-1.5">
              {pillars.map((pillar, i) => (
                <span
                  key={pillar.step}
                  className={`h-1 rounded-xs transition-[width,background-color] duration-250 ease-out motion-reduce:transition-none ${
                    i === index ? 'w-6 bg-accent' : 'w-2 bg-fg-muted/30'
                  }`}
                />
              ))}
            </div>

            <div className="hidden gap-2 md:flex">
              <ArrowButton
                direction="previous"
                controls={trackId}
                disabled={isFirst}
                onClick={() => goTo(index - 1)}
              />
              <ArrowButton
                direction="next"
                controls={trackId}
                disabled={isLast}
                onClick={() => goTo(index + 1)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

interface ArrowButtonProps {
  direction: 'previous' | 'next'
  controls: string
  disabled: boolean
  onClick: () => void
}

function ArrowButton({ direction, controls, disabled, onClick }: ArrowButtonProps) {
  const isPrevious = direction === 'previous'

  return (
    <button
      type="button"
      aria-label={isPrevious ? 'Card anterior' : 'Próximo card'}
      aria-controls={controls}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface/70 text-fg transition-[background-color,opacity] duration-200 hover:bg-surface disabled:pointer-events-none disabled:opacity-40"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d={isPrevious ? 'M10 4 6 8l4 4' : 'm6 4 4 4-4 4'}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
