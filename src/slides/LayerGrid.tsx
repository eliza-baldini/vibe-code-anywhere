import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { columns, legend, views, type Coverage, type LayerView } from '../content/layers'
import { Build, easeOutExpo, timed, useBuildTransition, useBuilt } from '../deck/Build'
import { RichText } from '../components/ui/RichText'
import { FooterLockup } from './Brand'

/** Builds per view: the tiles build in at step 1, except on the vibe view, which changes them in place. */
export const layerSteps: Record<LayerView, number> = { tableau: 2, vibe: 1, dataApps: 2, studio: 2 }
const tilesAt = (view: LayerView) => (view === 'vibe' ? 0 : 1)

const tileBg: Record<Coverage, string> = { covered: '#dff5e7', partial: '#fff0dc', missing: '#fde4e4' }
const markBg: Record<Coverage, string> = { covered: '#2e844a', partial: '#dd7a01', missing: '#ea001e' }
const markGlyph: Record<Coverage, string> = { covered: '✓', partial: '!', missing: '✕' }

const COL_X = 61
const COL_PITCH = 301
const ROW_Y = 280
const ROW_PITCH = 120

/**
 * Slides 5, 6, 9, 11 · The 18 governance layers for Tableau content, a vibe-coded app, Data Apps and Studio.
 * Slides 5–6 share one canvas, so the tiles turn red in place and the header and badge swap.
 */
export function LayerGrid({ view }: { view: LayerView }) {
  const v = views[view]
  let n = 0
  return (
    <div className="relative h-full text-white">
      <Build y={14} className="absolute top-[52px] left-[61px] w-[1150px]">
        <Swap id={v.title}>
          <h2 className="display text-[51px] leading-tight">
            <RichText text={v.title} accentClass="text-orange" />
          </h2>
        </Swap>
        <Swap id={v.subtitle}>
          <p className="mt-3 text-[24px] leading-snug text-white/90">{v.subtitle}</p>
        </Swap>
      </Build>

      <Build delay={0.15} className="absolute top-[64px] left-[1260px] h-[128px] w-[279px]">
        <div className="grid size-full place-items-center rounded-[18px] bg-white text-center text-navy-900 shadow-[0_20px_50px_-20px_rgba(0,10,80,0.7)]">
          <Swap id={v.count}>
            <p className="display text-[44px] leading-none">{v.count}</p>
            <p className="mt-2 text-[20px]">{v.countLabel}</p>
          </Swap>
        </div>
      </Build>

      {columns.map((col, c) => (
        <div key={col.title}>
          <Build delay={0.2 + c * 0.05} className="absolute top-[228px]" style={{ left: COL_X + c * COL_PITCH }}>
            <p className="display text-[24px]">{col.title}</p>
          </Build>
          {col.layers.map((layer, r) => (
            <Tile
              key={layer}
              label={layer}
              detail={v.details?.[layer]}
              coverage={v.coverage[layer]}
              view={view}
              index={n++}
              x={COL_X + c * COL_PITCH}
              y={ROW_Y + r * ROW_PITCH}
            />
          ))}
        </div>
      ))}

      <Build delay={0.3} className="absolute top-[806px] left-[61px] flex gap-[86px]">
        {legend.map((l) => (
          <span key={l.kind} className="flex items-center gap-4 text-[20px]">
            <span className="size-[27px] rounded-full" style={{ background: markBg[l.kind] }} />
            {l.label}
          </span>
        ))}
      </Build>

      <FooterLockup />
    </div>
  )
}

function Tile({ label, detail, coverage, view, index, x, y }: { label: string; detail?: string; coverage: Coverage; view: LayerView; index: number; x: number; y: number }) {
  const at = tilesAt(view)
  const on = useBuilt(at)
  const t = useBuildTransition(at, 0.25 + index * 0.035, 0.7)
  // Coverage changes ripple across the grid in reading order.
  const change = timed({ duration: 0.45, delay: 0.15 + index * 0.04, ease: easeOutExpo })
  return (
    <motion.div
      className="absolute flex h-[104px] w-[274px] flex-col justify-center rounded-[14px] pr-14 pl-[23px] text-navy-900 shadow-[0_12px_30px_-16px_rgba(0,10,80,0.7)]"
      style={{ left: x, top: y }}
      initial={false}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 24, backgroundColor: tileBg[coverage] }}
      transition={{ opacity: t, y: t, backgroundColor: change }}
    >
      <p className="display text-[20px] leading-tight">{label}</p>
      <motion.p
        className="overflow-hidden text-[15px] leading-snug text-ink-soft"
        initial={false}
        animate={{ height: detail ? 'auto' : 0, opacity: detail ? 1 : 0, marginTop: detail ? 4 : 0 }}
        transition={change}
      >
        {detail}
      </motion.p>
      <motion.span
        className="absolute top-[16px] right-[16px] grid size-[31px] place-items-center rounded-full text-[17px] font-bold text-white"
        initial={false}
        animate={{ backgroundColor: markBg[coverage] }}
        transition={change}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.span key={coverage} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={timed({ duration: 0.3, delay: 0.15 + index * 0.04, ease: easeOutExpo })}>
            {markGlyph[coverage]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </motion.div>
  )
}

/** Crossfades its content whenever `id` changes. */
function Swap({ id, children }: { id: string; children: ReactNode }) {
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
        transition={timed({ duration: 0.35 })}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
