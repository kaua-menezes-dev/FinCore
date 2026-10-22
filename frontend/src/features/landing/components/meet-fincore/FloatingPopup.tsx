import { motion, useTransform, type MotionValue } from 'motion/react'
import type { ReactNode } from 'react'
import type { DashboardTarget } from '../../dashboard-preview/canvas'
import { POPUPS } from '../../meetFincore'
import { popupFrameAt, type StageGeometry } from './timeline'

const elevationShadow = 'shadow-[0_40px_88px_rgb(0_0_0/0.55),0_0_70px_rgb(124_92_255/0.22)]'

interface FloatingPopupProps {
  target: DashboardTarget
  index: number
  progress: MotionValue<number>
  geometry: MotionValue<StageGeometry>
  /**
   * Wrap the content in an opaque floating panel (transaction row). The panel
   * stays opaque in flight and tightens onto the row, so the row never slides
   * transparently over the dashboard rows below it.
   */
  framed?: boolean
  children: ReactNode
}

/**
 * Floating copy of a dashboard component. It is drawn at native dashboard
 * size and moved only with transform + opacity, derived from scroll
 * progress — no React renders while scrolling.
 */
export function FloatingPopup({ target, index, progress, geometry, framed, children }: FloatingPopupProps) {
  const spec = POPUPS[target]
  const frame = () => popupFrameAt(target, index, progress.get(), geometry.get())

  const x = useTransform(() => frame().x)
  const y = useTransform(() => frame().y)
  const scale = useTransform(() => frame().scale)
  const opacity = useTransform(() => frame().opacity)
  const chrome = useTransform(() => frame().chrome)
  const elevation = useTransform(() => frame().elevation)
  const panel = useTransform(() => frame().panel)
  const panelScaleX = useTransform(() => 1 - ((2 * spec.inset.x) / spec.width) * frame().collapse)
  const panelScaleY = useTransform(() => 1 - ((2 * spec.inset.y) / spec.height) * frame().collapse)
  const visibility = useTransform(() => (frame().opacity > 0.001 ? 'visible' : 'hidden'))

  return (
    <motion.div
      className="absolute top-0 left-0 origin-top-left will-change-transform"
      style={{ x, y, scale, opacity, visibility, width: spec.width, height: spec.height }}
    >
      {framed ? (
        <>
          <motion.div
            className={`absolute inset-0 rounded-[24px] ${elevationShadow}`}
            style={{ opacity: elevation, scaleX: panelScaleX, scaleY: panelScaleY }}
          />
          <motion.div
            className="absolute inset-0 rounded-[24px] border border-border bg-surface"
            style={{ opacity: panel, scaleX: panelScaleX, scaleY: panelScaleY }}
          />
        </>
      ) : (
        <motion.div
          className={`absolute inset-0 rounded-[20px] ${elevationShadow}`}
          style={{ opacity: chrome }}
        />
      )}
      <div className="absolute" style={{ left: spec.inset.x, top: spec.inset.y }}>
        {children}
      </div>
    </motion.div>
  )
}
