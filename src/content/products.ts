import type { Rich } from './types'

/** Slide 7 · The three products. */
export const overview = {
  title: ['Vibe code anywhere.', 'Stay governed everywhere.'],
  cards: [
    { title: 'Data Apps', tagline: 'Get vibe-coded apps onto the platform fast' },
    { title: 'Studio', tagline: 'Vibe code with the full power of Tableau' },
    { title: 'Knowledge', tagline: 'Reuse what your business already knows' },
  ],
}

export interface Release {
  where: string
  when: string
}

/** Slide 8 · Tableau Data Apps. */
export const dataApps = {
  title: 'Tableau Data Apps',
  subtitle: ['Custom analytics built on trusted', 'semantics and hosted in Tableau'],
  points: [
    'Build conversationally from anywhere',
    'Stay connected to live, governed data and trusted semantics in Tableau',
    'Publish, host, and share seamlessly to Tableau Next, Cloud, and Server',
    'Maintain control with built-in governance, query inspection, and data verification',
  ],
  releases: [
    { where: 'Tableau Cloud & Next', when: 'Beta | Oct ‘26' },
    { where: 'Tableau Cloud, Server & Next', when: 'GA | Nov ‘26' },
  ] as Release[],
}

/** Slide 10 · Tableau Studio. */
export const studio = {
  title: 'Tableau Studio',
  subtitle: ['Vibe code analytics with', 'enterprise trust and governance'],
  points: [
    'Explore your data through conversational AI',
    'Author on analytics-specific agent skills',
    'Ground in governed data and trusted semantics',
    'Vibe code data apps safely at scale',
  ],
  releases: [{ where: 'Tableau Cloud & Server', when: 'GA | Nov ‘26' }] as Release[],
}

/** Slide 12 · Tableau Knowledge. */
export const knowledge = {
  title: 'Tableau Knowledge',
  subtitle: ['Power trustworthy AI agents with', 'unified enterprise knowledge'],
  points: [
    'Unify all your knowledge—including Tableau assets—in one central repository for agents',
    'Automatically generate knowledge graphs, then curate and optimize for your business',
    'Empower any agent to deliver trusted analytics and accurate insights',
  ],
  releases: [
    { where: 'Tableau Cloud', when: 'GA | Sep ‘26' },
    { where: 'Tableau Server', when: 'GA | Dec ‘26' },
    { where: 'Tableau Next', when: 'GA | H1 ‘27' },
  ] as Release[],
  sources: 'Bring in knowledge built in **Tableau** and **any other source**' as Rich,
  /** Source logos left to right; the slide ends the row with PDF and DOC file icons. */
  sourceLogos: ['src-tableau', 'src-2', 'src-3', 'src-4'],
  sourceFiles: ['PDF', 'DOC'],
  agents: 'Connect to **any AI agent**' as Rich,
  agentLogos: ['ag-1', 'ag-2', 'ag-3', 'ag-4', 'ag-5', 'ag-6', 'ag-7'],
}

/** Slide 13 · Every new build starts from what your business already knows. */
export const nucleus = {
  title: 'Every new build starts from [[what your business already knows]]',
  studio: { title: 'Tableau Studio', ask: '“I need an analysis of AI agent adoption. Here’s a quick wireframe.”', wireframe: 'Wireframe' },
  core: { title: ['Tableau', 'Knowledge'], detail: 'All your content on Tableau' },
  finds: [
    { title: 'Where it fits', detail: 'AI programs project, next to related work' },
    { title: 'Certified data source', detail: 'Agent activity, already published' },
    { title: 'Business definitions', detail: 'Adoption rate and active agent, defined once' },
    { title: 'Existing workbook', detail: 'Agent usage overview may answer most of it' },
  ],
  band: 'Iterate instead of rebuilding',
}
