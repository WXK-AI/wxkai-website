import { useState } from 'react'
import { genguard, microcopy } from '../data/copy.js'
import Chapter from './Chapter.jsx'
import Plate from './Plate.jsx'
import Specimen from './Specimen.jsx'

const SPECIMEN_TYPES = ['PERSON', 'EMAIL', 'DATE']

function withTitle(text, title) {
  const index = text.indexOf(title)
  if (index === -1) return text
  return (
    <>
      <cite>{title}</cite>
      {text.slice(index + title.length)}
    </>
  )
}

export default function GenGuardChapter() {
  const [redacted, setRedacted] = useState(false)

  return (
    <Chapter
      id="i"
      numeral="I"
      title={genguard.title}
      mark={(
        <>
          <p className="mark-kicker">Plate I</p>
          <p className="mark-metric">{genguard.pulledMetric}</p>
          <p className="mark-note">{microcopy.repoPrivate}</p>
          {redacted ? (
            <>
              <p className="mark-kicker">Marks</p>
              {SPECIMEN_TYPES.map((type) => (
                <p className="mark-proof" key={type}>{type}</p>
              ))}
            </>
          ) : null}
        </>
      )}
    >
      <div className="abstract">
        {genguard.abstract.map((line, index) => (
          <p key={line}>{index === 0 ? withTitle(line, genguard.title) : line}</p>
        ))}
      </div>

      <h3>Method</h3>
      {genguard.method.map((line) => (
        <p key={line}>{line}</p>
      ))}

      <Plate
        src="/projects/genguard/model-runtime.png"
        alt={genguard.plateAlt}
        caption={genguard.plateCaption}
      />

      <Specimen committed={redacted} onToggle={() => setRedacted((value) => !value)} />

      <h3>Measured</h3>
      <p>{genguard.measuredIntro}</p>
      <table className="metrics">
        <tbody>
          {genguard.metrics.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Limits</h3>
      <p>{genguard.limits}</p>
    </Chapter>
  )
}
