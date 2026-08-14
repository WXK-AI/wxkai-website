import { CONTENTS } from '../data/sections.js'
import Chapter from './Chapter.jsx'

export default function Contents() {
  return (
    <Chapter id="contents" title="Contents" variant="leaf">
      <ol className="contents">
        {CONTENTS.map((entry) => (
          <li key={entry.n}>
            <a href={entry.href}>
              <span className="n">{entry.n}</span>
              <span>
                <strong>{entry.title}</strong>
                <span className="descriptor">{entry.descriptor}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </Chapter>
  )
}
