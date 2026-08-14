import { viper } from '../data/copy.js'
import Chapter from './Chapter.jsx'
import DpiStrip from './DpiStrip.jsx'

export default function ViperChapter() {
  return (
    <Chapter
      id="iv"
      numeral="IV"
      title={viper.title}
      mark={(
        <>
          <p className="mark-kicker">Affiliation</p>
          <p className="mark-note">{viper.affiliation}</p>
        </>
      )}
    >
      {viper.paragraphs.map((line, index) => (
        <p key={line}>
          {index === 0 ? (
            <>
              <cite>Razer Viper Control</cite>
              {line.slice(viper.title.length)}
            </>
          ) : line}
        </p>
      ))}
      <table className="metrics">
        <tbody>
          {viper.spec.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <DpiStrip />
      <a className="source-link" href={viper.github} target="_blank" rel="noreferrer">
        Source for Razer Viper Control
      </a>
    </Chapter>
  )
}
