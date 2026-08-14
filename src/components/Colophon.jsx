import { colophon, person } from '../data/copy.js'
import { printCopy, useCopyAddress } from '../lib/clipboard.js'
import Chapter from './Chapter.jsx'

export default function Colophon() {
  const { status, failed, fallbackRef, copyAddress } = useCopyAddress()

  return (
    <Chapter id="colophon" title="Colophon" variant="leaf">
      <div className="biblio">
        <p>{person.name}</p>
        <p>{person.degree}</p>
        <p>{person.school}</p>
        <p>{person.place}</p>
        <p className="block">
          <a ref={fallbackRef} href={`mailto:${person.email}`}>{person.email}</a>
        </p>
        <p>
          <a href={person.github} target="_blank" rel="noreferrer">github.com/WXK-AI</a>
        </p>
        <p>
          <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </div>
      <div className="colophon-actions">
        <button className="doc-button" type="button" onClick={copyAddress}>
          Copy address
        </button>
        <button className="doc-button" type="button" onClick={printCopy}>
          Print this copy
        </button>
      </div>
      <p className="copy-live" aria-live="polite">
        {status}
        {failed ? <span className="visually-hidden"> {person.email}</span> : null}
      </p>
      <div className="colophon-limits">
        {colophon.doesNot.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </Chapter>
  )
}
