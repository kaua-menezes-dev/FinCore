import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { HEADLINE_ROTATION } from '../../../shared/motion/timing'
import { usePrefersReducedMotion } from '../../../shared/motion/usePrefersReducedMotion'

/** FinCore pillars: Registrar → Visualizar → Decidir. */
const PHRASES = [
  'Registre com facilidade.',
  'Visualize com clareza.',
  'Decida com confiança.',
] as const

function usePhraseIndex(enabled: boolean) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!enabled) return

    let interval: number | undefined
    const start = window.setTimeout(() => {
      interval = window.setInterval(
        () => setIndex((current) => (current + 1) % PHRASES.length),
        HEADLINE_ROTATION.intervalMs,
      )
    }, HEADLINE_ROTATION.startDelayMs)

    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [enabled])

  return index
}

/**
 * Static first line plus an accent line that cycles through the three
 * pillars with a vertical slide + fade. With reduced motion it stays on
 * the first phrase. Screen readers get the full sentence once.
 */
export function HeroHeadline({ id }: { id?: string }) {
  const reduceMotion = usePrefersReducedMotion()
  const rotatingIndex = usePhraseIndex(!reduceMotion)
  const index = reduceMotion ? 0 : rotatingIndex
  const { offset, transition } = HEADLINE_ROTATION

  return (
    <h1 id={id} className="text-[min(30px,8vw)] leading-[1.1] font-medium tracking-[-0.03em] md:text-[44px] lg:text-[56px]">
      <span className="block lg:whitespace-nowrap">
        Assuma o controle da
        <br className="lg:hidden" /> sua vida financeira.
      </span>
      <span className="sr-only"> {PHRASES.join(' ')}</span>

      <span
        aria-hidden="true"
        className="relative mt-1.5 block h-[1.334em] overflow-hidden text-accent md:mt-2 md:h-[1.318em] lg:h-[1.286em]"
      >
        {/* Remounts when the motion preference flips, so no exit animation lingers. */}
        <AnimatePresence key={String(reduceMotion)} initial={false}>
          <motion.span
            key={index}
            className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
            initial={reduceMotion ? false : { y: offset, opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: `-${offset}`, opacity: 0 }}
            transition={transition}
          >
            {PHRASES[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  )
}
