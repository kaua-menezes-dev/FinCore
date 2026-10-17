import type { DashboardTarget } from './dashboard-preview/canvas'

export interface MeetFincoreStep {
  step: string
  title: string
  description: string
  /** Dashboard component this step's pop-up integrates into. */
  target: DashboardTarget
}

/** Section 03 text blocks (Figma: Section 03 — Conheça o FinCore). */
export const MEET_FINCORE_STEPS: MeetFincoreStep[] = [
  {
    step: '01',
    title: 'Organize suas finanças',
    description: 'Centralize suas receitas, despesas e movimentações em um só lugar.',
    target: 'transaction',
  },
  {
    step: '02',
    title: 'Visualize com clareza',
    description: 'Acompanhe seu fluxo financeiro e entenda para onde vai seu dinheiro.',
    target: 'categories',
  },
  {
    step: '03',
    title: 'Decida com mais confiança',
    description: 'Transforme informações financeiras em decisões mais conscientes.',
    target: 'result',
  },
]

export interface PopupSpec {
  /** Native (1440 px canvas) size of the floating element. */
  width: number
  height: number
  /**
   * Desktop rest position and scale, in px of the 736 px wide showcase
   * (Figma storyboard Stages 03 / 05a / 05c).
   */
  rest: { x: number; y: number; scale: number }
  /** Offset between the pop-up origin and its destination component (native px). */
  inset: { x: number; y: number }
}

/** Floating copies of dashboard components, one per step. */
export const POPUPS: Record<DashboardTarget, PopupSpec> = {
  // "Row / Supermercado" inside a floating panel (16 × 10 px padding at 68%).
  transaction: {
    width: 926,
    height: 90,
    rest: { x: 128, y: 416, scale: 0.68 },
    inset: { x: 24, y: 15 },
  },
  // "Panel — Despesas por categoria" at 72%.
  categories: {
    width: 400,
    height: 492,
    rest: { x: 186, y: 248, scale: 0.72 },
    inset: { x: 0, y: 0 },
  },
  // "KPI — Resultado do período" at 100%.
  result: {
    width: 280,
    height: 172,
    rest: { x: 436, y: 6, scale: 1 },
    inset: { x: 0, y: 0 },
  },
}

/** Transaction row revealed by the first step (Dashboard Home data id). */
export const REVEALED_TRANSACTION_ID = 'supermercado'
