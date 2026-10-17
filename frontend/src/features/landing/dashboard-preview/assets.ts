/** SVG assets exported from the Dashboard Home design (Figma node 41:118). */
import ambientLight from '../../../assets/dashboard/ambient-light.svg'
import calendar14 from '../../../assets/dashboard/calendar-14.svg'
import calendar16 from '../../../assets/dashboard/calendar-16.svg'
import cardChevronLeft from '../../../assets/dashboard/card-chevron-left.svg'
import cardChevronRight from '../../../assets/dashboard/card-chevron-right.svg'
import cardContactless from '../../../assets/dashboard/card-contactless.svg'
import cardContour1 from '../../../assets/dashboard/card-contour-1.svg'
import cardContour2 from '../../../assets/dashboard/card-contour-2.svg'
import cardContour3 from '../../../assets/dashboard/card-contour-3.svg'
import cardContour4 from '../../../assets/dashboard/card-contour-4.svg'
import cardContour5 from '../../../assets/dashboard/card-contour-5.svg'
import cardLightOrb from '../../../assets/dashboard/card-light-orb.svg'
import cardRing from '../../../assets/dashboard/card-ring.svg'
import cardRing2 from '../../../assets/dashboard/card-ring-2.svg'
import chartLineResultado from '../../../assets/dashboard/chart-line-resultado.svg'
import chartPoint from '../../../assets/dashboard/chart-point.svg'
import chartPointOut from '../../../assets/dashboard/chart-point-out.svg'
import chevronDown14 from '../../../assets/dashboard/chevron-down-14.svg'
import chevronDown16 from '../../../assets/dashboard/chevron-down-16.svg'
import chevronLeft16 from '../../../assets/dashboard/chevron-left-16.svg'
import chevronRight16 from '../../../assets/dashboard/chevron-right-16.svg'
import donutTrack from '../../../assets/dashboard/donut-track.svg'
import filterCalendar16 from '../../../assets/dashboard/filter-calendar-16.svg'
import filterCheck16 from '../../../assets/dashboard/filter-check-16.svg'
import filterChevron14 from '../../../assets/dashboard/filter-chevron-14.svg'
import filterReset16 from '../../../assets/dashboard/filter-reset-16.svg'
import filterTag16 from '../../../assets/dashboard/filter-tag-16.svg'
import kpiArrowDownLeft from '../../../assets/dashboard/kpi-arrow-down-left.svg'
import kpiArrowUpRightAccent from '../../../assets/dashboard/kpi-arrow-up-right-accent.svg'
import kpiArrowUpRightIncome from '../../../assets/dashboard/kpi-arrow-up-right-income.svg'
import kpiClock from '../../../assets/dashboard/kpi-clock.svg'
import legendDotAlimentacao from '../../../assets/dashboard/legend-dot-alimentacao.svg'
import legendDotLazer from '../../../assets/dashboard/legend-dot-lazer.svg'
import legendDotMoradia from '../../../assets/dashboard/legend-dot-moradia.svg'
import legendDotOutras from '../../../assets/dashboard/legend-dot-outras.svg'
import legendDotSaude from '../../../assets/dashboard/legend-dot-saude.svg'
import legendDotTransporte from '../../../assets/dashboard/legend-dot-transporte.svg'
import plusPrimary from '../../../assets/dashboard/plus-primary.svg'
import plusSecondary from '../../../assets/dashboard/plus-secondary.svg'
import search from '../../../assets/dashboard/search.svg'
import segmentAlimentacao from '../../../assets/dashboard/segment-alimentacao.svg'
import segmentLazer from '../../../assets/dashboard/segment-lazer.svg'
import segmentMoradia from '../../../assets/dashboard/segment-moradia.svg'
import segmentOutras from '../../../assets/dashboard/segment-outras.svg'
import segmentSaude from '../../../assets/dashboard/segment-saude.svg'
import segmentTransporte from '../../../assets/dashboard/segment-transporte.svg'
import statusCheck from '../../../assets/dashboard/status-check.svg'
import statusClock from '../../../assets/dashboard/status-clock.svg'
import tagDotAlimentacao from '../../../assets/dashboard/tag-dot-alimentacao.svg'
import tagDotMoradia from '../../../assets/dashboard/tag-dot-moradia.svg'
import tagDotReceita from '../../../assets/dashboard/tag-dot-receita.svg'
import tagDotSaude from '../../../assets/dashboard/tag-dot-saude.svg'
import tagDotTransporte from '../../../assets/dashboard/tag-dot-transporte.svg'
import txIconAlimentacao from '../../../assets/dashboard/tx-icon-alimentacao.svg'
import txIconMoradia from '../../../assets/dashboard/tx-icon-moradia.svg'
import txIconReceita from '../../../assets/dashboard/tx-icon-receita.svg'
import txIconSaude from '../../../assets/dashboard/tx-icon-saude.svg'
import txIconTransporte from '../../../assets/dashboard/tx-icon-transporte.svg'
import type { CategoryId, TransactionIcon, TransactionTag } from './dashboardHomeData'

export const ICONS = {
  ambientLight,
  calendar14,
  calendar16,
  chevronDown14,
  chevronDown16,
  chevronLeft16,
  chevronRight16,
  plusPrimary,
  plusSecondary,
  search,
  statusCheck,
  statusClock,
  kpiArrowDownLeft,
  kpiArrowUpRightAccent,
  kpiArrowUpRightIncome,
  kpiClock,
  chartLineResultado,
  chartPoint,
  chartPointOut,
  donutTrack,
}

/** "Filters toolbar" icons from App — Movimentações (Figma 53:524). */
export const FILTER_ICONS = {
  calendar: filterCalendar16,
  tag: filterTag16,
  check: filterCheck16,
  chevron: filterChevron14,
  reset: filterReset16,
}

export const CARD_ART = {
  contours: [cardContour1, cardContour2, cardContour3, cardContour4, cardContour5],
  lightOrb: cardLightOrb,
  ring: cardRing,
  ring2: cardRing2,
  contactless: cardContactless,
  chevronLeft: cardChevronLeft,
  chevronRight: cardChevronRight,
}

/** Donut segment artwork with its inset inside the 184 px chart (Figma geometry). */
export const DONUT_SEGMENTS: Record<CategoryId, { src: string; inset: string }> = {
  moradia: { src: segmentMoradia, inset: '0 0 21.54% 50.66%' },
  alimentacao: { src: segmentAlimentacao, inset: '72.71% 9.91% 0 28.12%' },
  transporte: { src: segmentTransporte, inset: '60.28% 67.81% 5.83% 1.86%' },
  outras: { src: segmentOutras, inset: '26.47% 83.53% 38.17% 0' },
  lazer: { src: segmentLazer, inset: '5.86% 67.85% 69.05% 6.73%' },
  saude: { src: segmentSaude, inset: '0 50.66% 84.15% 28.08%' },
}

export const LEGEND_DOTS: Record<CategoryId, string> = {
  moradia: legendDotMoradia,
  alimentacao: legendDotAlimentacao,
  transporte: legendDotTransporte,
  outras: legendDotOutras,
  lazer: legendDotLazer,
  saude: legendDotSaude,
}

export const TRANSACTION_ICONS: Record<TransactionIcon, string> = {
  moradia: txIconMoradia,
  receita: txIconReceita,
  alimentacao: txIconAlimentacao,
  saude: txIconSaude,
  transporte: txIconTransporte,
}

export const TAG_DOTS: Record<TransactionTag, string> = {
  moradia: tagDotMoradia,
  receita: tagDotReceita,
  alimentacao: tagDotAlimentacao,
  saude: tagDotSaude,
  transporte: tagDotTransporte,
}
