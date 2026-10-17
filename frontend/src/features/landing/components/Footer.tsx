import { useInView } from 'motion/react'
import { useRef } from 'react'
import { Logo } from '../../../shared/components/Logo'
import { Reveal } from '../../../shared/motion/Reveal'
import { FOOTER_REVEAL as REVEAL } from '../../../shared/motion/timing'
import { FOOTER, FOOTER_GROUPS } from '../finalCta'

/** Read once at load, so rendering stays pure. */
const CURRENT_YEAR = new Date().getFullYear()

const linkClass = 'rounded-sm text-sm leading-4.5 text-fg-muted transition-colors hover:text-fg'

/**
 * Landing footer (Figma: Section 07 "Footer"). It shares the CTA's dark
 * background and opens with the same fading hairline, so the two read as
 * one closing block.
 */
export function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: REVEAL.viewportMargin })

  return (
    <footer className="px-6 md:px-10 xl:px-0">
      <div ref={ref} className="mx-auto max-w-300">
        {/* Divider · Stage / Footer: border colour with a faint violet centre, fading at both ends. */}
        <div
          aria-hidden="true"
          className="h-px bg-[linear-gradient(90deg,rgb(36_36_56/0),#242438_25%,rgb(140_115_255/0.32)_50%,#242438_75%,rgb(36_36_56/0))]"
        />

        <Reveal when={inView} timing={REVEAL.item} className="pt-14 pb-10 md:pt-18 md:pb-16">
          <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-12">
            <div className="flex flex-col gap-4.5">
              <a href="/" aria-label="FinCore — início" className="flex self-start rounded-md">
                <Logo />
              </a>
              <p className="text-[15px] leading-[1.55] text-fg-muted">
                {FOOTER.taglineLines[0]}
                <br /> {FOOTER.taglineLines[1]}
              </p>
            </div>

            <nav aria-label="Rodapé" className="grid grid-cols-2 gap-8 md:flex md:gap-16 lg:gap-30">
              {FOOTER_GROUPS.map((group) => (
                <div key={group.title} className="flex flex-col gap-5">
                  <h2 className="font-mono text-xs leading-4 font-medium tracking-[0.1em] text-fg-muted/60 uppercase">
                    {group.title}
                  </h2>
                  <ul className="flex flex-col gap-3.5">
                    {group.links.map((link) => (
                      <li key={link.label} className="flex">
                        <a href={link.href} className={linkClass}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-12 flex flex-col gap-2 text-[13px] leading-[17px] text-fg-muted/60 md:mt-18 md:flex-row md:justify-between">
            <p>
              © {CURRENT_YEAR} {FOOTER.copyright}
            </p>
            <p>{FOOTER.signature}</p>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
