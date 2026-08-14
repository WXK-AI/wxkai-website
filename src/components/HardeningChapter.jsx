import { useState } from 'react'
import { hardening } from '../data/copy.js'
import { findings, remediatedCount } from '../data/findings.js'
import Chapter from './Chapter.jsx'
import Register from './Register.jsx'

export default function HardeningChapter() {
  const [scopeNote, setScopeNote] = useState('')

  return (
    <Chapter
      id="iii"
      numeral="III"
      title={hardening.title}
      mark={(
        <>
          <p className="mark-kicker">Scope</p>
          <p className="mark-metric">{remediatedCount} / {findings.length}</p>
          {scopeNote ? <p className="mark-proof">{scopeNote}</p> : null}
        </>
      )}
    >
      {hardening.paragraphs.map((line) => (
        <p key={line}>{line}</p>
      ))}
      <p className="count-line">
        <strong>{hardening.countLine}</strong>
        {' '}
        {hardening.ledger}
      </p>
      <p>{hardening.unnamedNote}</p>
      <Register onScopeNote={setScopeNote} />
    </Chapter>
  )
}
