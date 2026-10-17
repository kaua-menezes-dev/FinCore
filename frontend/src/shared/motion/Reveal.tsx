import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT_SOFT, type RevealTiming } from './timing'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface RevealProps {
  timing: RevealTiming
  className?: string
  children: ReactNode
}

/**
 * Fades and lifts its children into place once, on mount.
 * With prefers-reduced-motion the content renders in its final state.
 */
export function Reveal({ timing, className, children }: RevealProps) {
  const reduceMotion = usePrefersReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: timing.y }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { delay: timing.delay, duration: timing.duration, ease: EASE_OUT_SOFT }
      }
    >
      {children}
    </motion.div>
  )
}
