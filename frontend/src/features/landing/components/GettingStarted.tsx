import { useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { useMediaQuery } from '../../../shared/hooks/useMediaQuery'
import { Reveal } from '../../../shared/motion/Reveal'
import { GETTING_STARTED_REVEAL as REVEAL } from '../../../shared/motion/timing'
import { GETTING_STARTED_HEADER as HEADER, GETTING_STARTED_STEPS, type GettingStartedStep } from '../gettingStarted'

const DESKTOP_QUERY = '(min-width: 70rem)'

/**
 * Section 05 — "Como usar": the three onboarding steps. A calmer section
 * after the Section 04 mosaic; it reveals once, on entering the viewport.
 */
export function GettingStarted() {
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLOListElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: REVEAL.viewportMargin })
  const stepsInView = useInView(stepsRef, { once: true, margin: REVEAL.viewportMargin })
  const isDesktop = useMediaQuery(DESKTOP_QUERY)

  const headerTiming = (step: number) => ({ ...REVEAL.item, delay: step * REVEAL.headerStagger })

  return (
    <section
      id="como-usar"
      aria-labelledby="como-usar-title"
      className="relative isolate overflow-x-clip pt-18 pb-24 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32"
    >
      <BackgroundLighting />

      <div className="mx-auto max-w-300 px-6 md:px-10 xl:px-0">
        <div
          ref={headerRef}
          className="flex flex-col gap-4 md:gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <div>
            <Reveal when={headerInView} timing={headerTiming(0)}>
              <p className="flex items-center gap-2.5 font-mono text-xs leading-4 font-medium tracking-[0.1em] text-fg-muted uppercase">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                {HEADER.eyebrow}
              </p>
            </Reveal>
            <Reveal when={headerInView} timing={headerTiming(1)} className="mt-4 md:mt-5">
              <h2
                id="como-usar-title"
                className="max-w-140 text-[30px] leading-[1.12] font-medium tracking-[-0.02em] text-fg md:text-[40px] lg:text-[46px] lg:tracking-[-0.03em]"
              >
                {HEADER.title}
              </h2>
            </Reveal>
          </div>
          <Reveal when={headerInView} timing={headerTiming(2)} className="lg:shrink-0">
            <p className="max-w-140 text-[15px] leading-[1.55] text-fg-muted md:text-[17px] lg:w-105">
              {HEADER.description}
            </p>
          </Reveal>
        </div>

        <ol ref={stepsRef} className="mt-9 grid grid-cols-1 gap-4 md:mt-12 md:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {GETTING_STARTED_STEPS.map((step, index) => (
            <StepReveal key={step.number} index={index} stepsInView={stepsInView} isDesktop={isDesktop}>
              <StepCard step={step} />
            </StepReveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/**
 * One step's entrance. On desktop the row starts together and the cards
 * follow in order; on smaller screens each card reveals as it reaches the
 * viewport, so none waits off-screen.
 */
function StepReveal({
  index,
  stepsInView,
  isDesktop,
  children,
}: {
  index: number
  stepsInView: boolean
  isDesktop: boolean
  children: ReactNode
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: REVEAL.viewportMargin })
  const timing = isDesktop ? { ...REVEAL.item, delay: index * REVEAL.cardStagger } : REVEAL.item

  return (
    <li ref={ref}>
      <Reveal when={isDesktop ? stepsInView : inView} timing={timing} className="h-full">
        {children}
      </Reveal>
    </li>
  )
}

/**
 * Step card (Figma: "Step 0N"). Desktop: 296 px tall, number on top and
 * copy at the bottom. Tablet: number beside the copy. Mobile: stacked.
 */
function StepCard({ step }: { step: GettingStartedStep }) {
  return (
    <article className="hairline-gradient relative isolate flex h-full flex-col gap-8 overflow-hidden rounded-3xl bg-bg-secondary bg-[linear-gradient(to_bottom,rgb(245_247_251/0.035),transparent_60%)] px-6 pt-5 pb-6 md:flex-row md:items-end md:gap-10 md:px-8 md:pt-7 md:pb-8 lg:h-74 lg:flex-col lg:items-stretch lg:justify-between lg:gap-0">
      {/* Static lights (Figma: "Card light", "Edge highlight") as radial gradients instead of blurred ellipses. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 top-[-180px] left-[-160px] h-[410px] w-[480px] rounded-full"
        style={{
          backgroundImage: `radial-gradient(closest-side, rgb(124 92 255 / ${step.lightOpacity}), transparent)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 top-[-120px] left-[100px] h-60 w-90 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.025),transparent)]"
      />

      <span
        aria-hidden="true"
        className="relative w-fit bg-[linear-gradient(to_bottom,rgb(245_247_251/0.92),rgb(245_247_251/0.45)_55%,rgb(245_247_251/0.04))] bg-clip-text text-[88px] leading-none font-normal tracking-[-0.04em] text-transparent md:min-w-16 md:text-[96px] lg:text-[112px]"
      >
        {step.number}
      </span>

      <div className="relative flex flex-col gap-2.5">
        <h3 className="text-[19px] leading-[1.2] font-medium tracking-[-0.01em] text-fg md:text-xl">
          <span className="sr-only">Passo {step.number}: </span>
          {step.title}
        </h3>
        <p className="text-[15px] leading-normal text-fg-muted">{step.description}</p>
      </div>
    </article>
  )
}

/**
 * Static lighting (Figma: "Background / Lighting"): a faint glow centred
 * above the header, picking up Section 04's violet field, and a soft light
 * behind the right-hand cards. Radial gradients, no blur filters.
 */
function BackgroundLighting() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute top-[-140px] left-1/2 h-[760px] w-[min(1120px,140%)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(124_92_255/0.045),transparent)]" />
      <div className="absolute top-[180px] left-[calc(50%-160px)] hidden h-[760px] w-[1040px] rounded-full bg-[radial-gradient(closest-side,rgb(124_92_255/0.05),transparent)] lg:block" />
    </div>
  )
}
