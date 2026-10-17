import type { ReactNode } from 'react'
import arrowUpRight from '../../../../assets/landing/arrow-up-right.svg'
import { FILTER_ICONS } from '../../dashboard-preview/assets'
import {
  CHART_GRANULARITIES,
  RECENT_TRANSACTIONS,
  TRANSACTION_FILTERS,
} from '../../dashboard-preview/dashboardHomeData'
import {
  ClearFiltersButton,
  FilterDropdown,
  FilterSearch,
  FilterType,
} from '../../dashboard-preview/filters'
import {
  CardStack,
  CategoryDonut,
  ChartRangeDropdown,
  EvolutionPanel,
  FinancialOverview,
  PeriodSelector,
  Segmented,
  TransactionRow,
} from '../../dashboard-preview/panels'
import { FEATURE_HIGHLIGHT, FEATURES, type Feature } from '../../featuredFeatures'

/*
 * Section 04 mosaic cards (Figma: "Card 01" … "Card 07"). Every product
 * visual is the real FinCore app UI rendered at its native 1440 px size and
 * scaled down with a transform, as approved in the design refinement.
 * Measurements are in Figma px of the 1200 px desktop mosaic.
 */

const cardShell =
  'hairline-gradient relative isolate h-full overflow-hidden rounded-3xl before:z-10'
const cardSurface =
  'bg-bg-secondary bg-[linear-gradient(to_bottom,rgb(245_247_251/0.035),rgb(245_247_251/0)_60%)]'

/** Static radial glow — replaces Figma's blurred ellipses without a blur filter. */
function Glow({ className, opacity }: { className: string; opacity: number }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        background: `radial-gradient(closest-side, rgb(124 92 255 / ${opacity}), rgb(124 92 255 / ${opacity * 0.45}) 55%, transparent)`,
      }}
    />
  )
}

/**
 * Lays out native-size UI at `scale`, reserving the scaled footprint so the
 * surrounding layout sees the preview's real on-screen size.
 */
function Scaled({
  width,
  height,
  scale,
  className = '',
  children,
}: {
  width: number
  height: number
  scale: number
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: width * scale, height: height * scale }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}

function ArrowButton({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 flex size-12 items-center justify-center rounded-full border border-fg/55 bg-fg/4 ${className}`}
    >
      <img src={arrowUpRight} alt="" width={18} height={18} draggable={false} className="block size-4.5" />
    </span>
  )
}

/* ------------------------------------------------------------ Card shells */

interface VisualCardProps {
  feature: Feature
  /** Bottom gradient that keeps the overlaid copy readable. */
  scrim: string
  large?: boolean
  surfaceClass?: string
  /** Inner width of the copy block (Figma "Content" frame). */
  copyWidth: number
  children: ReactNode
}

/** Image-style card: the visual fills the card, copy and arrow sit on a scrim. */
function VisualCard({ feature, scrim, large = false, surfaceClass = cardSurface, copyWidth, children }: VisualCardProps) {
  const inset = large ? 'bottom-7 left-7' : 'bottom-6 left-6'
  return (
    <article className={`${cardShell} ${surfaceClass}`}>
      <div aria-hidden="true" className="absolute inset-0">
        {children}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: scrim }} />
      <div
        className={`absolute z-10 flex max-w-[calc(100%-7rem)] flex-col gap-1.5 ${inset}`}
        style={{ width: copyWidth }}
      >
        <h3
          className={`leading-[1.2] font-medium text-fg ${
            large ? 'text-[26px] tracking-[-0.02em]' : 'text-[22px] tracking-[-0.02em]'
          }`}
        >
          {feature.title}
        </h3>
        <p className={`leading-[1.5] text-fg/72 ${large ? 'text-[15px]' : 'text-sm'}`}>{feature.description}</p>
      </div>
      <ArrowButton className={large ? 'right-7 bottom-7' : 'right-6 bottom-6'} />
    </article>
  )
}

/** Product-style card: framed app preview, then copy and outlined tags. */
function ProductCard({ feature, panelClass, children }: { feature: Feature; panelClass: string; children: ReactNode }) {
  return (
    <article className={`${cardShell} ${cardSurface} flex flex-col gap-4.5 p-[21px]`}>
      <div
        aria-hidden="true"
        className={`flex min-h-0 flex-1 flex-col justify-center overflow-hidden rounded-2xl border border-border bg-bg ${panelClass}`}
      >
        {children}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg leading-[1.2] font-medium tracking-[-0.01em] text-fg">{feature.title}</h3>
        <p className="text-sm leading-[1.5] text-fg-muted">{feature.description}</p>
      </div>
      {feature.tags && (
        <ul className="flex flex-wrap gap-2" aria-label={`Recursos de ${feature.title.toLowerCase()}`}>
          {feature.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[#34344e] px-3 py-1.5 font-mono text-[11px] leading-4 tracking-[0.02em] text-fg-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

/* ------------------------------------------------------------------ Cards */

/** Card 01 — Cartões: "Card stack (selecionável)" (Figma 43:157) at 100%. */
export function CardsFeatureCard() {
  return (
    <VisualCard
      feature={FEATURES.cartoes}
      surfaceClass="bg-[#0d0c14]"
      copyWidth={250}
      scrim="linear-gradient(to bottom, rgb(10 10 15 / 0) 28%, rgb(10 10 15 / 0.86) 66%, rgb(10 10 15 / 0.98))"
    >
      <Glow className="top-[-20px] left-1/2 h-[320px] w-[420px] -translate-x-1/2" opacity={0.28} />
      <div className="absolute top-2 left-1/2 -translate-x-1/2">
        <CardStack />
      </div>
    </VisualCard>
  )
}

const COMPACT_ROWS = RECENT_TRANSACTIONS.slice(0, 4)

/** Card 02 — Movimentações: first 4 "Movimentações recentes" rows (Figma 46:247) at 50%. */
export function TransactionsFeatureCard() {
  return (
    <ProductCard feature={FEATURES.movimentacoes} panelClass="items-center px-3.5 py-2.5">
      <Scaled width={424} height={240} scale={0.5}>
        {COMPACT_ROWS.map((transaction, i) => (
          <TransactionRow
            key={transaction.id}
            transaction={transaction}
            divider={i < COMPACT_ROWS.length - 1}
            compact
          />
        ))}
      </Scaled>
    </ProductCard>
  )
}

/** Card 03 — typographic highlight. */
export function HighlightCard() {
  return (
    <div className="relative isolate flex h-full flex-col items-center justify-center gap-2.5 overflow-hidden rounded-3xl border border-white/14 bg-[linear-gradient(135deg,#8f74ff_0%,#5a3fd6_45%,#1a1430_100%)] p-5 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-90px] left-[-80px] -z-10 h-[210px] w-[250px] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.16),transparent)]"
      />
      <p className="text-[22px] leading-[1.12] font-medium tracking-[-0.02em] text-fg">
        {FEATURE_HIGHLIGHT.lines[0]}
        <br />
        {FEATURE_HIGHLIGHT.lines[1]}
      </p>
      <p className="font-mono text-[8.5px] leading-[1.3] tracking-[0.08em] text-white/70 uppercase">
        {FEATURE_HIGHLIGHT.caption}
      </p>
    </div>
  )
}

/** Card 04 — Categorias: "Donut + center" (Figma 43:231) at 80%, bleeding past the right edge. */
export function CategoriesFeatureCard() {
  return (
    <VisualCard
      feature={FEATURES.categorias}
      copyWidth={170}
      scrim="linear-gradient(to bottom, rgb(10 10 15 / 0) 50%, rgb(10 10 15 / 0.94))"
    >
      <Glow className="top-[-25px] right-[-43px] h-[220px] w-[250px]" opacity={0.22} />
      <Scaled width={184} height={184} scale={0.8} className="absolute! top-3.5 right-[3.4px]">
        <CategoryDonut />
      </Scaled>
    </VisualCard>
  )
}

/** Card 05 — Filtros: "Filters toolbar" controls of App — Movimentações (Figma 53:524) at 62%. */
export function FiltersFeatureCard() {
  return (
    <ProductCard feature={FEATURES.filtros} panelClass="items-start p-3.5">
      <Scaled width={475} height={128} scale={0.62}>
        <div className="flex flex-col gap-2.5">
          <div className="flex">
            <FilterSearch width={342} />
          </div>
          <div className="flex items-center gap-2">
            <FilterDropdown icon={FILTER_ICONS.calendar} label={TRANSACTION_FILTERS.period} />
            <FilterType />
          </div>
          <div className="flex items-center gap-2">
            <FilterDropdown icon={FILTER_ICONS.tag} label={TRANSACTION_FILTERS.category} />
            <FilterDropdown icon={FILTER_ICONS.check} label={TRANSACTION_FILTERS.status} />
            <ClearFiltersButton />
          </div>
        </div>
      </Scaled>
    </ProductCard>
  )
}

/** Card 06 — Visão financeira: "Column — Main" (Figma 41:171) at 60%, cropped by the card. */
export function OverviewFeatureCard() {
  return (
    <VisualCard
      feature={FEATURES['visao-financeira']}
      large
      copyWidth={300}
      scrim="linear-gradient(to bottom, rgb(10 10 15 / 0) 40%, rgb(10 10 15 / 0.96) 95%)"
    >
      <Glow className="top-0 left-2.5 h-[380px] w-[640px]" opacity={0.2} />
      <Scaled width={928} height={556} scale={0.6} className="absolute! top-7 left-8">
        <div className="flex flex-col gap-4">
          <FinancialOverview />
          <EvolutionPanel />
        </div>
      </Scaled>
    </VisualCard>
  )
}

/** Card 07 — Períodos: granularity segmented, period selector and chart range (Figma 44:205, 41:150, 44:214) at 86%. */
export function PeriodsFeatureCard() {
  return (
    <ProductCard feature={FEATURES.periodos} panelClass="items-center px-3.5 py-3">
      <Scaled width={241} height={140} scale={0.86}>
        <div className="flex flex-col items-center gap-3">
          <Segmented items={[...CHART_GRANULARITIES]} active="Mensal" />
          <PeriodSelector />
          <ChartRangeDropdown />
        </div>
      </Scaled>
    </ProductCard>
  )
}

