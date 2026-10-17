import { AUTH_LINKS, LANDING_NAV_LINKS, LEGAL_LINKS, type NavLink } from './navigation'

/** Section 07 copy (Figma: Section 07 — CTA final + Rodapé · Desktop 1440). */
export const FINAL_CTA = {
  /** Two lines on tablet and desktop, as in Figma; free wrapping on mobile. */
  titleLines: ['Pronto para assumir o controle', 'das suas finanças?'],
  description: 'Registre, visualize e decida com clareza — tudo em um só lugar.',
  action: { label: 'Acessar o FinCore', href: AUTH_LINKS.login },
} as const

export const FOOTER = {
  taglineLines: ['Organize suas finanças com mais', 'clareza e confiança.'],
  copyright: 'FinCore. Todos os direitos reservados.',
  signature: 'Feito para decidir com clareza.',
} as const

export interface FooterGroup {
  title: string
  links: NavLink[]
}

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: 'Navegação',
    links: [...LANDING_NAV_LINKS, { label: 'Entrar', href: AUTH_LINKS.login }],
  },
  { title: 'Legal', links: LEGAL_LINKS },
]
