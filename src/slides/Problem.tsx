import { AnimatePresence, motion } from 'motion/react'
import { shots, trust } from '../content/problem'
import { Build, easeOutExpo, timed, useBuildTransition, useBuilt } from '../deck/Build'
import { FooterLockup, asset } from './Brand'

export type ProblemStage = 'speed' | 'trust'

/** Builds per stage (registered in slides.tsx). */
export const problemSteps: Record<ProblemStage, number> = { speed: 2, trust: 3 }

/**
 * Slides 3–4 · One canvas. Speed: the title, then the dashboards fly in.
 * Trust: the title swaps, the dashboards dim, then the callouts (1) and the three risks (2) build.
 */
export function Problem({ stage }: { stage: ProblemStage }) {
  const dim = stage === 'trust'
  return (
    <div className="relative h-full overflow-hidden">
      {shots.map((s, i) => (
        <Shot key={s.id} {...s} index={i} dim={dim} stage={stage} />
      ))}

      <div className="absolute left-[75px] w-[620px]" style={{ top: 0, bottom: 0 }}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={timed({ duration: 0.45, ease: easeOutExpo })}
            className="absolute inset-x-0"
            style={{ top: stage === 'speed' ? 300 : 212 }}
          >
            {stage === 'speed' ? (
              <h2 className="display text-[76px] leading-[1.12] text-white">
                Anyone can
                <br />
                <span className="text-orange">vibe code a dashboard</span> in minutes…
              </h2>
            ) : (
              <h2 className="display text-[64px] leading-[1.1] text-white">
                {trust.title[0]}
                <br />
                {trust.title[1]}
                <br />
                {trust.title[2]}
                <span className="text-[#ff2a2a]">
                  {trust.danger[0]}
                  <br />
                  {trust.danger[1]}
                </span>
              </h2>
            )}
          </motion.div>
        </AnimatePresence>

        {stage === 'trust' &&
          trust.risks.map((r, i) => (
            <Build key={r} at={2} delay={i * 0.12} x={-30} y={0} className="absolute left-0 w-[513px]" style={{ top: 557 + i * 101 }}>
              <p className="grid h-[83px] place-items-center rounded-[16px] bg-gradient-to-b from-[#e8202f] to-[#b3000f] px-6 text-center text-[24px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(80,0,0,0.8)] ring-2 ring-white/50">
                {r}
              </p>
            </Build>
          ))}
      </div>

      {stage === 'trust' && trust.callouts.map((c, i) => <Callout key={c.text} {...c} index={i} />)}

      <FooterLockup />
    </div>
  )
}

function Shot({ id, x, y, w, h, index, dim, stage }: { id: string; x: number; y: number; w: number; h: number; index: number; dim: boolean; stage: ProblemStage }) {
  // On slide 3 the dashboards fly in at build 1; on slide 4 they're already there.
  const at = stage === 'speed' ? 1 : 0
  const on = useBuilt(at)
  const t = useBuildTransition(at, index * 0.07, 0.9)
  return (
    <motion.div
      className="absolute overflow-hidden rounded-[16px] bg-white shadow-[0_24px_60px_-20px_rgba(0,10,80,0.7)]"
      style={{ left: x, top: y, width: w, height: h }}
      initial={false}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 60, scale: on ? 1 : 0.94 }}
      transition={t}
    >
      <img src={asset(`shots/${id}.jpg`)} alt="" className="size-full object-cover object-left-top" />
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-[#dce9ff]"
        initial={false}
        animate={{ opacity: dim ? 0.55 : 0 }}
        transition={timed({ duration: 0.6, delay: dim ? 0.1 : 0 })}
      />
    </motion.div>
  )
}

function Callout({ text, icon, x, y, iconX, iconY, iconSize, index }: (typeof trust.callouts)[number] & { index: number }) {
  const on = useBuilt(1)
  const t = useBuildTransition(1, index * 0.22, 0.6)
  return (
    <>
      <motion.p
        className="absolute grid h-[67px] w-[328px] place-items-center rounded-[34px] bg-[#e3f1ff] px-6 text-center text-[19px] leading-tight font-semibold text-navy-900 shadow-[0_16px_36px_-14px_rgba(0,20,120,0.7)] ring-2 ring-[#9fd0ff]"
        style={{ left: x, top: y }}
        initial={false}
        animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.85 }}
        transition={t}
      >
        {text}
      </motion.p>
      <motion.img
        src={asset(`shots/${icon}.png`)}
        alt=""
        className="absolute drop-shadow-lg"
        style={{ left: iconX, top: iconY, width: iconSize }}
        initial={false}
        animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.3, rotate: on ? 0 : -25 }}
        transition={timed(on ? { type: 'spring', stiffness: 260, damping: 14, delay: 0.1 + index * 0.22 } : { duration: 0.2 })}
      />
    </>
  )
}
