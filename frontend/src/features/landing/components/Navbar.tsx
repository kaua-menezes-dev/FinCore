import { Logo } from '../../../shared/components/Logo'
import { Reveal } from '../../../shared/motion/Reveal'
import { HERO_ENTRANCE } from '../../../shared/motion/timing'
import { AUTH_LINKS, LANDING_NAV_LINKS } from '../navigation'

const pillClass =
  'inline-flex h-10 items-center justify-center rounded-full border border-border bg-surface/70 text-fg transition-colors hover:bg-surface'

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 px-6 pt-3 md:px-10 md:pt-5 lg:pt-6">
      <Reveal timing={HERO_ENTRANCE.navbar}>
        <nav
          aria-label="Principal"
          className="mx-auto grid h-14 max-w-300 grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]"
        >
          <a href="/" aria-label="FinCore — início" className="justify-self-start rounded-md">
            <Logo />
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {LANDING_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-sm text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-2">
            <a href={AUTH_LINKS.login} className={`${pillClass} px-4.5 text-sm font-medium`}>
              Entrar
            </a>
            {/* The approved mobile design shows this button; its menu panel is not designed yet. */}
            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded="false"
              className={`${pillClass} size-10 md:hidden`}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d="M3 6h12M3 12h12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </nav>
      </Reveal>
    </header>
  )
}
