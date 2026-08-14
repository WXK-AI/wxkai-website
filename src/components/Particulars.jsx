import { particulars } from '../data/copy.js'
import Chapter from './Chapter.jsx'

function Lines({ items }) {
  return (
    <ul className="particulars-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default function Particulars() {
  return (
    <Chapter id="particulars" title="Particulars" variant="leaf">
      <p className="particulars-status">{particulars.status}</p>

      <h3 id="particulars-education">Education</h3>
      <Lines items={particulars.education} />

      <h3 id="particulars-coursework">Coursework</h3>
      <Lines items={particulars.coursework} />

      <h3 id="particulars-results">Results</h3>
      <Lines items={particulars.results} />

      <h3 id="particulars-appointment">Appointment</h3>
      <p>{particulars.appointment}</p>

      <h3 id="particulars-languages">Languages</h3>
      <p>{particulars.languages}</p>
    </Chapter>
  )
}
