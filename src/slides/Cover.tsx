import { motion } from 'motion/react'
import { forwardLooking, thanks } from '../content/opening'
import { Build, easeOutExpo, timed, useSlideStep } from '../deck/Build'
import { CornerLockup, CoverArt, RisingTitle, asset } from './Brand'

/** Slides 1 and 14 · Cover-style statement: lockup, title, Tableau badge with sparkles. */
export function Cover({ lines }: { lines: string[] }) {
  const { settled } = useSlideStep()
  const instant = settled >= 0
  return (
    <div className="relative h-full">
      <motion.img
        src={asset('brand/lockup-white.png')}
        alt="Tableau from Salesforce"
        className="absolute top-[87px] left-[84px] w-[273px]"
        initial={instant ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={timed({ duration: 0.8, delay: instant ? 0 : 0.1 })}
      />
      <div className="absolute top-[75px] left-[75px] flex h-[469px] w-[980px] items-center pt-[200px]">
        <RisingTitle lines={lines} className="text-[82px] leading-[1.08] whitespace-nowrap" />
      </div>
      <CoverArt instant={instant} />
    </div>
  )
}

/** Slide 2 · Forward-looking statements. */
export function ForwardLooking() {
  return (
    <div className="relative h-full px-[75px] pt-[66px]">
      <Build y={14}>
        <h2 className="display text-[52px] text-white">{forwardLooking.title}</h2>
      </Build>
      <CornerLockup />
      <Build at={0} delay={0.25} y={24} className="mt-[86px]">
        <div className="rounded-[18px] bg-white px-[42px] py-[34px] shadow-[0_30px_80px_-30px_rgba(0,20,120,0.6)]">
          <p className="text-[17.5px] leading-[1.6] text-navy-900">{forwardLooking.body}</p>
        </div>
      </Build>
    </div>
  )
}

const tySparkles = [
  { src: 'brand/sparkle.png', x: 1148, y: 256, s: 52, d: 0 },
  { src: 'brand/sparkle.png', x: 413, y: 398, s: 88, d: 1.3 },
  { src: 'brand/plus.png', x: 394, y: 477, s: 39, d: 0.7 },
  { src: 'brand/plus.png', x: 1126, y: 248, s: 23, d: 2 },
]

/** Slide 15 · Thank you, with the Tableau badge as the "o". */
export function ThankYou() {
  const { settled } = useSlideStep()
  const instant = settled >= 0
  const rise = (delay: number) => (instant ? { duration: 0 } : timed({ duration: 1.1, delay, ease: easeOutExpo }))
  return (
    <div className="relative h-full text-white">
      <img src={asset('brand/lockup-white.png')} alt="Tableau from Salesforce" className="absolute top-[191px] left-[684px] w-[225px]" />
      <div className="display absolute inset-x-0 top-[262px] text-center text-[230px] leading-[0.82] tracking-[-0.04em]">
        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span className="inline-block" initial={instant ? false : { y: '105%' }} animate={{ y: 0 }} transition={rise(0.2)}>
            {thanks.first}
          </motion.span>
        </span>
        <span className="-mt-[0.1em] flex items-end justify-center overflow-hidden pb-[0.22em]">
          <motion.span className="inline-block" initial={instant ? false : { y: '105%' }} animate={{ y: 0 }} transition={rise(0.35)}>
            {thanks.second[0]}
          </motion.span>
          <motion.img
            src={asset('brand/badge.png')}
            alt="o"
            className="mx-[4px] mb-[10px] size-[181px]"
            initial={instant ? false : { scale: 0.3, rotate: -40, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={instant ? { duration: 0 } : timed({ type: 'spring', stiffness: 140, damping: 14, delay: 0.6 })}
          />
          <motion.span className="inline-block" initial={instant ? false : { y: '105%' }} animate={{ y: 0 }} transition={rise(0.45)}>
            {thanks.second[1]}
          </motion.span>
        </span>
      </div>
      {tySparkles.map((s, i) => (
        <motion.img
          key={i}
          src={asset(s.src)}
          alt=""
          aria-hidden
          className="absolute"
          style={{ left: s.x, top: s.y, width: s.s }}
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.08, 0.85] }}
          transition={timed({ duration: 4, repeat: Infinity, delay: s.d, ease: 'easeInOut' })}
        />
      ))}
    </div>
  )
}
