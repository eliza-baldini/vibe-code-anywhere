import { motion } from 'motion/react'
import { easeOutExpo, timed, useSlideStep } from '../deck/Build'

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

/** "tableau from Salesforce" lockup in the slide's top-right corner, as on the template's content layouts. */
export function CornerLockup({ color = false }: { color?: boolean }) {
  return (
    <img
      src={asset(color ? 'brand/lockup-color.png' : 'brand/lockup-white.png')}
      alt="Tableau from Salesforce"
      className="pointer-events-none absolute top-[50px] right-[62px] w-[179px]"
    />
  )
}

/** Lockup in the bottom-right corner (statement layout). */
export function FooterLockup() {
  return <img src={asset('brand/lockup-statement.png')} alt="" className="pointer-events-none absolute right-[52px] bottom-[39px] w-[198px]" />
}

/** The template's three bars + sparkle motif, bottom-right of light slides. */
export function BarsMotif() {
  return <img src={asset('brand/bars.png')} alt="" aria-hidden className="pointer-events-none absolute right-[29px] bottom-0 w-[165px]" />
}

const sparkles = [
  { src: 'brand/sparkle.png', x: 1017, y: 663, s: 81, d: 0 },
  { src: 'brand/sparkle.png', x: 1419, y: 226, s: 60, d: 1.2 },
  { src: 'brand/sparkle.png', x: 1374, y: 267, s: 14, d: 2 },
  { src: 'brand/plus.png', x: 1075, y: 626, s: 21, d: 0.6 },
  { src: 'brand/plus.png', x: 983, y: 603, s: 31, d: 1.6 },
  { src: 'brand/plus.png', x: 1415, y: 299, s: 34, d: 2.4 },
]

/** The cover art: the white Tableau badge with twinkling sparkles. */
export function CoverArt({ instant }: { instant: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.img
        src={asset('brand/badge.png')}
        alt=""
        className="absolute"
        style={{ left: 1054, top: 281, width: 395, height: 395 }}
        initial={instant ? false : { scale: 0.4, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={instant ? { duration: 0 } : timed({ type: 'spring', stiffness: 120, damping: 15, delay: 0.5 })}
      />
      {sparkles.map((s, i) => (
        <motion.img
          key={i}
          src={asset(s.src)}
          alt=""
          className="absolute"
          style={{ left: s.x, top: s.y, width: s.s }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.08, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, delay: s.d, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/** Title lines that rise word by word from a clipping mask. */
export function RisingTitle({ lines, className = '' }: { lines: string[]; className?: string }) {
  const { settled } = useSlideStep()
  const instant = settled >= 0
  let n = 0
  return (
    <h1 className={`display text-white ${className}`}>
      {lines.map((line) => (
        <span key={line} className="block">
          {line.split(' ').map((word, i) => {
            const k = n++
            return (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={instant ? false : { y: '105%' }}
                  animate={{ y: 0 }}
                  transition={instant ? { duration: 0 } : timed({ duration: 1.1, delay: 0.2 + k * 0.08, ease: easeOutExpo })}
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            )
          })}
        </span>
      ))}
    </h1>
  )
}
