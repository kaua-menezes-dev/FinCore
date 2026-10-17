/** Section 04 copy (Figma: Section 04 — Recursos em destaque · Desktop 1440). */
export const FEATURED_FEATURES_HEADER = {
  eyebrow: 'Recursos em destaque',
  title: 'Tudo para organizar sua vida financeira.',
  description:
    'Conheça as ferramentas que ajudam você a acompanhar suas finanças com mais clareza, organização e controle.',
} as const

export type FeatureId =
  | 'cartoes'
  | 'movimentacoes'
  | 'categorias'
  | 'visao-financeira'
  | 'filtros'
  | 'periodos'

export interface Feature {
  title: string
  description: string
  /** Outlined tags under product-style cards. */
  tags?: string[]
}

export const FEATURES: Record<FeatureId, Feature> = {
  cartoes: {
    title: 'Cartões',
    description: 'Organize seus cartões em um só lugar.',
  },
  movimentacoes: {
    title: 'Movimentações',
    description: 'Registre receitas e despesas com praticidade.',
    tags: ['Receitas', 'Despesas'],
  },
  categorias: {
    title: 'Categorias',
    description: 'Entenda melhor seus gastos por categoria.',
  },
  'visao-financeira': {
    title: 'Visão financeira',
    description: 'Acompanhe seus dados de forma simples.',
  },
  filtros: {
    title: 'Filtros',
    description: 'Encontre o que importa com rapidez.',
    tags: ['Período', 'Categoria', 'Tipo'],
  },
  periodos: {
    title: 'Períodos',
    description: 'Visualize suas finanças por diferentes momentos.',
    tags: ['Diário', 'Semanal', 'Mensal'],
  },
}

/** Typographic highlight card (Figma: "Card 03 — Destaque tipográfico"). */
export const FEATURE_HIGHLIGHT = {
  lines: ['Tudo em um', 'só lugar.'],
  caption: 'Contas · Cartões · Dados',
} as const
