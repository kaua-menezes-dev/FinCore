import { motion, type MotionValue } from 'motion/react'
import { CARD_ART, DONUT_SEGMENTS, ICONS, LEGEND_DOTS, TAG_DOTS, TRANSACTION_ICONS } from './assets'
import {
  CHART_GRANULARITIES,
  CURRENT_MONTH_TOOLTIP,
  EXPENSES_BY_CATEGORY,
  MONTHLY_TOTALS,
  PERIOD_RESULT,
  PERIOD_TOTALS,
  PLANNED_SUMMARY,
  RECENT_TRANSACTIONS,
  RECENT_TRANSACTIONS_SUMMARY,
  SELECTED_CARD,
  DASHBOARD_PERIOD,
  type Transaction,
} from './dashboardHomeData'

/*
 * Dashboard Home panels at their native 1440 px design size (Figma 41:118).
 * The landing page scales the whole canvas down, so measurements stay in
 * design pixels on purpose.
 */

export const panelClass =
  'overflow-hidden rounded-[20px] border border-border bg-surface p-6'

export function Icon({ src, size }: { src: string; size: number }) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      draggable={false}
      className="block shrink-0 select-none"
      style={{ width: size, height: size }}
    />
  )
}

function PanelTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-0.5 whitespace-nowrap">
      <p className="text-base leading-6 font-medium tracking-[-0.01em] text-fg">{title}</p>
      <p className="text-xs leading-4 text-fg-faint">{subtitle}</p>
    </div>
  )
}

export function Segmented({ items, active }: { items: string[]; active: string }) {
  return (
    <div className="flex gap-0.5 rounded-full border border-border bg-bg-secondary p-[3px]">
      {items.map((item) => (
        <span
          key={item}
          className={`flex h-7 w-15 items-center justify-center rounded-full text-xs leading-4 font-medium whitespace-nowrap ${
            item === active ? 'bg-border text-fg' : 'text-fg-faint'
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------- KPIs */

const valueClass = 'font-semibold whitespace-nowrap text-fg'

function DeltaChip({ value }: { value: string }) {
  return (
    <span className="rounded-md bg-income/14 px-1.5 py-0.5 text-xs leading-4 font-medium whitespace-nowrap text-income">
      {value}
    </span>
  )
}

function KpiHeader({ icon, chipClass, label }: { icon: string; chipClass: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`flex size-7 items-center justify-center rounded-[9px] ${chipClass}`}>
        <Icon src={icon} size={16} />
      </span>
      <p className="text-[13px] leading-[18px] whitespace-nowrap text-fg-muted">{label}</p>
    </div>
  )
}

/** Highlighted KPI — "Resultado do período" (Figma 41:177). */
export function PeriodResultCard() {
  return (
    <div className="flex h-43 w-70 shrink-0 flex-col justify-between overflow-hidden rounded-[20px] border border-accent/35 bg-[linear-gradient(155.26deg,#2a1f5c_7.14%,#161622_78.57%)] p-5">
      <KpiHeader icon={ICONS.kpiArrowUpRightAccent} chipClass="bg-accent/14" label={PERIOD_RESULT.label} />
      <div className="flex flex-col gap-2">
        <p className={`${valueClass} leading-10 tracking-[-0.03em]`}>
          <span className="text-lg text-fg-faint">R$ </span>
          <span className="text-[34px]">{PERIOD_RESULT.value}</span>
        </p>
        <div className="flex items-center gap-1.5">
          <DeltaChip value={PERIOD_RESULT.delta} />
          <span className="text-xs leading-4 text-fg-faint">{PERIOD_RESULT.comparison}</span>
        </div>
        <p className="text-xs leading-4 text-fg-muted">{PERIOD_RESULT.note}</p>
      </div>
    </div>
  )
}

const kpiCardClass =
  'flex h-43 min-w-px flex-1 flex-col justify-between overflow-hidden rounded-[20px] border border-border bg-surface p-5'

function FinancialOverview({ resultOpacity }: { resultOpacity?: MotionValue<number> }) {
  return (
    <div className="flex gap-4">
      <motion.div data-dashboard-target="result" style={{ opacity: resultOpacity }}>
        <PeriodResultCard />
      </motion.div>

      {PERIOD_TOTALS.map((kpi) => (
        <div key={kpi.id} className={kpiCardClass}>
          <KpiHeader
            icon={kpi.icon === 'income' ? ICONS.kpiArrowUpRightIncome : ICONS.kpiArrowDownLeft}
            chipClass={kpi.icon === 'income' ? 'bg-income/14' : 'bg-expense/14'}
            label={kpi.label}
          />
          <div className="flex flex-col gap-2">
            <p className={`${valueClass} leading-8 tracking-[-0.02em]`}>
              <span className="text-[15px] text-fg-faint">R$ </span>
              <span className="text-2xl">{kpi.value}</span>
            </p>
            <div className="flex items-center gap-1.5">
              <DeltaChip value={kpi.delta} />
              <span className="text-xs leading-4 text-fg-faint">vs. set.</span>
            </div>
            <p className="text-xs leading-4 whitespace-nowrap text-fg-faint">{kpi.planned}</p>
          </div>
        </div>
      ))}

      <div className={kpiCardClass}>
        <KpiHeader icon={ICONS.kpiClock} chipClass="bg-planned/14" label={PLANNED_SUMMARY.label} />
        <div className="flex flex-col gap-2">
          <p className={`${valueClass} leading-8 tracking-[-0.02em]`}>
            <span className="text-2xl">{PLANNED_SUMMARY.count}</span>
            <span className="text-[15px] text-fg-faint">{PLANNED_SUMMARY.unit}</span>
          </p>
          <div className="relative h-1.5 overflow-hidden rounded-[3px] bg-planned/25">
            <div
              className="absolute inset-y-0 left-0 rounded-[3px] bg-income"
              style={{ width: PLANNED_SUMMARY.progressWidth }}
            />
          </div>
          <p className="text-xs leading-4 whitespace-nowrap text-fg-faint">{PLANNED_SUMMARY.progress}</p>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------- Meus cartões */

/** "Card stack (selecionável)" (Figma 43:157), 350 × 240. */
export function CardStack() {
  return (
    <div className="relative h-60 w-[350px]">
      <div className="absolute top-0 left-[24.8px] h-[190.8px] w-[302.4px] overflow-hidden rounded-[20px] border-[0.9px] border-white/12 bg-[linear-gradient(147.75deg,#2a2a3a_6.67%,#0f0f16_73.33%)] opacity-85">
        {CARD_ART.contours.map((src, i) => {
          const size = 180 + i * 39.6
          return (
            <img
              key={src}
              src={src}
              alt=""
              draggable={false}
              className="absolute block max-w-none"
              style={{ left: 179.1 - i * 5.4, top: 53.1 - i * 3.6, width: size, height: size }}
            />
          )
        })}
      </div>

      <div className="absolute top-7 left-2 h-53 w-84 overflow-hidden rounded-[20px] border border-white/12 bg-[linear-gradient(147.75deg,#140d33_6.67%,#3b24a6_43.33%,#7c5cff_73.33%)] shadow-[0_16px_32px_-8px_rgb(0_0_0/0.45)]">
        <img src={CARD_ART.lightOrb} alt="" draggable={false} className="absolute top-[-151px] left-[149px] block size-75 max-w-none" />
        <img src={CARD_ART.ring} alt="" draggable={false} className="absolute top-[89px] left-[-171px] block size-80 max-w-none" />
        <img src={CARD_ART.ring2} alt="" draggable={false} className="absolute top-[119px] left-[-141px] block size-65 max-w-none" />
        <p className="absolute top-[17px] left-[21px] text-base leading-6 font-semibold tracking-[-0.01em] whitespace-nowrap text-fg">
          {SELECTED_CARD.bank}
        </p>
        <img src={CARD_ART.contactless} alt="" draggable={false} className="absolute top-[19px] left-[293px] block size-5" />
        <div className="absolute top-[77px] left-[21px] h-7 w-[38px] rounded-md bg-[linear-gradient(118.5deg,#ede8da_0%,#9c9684_71.43%)]" />
        <p className="absolute top-[135px] left-[21px] font-mono text-sm leading-[18px] tracking-[0.04em] whitespace-pre text-fg">
          {SELECTED_CARD.number}
        </p>
        <p className="absolute top-[175px] left-[21px] text-xs leading-4 font-medium whitespace-nowrap text-fg opacity-72">
          {SELECTED_CARD.name}
        </p>
      </div>
    </div>
  )
}

function CardsPanel() {
  return (
    <div className={`${panelClass} flex h-139 flex-col gap-5`}>
      <div className="flex items-center justify-between">
        <PanelTitle title="Meus cartões" subtitle={SELECTED_CARD.registered} />
        <span className="flex h-9 items-center gap-2 rounded-full border border-border bg-surface-inset pr-4.5 pl-4 text-sm leading-5 font-medium whitespace-nowrap text-fg">
          <Icon src={ICONS.plusSecondary} size={16} />
          Adicionar cartão
        </span>
      </div>

      <CardStack />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-4.5 rounded-[3px] bg-accent" />
            <span className="size-1.5 rounded-[3px] bg-border" />
            <span className="size-1.5 rounded-[3px] bg-border" />
          </div>
          <p className="text-xs leading-4 whitespace-nowrap text-fg-faint">{SELECTED_CARD.position}</p>
        </div>
        <div className="flex gap-1.5">
          {[CARD_ART.chevronLeft, CARD_ART.chevronRight].map((src) => (
            <span
              key={src}
              className="flex size-8 items-center justify-center rounded-2xl border border-border bg-surface-inset"
            >
              <Icon src={src} size={16} />
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col rounded-[14px] border border-border bg-bg-secondary px-4 py-1 whitespace-nowrap">
        {SELECTED_CARD.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex h-10 items-center justify-between ${i < SELECTED_CARD.stats.length - 1 ? 'border-b border-border' : ''}`}
          >
            <p className="text-[13px] leading-[18px] text-fg-muted">{stat.label}</p>
            <p
              className={`text-sm leading-5 font-medium ${stat.tone === 'planned' ? 'text-planned' : 'text-fg'}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------ Despesas por categoria */

/** Donut chart with its center total (Figma 43:231), 184 × 184. */
export function CategoryDonut() {
  return (
    <div className="relative size-46 overflow-hidden">
      <img src={ICONS.donutTrack} alt="" draggable={false} className="absolute inset-0 block size-46" />
      {EXPENSES_BY_CATEGORY.categories.map((category) => (
        <div key={category.id} className="absolute" style={{ inset: DONUT_SEGMENTS[category.id].inset }}>
          <img src={DONUT_SEGMENTS[category.id].src} alt="" draggable={false} className="block size-full max-w-none" />
        </div>
      ))}
      <div className="absolute top-[71px] left-[43px] flex w-[98px] flex-col items-center gap-0.5 whitespace-nowrap">
        <p className="leading-6 font-semibold tracking-[-0.01em] text-fg">
          <span className="text-xs text-fg-faint">R$ </span>
          <span className="text-lg">{EXPENSES_BY_CATEGORY.total}</span>
        </p>
        <p className="text-xs leading-4 text-fg-faint">total de despesas</p>
      </div>
    </div>
  )
}

/** "Despesas por categoria" panel (Figma 41:173), 400 × 492. */
export function CategoriesPanel() {
  return (
    <div className={`${panelClass} flex h-123 w-100 flex-col gap-5`}>
      <div className="flex items-center justify-between">
        <PanelTitle title={EXPENSES_BY_CATEGORY.title} subtitle={EXPENSES_BY_CATEGORY.subtitle} />
        <span className="flex h-8 items-center pr-1 pl-2 text-sm leading-5 font-medium text-fg-muted">
          Ver todas
        </span>
      </div>

      <div className="flex justify-center">
        <CategoryDonut />
      </div>

      <ul className="flex flex-col gap-3">
        {EXPENSES_BY_CATEGORY.categories.map((category) => (
          <li key={category.id} className="flex h-5 items-center gap-2.5">
            <Icon src={LEGEND_DOTS[category.id]} size={8} />
            <span className="min-w-px flex-1 text-[13px] leading-[18px] text-fg">{category.name}</span>
            <span className="text-[13px] leading-[18px] whitespace-nowrap text-fg-muted">{category.amount}</span>
            <span className="w-11 text-right text-xs leading-4 font-medium text-fg">{category.share}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* -------------------------------------------------- Evolução financeira */

/** "Dropdown — período do gráfico" (Figma 44:214). */
export function ChartRangeDropdown() {
  return (
    <span className="flex h-[34px] items-center gap-2 rounded-full border border-border bg-bg-secondary pr-2.5 pl-3 text-xs leading-4 font-medium whitespace-nowrap text-fg">
      <Icon src={ICONS.calendar14} size={14} />
      {DASHBOARD_PERIOD.chartRange}
      <Icon src={ICONS.chevronDown14} size={14} />
    </span>
  )
}

/** "Period selector" from the page header (Figma 41:150). */
export function PeriodSelector() {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-bg-secondary p-1">
      <span className="flex size-8 items-center justify-center rounded-2xl bg-surface-inset">
        <Icon src={ICONS.chevronLeft16} size={16} />
      </span>
      <span className="flex items-center gap-2 px-2.5 text-sm leading-5 font-medium whitespace-nowrap text-fg">
        <Icon src={ICONS.calendar16} size={16} />
        {DASHBOARD_PERIOD.label}
      </span>
      <span className="flex size-8 items-center justify-center rounded-2xl bg-surface-inset">
        <Icon src={ICONS.chevronRight16} size={16} />
      </span>
    </div>
  )
}

const CHART = {
  /** px per R$: the 0 → 15 mil axis spans 184 px. */
  scale: 184 / 15000,
  baseline: 192,
  firstBar: 68.58,
  step: 69.1667,
  grid: [
    { label: '15 mil', y: 8 },
    { label: '10 mil', y: 69.33 },
    { label: '5 mil', y: 130.67 },
    { label: '0', y: 192 },
  ],
  /** Resultado line points (left/top of each marker), from the design. */
  points: [
    [79.58, 165.69], [148.75, 157.11], [217.92, 175.51], [287.08, 154.65],
    [356.25, 155.88], [425.42, 148.52], [494.58, 159.56], [563.75, 147.29],
    [632.92, 158.33], [702.08, 141.16], [771.25, 146.07],
  ],
} as const

function EvolutionPanel() {
  const last = MONTHLY_TOTALS.length - 1

  return (
    <div className={`${panelClass} flex h-92 flex-col gap-4`}>
      <div className="flex items-center justify-between">
        <PanelTitle title="Evolução financeira" subtitle="Receitas, despesas e resultado das movimentações efetivadas" />
        <div className="flex items-center gap-2.5">
          <Segmented items={[...CHART_GRANULARITIES]} active="Mensal" />
          <ChartRangeDropdown />
        </div>
      </div>

      <div className="flex items-center gap-5 text-xs leading-4 whitespace-nowrap text-fg-muted">
        <span className="flex items-center gap-2"><span className="size-2 rounded-[2px] bg-income" />Receitas</span>
        <span className="flex items-center gap-2"><span className="size-2 rounded-[2px] bg-expense" />Despesas</span>
        <span className="flex items-center gap-2"><span className="h-0.5 w-3.5 rounded-[1px] bg-accent-hover" />Resultado</span>
      </div>

      <div className="relative h-58 w-full text-xs leading-4 text-fg-faint">
        {CHART.grid.map((line, i) => (
          <div key={line.label}>
            <div
              className={`absolute left-12 h-px w-[830px] ${i === CHART.grid.length - 1 ? 'bg-border' : 'bg-border/60'}`}
              style={{ top: line.y }}
            />
            <span className="absolute left-0 whitespace-nowrap" style={{ top: line.y - 8 }}>{line.label}</span>
          </div>
        ))}

        <div className="absolute top-1 left-[813.83px] h-53 w-[59.17px] rounded-xl border border-accent/25 bg-accent/8" />

        {MONTHLY_TOTALS.map((month, i) => {
          const left = CHART.firstBar + i * CHART.step
          const incomeHeight = month.income * CHART.scale
          const expenseHeight = month.expense * CHART.scale
          const current = i === last
          return (
            <div key={month.month}>
              <div
                className={`absolute w-3 rounded-t-sm bg-income ${current ? '' : 'opacity-32'}`}
                style={{ left, top: CHART.baseline - incomeHeight, height: incomeHeight }}
              />
              <div
                className={`absolute w-3 rounded-t-sm bg-expense ${current ? '' : 'opacity-32'}`}
                style={{ left: left + 16, top: CHART.baseline - expenseHeight, height: expenseHeight }}
              />
              <span
                className={`absolute top-[202px] -translate-x-1/2 whitespace-nowrap ${current ? 'text-fg' : ''}`}
                style={{ left: left + 14 }}
              >
                {month.month}
              </span>
            </div>
          )
        })}

        <div className="absolute top-[139.41px] left-[82.58px] h-[39.1px] w-[760.83px]">
          <div className="absolute inset-[-2.56%_-0.13%]">
            <img src={ICONS.chartLineResultado} alt="" draggable={false} className="block size-full max-w-none" />
          </div>
        </div>
        {CHART.points.map(([left, top]) => (
          <img key={left} src={ICONS.chartPoint} alt="" draggable={false} className="absolute block size-1.5" style={{ left, top }} />
        ))}
        <img src={ICONS.chartPointOut} alt="" draggable={false} className="absolute top-[134.41px] left-[838.42px] block size-2.5" />

        <div className="absolute top-3.5 left-[608.83px] flex flex-col gap-2 rounded-xl border border-border bg-surface-inset px-3.5 py-3 shadow-[0_8px_24px_-4px_rgb(0_0_0/0.4)]">
          <p className="font-medium whitespace-nowrap text-fg-muted">{CURRENT_MONTH_TOOLTIP.title}</p>
          {CURRENT_MONTH_TOOLTIP.rows.map((row) => (
            <div key={row.label} className="flex items-center gap-2">
              <span
                className={`size-2 rounded-[2px] ${
                  row.tone === 'income' ? 'bg-income' : row.tone === 'expense' ? 'bg-expense' : 'bg-accent-hover'
                }`}
              />
              <span className="w-16 text-fg-muted">{row.label}</span>
              <span className="font-medium whitespace-nowrap text-fg">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------ Movimentações recentes */

const COLUMNS = [
  { label: 'Descrição', width: 312 },
  { label: 'Categoria', width: 168 },
  { label: 'Data', width: 128 },
  { label: 'Status', width: 136 },
] as const

function StatusBadge({ status }: { status: Transaction['status'] }) {
  const done = status === 'Efetivada'
  return (
    <span
      className={`flex h-6 items-center gap-1.5 rounded-full pr-2.5 pl-2 text-xs leading-4 font-medium whitespace-nowrap ${
        done ? 'bg-income/12 text-income' : 'bg-planned/12 text-planned'
      }`}
    >
      <Icon src={done ? ICONS.statusCheck : ICONS.statusClock} size={12} />
      {status}
    </span>
  )
}

interface TransactionRowProps {
  transaction: Transaction
  divider?: boolean
  /**
   * Description and amount only, 424 px wide — the framing used by the
   * landing "Recursos em destaque" card (Categoria, Data and Status hidden).
   */
  compact?: boolean
}

/** One "Transaction row" (Figma 39:133), 878 × 60. */
export function TransactionRow({ transaction, divider = true, compact = false }: TransactionRowProps) {
  const amountTone =
    transaction.kind === 'income'
      ? 'text-income'
      : transaction.status === 'Prevista'
        ? 'text-fg-muted'
        : 'text-fg'

  return (
    <div
      className={`flex h-15 items-center ${compact ? 'w-[424px]' : 'w-[878px]'} ${divider ? 'border-b border-border' : ''}`}
    >
      <div className="flex h-full w-78 items-center gap-3 pl-3">
        <span className="flex size-9 items-center justify-center rounded-[10px] border border-border bg-surface-inset">
          <Icon src={TRANSACTION_ICONS[transaction.icon]} size={18} />
        </span>
        <div className="flex flex-col gap-0.5 whitespace-nowrap">
          <p className="text-sm leading-5 font-medium text-fg">{transaction.description}</p>
          <p className="text-xs leading-4 text-fg-faint">{transaction.detail}</p>
        </div>
      </div>
      {!compact && (
        <>
          <div className="flex h-full w-42 items-center">
            <span className="flex h-6 items-center gap-1.5 rounded-full border border-border bg-surface-inset pr-2.5 pl-2 text-xs leading-4 font-medium whitespace-nowrap text-fg-muted">
              <Icon src={TAG_DOTS[transaction.tag]} size={6} />
              {transaction.category}
            </span>
          </div>
          <p className="flex h-full w-32 items-center text-[13px] leading-[18px] whitespace-nowrap text-fg-muted">
            {transaction.date}
          </p>
          <div className="flex h-full w-34 items-center">
            <StatusBadge status={transaction.status} />
          </div>
        </>
      )}
      <p className={`flex h-full min-w-px flex-1 items-center justify-end text-sm leading-5 font-medium whitespace-nowrap ${amountTone}`}>
        {transaction.amount}
      </p>
    </div>
  )
}

function TransactionsPanel({
  highlightId,
  highlightOpacity,
}: {
  highlightId?: string
  highlightOpacity?: MotionValue<number>
}) {
  const lastIndex = RECENT_TRANSACTIONS.length - 1

  return (
    <div className={`${panelClass} flex h-123 flex-col gap-3`}>
      <div className="flex items-center justify-between pb-2">
        <PanelTitle title="Movimentações recentes" subtitle={RECENT_TRANSACTIONS_SUMMARY} />
        <div className="flex items-center gap-2.5">
          <span className="flex h-[34px] w-55 items-center gap-2 rounded-xl border border-border bg-bg-secondary px-3 text-[13px] leading-[18px] text-fg-faint">
            <Icon src={ICONS.search} size={16} />
            Buscar movimentação
          </span>
          <Segmented items={['Todas', 'Receitas', 'Despesas']} active="Todas" />
          <span className="flex h-[34px] items-center pr-1 pl-2.5 text-sm leading-5 font-medium whitespace-nowrap text-fg-muted">
            Ver todas
          </span>
        </div>
      </div>

      <div className="flex h-8 w-220 items-center rounded-[10px] bg-bg-secondary text-xs leading-4 font-medium text-fg-faint">
        {COLUMNS.map((column, i) => (
          <span key={column.label} className={i === 0 ? 'pl-3' : ''} style={{ width: column.width }}>
            {column.label}
          </span>
        ))}
        <span className="flex-1 text-right">Valor</span>
      </div>

      <div className="flex flex-col">
        {RECENT_TRANSACTIONS.map((transaction, i) =>
          transaction.id === highlightId ? (
            <motion.div key={transaction.id} data-dashboard-target="transaction" style={{ opacity: highlightOpacity }}>
              <TransactionRow transaction={transaction} divider={i < lastIndex} />
            </motion.div>
          ) : (
            <TransactionRow key={transaction.id} transaction={transaction} divider={i < lastIndex} />
          ),
        )}
      </div>
    </div>
  )
}

export { CardsPanel, EvolutionPanel, FinancialOverview, TransactionsPanel }
