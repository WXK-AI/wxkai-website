import { useMemo, useState } from 'react'
import { genguard } from '../data/copy.js'
import { findSpans, SPECIMEN_TEXT, splitText } from '../lib/redact.js'
import { useFineHover } from '../lib/media.js'

export default function Specimen({ committed, onToggle }) {
  const [preview, setPreview] = useState(false)
  const fineHover = useFineHover()
  const spans = useMemo(() => findSpans(SPECIMEN_TEXT), [])
  const parts = useMemo(() => splitText(SPECIMEN_TEXT, spans), [spans])
  const types = spans.map((span) => span.type)
  const shown = committed || (fineHover && preview)
  const status = committed
    ? `${types.join(', ')} marked.`
    : preview && fineHover
      ? 'Preview. Click to commit the marks.'
      : 'No marks committed.'

  const setPreviewSafe = (value) => {
    if (!fineHover) return
    setPreview(value)
  }

  const toggle = () => onToggle()

  return (
    <figure className="specimen">
      <div className="specimen-ticks">
        {types.map((type) => (
          <button
            key={type}
            className={committed ? 'tick is-on' : 'tick'}
            type="button"
            aria-pressed={committed}
            aria-label={`${committed ? 'Clear' : 'Mark'} ${type}`}
            onClick={toggle}
            onMouseEnter={() => setPreviewSafe(true)}
            onMouseLeave={() => setPreviewSafe(false)}
          >
            <span className="tick-mark" aria-hidden="true" />
            <span>{committed || shown ? type : ''}</span>
          </button>
        ))}
      </div>
      <blockquote className="specimen-quote">
        <button
          className="specimen-toggle"
          type="button"
          aria-pressed={committed}
          aria-describedby="specimen-status"
          onClick={toggle}
          onMouseEnter={() => setPreviewSafe(true)}
          onMouseLeave={() => setPreviewSafe(false)}
        >
          “
          {parts.map((part, index) => (
            part.type ? (
              <span
                key={`${part.type}-${index}`}
                className={`strike${committed ? ' is-on' : shown ? ' is-preview' : ''}`}
              >
                {part.text}
              </span>
            ) : (
              <span key={`text-${index}`}>{part.text}</span>
            )
          ))}
          ”
        </button>
      </blockquote>
      <p id="specimen-status" className="specimen-status" aria-live="polite">
        {status}
      </p>
      <figcaption>{genguard.specimenCaption}</figcaption>
    </figure>
  )
}
