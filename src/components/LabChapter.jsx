import { lab } from '../data/copy.js'
import Chapter from './Chapter.jsx'
import IsolationPlate from './IsolationPlate.jsx'

export default function LabChapter() {
  return (
    <Chapter
      id="v"
      numeral="V"
      title={lab.title}
      mark={(
        <>
          <p className="mark-kicker">Isolation</p>
          <p className="mark-note">{lab.isolationNote}</p>
        </>
      )}
    >
      {lab.paragraphs.map((line) => (
        <p key={line}>{line}</p>
      ))}
      <IsolationPlate />
    </Chapter>
  )
}
