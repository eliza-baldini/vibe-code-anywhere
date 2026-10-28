import type { Rich } from './types'

/** Dashboard screenshots on slides 3–4, positioned on the 1600×900 canvas as on the slide. */
export const shots = [
  { id: 'capital', x: 699, y: -12, w: 220, h: 334 },
  { id: 'facility', x: 950, y: -12, w: 227, h: 334 },
  { id: 'shipments', x: 1201, y: -20, w: 450, h: 429 },
  { id: 'apex', x: 700, y: 354, w: 477, h: 320 },
  { id: 'support', x: 1199, y: 447, w: 227, h: 226 },
  { id: 'traffic', x: 1449, y: 447, w: 227, h: 227 },
  { id: 'marketpro', x: 700, y: 706, w: 657, h: 252 },
]

/** Slide 3 · Anyone can vibe code a dashboard. */
export const speed = {
  title: 'Anyone can vibe code a dashboard in minutes…' as Rich,
  /** The highlighted phrase (deck accent). */
  highlight: 'vibe code a dashboard',
}

/** Slide 4 · …but speed without trust. Callouts sit over the dimmed screenshots. */
export const trust = {
  title: ['…but speed', 'without trust', 'leads to '],
  danger: ['Excel hell:', 'AI edition'],
  callouts: [
    { text: 'Built on raw data instead of trusted semantics', icon: 'alert', x: 796, y: 292, iconX: 900, iconY: 222, iconSize: 72 },
    { text: 'Shared with users who don’t have permissions', icon: 'caution', x: 1155, y: 406, iconX: 1104, iconY: 391, iconSize: 92 },
    { text: 'Rebuilt and reshared each week for regular standup', icon: 'question', x: 936, y: 662, iconX: 879, iconY: 665, iconSize: 76 },
  ],
  risks: ['Decisions on inaccurate information', 'Governance and security risk', 'Dashboard and app sprawl'],
}
