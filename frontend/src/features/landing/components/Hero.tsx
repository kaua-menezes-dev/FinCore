import cardsFan from '../../../assets/hero/fincore-cards-fan.png'
import { Reveal } from '../../../shared/motion/Reveal'
import { HERO_ENTRANCE } from '../../../shared/motion/timing'
import { AUTH_LINKS } from '../navigation'
import { HeroHeadline } from './HeroHeadline'

/** Card artwork width: 560px bleed on mobile, ~94vw on tablet, 1100px on desktop. */
const visualWidth = 'w-140 md:w-[min(1100px,94vw)]'

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden px-6 pt-27 md:px-10 md:pt-34 lg:pt-37.5"
    >
      {/* Soft top light — static background, part of the approved composition. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-253px] left-1/2 -z-10 h-105.5 w-92.75 -translate-x-1/2 rounded-full bg-white/7 blur-[70px] md:top-[-307px] md:h-128 md:w-182.5 lg:top-[-330px] lg:h-140 lg:w-250"
      />

      <div className="mx-auto flex max-w-300 flex-col items-center text-center">
        <Reveal timing={HERO_ENTRANCE.headline} className="w-full">
          <HeroHeadline id="hero-title" />
        </Reveal>

        <Reveal timing={HERO_ENTRANCE.description} className="mt-5 md:mt-6">
          <p className="max-w-130 text-base leading-[1.55] text-fg-muted md:text-[17px]">
            Organize suas contas e movimentações em um só lugar, acompanhe o fluxo de caixa e
            entenda para onde vai cada real.
          </p>
        </Reveal>

        <Reveal timing={HERO_ENTRANCE.cta} className="mt-7 md:mt-9">
          <a
            href={AUTH_LINKS.signUp}
            className="inline-flex h-12.5 items-center gap-2.5 rounded-full bg-accent pr-5.5 pl-6.5 text-[15px] font-semibold text-white shadow-[0_8px_32px_-6px_rgb(124_92_255/0.45)] ring-1 ring-white/16 transition-colors ring-inset hover:bg-accent-hover"
          >
            Começar agora
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 12l4-4-4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>
      </div>

      {/* Card artwork; the section crops its bottom edge like the Figma frame. */}
      <Reveal
        timing={HERO_ENTRANCE.visual}
        className="-mb-5 mt-14 flex justify-center md:-mb-6 md:mt-18 lg:mt-10.5"
      >
        <div className={`relative shrink-0 ${visualWidth}`}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[13%] left-[2.75%] -z-10 h-[78%] w-[94.5%] rounded-full bg-accent/22 blur-[85px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-5%] left-[24.5%] -z-10 h-[33%] w-[51%] rounded-full bg-accent/20 blur-[60px]"
          />
          <img
            src={cardsFan}
            alt=""
            width={1884}
            height={835}
            fetchPriority="high"
            decoding="async"
            className="block h-auto w-full max-w-none select-none"
            draggable={false}
          />
        </div>
      </Reveal>

      {/* Fade into the page background so the next section continues seamlessly. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-50 bg-[linear-gradient(to_bottom,rgb(10_10_15/0)_0%,rgb(10_10_15/0.92)_75%,var(--color-bg)_100%)] md:h-60 lg:h-65"
      />
    </section>
  )
}
