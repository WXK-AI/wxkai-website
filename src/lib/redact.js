export const SPECIMEN_TEXT = 'Email Dr. Lim at nora.lim@clinic.my the scan from 12 March.'

export const PATTERNS = [
  { type: 'PERSON', regex: /Dr\.\s+Lim/g },
  { type: 'EMAIL', regex: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi },
  { type: 'DATE', regex: /\b\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\b/g },
]

export function findSpans(text) {
  return PATTERNS.flatMap(({ type, regex }) => {
    const copy = new RegExp(regex.source, regex.flags)
    return [...text.matchAll(copy)].map((match) => ({
      type,
      value: match[0],
      start: match.index,
      end: match.index + match[0].length,
    }))
  }).sort((a, b) => a.start - b.start)
}

export function splitText(text, spans) {
  const parts = []
  let cursor = 0
  spans.forEach((span) => {
    if (span.start < cursor) return
    if (span.start > cursor) {
      parts.push({ text: text.slice(cursor, span.start) })
    }
    parts.push({ text: span.value, type: span.type })
    cursor = span.end
  })
  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor) })
  }
  return parts
}
