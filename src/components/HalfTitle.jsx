import { person } from '../data/copy.js'
import Chapter from './Chapter.jsx'
import Frontispiece from './Frontispiece.jsx'

export default function HalfTitle() {
  return (
    <Chapter
      id="half-title"
      title={person.name}
      variant="half-title"
      mark={<Frontispiece />}
    >
      <hr className="rule" />
      <p className="degree">{person.degree}</p>
      <p className="place">{person.place}</p>
    </Chapter>
  )
}
