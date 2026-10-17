import { useInView } from 'motion/react'
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { Reveal } from '../../../shared/motion/Reveal'
import { FAQ_REVEAL as REVEAL } from '../../../shared/motion/timing'
import { FAQ_DEFAULT_OPEN, FAQ_HEADER as HEADER, FAQ_ITEMS, type FaqItem } from '../faq'

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

/**
 * Figma "Background / Lighting" glows as radial gradients (no blur
 * filters). Sizes add the layer blur to the ellipse; positions come from
 * the 1440 × 1030 desktop frame.
 */
interface Glow {
  /** Left / bottom edge and size on the 1440 px canvas. */
  left: number
  bottom: number
  width: number
  height: number
  rgb: string
  opacity: number
  rotate?: number
}

const LOWER_RIGHT_GLOWS: Glow[] = [
  // Lower-right bloom: deep violet, soft purple, muted lavender.
  { left: 768, bottom: -120, width: 1144, height: 984, rgb: '59 31 158', opacity: 0.38 },
  { left: 950, bottom: 52, width: 780, height: 720, rgb: '139 92 246', opacity: 0.17 },
  { left: 855, bottom: 37, width: 690, height: 550, rgb: '183 166 232', opacity: 0.08 },
  { left: 1142, bottom: 344, width: 496, height: 536, rgb: '192 132 252', opacity: 0.07 },
  // Seam bridge into Section 07 (Figma: "Seam Bridge · S06→S07", Section 06 half).
  { left: 100, bottom: -410, width: 1560, height: 780, rgb: '59 31 158', opacity: 0.14 },
  { left: 695, bottom: -94, width: 970, height: 354, rgb: '59 31 158', opacity: 0.16, rotate: -20 },
  { left: 388, bottom: -242, width: 864, height: 524, rgb: '140 92 245', opacity: 0.13 },
  { left: 478, bottom: -218, width: 636, height: 406, rgb: '204 189 255', opacity: 0.17 },
  { left: 655, bottom: -121, width: 282, height: 212, rgb: '204 189 255', opacity: 0.13 },
]

function BackgroundLighting() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Top continuity glow, picking up Section 05's ambient light. */}
      <div className="absolute top-[-380px] left-1/2 h-[620px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(124_92_255/0.035),transparent)]" />

      {/* Bottom-anchored desktop canvas, scaled down on smaller screens so the bloom stays in view. */}
      <div className="absolute bottom-0 left-1/2 h-[1030px] w-[1440px] origin-bottom -translate-x-1/2 scale-[0.6] md:scale-[0.8] lg:scale-100">
        {LOWER_RIGHT_GLOWS.map((glow, index) => (
          <div key={index} className="absolute rounded-full" style={glowStyle(glow)} />
        ))}
      </div>
    </div>
  )
}

function glowStyle({ left, bottom, width, height, rgb, opacity, rotate }: Glow): CSSProperties {
  return {
    left,
    bottom,
    width,
    height,
    rotate: rotate ? `${rotate}deg` : undefined,
    backgroundImage: `radial-gradient(closest-side, rgb(${rgb} / ${opacity}), transparent)`,
  }
}
