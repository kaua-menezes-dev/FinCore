import { motion, type MotionValue } from 'motion/react'
import { Logo } from '../../../shared/components/Logo'
import { ICONS } from './assets'
import { DASHBOARD_SIZE, type DashboardTarget } from './canvas'
import { DASHBOARD_PERIOD, DASHBOARD_USER } from './dashboardHomeData'
import {
  CardsPanel,
  CategoriesPanel,
  EvolutionPanel,
  FinancialOverview,
  TransactionsPanel,
} from './panels'

interface DashboardHomeProps {
  /** Opacity of each revealable component. Omitted targets stay fully visible. */
  reveal?: Partial<Record<DashboardTarget, MotionValue<number>>>
  /** Row of "Movimentações recentes" that `reveal.transaction` controls. */
  transactionId?: string
}

const NAV_ITEMS = ['Visão geral', 'Movimentações', 'Cartões', 'Categorias'] as const

function TopBar() {
  return (
    <div className="absolute top-5 left-12 flex h-14 w-336 items-center justify-between">
      <Logo />
      <nav aria-hidden="true" className="flex gap-0.5 rounded-full border border-border bg-bg-secondary p-1">
        {NAV_ITEMS.map((item, i) => (
          <span
            key={item}
            className={`flex h-9 items-center px-4 text-sm leading-5 font-medium whitespace-nowrap ${
              i === 0 ? 'rounded-full border border-accent/35 bg-accent/16 text-fg' : 'text-fg-muted'
            }`}
          >
            {item}
          </span>
        ))}
      </nav>
      <div className="flex items-center gap-2.5 rounded-full border border-border bg-bg-secondary py-1 pr-3.5 pl-1">
        <span className="flex size-9 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#9277ff_0%,#3b24a6_71.43%)] text-xs leading-4 font-semibold text-fg">
          {DASHBOARD_USER.initials}
        </span>
        <div className="flex flex-col whitespace-nowrap">
          <p className="text-sm leading-5 font-medium text-fg">{DASHBOARD_USER.name}</p>
          <p className="text-xs leading-4 text-fg-faint">Perfil e configurações</p>
        </div>
        <img src={ICONS.chevronDown16} alt="" width={16} height={16} className="block size-4" />
      </div>
    </div>
  )
}

function PageHeader() {
  return (
    <div className="absolute top-26 left-12 flex h-15.5 w-336 items-end justify-between">
      <div className="flex flex-col gap-1.5 whitespace-nowrap">
        <p className="text-[28px] leading-9 font-semibold tracking-[-0.02em] text-fg">
          Olá, {DASHBOARD_USER.firstName}
        </p>
        <p className="text-sm leading-5 text-fg-muted">{DASHBOARD_PERIOD.summary}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-full border border-border bg-bg-secondary p-1">
          <span className="flex size-8 items-center justify-center rounded-2xl bg-surface-inset">
            <img src={ICONS.chevronLeft16} alt="" width={16} height={16} className="block size-4" />
          </span>
          <span className="flex items-center gap-2 px-2.5 text-sm leading-5 font-medium whitespace-nowrap text-fg">
            <img src={ICONS.calendar16} alt="" width={16} height={16} className="block size-4" />
            {DASHBOARD_PERIOD.label}
          </span>
          <span className="flex size-8 items-center justify-center rounded-2xl bg-surface-inset">
            <img src={ICONS.chevronRight16} alt="" width={16} height={16} className="block size-4" />
          </span>
        </div>
        <span className="flex h-10 items-center gap-2 rounded-full border border-white/14 bg-accent pr-4.5 pl-4 text-sm leading-5 font-medium whitespace-nowrap text-fg">
          <img src={ICONS.plusPrimary} alt="" width={16} height={16} className="block size-4" />
          Nova movimentação
        </span>
      </div>
    </div>
  )
}

/**
 * Static, non-interactive replica of the FinCore Dashboard Home at its
 * native 1440 × 1306 size. Scale it with a CSS transform to fit a preview.
 */
export function DashboardHome({ reveal, transactionId = 'supermercado' }: DashboardHomeProps) {
  return (
    <div
      className="relative overflow-hidden bg-bg font-sans"
      style={{ width: DASHBOARD_SIZE.width, height: DASHBOARD_SIZE.height }}
    >
      <img
        src={ICONS.ambientLight}
        alt=""
        width={1100}
        height={420}
        className="pointer-events-none absolute top-[-300px] left-[170px] block max-w-none"
      />
      <TopBar />
      <PageHeader />

      <div className="absolute top-[194px] left-12 flex w-336 gap-4">
        <div className="flex w-100 flex-col gap-4">
          <CardsPanel />
          <motion.div data-dashboard-target="categories" style={{ opacity: reveal?.categories }}>
            <CategoriesPanel />
          </motion.div>
        </div>
        <div className="flex w-232 flex-col gap-4">
          <FinancialOverview resultOpacity={reveal?.result} />
          <EvolutionPanel />
          <TransactionsPanel highlightId={transactionId} highlightOpacity={reveal?.transaction} />
        </div>
      </div>
    </div>
  )
}
