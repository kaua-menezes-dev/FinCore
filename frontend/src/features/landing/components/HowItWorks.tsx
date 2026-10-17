import { useInView } from 'motion/react'
import { useRef } from 'react'
import { Reveal } from '../../../shared/motion/Reveal'
import { HOW_IT_WORKS_ENTRANCE } from '../../../shared/motion/timing'
import { PILLARS } from '../pillars'
import { PillarCarousel } from './PillarCarousel'

/**
 * Section 02 — "Como funciona": the three FinCore pillars.
 * Reveals once when scrolled into view.
 */
export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.25 })

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="relative isolate overflow-x-clip pt-18 pb-24 md:pt-24 md:pb-30 lg:pt-28 lg:pb-40"
    >
      <div className="mx-auto flex max-w-300 flex-col items-center px-6 text-center md:px-10">
        <Reveal when={inView} timing={HOW_IT_WORKS_ENTRANCE.heading} className="flex flex-col items-center">
          <p className="flex items-center gap-2.5 font-mono text-xs leading-4 font-medium tracking-[0.1em] text-fg-muted uppercase">
            <span aria-hidden="true" className="size-1.5 rounded-[1.5px] bg-accent" />
            Como funciona
          </p>
          <h2
            id="como-funciona-title"
            className="mt-4 max-w-150 text-[30px] leading-[1.12] font-medium tracking-[-0.02em] text-fg md:mt-5 md:text-[40px] lg:mt-6 lg:max-w-180 lg:text-[46px] lg:tracking-[-0.03em]"
          >
            Tudo o que você precisa para cuidar das suas finanças.
          </h2>
        </Reveal>

        <Reveal
          when={inView}
          timing={HOW_IT_WORKS_ENTRANCE.description}
          className="mt-4 md:mt-5 lg:mt-4.5"
        >
          <p className="max-w-120 text-[15px] leading-[1.55] text-fg-muted md:text-[17px] lg:max-w-125">
            Três passos para transformar informações financeiras em decisões mais conscientes.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-9 md:mt-12 lg:mt-18">
        {/* Static glow behind the cards: 312/614/1000 px wide, offset from the track top as in Figma. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-40px] left-[calc(50%-156px)] -z-10 h-65 w-78 rounded-full bg-accent/7 blur-[80px] md:left-[calc(50%-307px)] md:w-[614px] lg:top-[-79px] lg:left-[calc(50%-500px)] lg:h-80 lg:w-250 lg:blur-[90px]"
        />
        <Reveal when={inView} timing={HOW_IT_WORKS_ENTRANCE.cards}>
          <PillarCarousel pillars={PILLARS} />
        </Reveal>
      </div>
    </section>
  )
}
