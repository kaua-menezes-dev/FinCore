import { useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { useMediaQuery } from '../../../shared/hooks/useMediaQuery'
import { Reveal } from '../../../shared/motion/Reveal'
import { FEATURED_FEATURES_REVEAL as REVEAL } from '../../../shared/motion/timing'
import { FEATURED_FEATURES_HEADER as HEADER } from '../featuredFeatures'
import {
  CardsFeatureCard,
  CategoriesFeatureCard,
  FiltersFeatureCard,
  HighlightCard,
  OverviewFeatureCard,
  PeriodsFeatureCard,
  TransactionsFeatureCard,
} from './featured-features/FeatureCards'

const DESKTOP_QUERY = '(min-width: 70rem)'

/**
 * Grid placement per card. Desktop (≥ 1120 px) reproduces the Figma mosaic
 * on 12 × 78 px columns: row 01 bottom-aligned with staggered heights,
 * row 02 top-aligned. Tablet uses two columns of equal-height pairs with
 * "Visão financeira" as a full-width closing card; mobile stacks the cards
 * in reading order.
 */
const CARDS: { id: string; className: string; render: () => ReactNode }[] = [
  { id: 'cartoes', className: 'h-70 md:h-86 lg:col-span-4 lg:h-70 lg:self-end', render: CardsFeatureCard },
  { id: 'movimentacoes', className: 'h-86 lg:col-span-3 lg:self-end', render: TransactionsFeatureCard },
  { id: 'destaque', className: 'h-45 md:h-62 lg:col-span-2 lg:h-45 lg:self-end', render: HighlightCard },
  { id: 'categorias', className: 'h-62 lg:col-span-3 lg:self-end', render: CategoriesFeatureCard },
  { id: 'filtros', className: 'h-85 lg:col-span-3 lg:self-start', render: FiltersFeatureCard },
  {
    id: 'visao-financeira',
    className: 'h-85 md:order-last md:col-span-2 lg:order-none lg:col-span-6 lg:self-start',
    render: OverviewFeatureCard,
  },
  { id: 'periodos', className: 'h-85 lg:col-span-3 lg:self-start', render: PeriodsFeatureCard },
]

/**
 * One mosaic card's entrance. On desktop the whole mosaic starts together
 * and the cards follow 70 ms apart; on smaller screens each card reveals
 * as it reaches the viewport, so none waits off-screen.
 */
function CardReveal({
  index,
  mosaicInView,
  isDesktop,
  className,
  children,
}: {
  index: number
  mosaicInView: boolean
  isDesktop: boolean
  className: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: REVEAL.viewportMargin })
  const timing = isDesktop ? { ...REVEAL.item, delay: index * REVEAL.cardStagger } : REVEAL.item

  return (
    <div ref={ref} className={className}>
      <Reveal when={isDesktop ? mosaicInView : inView} timing={timing} className="h-full">
        {children}
      </Reveal>
    </div>
  )
}

/**
 * Section 04 — "Recursos em destaque": a mosaic of FinCore features, each
 * illustrated with the real app UI. Reveals once, on entering the viewport.
 */
export function FeaturedFeatures() {
  const headerRef = useRef<HTMLDivElement>(null)
  const mosaicRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: REVEAL.viewportMargin })
  const mosaicInView = useInView(mosaicRef, { once: true, margin: REVEAL.viewportMargin })
  const isDesktop = useMediaQuery(DESKTOP_QUERY)

  const headerTiming = (step: number) => ({ ...REVEAL.item, delay: step * REVEAL.headerStagger })

  return (
    <section
      id="recursos"
      aria-labelledby="recursos-title"
      className="relative isolate overflow-x-clip pt-18 pb-24 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32"
    >
      <BackgroundLighting />

      <div ref={headerRef} className="mx-auto flex max-w-300 flex-col items-center px-6 text-center md:px-10">
        <Reveal when={headerInView} timing={headerTiming(0)}>
          <p className="flex items-center gap-2.5 font-mono text-xs leading-4 font-medium tracking-[0.1em] text-fg-muted uppercase">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            {HEADER.eyebrow}
          </p>
        </Reveal>
        <Reveal when={headerInView} timing={headerTiming(1)} className="mt-4 md:mt-5">
          <h2
            id="recursos-title"
            className="max-w-130 text-[30px] leading-[1.12] font-medium tracking-[-0.02em] text-fg md:text-[40px] lg:text-[46px] lg:tracking-[-0.03em]"
          >
            {HEADER.title}
          </h2>
        </Reveal>
        <Reveal when={headerInView} timing={headerTiming(2)} className="mt-4 md:mt-5">
          <p className="max-w-140 text-[15px] leading-[1.55] text-fg-muted md:text-[17px]">{HEADER.description}</p>
        </Reveal>
      </div>

      {/*
        Desktop: the 1200 px mosaic at its design size from 1280 px up, and
        uniformly scaled (1040 / 1200) between 1120 and 1279 px.
      */}
      <div className="mx-auto mt-9 max-w-320 px-6 md:mt-12 md:px-10 lg:mt-18 lg:flex lg:h-[613.6px] lg:items-start lg:justify-center xl:h-auto">
        <div
          ref={mosaicRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:w-300 lg:shrink-0 lg:origin-top lg:scale-[0.8667] lg:grid-cols-[repeat(12,78px)] lg:gap-6 xl:scale-100"
        >
          {CARDS.map(({ id, className, render: Card }, index) => (
            <CardReveal
              key={id}
              index={index}
              mosaicInView={mosaicInView}
              isDesktop={isDesktop}
              className={className}
            >
              <Card />
            </CardReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Static lighting (Figma: "Background / Lighting"): a carry-over glow from
 * Section 03 at the top and a soft violet field behind the mosaic. Radial
 * gradients instead of blur filters, so scrolling costs nothing.
 */
function BackgroundLighting() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute top-[-460px] left-[calc(50%-160px)] h-[820px] w-[1220px] rounded-full bg-[radial-gradient(closest-side,rgb(124_92_255/0.07),transparent)]" />
      <div className="absolute top-[300px] left-1/2 h-[1000px] w-[min(1340px,140%)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(124_92_255/0.09),rgb(124_92_255/0.035)_55%,transparent)]" />
      <div className="absolute top-[520px] left-[-380px] hidden h-[840px] w-[980px] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.02),transparent)] lg:block" />
    </div>
  )
}
