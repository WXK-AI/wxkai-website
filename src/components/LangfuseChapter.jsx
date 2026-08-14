import { langfuse } from '../data/copy.js'
import Chapter from './Chapter.jsx'
import EmptyCompletion from './EmptyCompletion.jsx'

export default function LangfuseChapter() {
  return (
    <Chapter
      id="ii"
      numeral="II"
      title={langfuse.title}
      mark={(
        <>
          <p className="mark-kicker">Access</p>
          <p className="mark-note">Read-only</p>
          <p className="mark-note">Prompt withheld</p>
        </>
      )}
    >
      {langfuse.paragraphs.map((line, index) => (
        <p key={line}>
          {index === 0 ? (
            <>
              <cite>Langfuse Menubar</cite>
              {line.slice(langfuse.title.length)}
            </>
          ) : line}
        </p>
      ))}
      <EmptyCompletion />
      <a className="source-link" href={langfuse.github} target="_blank" rel="noreferrer">
        Source for Langfuse Menubar
      </a>
    </Chapter>
  )
}
