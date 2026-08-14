import { indexActions, particularsIndex } from './copy.js'
import { SECTIONS } from './sections.js'

function gatheringLabel(section) {
  if (section.roman && section.title.startsWith(`${section.roman}. `)) {
    return section.title.slice(section.roman.length + 2)
  }
  return section.title
}

function gatheringLocator(section) {
  if (section.roman) return section.roman
  if (section.id === 'particulars') return '00'
  return ''
}

export function getIndexEntries() {
  const gatherings = SECTIONS.map((section) => ({
    id: `index-${section.id}`,
    kind: 'gathering',
    sectionId: section.id,
    href: `#${section.id}`,
    label: gatheringLabel(section),
    locator: gatheringLocator(section),
  }))

  const particularsAt = gatherings.findIndex((entry) => entry.sectionId === 'particulars')
  const records = particularsIndex.map((entry) => ({
    id: `index-${entry.id}`,
    kind: 'record',
    sectionId: 'particulars',
    href: entry.href,
    label: entry.label,
    locator: '',
  }))

  const actions = indexActions.map((action) => ({
    id: `index-${action.id}`,
    kind: 'action',
    action: action.id,
    label: action.label,
    locator: '',
  }))

  return [
    ...gatherings.slice(0, particularsAt + 1),
    ...records,
    ...gatherings.slice(particularsAt + 1),
    ...actions,
  ]
}

export const INDEX_ENTRIES = getIndexEntries()

export function resolveSection(id) {
  return (
    SECTIONS.find((section) => section.id === id) ??
    SECTIONS.find((section) => id.startsWith(`${section.id}-`)) ??
    null
  )
}
