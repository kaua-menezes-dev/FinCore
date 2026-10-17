import {
  cubicBezier,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../../../shared/hooks/useMediaQuery'
import { MEET_FINCORE_SCROLL as SCROLL } from '../../../shared/motion/timing'
import { usePrefersReducedMotion } from '../../../shared/motion/usePrefersReducedMotion'
import type { DashboardTarget } from '../dashboard-preview/canvas'
import { DashboardHome } from '../dashboard-preview/DashboardHome'
import { RECENT_TRANSACTIONS } from '../dashboard-preview/dashboardHomeData'
import { CategoriesPanel, PeriodResultCard, TransactionRow } from '../dashboard-preview/panels'
import { MEET_FINCORE_STEPS, REVEALED_TRANSACTION_ID, type MeetFincoreStep } from '../meetFincore'
import { FloatingPopup } from './meet-fincore/FloatingPopup'
import { activeStepAt, destinationOpacityAt, type StageGeometry, type StageLayout } from './meet-fincore/timeline'
import { useStageGeometry } from './meet-fincore/useStageGeometry'

const STEP_EASE = `cubic-bezier(${SCROLL.ease.join(',')})`
const entranceEase = cubicBezier(...SCROLL.ease)
const revealedTransaction = RECENT_TRANSACTIONS.find((t) => t.id === REVEALED_TRANSACTION_ID)!

/** Transaction pop-up is skipped on mobile; the row fades in place instead (approved). */
const usesPopup = (target: DashboardTarget, layout: StageLayout) =>
  !(target === 'transaction' && layout === 'mobile')

/**
 * Section 03 — "Conheça o FinCore". The real Dashboard Home descends into
 * place, then three floating copies of its components dock into the
 * dashboard one at a time, scrubbed by scroll while the section is pinned.
 */
export function MeetFincore() {
  const isTablet = useMediaQuery('(min-width: 48rem)')
  const isDesktop = useMediaQuery('(min-width: 70rem)')
  const layout: StageLayout = isDesktop ? 'desktop' : isTablet ? 'tablet' : 'mobile'
  const reduceMotion = usePrefersReducedMotion()

  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const showcaseRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const { geometry, fitsViewport } = useStageGeometry(layout, {
    content: contentRef,
    showcase: showcaseRef,
    frame: frameRef,
    canvas: canvasRef,
  })

  // Pinned storyboard only when there is room for it and motion is welcome.
  const pinned = fitsViewport && !reduceMotion
  const pinDistance = SCROLL.pinDistanceVh[layout === 'desktop' ? 'desktop' : 'compact']

  const { scrollYProgress: pinProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const { scrollYProgress: pinnedEntrance } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.15'],
  })
  const { scrollYProgress: flowEntrance } = useScroll({
    target: showcaseRef,
    offset: ['start end', 'start 0.6'],
  })
  const { scrollYProgress: flowProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.5', 'end 0.5'],
  })

  // Mode flags as motion values, so bound styles update when the mode changes.
  const pinnedFlag = useMotionValue(0)
  const motionFlag = useMotionValue(1)
  useLayoutEffect(() => {
    pinnedFlag.set(pinned ? 1 : 0)
    motionFlag.set(reduceMotion ? 0 : 1)
  }, [pinned, reduceMotion, pinnedFlag, motionFlag])

  const entrance = useEntrance(pinnedEntrance, flowEntrance, pinnedFlag, motionFlag, geometry)
  const reveal = useDestinationReveal(pinProgress, geometry, pinnedFlag)
  const activeStep = useActiveStep(pinProgress, flowProgress, pinned)

  return (
    <section
      ref={sectionRef}
      id="conheca-o-fincore"
      aria-labelledby="conheca-o-fincore-title"
      className="relative overflow-x-clip"
      style={pinned ? { height: `calc(100svh + ${pinDistance}vh)` } : undefined}
    >
      <div
        className={
          pinned
            ? 'sticky top-0 flex h-svh items-center'
            : 'flex items-center py-18 md:py-24 lg:min-h-[960px]'
        }
      >
        {/* Soft left light — static (Figma: "Left soft light"). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-[-160px] -z-10 hidden h-[480px] w-[620px] -translate-y-1/4 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.025),transparent)] lg:block"
        />

        <div
          ref={contentRef}
          className="mx-auto w-full max-w-320 px-6 md:px-10 lg:grid lg:grid-cols-[400px_minmax(0,736px)] lg:items-center lg:justify-between lg:gap-16"
        >
          <div className="lg:pl-8">
            <h2
              id="conheca-o-fincore-title"
              className="flex items-center gap-2.5 font-mono text-xs leading-4 font-medium tracking-[0.1em] text-fg-muted uppercase"
            >
              <span aria-hidden="true" className="size-1.5 rounded-[1px] bg-accent" />
              Conheça o FinCore
            </h2>
            {layout === 'desktop' ? (
              <StepList steps={MEET_FINCORE_STEPS} active={activeStep} />
            ) : (
              <StepStack steps={MEET_FINCORE_STEPS} active={activeStep} />
            )}
          </div>

          <motion.div
            className="relative mt-6.5 w-full md:mt-7 lg:mt-0 lg:max-w-[min(736px,calc((100svh-6rem)*736/672))] lg:justify-self-end"
            style={entrance}
          >
            <ShowcaseGlow />
            <div
              ref={showcaseRef}
              className="hairline-gradient relative rounded-[14px] bg-bg-secondary bg-[linear-gradient(to_bottom,rgb(245_247_251/0.035),rgb(245_247_251/0)_60%)] p-2 shadow-[0_24px_80px_rgb(124_92_255/0.12)] md:rounded-[20px] md:p-4 lg:rounded-3xl lg:p-[3.2609%]"
            >
              <figure
                ref={frameRef}
                aria-label="Prévia do dashboard do FinCore com dados fictícios de demonstração"
                className="relative aspect-[1440/1306] overflow-hidden rounded-md md:rounded-lg lg:rounded-xl"
              >
                <div
                  ref={canvasRef}
                  className="absolute top-0 left-0 origin-top-left"
                  style={{ transform: 'scale(var(--dashboard-scale, 0))' }}
                >
                  <DashboardHome reveal={reveal} transactionId={REVEALED_TRANSACTION_ID} />
                </div>
              </figure>

              {pinned && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  {layout !== 'mobile' && (
                    <FloatingPopup target="transaction" index={0} progress={pinProgress} geometry={geometry} framed>
                      <TransactionRow transaction={revealedTransaction} divider={false} />
                    </FloatingPopup>
                  )}
                  <FloatingPopup target="categories" index={1} progress={pinProgress} geometry={geometry}>
                    <CategoriesPanel />
                  </FloatingPopup>
                  <FloatingPopup target="result" index={2} progress={pinProgress} geometry={geometry}>
                    <PeriodResultCard />
                  </FloatingPopup>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/** Dashboard descends from above and fades in, scrubbed by scroll. */
function useEntrance(
  pinnedProgress: MotionValue<number>,
  flowProgress: MotionValue<number>,
  pinnedFlag: MotionValue<number>,
  motionFlag: MotionValue<number>,
  geometry: MotionValue<StageGeometry>,
) {
  const eased = () => {
    if (!motionFlag.get()) return 1
    return entranceEase((pinnedFlag.get() ? pinnedProgress : flowProgress).get())
  }
  const y = useTransform(() => {
    const offset = SCROLL.entranceOffset[geometry.get().layout === 'desktop' ? 'desktop' : 'compact']
    return -offset * (1 - eased())
  })
  const opacity = useTransform(eased)
  return { y, opacity }
}

/** Destination components stay hidden until their pop-up docks (pinned mode only). */
function useDestinationReveal(
  progress: MotionValue<number>,
  geometry: MotionValue<StageGeometry>,
  pinnedFlag: MotionValue<number>,
) {
  const opacityFor = (target: DashboardTarget, index: number) => () =>
    pinnedFlag.get()
      ? destinationOpacityAt(index, progress.get(), usesPopup(target, geometry.get().layout))
      : 1

  return {
    transaction: useTransform(opacityFor('transaction', 0)),
    categories: useTransform(opacityFor('categories', 1)),
    result: useTransform(opacityFor('result', 2)),
  }
}

/**
 * Highlighted step for the pinned and flow timelines; re-renders only when
 * the step changes.
 */
function useActiveStep(
  pinProgress: MotionValue<number>,
  flowProgress: MotionValue<number>,
  pinned: boolean,
) {
  const count = MEET_FINCORE_STEPS.length
  const pinnedStep = (value: number) => activeStepAt(value, count)
  const flowStep = (value: number) => Math.min(count - 1, Math.max(0, Math.floor(value * count)))

  const [pinnedActive, setPinnedActive] = useState(() => pinnedStep(pinProgress.get()))
  const [flowActive, setFlowActive] = useState(() => flowStep(flowProgress.get()))
  useMotionValueEvent(pinProgress, 'change', (value) => setPinnedActive(pinnedStep(value)))
  useMotionValueEvent(flowProgress, 'change', (value) => setFlowActive(flowStep(value)))

  return pinned ? pinnedActive : flowActive
}

/* ------------------------------------------------------------------ Steps */

const stepTransition = {
  transitionDuration: `${SCROLL.stepTransitionMs}ms`,
  transitionTimingFunction: STEP_EASE,
}

interface StepsProps {
  steps: MeetFincoreStep[]
  active: number
}

/** Desktop: all three blocks, the active one emphasized, with a progress rail. */
function StepList({ steps, active }: StepsProps) {
  const listRef = useRef<HTMLOListElement>(null)
  const [indicator, setIndicator] = useState({ top: 0, height: 0 })

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const block = list.querySelectorAll<HTMLElement>('[data-step]')[active]
      if (block) setIndicator({ top: block.offsetTop + 30, height: block.offsetHeight - 60 })
    }
    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(list)
    return () => resizeObserver.disconnect()
  }, [active])

  return (
    <div className="relative mt-6 -ml-8 pl-8">
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-border" />
      <span
        aria-hidden="true"
        className="absolute top-0 left-[-1px] w-[3px] rounded-[2px] bg-accent transition-[transform,height] motion-reduce:transition-none"
        style={{ ...stepTransition, height: indicator.height, transform: `translateY(${indicator.top}px)` }}
      />
      <ol ref={listRef}>
        {steps.map((step, i) => (
          <li
            key={step.step}
            data-step
            aria-current={i === active ? 'step' : undefined}
            className={`flex max-w-92 flex-col gap-3 py-[30px] transition-opacity motion-reduce:transition-none ${
              i > 0 ? 'border-t border-border' : ''
            } ${i === active ? 'opacity-100' : 'opacity-32'}`}
            style={stepTransition}
          >
            <StepContent step={step} active={i === active} />
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Tablet / mobile: only the active block, plus the segmented step indicator. */
function StepStack({ steps, active }: StepsProps) {
  return (
    <>
      <ol className="mt-8 grid">
        {steps.map((step, i) => (
          <li
            key={step.step}
            aria-current={i === active ? 'step' : undefined}
            className={`col-start-1 row-start-1 flex flex-col gap-3 transition-opacity motion-reduce:transition-none ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
            // Stacked blocks swap in sequence (out, then in) so the headings never overlap.
            style={{
              transitionTimingFunction: STEP_EASE,
              transitionDuration: i === active ? '450ms' : '250ms',
              transitionDelay: i === active ? '250ms' : '0ms',
            }}
          >
            <StepContent step={step} active={i === active} />
          </li>
        ))}
      </ol>
      <div aria-hidden="true" className="mt-4.5 flex items-center gap-1.5 md:mt-5">
        {steps.map((step, i) => (
          <span
            key={step.step}
            className={`h-1 rounded-xs transition-[width,background-color] duration-250 ease-out motion-reduce:transition-none ${
              i === active ? 'w-6 bg-accent' : 'w-2 bg-fg-muted/30'
            }`}
          />
        ))}
      </div>
    </>
  )
}

function StepContent({ step, active }: { step: MeetFincoreStep; active: boolean }) {
  return (
    <>
      <span
        className={`font-mono text-[13px] leading-[17px] tracking-[0.04em] transition-colors motion-reduce:transition-none ${
          active ? 'text-accent' : 'text-fg-muted'
        }`}
        style={stepTransition}
      >
        {step.step}
      </span>
      <h3 className="text-[26px] leading-[1.15] font-medium tracking-[-0.03em] text-fg md:text-[30px]">
        {step.title}
      </h3>
      <p className="max-w-85 text-base leading-[1.55] text-fg-muted md:max-w-none lg:max-w-85">
        {step.description}
      </p>
    </>
  )
}

/* ------------------------------------------------------------------- Glow */

/**
 * Static violet light behind the showcase (Figma: "Dashboard ambient glow" +
 * "Dashboard glow core"). Radial gradients instead of blur filters, so it
 * costs nothing while the section scrolls or pins.
 */
function ShowcaseGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute top-[-5%] left-[-30%] h-[130%] w-[160%] rounded-full bg-[radial-gradient(closest-side,rgb(124_92_255/0.13),rgb(124_92_255/0.06)_55%,transparent)] lg:top-[-24%] lg:left-[-30%] lg:h-[149%] lg:w-[177%]" />
      <div className="absolute top-[50%] left-[5%] hidden h-[68%] w-[109%] rounded-full bg-[radial-gradient(closest-side,rgb(124_92_255/0.12),transparent)] lg:block" />
    </div>
  )
}
