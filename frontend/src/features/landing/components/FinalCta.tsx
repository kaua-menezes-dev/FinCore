import { useInView } from 'motion/react'
import { useRef } from 'react'
import spotlight from '../../../assets/landing/cta-spotlight.svg'
import { Reveal } from '../../../shared/motion/Reveal'
import { FINAL_CTA_REVEAL as REVEAL } from '../../../shared/motion/timing'
import { FINAL_CTA } from '../finalCta'
import { SeamLighting } from './SeamLighting'

/**
 * Section 07 — final CTA. A centred invitation under a soft violet
 * spotlight that grows out of the FAQ's lower-right bloom (Figma:
 * "Seam Bridge · S06→S07"). All lighting is static.
 *
 * The 1440 × 820 desktop stage scales to 0.8 / 0.6 on tablet / mobile,
 * like Section 06, so the beam keeps its proportions and the seam lines up.
 */
export function FinalCta() {
  const contentRef = useRef<HTMLDivElement>(null)
  const inView = useInView(contentRef, { once: true, margin: REVEAL.viewportMargin })
  const timing = (step: number) => ({ ...REVEAL.item, delay: step * REVEAL.stagger })

  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative isolate flex min-h-123 items-center justify-center overflow-clip px-6 py-20 md:min-h-164 md:px-10 lg:min-h-205"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Bloom tail + seam bridge, continued from the FAQ above. */}
        <SeamLighting section="final-cta" />

        {/* Ambient halo, spotlight beam and floor (Figma: "Background / Spotlight · State A"). */}
        <img
          src={spotlight}
          alt=""
          width={1440}
          height={820}
          decoding="async"
          draggable={false}
          className="absolute top-0 left-1/2 h-[820px] w-[1440px] max-w-none origin-top -translate-x-1/2 scale-[0.6] select-none md:scale-[0.8] lg:scale-100"
        />
      </div>

      <div ref={contentRef} className="flex max-w-190 flex-col items-center text-center">
        <Reveal when={inView} timing={timing(0)}>
          <h2
            id="final-cta-title"
            className="text-[32px] leading-[1.12] font-medium tracking-[-0.02em] text-balance text-fg md:text-[44px] md:leading-[1.08] md:tracking-[-0.03em] lg:text-[56px]"
          >
            {FINAL_CTA.titleLines[0]}
            <br className="hidden md:block" /> {FINAL_CTA.titleLines[1]}
          </h2>
        </Reveal>

        <Reveal when={inView} timing={timing(1)} className="mt-4 md:mt-5">
          <p className="text-[15px] leading-[1.55] text-fg-muted md:text-[17px]">{FINAL_CTA.description}</p>
        </Reveal>

        <Reveal when={inView} timing={timing(2)} className="mt-8 md:mt-9">
          <a
            href={FINAL_CTA.action.href}
            className="inline-flex h-12.5 items-center gap-2.5 rounded-full bg-accent pr-5.5 pl-6.5 text-[15px] font-semibold text-white shadow-[0_8px_32px_-6px_rgb(124_92_255/0.45)] ring-1 ring-white/16 transition-colors ring-inset hover:bg-accent-hover"
          >
            {FINAL_CTA.action.label}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 12l4-4-4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
