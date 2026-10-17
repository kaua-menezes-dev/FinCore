/**
 * Demonstration data of the FinCore Dashboard Home design
 * (Figma: "FinCore App — Dashboard Home · Desktop 1440", node 41:118).
 *
 * Fictional values used only to present the product on the landing page.
 * The dashboard preview and its floating pop-ups both read from here, so
 * every number shown in Section 03 has a single source.
 */

export type CategoryId = 'moradia' | 'alimentacao' | 'transporte' | 'outras' | 'lazer' | 'saude'

export interface CategoryShare {
  id: CategoryId
  name: string
  amount: string
  share: string
}

export type TransactionIcon = 'moradia' | 'receita' | 'alimentacao' | 'saude' | 'transporte'
export type TransactionTag = 'moradia' | 'receita' | 'alimentacao' | 'saude' | 'transporte'

export interface Transaction {
  id: string
  description: string
  detail: string
  icon: TransactionIcon
  category: string
  tag: TransactionTag
  date: string
  status: 'Efetivada' | 'Prevista'
  amount: string
  kind: 'income' | 'expense'
}

export interface MonthTotals {
  month: string
  income: number
  expense: number
}

export const DASHBOARD_USER = {
  name: 'Rafael Souza',
  firstName: 'Rafael',
  initials: 'RS',
} as const

export const DASHBOARD_PERIOD = {
  label: 'Outubro de 2026',
  summary: 'Resumo das movimentações registradas por você em outubro de 2026.',
  chartRange: 'Nov 2025 – Out 2026',
} as const

export const PERIOD_RESULT = {
  label: 'Resultado do período',
  value: '4.287,50',
  delta: '+22,5%',
  comparison: 'vs. setembro',
  note: 'Receitas − despesas efetivadas · com previstas: R$ 3.147,50',
} as const

export const PERIOD_TOTALS = [
  {
    id: 'receitas',
    label: 'Total de receitas',
    value: '12.450,00',
    delta: '+1,2%',
    planned: '+ R$ 1.200,00 previstas',
    icon: 'income',
  },
  {
    id: 'despesas',
    label: 'Total de despesas',
    value: '8.162,50',
    delta: '−7,2%',
    planned: '+ R$ 2.340,00 previstas',
    icon: 'expense',
  },
] as const

export const PLANNED_SUMMARY = {
  label: 'Previstas',
  count: '7',
  unit: ' movimentações',
  progress: '35 de 42 já efetivadas',
  /** Efetivadas bar width in the 158 px track (35 of 42). */
  progressWidth: 132,
} as const

export const SELECTED_CARD = {
  bank: 'Banco Aurora',
  number: '••••  ••••  ••••  4821',
  name: 'Cartão principal',
  position: '1 de 3',
  registered: '3 cartões cadastrados',
  stats: [
    { label: 'Despesas no período', value: 'R$ 2.184,30', tone: 'default' },
    { label: 'Movimentações no cartão', value: '18', tone: 'default' },
    { label: 'Previstas no cartão', value: 'R$ 51,80', tone: 'planned' },
  ],
} as const

export const EXPENSES_BY_CATEGORY = {
  title: 'Despesas por categoria',
  subtitle: 'Efetivadas em outubro',
  total: '8.162,50',
  categories: [
    { id: 'moradia', name: 'Moradia', amount: 'R$ 2.850,00', share: '34,9%' },
    { id: 'alimentacao', name: 'Alimentação', amount: 'R$ 1.842,30', share: '22,6%' },
    { id: 'transporte', name: 'Transporte', amount: 'R$ 1.096,40', share: '13,4%' },
    { id: 'outras', name: 'Outras', amount: 'R$ 992,50', share: '12,2%' },
    { id: 'lazer', name: 'Lazer', amount: 'R$ 768,90', share: '9,4%' },
    { id: 'saude', name: 'Saúde', amount: 'R$ 612,40', share: '7,5%' },
  ] satisfies CategoryShare[],
} as const

/** Monthly totals (R$) behind the "Evolução financeira" bars. */
export const MONTHLY_TOTALS: MonthTotals[] = [
  { month: 'Nov', income: 10800, expense: 8900 },
  { month: 'Dez', income: 14200, expense: 11600 },
  { month: 'Jan', income: 10900, expense: 9800 },
  { month: 'Fev', income: 10900, expense: 8100 },
  { month: 'Mar', income: 11400, expense: 8700 },
  { month: 'Abr', income: 11200, expense: 7900 },
  { month: 'Mai', income: 11600, expense: 9200 },
  { month: 'Jun', income: 11800, expense: 8400 },
  { month: 'Jul', income: 12100, expense: 9600 },
  { month: 'Ago', income: 11900, expense: 8000 },
  { month: 'Set', income: 12300, expense: 8800 },
  { month: 'Out', income: 12450, expense: 8162.5 },
]

export const CURRENT_MONTH_TOOLTIP = {
  title: 'Outubro de 2026',
  rows: [
    { label: 'Receitas', value: 'R$ 12.450,00', tone: 'income' },
    { label: 'Despesas', value: 'R$ 8.162,50', tone: 'expense' },
    { label: 'Resultado', value: 'R$ 4.287,50', tone: 'result' },
  ],
} as const

export const RECENT_TRANSACTIONS_SUMMARY = '42 movimentações registradas em outubro'

export const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: 'aluguel',
    description: 'Aluguel',
    detail: 'Despesa',
    icon: 'moradia',
    category: 'Moradia',
    tag: 'moradia',
    date: '20 out 2026',
    status: 'Prevista',
    amount: '− R$ 2.100,00',
    kind: 'expense',
  },
  {
    id: 'freelance',
    description: 'Projeto freelance',
    detail: 'Receita',
    icon: 'receita',
    category: 'Renda extra',
    tag: 'receita',
    date: '18 out 2026',
    status: 'Prevista',
    amount: '+ R$ 1.200,00',
    kind: 'income',
  },
  {
    id: 'supermercado',
    description: 'Supermercado',
    detail: 'Despesa · Cartão final 4821',
    icon: 'alimentacao',
    category: 'Alimentação',
    tag: 'alimentacao',
    date: '15 out 2026',
    status: 'Efetivada',
    amount: '− R$ 486,72',
    kind: 'expense',
  },
  {
    id: 'farmacia',
    description: 'Farmácia',
    detail: 'Despesa · Cartão final 4821',
    icon: 'saude',
    category: 'Saúde',
    tag: 'saude',
    date: '14 out 2026',
    status: 'Efetivada',
    amount: '− R$ 89,90',
    kind: 'expense',
  },
  {
    id: 'combustivel',
    description: 'Combustível',
    detail: 'Despesa · Cartão final 7310',
    icon: 'transporte',
    category: 'Transporte',
    tag: 'transporte',
    date: '12 out 2026',
    status: 'Efetivada',
    amount: '− R$ 250,00',
    kind: 'expense',
  },
  {
    id: 'salario',
    description: 'Salário',
    detail: 'Receita',
    icon: 'receita',
    category: 'Salário',
    tag: 'receita',
    date: '05 out 2026',
    status: 'Efetivada',
    amount: '+ R$ 9.800,00',
    kind: 'income',
  },
]
