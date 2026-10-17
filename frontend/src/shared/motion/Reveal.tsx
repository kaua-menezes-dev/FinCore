import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT_SOFT, type RevealTiming } from './timing'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface RevealProps {
  timing: RevealTiming
  /**
   * When provided, the reveal waits until this turns true (for example,
   * once a section scrolls into view) instead of running on mount.
   */
  when?: boolean
  className?: string
  children: ReactNode
}

/**
 * Fades and lifts its children into place once, on mount or when `when`
 * becomes true. With prefers-reduced-motion the content renders in its
 * final state.
 */
export function Reveal({ timing, when, className, children }: RevealProps) {
  const reduceMotion = usePrefersReducedMotion()
  const visible = reduceMotion || when !== false

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: timing.y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: timing.y }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { delay: timing.delay, duration: timing.duration, ease: timing.ease ?? EASE_OUT_SOFT }
      }
    >
      {children}
    </motion.div>
  )
}
