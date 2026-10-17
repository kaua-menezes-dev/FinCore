import { FILTER_ICONS, ICONS } from './assets'
import { TRANSACTION_FILTERS } from './dashboardHomeData'
import { Icon, Segmented } from './panels'

/*
 * Controls of the "Filters toolbar" on App — Movimentações (Figma 53:524),
 * at their native 1440 px design size. Static and non-interactive: the
 * landing page shows them as a product preview.
 */

/** "Filter / Busca" (Figma 53:525). */
export function FilterSearch({ width }: { width: number }) {
  return (
    <span
      className="flex h-9 items-center gap-2 rounded-xl border border-border bg-bg-secondary px-3 text-[13px] leading-[18px] whitespace-nowrap text-fg-faint"
      style={{ width }}
    >
      <Icon src={ICONS.search} size={16} />
      {TRANSACTION_FILTERS.searchPlaceholder}
    </span>
  )
}

/** "Dropdown" filter (Figma 51:456) in its default state. */
export function FilterDropdown({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="flex h-9 items-center gap-2 rounded-full border border-border bg-bg-secondary pr-3 pl-3.5 text-[13px] leading-[18px] whitespace-nowrap text-fg-muted">
      <Icon src={icon} size={16} />
      {label}
      <Icon src={FILTER_ICONS.chevron} size={14} />
    </span>
  )
}

/** "Filter / Tipo" (Figma 53:537). */
export function FilterType() {
  return <Segmented items={[...TRANSACTION_FILTERS.types]} active={TRANSACTION_FILTERS.activeType} />
}

/** "Button / Limpar filtros" (Figma 53:558), disabled while no filter is applied. */
export function ClearFiltersButton() {
  return (
    <span className="flex h-9 items-center gap-2 rounded-full pr-2 pl-2.5 text-sm leading-5 font-medium whitespace-nowrap text-fg-muted opacity-50">
      <Icon src={FILTER_ICONS.reset} size={16} />
      {TRANSACTION_FILTERS.clear}
    </span>
  )
}
