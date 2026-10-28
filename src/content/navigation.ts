/** Deck identity and its sections, in order. The deck has no divider slides; tab labels are web navigation. */
export const meta = {
  title: 'Vibe Code Anywhere. Governed Everywhere.',
  source: 'Vibe Code Anywhere, Governed Everywhere – External Video Deck (Draft)',
}

export interface DeckSection {
  id: string
  title: string
  /** Short label for the top bar tab. */
  tab: string
}

export const sections: DeckSection[] = [
  { id: 'opening', title: meta.title, tab: 'Opening' },
  { id: 'problem', title: 'Speed without trust', tab: 'The problem' },
  { id: 'platform', title: 'Vibe code anywhere. Stay governed everywhere.', tab: 'The platform' },
  { id: 'data-apps', title: 'Tableau Data Apps', tab: 'Data Apps' },
  { id: 'studio', title: 'Tableau Studio', tab: 'Studio' },
  { id: 'knowledge', title: 'Tableau Knowledge', tab: 'Knowledge' },
  { id: 'close', title: 'The speed of AI. The trust of Tableau.', tab: 'Close' },
]
