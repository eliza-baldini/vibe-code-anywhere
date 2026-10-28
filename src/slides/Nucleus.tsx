import { motion } from 'motion/react'
import { nucleus as c } from '../content/products'
import { Build, useBuildTransition, useBuilt } from '../deck/Build'
import { RichText } from '../components/ui/RichText'
import { FooterLockup } from './Brand'

/** Light-blue dots around the left of the hub, and the orange handles that link it to each find (slide positions). */
const dots = [
  [842, 717], [720, 717], [614, 656], [553, 550], [553, 428], [614, 322], [720, 261], [842, 261],
]
const handles = [
  { x: 884, y: 274, line: 160 },
  { x: 997, y: 402, line: 47 },
  { x: 1007, y: 530, line: 37 },
  { x: 935, y: 658, line: 108 },
]

/**
 * Slide 13 · Every new build starts from what your business already knows.
 * Builds: 0 title · 1 the Studio request · 2 the Knowledge hub · 3 what it finds · 4 iterate.
 */
export function Nucleus() {
  return (
    <div className="relative h-full text-white">
      <Build y={14} className="absolute top-[52px] left-[61px] w-[1360px]">
        <h2 className="display text-[51px] leading-[1.15]">
          <RichText text={c.title} accentClass="text-orange" />
        </h2>
      </Build>

      <Build at={1} x={-40} y={0} className="absolute top-[240px] left-[61px] h-[528px] w-[416px]">
        <div className="relative size-full rounded-[28px] bg-white px-[24px] pt-[18px] text-navy-900 shadow-[0_30px_70px_-30px_rgba(0,10,80,0.8)]">
          <p className="display text-[24px]">{c.studio.title}</p>
          <p className="mt-[22px] rounded-[16px] bg-[#e3f1ff] px-[26px] py-[22px] text-[20px] leading-snug">{c.studio.ask}</p>
          <div className="mt-[20px] h-[292px] rounded-[14px] border-2 border-dashed border-[#b8c6dd] px-[18px] pt-[18px]">
            <div className="grid grid-cols-3 gap-[14px]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-[56px] rounded-[4px] bg-[#e5eaf2]" />
              ))}
            </div>
            <span className="mt-[16px] block h-[140px] rounded-[4px] bg-[#e5eaf2]" />
            <p className="mt-[14px] text-center text-[16px] text-ink-faint">{c.studio.wireframe}</p>
          </div>
        </div>
      </Build>

      <Build at={2} x={-20} y={0} className="absolute top-[499px] left-[484px] w-[80px]">
        <svg viewBox="0 0 80 12" className="w-full" aria-hidden>
          <path d="M0 6h72M66 1l7 5-7 5" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Build>

      {dots.map(([x, y], i) => (
        <Dot key={i} x={x} y={y} index={i} />
      ))}

      <Build at={2} scale={0.7} y={0} className="absolute top-[300px] left-[592px] size-[408px]">
        <div className="grid size-full place-items-center rounded-full bg-white text-center text-navy-900 shadow-[0_0_0_14px_rgba(255,255,255,0.08),0_40px_90px_-30px_rgba(0,10,80,0.8)]">
          <div>
            <p className="display text-[40px] leading-[1.1]">
              {c.core.title[0]}
              <br />
              {c.core.title[1]}
            </p>
            <p className="mt-2 text-[18px] text-ink-soft">{c.core.detail}</p>
          </div>
        </div>
      </Build>

      {c.finds.map((f, i) => (
        <Find key={f.title} {...f} index={i} />
      ))}

      <Build at={4} y={16} className="absolute top-[772px] left-[596px] h-[64px] w-[400px]">
        <p className="grid size-full place-items-center rounded-[12px] bg-orange text-[25px] font-semibold text-navy-900 shadow-[0_16px_36px_-14px_rgba(80,40,0,0.7)]">{c.band}</p>
      </Build>

      <FooterLockup />
    </div>
  )
}

function Dot({ x, y, index }: { x: number; y: number; index: number }) {
  const on = useBuilt(2)
  const t = useBuildTransition(2, 0.3 + index * 0.05, 0.4)
  return (
    <motion.span
      aria-hidden
      className="absolute size-[30px] rounded-full bg-[#90d0fe]"
      style={{ left: x, top: y }}
      initial={false}
      animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0 }}
      transition={t}
    />
  )
}

/** One thing Knowledge finds: an orange handle on the hub, a connector, and its card. */
function Find({ title, detail, index }: { title: string; detail: string; index: number }) {
  const h = handles[index]
  const on = useBuilt(3)
  const t = useBuildTransition(3, index * 0.2, 0.6)
  const y = 240 + index * 128
  return (
    <>
      <motion.span
        aria-hidden
        className="absolute size-[40px] rounded-full bg-[#f79f2c]"
        style={{ left: h.x, top: h.y }}
        initial={false}
        animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0 }}
        transition={t}
      />
      <motion.span
        aria-hidden
        className="absolute h-[2px] origin-left bg-[#f79f2c]"
        style={{ left: h.x + 40, top: h.y + 19, width: h.line }}
        initial={false}
        animate={{ scaleX: on ? 1 : 0 }}
        transition={t}
      />
      <motion.div
        className="absolute flex h-[108px] w-[456px] flex-col justify-center rounded-[14px] bg-white px-[16px] text-navy-900 shadow-[0_16px_36px_-18px_rgba(0,10,80,0.8)]"
        style={{ left: 1084, top: y }}
        initial={false}
        animate={{ opacity: on ? 1 : 0, x: on ? 0 : 30 }}
        transition={t}
      >
        <p className="display text-[21px]">{title}</p>
        <p className="mt-1 text-[18px] text-ink-soft">{detail}</p>
      </motion.div>
    </>
  )
}
