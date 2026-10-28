import type { ComponentType } from 'react'
import { closing, cover } from '../content/opening'
import { sections } from '../content/navigation'
import { Cover, ForwardLooking, ThankYou } from '../slides/Cover'
import { LayerGrid, layerSteps } from '../slides/LayerGrid'
import { Nucleus } from '../slides/Nucleus'
import { Problem, problemSteps } from '../slides/Problem'
import { DataApps, Knowledge, Overview, Studio } from '../slides/Products'

/** Design size of every slide; the stage scales it to fit the screen. */
export const CANVAS_W = 1600
export const CANVAS_H = 900

export type Surface = 'paper' | 'navy' | 'blue' | 'split'

const bg = (file: string) => `url(${import.meta.env.BASE_URL}brand/${file}) center / cover no-repeat`

/** Slide background, also used to fill the letterbox around the canvas. `blue` is the deck's own gradient art. */
export const surfaceBg: Record<Surface, string> = {
  paper: '#cfe9fe',
  navy: '#000f33',
  blue: `${bg('bg-blue.jpg')}, #0a3ad8`,
  /** Blue panel on the left, light sky on the right (product slides 10 and 12). */
  split: `${bg('bg-split.jpg')}, #cfe9fe`,
}

export interface SlideDef {
  id: string
  /** Position in the app. */
  number: number
  title: string
  /** Section tab this slide belongs to. */
  chapter: string
  /** Number of build states (1 = no builds). */
  steps: number
  /**
   * Milliseconds to wait before each automatic build: pace[0] is the wait after the slide
   * arrives before build 1, pace[1] before build 2, and so on. Falls back to DEFAULT_PACE.
   */
  pace?: number[]
  surface: Surface
  /**
   * Consecutive slides with the same group share one canvas: moving between them keeps the
   * component mounted (no slide transition) and only its props change, so it can build on itself.
   */
  group?: string
  props?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- each slide pairs Component with its own props
  Component: ComponentType<any>
}

export const with_ = <P extends object>(C: ComponentType<P>, props: P): ComponentType => () => <C {...props} />

type Entry = Omit<SlideDef, 'number' | 'chapter'>

/**
 * Slides per deck section, in deck order. Each entry: id (also the URL hash), title, steps (build states,
 * 1 = none), pace (ms before each auto-build), surface, Component.
 *
 * Slides that build on one diagram share a `group` and one Component with different `props`:
 * moving between them keeps the canvas mounted, so only the changes animate. Example:
 *   { id: 'arch-today', group: 'arch', Component: Architecture, props: { stage: 'today' }, ... },
 *   { id: 'arch-roadmap', group: 'arch', Component: Architecture, props: { stage: 'roadmap' }, ... },
 * Variants of one template that should transition normally use with_(Component, props) instead.
 */
const bySection: Record<string, Entry[]> = {
  opening: [
    { id: 'cover', title: 'Vibe Code Anywhere. Governed Everywhere.', steps: 1, surface: 'blue', Component: with_(Cover, { lines: cover.lines }) },
    { id: 'forward-looking', title: 'Forward-looking statements', steps: 1, surface: 'blue', Component: ForwardLooking },
  ],
  problem: [
    { id: 'speed', title: 'Anyone can vibe code a dashboard in minutes…', steps: problemSteps.speed, pace: [700], surface: 'blue', group: 'problem', Component: Problem, props: { stage: 'speed' } },
    { id: 'trust', title: '…but speed without trust leads to Excel hell: AI edition', steps: problemSteps.trust, pace: [900, 900], surface: 'blue', group: 'problem', Component: Problem, props: { stage: 'trust' } },
    { id: 'layers-tableau', title: 'Tableau content inherits 18 layers', steps: layerSteps.tableau, pace: [500], surface: 'blue', group: 'layers', Component: LayerGrid, props: { view: 'tableau' } },
    { id: 'layers-vibe', title: 'A vibe-coded app starts with none of them', steps: layerSteps.vibe, surface: 'blue', group: 'layers', Component: LayerGrid, props: { view: 'vibe' } },
  ],
  platform: [{ id: 'platform', title: 'Vibe code anywhere. Stay governed everywhere.', steps: 4, pace: [600, 450, 450], surface: 'paper', Component: Overview }],
  'data-apps': [
    { id: 'data-apps', title: 'Tableau Data Apps', steps: 3, pace: [600, 900], surface: 'blue', Component: DataApps },
    { id: 'layers-data-apps', title: 'Data Apps covers half the stack on day one', steps: layerSteps.dataApps, pace: [500], surface: 'blue', Component: with_(LayerGrid, { view: 'dataApps' }) },
  ],
  studio: [
    { id: 'studio', title: 'Tableau Studio', steps: 4, pace: [600, 900, 700], surface: 'split', Component: Studio },
    { id: 'layers-studio', title: 'Studio apps inherit 17 of 18 layers', steps: layerSteps.studio, pace: [500], surface: 'blue', Component: with_(LayerGrid, { view: 'studio' }) },
  ],
  knowledge: [
    { id: 'knowledge', title: 'Tableau Knowledge', steps: 5, pace: [600, 900, 700, 600], surface: 'split', Component: Knowledge },
    { id: 'knowledge-hub', title: 'Every new build starts from what your business already knows', steps: 5, pace: [600, 700, 800, 900], surface: 'blue', Component: Nucleus },
  ],
  close: [
    { id: 'closing', title: 'The speed of AI. The trust of Tableau.', steps: 1, surface: 'blue', Component: with_(Cover, { lines: closing.lines }) },
    { id: 'thank-you', title: 'Thank you', steps: 1, surface: 'blue', Component: ThankYou },
  ],
}

export const slides: SlideDef[] = sections
  .flatMap((sec) => (bySection[sec.id] ?? []).map((s) => ({ ...s, chapter: sec.id })))
  .map((s, i) => ({ ...s, number: i + 1 }))

/** Tabs for the top bar: one per deck section, pointing at its first slide. */
export const sectionTabs = sections
  .map((s) => ({ id: s.id, label: s.tab, first: slides.findIndex((sl) => sl.chapter === s.id) }))
  .filter((t) => t.first >= 0)

const DEFAULT_PACE = 600

/** Multiplier on every slide's pacing: below 1 is faster, above 1 slower. */
export const PACE_SCALE = 1.25

/** Delay before advancing from `step` to `step + 1` on slide `index`. */
export function buildDelay(index: number, step: number) {
  return (slides[index].pace?.[step] ?? DEFAULT_PACE) * PACE_SCALE
}
