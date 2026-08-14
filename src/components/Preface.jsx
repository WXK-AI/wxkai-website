import { preface } from '../data/copy.js'
import Chapter from './Chapter.jsx'

function sentence(text) {
  const marker = 'limited'
  const index = text.indexOf(marker)
  if (index === -1) return text
  return (
    <>
      {text.slice(0, index)}
      <em className="scope">{marker}</em>
      {text.slice(index + marker.length)}
    </>
  )
}

export default function Preface() {
  return (
    <Chapter id="preface" title="Prefatory note" variant="leaf">
      {preface.map((line) => (
        <p key={line}>{sentence(line)}</p>
      ))}
    </Chapter>
  )
}
