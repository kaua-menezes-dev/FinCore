/** FinCore logo: violet mark with a dark core, followed by the wordmark. */
export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="26" height="26" rx="8" className="fill-accent" />
        <rect x="8" y="8" width="10" height="10" rx="3" className="fill-bg" />
      </svg>
      <span className="text-[19px] leading-6 font-semibold tracking-[-0.02em] text-fg">
        FinCore
      </span>
    </span>
  )
}
