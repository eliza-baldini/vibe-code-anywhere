import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { dataApps, knowledge, overview, studio, type Release } from '../content/products'
import { Build, timed, useBuildTransition, useBuilt } from '../deck/Build'
import { RichText } from '../components/ui/RichText'
import { BarsMotif, CornerLockup, FooterLockup, asset } from './Brand'

/* ------------------------------------------------------------------ */
/* Slide 7 · The three products                                        */
/* ------------------------------------------------------------------ */

/** Builds: 0 title · 1–3 each product card. */
export function Overview() {
  return (
    <div className="relative h-full text-navy-900">
      <Build y={14} className="absolute top-[70px] left-[75px]">
        <h2 className="display text-[64px] leading-[1.12]">
          {overview.title[0]}
          <br />
          <span className="text-[#066afe]">{overview.title[1]}</span>
        </h2>
      </Build>
      <CornerLockup color />
      <BarsMotif />

      {overview.cards.map((card, i) => (
        <Build key={card.title} at={i + 1} y={40} className="absolute top-[261px] h-[591px] w-[450px]" style={{ left: 75 + i * 500 }}>
          <article className="relative h-full overflow-hidden rounded-[28px] bg-white/80 shadow-[0_24px_60px_-30px_rgba(0,30,91,0.45)] ring-1 ring-white">
            <div className="absolute inset-x-0 top-0 h-[440px]">{cardArt[i]}</div>
            <div className="absolute inset-x-[29px] bottom-[34px]">
              <h3 className="display text-[38px] leading-tight">{card.title}</h3>
              <p className="mt-2 text-[25px] leading-snug">{card.tagline}</p>
            </div>
          </article>
        </Build>
      ))}
    </div>
  )
}

const shadow = 'shadow-[0_18px_40px_-18px_rgba(0,30,91,0.55)]'

/** Each card's product imagery, positioned inside the card as on the slide. */
const cardArt: ReactNode[] = [
  <img key="d" src={asset('products/dataapps-still.jpg')} alt="Data Apps" className={`absolute top-[119px] left-[29px] w-[392px] rounded-[8px] ${shadow}`} />,
  <div key="s">
    <img src={asset('products/studio-globe.jpg')} alt="Tableau Studio" className={`absolute top-[99px] left-[19px] w-[412px] rounded-[8px] ${shadow}`} />
    <img src={asset('products/studio-skills.png')} alt="" className={`absolute top-[41px] left-[6px] w-[147px] rounded-[10px] ${shadow}`} />
    <img src={asset('products/studio-agent.png')} alt="" className={`absolute top-[189px] left-[295px] w-[147px] rounded-[10px] ${shadow}`} />
  </div>,
  <img key="k" src={asset('products/knowledge-graph.jpg')} alt="Knowledge graph" className={`absolute top-[21px] left-[39px] w-[372px] rounded-[10px] ${shadow}`} />,
]

/* ------------------------------------------------------------------ */
/* Slides 8, 10, 12 · One product each                                 */
/* ------------------------------------------------------------------ */

interface ProductLayout {
  title: string
  titleClass: string
  subtitle: string[]
  points: string[]
  releases: Release[]
  /** Top of the subtitle, points and first release pill on the 900px canvas. */
  top: { title: number; points: number; releases: number }
  pointsWidth: number
}

function ProductText({ p }: { p: ProductLayout }) {
  return (
    <div className="absolute inset-y-0 left-[61px] text-white" style={{ width: p.pointsWidth }}>
      <Build y={14} className="absolute left-0" style={{ top: p.top.title }}>
        <h2 className={`display text-[60px] leading-tight ${p.titleClass}`}>{p.title}</h2>
        <p className="display mt-1 text-[29px] leading-[1.2]">
          {p.subtitle[0]}
          <br />
          {p.subtitle[1]}
        </p>
      </Build>
      <ul className="absolute left-0 space-y-[22px]" style={{ top: p.top.points }}>
        {p.points.map((pt, i) => (
          <Build key={pt} at={1} delay={i * 0.12} x={-20} y={0}>
            <li className="text-[25px] leading-[1.3]">{pt}</li>
          </Build>
        ))}
      </ul>
      <div className="absolute left-0 w-[516px] space-y-[12px]" style={{ top: p.top.releases }}>
        {p.releases.map((r, i) => (
          <Build key={r.where} at={1} delay={0.5 + i * 0.12} y={12}>
            <p className="flex h-[52px] items-center justify-between rounded-[10px] bg-white px-[16px] text-[20px] shadow-[0_10px_24px_-14px_rgba(0,10,80,0.7)]">
              <span className="display text-navy-900">{r.where}</span>
              <span className="font-semibold text-[#0b5cd5]">{r.when}</span>
            </p>
          </Build>
        ))}
      </div>
    </div>
  )
}

/** A product screenshot in the white device frame used on the slides. */
function Device({ src, alt, x, y, w, h, at }: { src: string; alt: string; x: number; y: number; w: number; h: number; at: number }) {
  return (
    <Build at={at} x={60} y={0} scale={0.97} className="absolute" style={{ left: x, top: y, width: w, height: h }}>
      <div className="size-full rounded-[34px] bg-white p-[14px] shadow-[0_40px_90px_-30px_rgba(0,10,80,0.8)]">
        <img src={asset(src)} alt={alt} className="size-full rounded-[22px] object-cover object-top" />
      </div>
    </Build>
  )
}

/** Small floating UI panels that pop in over the main screenshot. */
function Panel({ src, x, y, w, at, delay }: { src: string; x: number; y: number; w: number; at: number; delay: number }) {
  const on = useBuilt(at)
  const t = useBuildTransition(at, delay, 0.6)
  return (
    <motion.img
      src={asset(src)}
      alt=""
      className="absolute rounded-[14px] shadow-[0_24px_50px_-20px_rgba(0,10,80,0.8)]"
      style={{ left: x, top: y, width: w }}
      initial={false}
      animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.8, y: on ? 0 : 20 }}
      transition={t}
    />
  )
}

/** Slide 8 · Builds: 0 title · 1 points and releases · 2 the app. */
export function DataApps() {
  return (
    <div className="relative h-full">
      <ProductText
        p={{ ...dataApps, titleClass: 'text-orange', top: { title: 62, points: 244, releases: 712 }, pointsWidth: 600 }}
      />
      <Device src="products/dataapps.gif" alt="Building a data app conversationally in Tableau" x={786} y={199} w={753} h={460} at={2} />
      <FooterLockup />
    </div>
  )
}

/** Slide 10 · Builds: 0 title · 1 points and release · 2 the app · 3 the skills and agent panels. */
export function Studio() {
  return (
    <div className="relative h-full">
      <ProductText p={{ ...studio, titleClass: 'text-orange', top: { title: 160, points: 372, releases: 758 }, pointsWidth: 640 }} />
      <Sparkles />
      <Device src="products/studio-main.jpg" alt="Tableau Studio" x={860} y={275} w={654} h={408} at={2} />
      <Panel src="products/studio-skills-lg.png" x={795} y={470} w={207} at={3} delay={0} />
      <Panel src="products/studio-agent-lg.png" x={1344} y={220} w={232} at={3} delay={0.18} />
      <CornerLockup color />
      <BarsMotif />
    </div>
  )
}

/** Slide 12 · Builds: 0 title · 1 points and releases · 2 the knowledge graph · 3 sources · 4 agents. */
export function Knowledge() {
  return (
    <div className="relative h-full">
      <ProductText
        p={{ ...knowledge, titleClass: 'text-cyan', top: { title: 160, points: 356, releases: 660 }, pointsWidth: 640 }}
      />
      <Sparkles />
      <Device src="products/knowledge.gif" alt="Tableau Knowledge graph" x={786} y={288} w={791} h={402} at={2} />

      <Build at={3} y={-16} className="absolute top-[158px] left-[873px] h-[84px] w-[679px]">
        <div className="flex size-full items-center gap-[10px] rounded-[18px] bg-white px-[22px] shadow-[0_18px_40px_-20px_rgba(0,30,91,0.6)] ring-1 ring-[#cfe3ff]">
          {knowledge.sourceLogos.map((l) => (
            <img key={l} src={asset(`logos/${l}.png`)} alt="" className="h-[44px] w-[44px] object-contain" />
          ))}
          {knowledge.sourceFiles.map((f) => (
            <span key={f} className="grid h-[46px] w-[38px] place-items-center rounded-[6px] border-2 border-navy-900 text-[11px] font-bold text-navy-900">
              {f}
            </span>
          ))}
          <p className="ml-3 text-[19px] leading-tight text-navy-900 [&_.font-semibold]:font-bold">
            <RichText text={knowledge.sources} />
          </p>
        </div>
      </Build>

      <Build at={4} y={16} className="absolute top-[738px] left-[873px] h-[84px] w-[614px]">
        <div className="flex size-full items-center gap-[12px] rounded-[18px] bg-white px-[22px] shadow-[0_18px_40px_-20px_rgba(0,30,91,0.6)] ring-1 ring-[#cfe3ff]">
          <p className="mr-2 w-[150px] shrink-0 text-[19px] leading-tight text-navy-900 [&_.font-semibold]:font-bold">
            <RichText text={knowledge.agents} />
          </p>
          {knowledge.agentLogos.map((l) => (
            <img key={l} src={asset(`logos/${l}.png`)} alt="" className="h-[44px] w-[44px] rounded-[10px] object-contain" />
          ))}
        </div>
      </Build>

      <CornerLockup color />
      <BarsMotif />
    </div>
  )
}

/** Blue sparkles that sit on the split layouts. */
function Sparkles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {[
        { x: 954, y: 151, s: 33, d: 0 },
        { x: 1492, y: 698, s: 48, d: 1.4 },
      ].map((s, i) => (
        <motion.img
          key={i}
          src={asset('brand/sparkle-blue.png')}
          alt=""
          className="absolute"
          style={{ left: s.x, top: s.y, width: s.s }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.1, 0.85] }}
          transition={timed({ duration: 4, repeat: Infinity, delay: s.d, ease: 'easeInOut' })}
        />
      ))}
    </div>
  )
}
