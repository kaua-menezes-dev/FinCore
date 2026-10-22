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
   * Desktop rest position as fractions of the dashboard width, and scale as
   * a multiple of the dashboard scale (Figma: S03 v2 Stages 03 / 05a / 05c).
   * Every rest position keeps the pop-up inside the dashboard.
   */
  rest: { x: number; y: number; scale: number }
  /** Largest absolute scale on tablet / mobile. */
  compactScale: number
  /** Offset between the pop-up origin and its destination component (native px). */
  inset: { x: number; y: number }
}

/** Floating copies of dashboard components, one per step. */
export const POPUPS: Record<DashboardTarget, PopupSpec> = {
  // "Row / Supermercado" inside an opaque floating panel; right-aligned inside the dashboard.
  transaction: {
    width: 926,
    height: 90,
    rest: { x: 0.0499, y: 0.5327, scale: 1.42 },
    compactScale: 0.68,
    inset: { x: 24, y: 15 },
  },
  // "Panel — Despesas por categoria".
  categories: {
    width: 400,
    height: 492,
    rest: { x: 0.2527, y: 0.337, scale: 1.506 },
    compactScale: 0.72,
    inset: { x: 0, y: 0 },
  },
  // "KPI — Resultado do período", aligned to the dashboard's right edge.
  result: {
    width: 280,
    height: 172,
    rest: { x: 0.59, y: 0.008, scale: 2.09 },
    compactScale: 1,
    inset: { x: 0, y: 0 },
  },
}

/** Transaction row revealed by the first step (Dashboard Home data id). */
export const REVEALED_TRANSACTION_ID = 'supermercado'
