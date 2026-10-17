import { useEffect, useRef, type CSSProperties } from 'react'

interface GlowLayer {
  color: string
  /** Opacity when animation is off (reduced motion). */
  rest: number
  /** Opacity range the layer breathes between. */
  min: number
  max: number
  /** Drift at the far end of the cycle (relative to the layer size). */
  dx: string
  dy: string
  scale: number
  /** Seconds for one direction; the cycle alternates back. */
  duration: number
  /** Negative delay starts each layer mid-cycle so they never sync. */
  delay: number
}

/**
 * The base violet keeps the approved 7% glow; a deeper and a lighter
 * violet slowly cross-fade over it, so the tone shifts without the
 * overall intensity changing much. Durations are co-prime-ish so the
 * mix rarely repeats.
 */
const LAYERS: GlowLayer[] = [
  {
    color: 'var(--color-accent)',
    rest: 0.07,
    min: 0.055,
    max: 0.075,
    dx: '2%',
    dy: '-3%',
    scale: 1.04,
    duration: 16,
    delay: 0,
  },
  {
    color: 'var(--color-accent-deep)',
    rest: 0,
    min: 0,
    max: 0.045,
    dx: '-4%',
    dy: '4%',
    scale: 1.06,
    duration: 23,
    delay: -8,
  },
  {
    color: 'var(--color-accent-hover)',
    rest: 0,
    min: 0,
    max: 0.035,
    dx: '3%',
    dy: '5%',
    scale: 0.96,
    duration: 29,
    delay: -17,
  },
]

function layerStyle(layer: GlowLayer): CSSProperties {
  return {
    backgroundColor: layer.color,
    '--glow-rest': layer.rest,
    '--glow-min': layer.min,
    '--glow-max': layer.max,
    '--glow-dx': layer.dx,
    '--glow-dy': layer.dy,
    '--glow-scale': layer.scale,
    '--glow-duration': `${layer.duration}s`,
    '--glow-delay': `${layer.delay}s`,
  } as CSSProperties
}

interface AmbientGlowProps {
  /** Position and size of the glow; set `--glow-blur` here to change the blur. */
  className: string
}

/**
 * Soft violet background light that slowly breathes between purple tones.
 * Pure CSS animation, paused while off-screen, static with reduced motion.
 */
export function AmbientGlow({ className }: AmbientGlowProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => node.toggleAttribute('data-paused', !entry.isIntersecting),
      { rootMargin: '200px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`ambient-glow pointer-events-none absolute -z-10 ${className}`}
    >
      {LAYERS.map((layer) => (
        <div key={layer.color} className="ambient-glow-layer" style={layerStyle(layer)} />
      ))}
    </div>
  )
}
