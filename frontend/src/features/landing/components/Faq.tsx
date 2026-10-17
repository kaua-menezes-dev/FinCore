import { useInView } from 'motion/react'
import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Reveal } from '../../../shared/motion/Reveal'
import { FAQ_REVEAL as REVEAL } from '../../../shared/motion/timing'
import { FAQ_DEFAULT_OPEN, FAQ_HEADER as HEADER, FAQ_ITEMS, type FaqItem } from '../faq'
import { SeamLighting } from './SeamLighting'

/**
 * Section 06 — "Perguntas frequentes": a centred header over a single
 * hairline accordion. Items open and close independently, as in the Figma
 * prototype (each "FAQ Item" toggles its own state on click).
 */
export function Faq() {
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: REVEAL.viewportMargin })
  const listInView = useInView(listRef, { once: true, margin: REVEAL.viewportMargin })
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set(FAQ_DEFAULT_OPEN))

  const headerTiming = (step: number) => ({ ...REVEAL.item, delay: step * REVEAL.headerStagger })

  const toggle = (id: string) =>
    setOpenIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative isolate overflow-clip pt-12 pb-28 md:pt-16 md:pb-36 lg:pt-18 lg:pb-42"
    >
      <BackgroundLighting />

      <div className="mx-auto max-w-300 px-6 md:px-10 xl:px-0">
        <div ref={headerRef} className="mx-auto flex max-w-125 flex-col items-center text-center">
          <Reveal when={headerInView} timing={headerTiming(0)}>
            <p className="flex items-center gap-2.5 font-mono text-xs leading-4 font-medium tracking-[0.1em] text-fg-muted uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {HEADER.eyebrow}
            </p>
          </Reveal>
          <Reveal when={headerInView} timing={headerTiming(1)} className="mt-4 md:mt-5">
            <h2
              id="faq-title"
              className="text-[30px] leading-[1.12] font-medium tracking-[-0.02em] text-fg md:text-[40px] lg:text-[46px] lg:tracking-[-0.03em]"
            >
              {HEADER.title}
            </h2>
          </Reveal>
          <Reveal when={headerInView} timing={headerTiming(2)} className="mt-4 md:mt-5">
            <p className="text-[15px] leading-[1.55] text-fg-muted md:text-[17px]">{HEADER.description}</p>
          </Reveal>
        </div>

        <Reveal when={listInView} timing={headerTiming(3)} className="mx-auto mt-10 max-w-240 md:mt-12 lg:mt-16">
          <ul ref={listRef} onKeyDown={moveFocusBetweenQuestions}>
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                open={openIds.has(item.id)}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * One accordion row (Figma: "FAQ Item", State=Collapsed / Expanded).
 * The answer animates its height with a grid-rows transition (no JS
 * measuring) and is `inert` while closed, so it leaves the tab order.
 */
function AccordionItem({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  const uid = useId()
  const buttonId = `${uid}-question`
  const panelId = `${uid}-answer`

  return (
    <li className="border-b border-border">
      <h3>
        <button
          id={buttonId}
          type="button"
          data-faq-question
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={`group flex w-full cursor-pointer items-center gap-6 pt-6 text-left transition-[padding] duration-280 ease-out motion-reduce:transition-none md:gap-8 md:pt-7.5 ${
            // Figma: the open row's bottom padding drops from 30 to 16 px.
            open ? 'pb-3 md:pb-4' : 'pb-6 md:pb-7.5'
          }`}
        >
          <span
            className={`flex-1 text-[17px] leading-[1.3] font-medium tracking-[-0.01em] transition-colors duration-280 ease-out group-hover:text-fg motion-reduce:transition-none md:text-xl ${
              open ? 'text-fg' : 'text-fg/84'
            }`}
          >
            {item.question}
          </span>
          <ToggleIcon open={open} />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-280 ease-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p
            className={`pb-6 text-[15px] leading-[1.65] text-fg-muted transition-opacity duration-280 ease-out motion-reduce:transition-none md:pr-24 md:pb-8 md:text-base lg:pr-40 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </li>
  )
}

/**
 * Plus / minus (Figma: "Toggle Icon", 20 px, 1.5 px stroke). The vertical
 * bar collapses to turn + into −, and the stroke shifts to the accent.
 */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={`shrink-0 transition-colors duration-280 ease-out motion-reduce:transition-none ${
        open ? 'stroke-accent-hover' : 'stroke-fg-muted'
      }`}
    >
      <path d="M3.5 10h13" />
      <path
        d="M10 3.5v13"
        className={`origin-center transition-transform duration-280 ease-out [transform-box:fill-box] motion-reduce:transition-none ${
          open ? 'scale-y-0' : 'scale-y-100'
        }`}
      />
    </svg>
  )
}

/** Arrow Up/Down, Home and End move focus between questions (WAI-ARIA accordion pattern). */
function moveFocusBetweenQuestions(event: KeyboardEvent<HTMLUListElement>) {
  const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End']
  if (!keys.includes(event.key)) return
  const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[data-faq-question]'))
  const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
  if (index === -1) return

  event.preventDefault()
  const last = buttons.length - 1
  const target =
    event.key === 'Home' ? 0 : event.key === 'End' ? last : event.key === 'ArrowDown' ? (index === last ? 0 : index + 1) : index === 0 ? last : index - 1
  buttons[target].focus()
}

/** Figma "Background / Lighting": radial gradients only (no blur filters). */
function BackgroundLighting() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Top continuity glow, picking up Section 05's ambient light. */}
      <div className="absolute top-[-380px] left-1/2 h-[620px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(124_92_255/0.035),transparent)]" />

      {/* Lower-right bloom + seam bridge, continued by the final CTA below. */}
      <SeamLighting section="faq" />
    </div>
  )
}
