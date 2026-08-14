import { langfuse } from '../data/copy.js'

export default function EmptyCompletion() {
  return (
    <figure className="completion-figure">
      <div className="completion">
        <dl className="completion-readouts">
          {langfuse.fields.map((field) => (
            <div key={field}>
              <dt>{field}</dt>
              <dd>—</dd>
            </div>
          ))}
        </dl>
        <div
          className="completion-blank"
          tabIndex={0}
          role="note"
          aria-label={langfuse.blankCaption}
        >
          <p>{langfuse.blankCaption}</p>
        </div>
      </div>
      <figcaption>{langfuse.figureCaption}</figcaption>
    </figure>
  )
}
