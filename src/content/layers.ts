/* Slides 5, 6, 9, 11 · The 18-layer governance grid, shown for four kinds of content. */

export type Coverage = 'covered' | 'partial' | 'missing'
export type LayerView = 'tableau' | 'vibe' | 'dataApps' | 'studio'

export const columns = [
  { title: 'Hosting', layers: ['Network access', 'Uptime & scaling', 'Patching', 'Compliance'] },
  { title: 'Data', layers: ['Secure connections', 'Pipeline history', 'Lineage & impact'] },
  { title: 'Semantics', layers: ['Certified data', 'Shared logic', 'Data quality'] },
  { title: 'Access', layers: ['SSO & sign-in', 'Permissions', 'Row-level security', 'Audit logging'] },
  { title: 'Experience', layers: ['Ownership', 'Discoverability', 'Subscriptions', 'Consistent UX'] },
]

export const legend: { kind: Coverage; label: string }[] = [
  { kind: 'covered', label: 'Covered' },
  { kind: 'partial', label: 'Partial' },
  { kind: 'missing', label: 'Not covered' },
]

const all = (c: Coverage): Record<string, Coverage> => Object.fromEntries(columns.flatMap((col) => col.layers).map((l) => [l, c]))

interface View {
  /** Title with the highlighted phrase in [[…]]. */
  title: string
  subtitle: string
  count: string
  countLabel: string
  coverage: Record<string, Coverage>
  /** One-line notes under each layer (slide 6 only). */
  details?: Record<string, string>
}

export const views: Record<LayerView, View> = {
  tableau: {
    title: 'Tableau content inherits [[18 layers]]',
    subtitle: 'Governance built and hardened over 20 years. Everything published to Tableau gets all 18 by default.',
    count: '18 of 18',
    countLabel: 'covered',
    coverage: all('covered'),
  },
  vibe: {
    title: 'A vibe-coded app starts with [[none of them]]',
    subtitle: 'Every builder has to solve each layer alone, and most don’t.',
    count: '0 of 18',
    countLabel: 'covered',
    coverage: all('missing'),
    details: {
      'Network access': 'Public URL or someone’s VPN',
      'Uptime & scaling': 'Down until the builder notices',
      Patching: 'Libraries go unpatched',
      Compliance: 'No certified hosting',
      'Secure connections': 'Credentials in app code',
      'Pipeline history': 'Transforms run ad hoc',
      'Lineage & impact': 'No view of what breaks',
      'Certified data': 'Built from exports',
      'Shared logic': 'Revenue defined per app',
      'Data quality': 'Stale looks like fresh',
      'SSO & sign-in': 'Shared links, homegrown logins',
      Permissions: 'Anyone with the link sees all',
      'Row-level security': 'One account sees every row',
      'Audit logging': 'No record of who saw what',
      Ownership: 'Orphaned when builder leaves',
      Discoverability: 'Found by link, then rebuilt',
      Subscriptions: 'No alerts or mobile',
      'Consistent UX': 'Every app looks different',
    },
  },
  dataApps: {
    title: 'Data Apps covers [[half the stack]] on day one',
    subtitle: 'Hosting, sign-in, permissions, audit and ownership come with Tableau. Business logic still lives in the app’s code.',
    count: '9 of 18',
    countLabel: 'covered · 7 partial',
    coverage: {
      ...all('covered'),
      Patching: 'partial',
      'Pipeline history': 'partial',
      'Lineage & impact': 'partial',
      'Certified data': 'partial',
      'Shared logic': 'missing',
      'Data quality': 'partial',
      'Row-level security': 'partial',
      Subscriptions: 'partial',
      'Consistent UX': 'missing',
    },
  },
  studio: {
    title: 'Studio apps inherit [[17 of 18 layers]]',
    subtitle: 'Built on Tableau’s semantic layer, security model and viz engine. Review custom extensions for consistent UX.',
    count: '17 of 18',
    countLabel: 'covered · 1 partial',
    coverage: { ...all('covered'), 'Consistent UX': 'partial' },
  },
}
