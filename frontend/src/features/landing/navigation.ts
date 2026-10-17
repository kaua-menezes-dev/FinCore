export interface NavLink {
  label: string
  href: string
}

/** In-page anchors for landing sections that will be built in later phases. */
export const LANDING_NAV_LINKS: NavLink[] = [
  { label: 'Recursos', href: '#recursos' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'FAQ', href: '#faq' },
]

/**
 * Auth destinations. The app has no routes yet; these stay as
 * placeholders until the login and sign-up routes are approved.
 */
export const AUTH_LINKS = {
  login: '#',
  signUp: '#',
} as const
