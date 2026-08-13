import { useMemo, useState } from 'react'
import ProjectHeader from './ProjectHeader.jsx'

const fixtures = [
  {
    label: 'Support handoff',
    text: 'Please review the account for Aisha Rahman. Email aisha.rahman@example.com and phone +60 12-345 6789 before our meeting in Kuala Lumpur.',
  },
  {
    label: 'Clean prompt',
    text: 'Summarise this product brief into three clear decisions for the design team.',
  },
]

const detectors = [
  { type: 'EMAIL', regex: /[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi },
  { type: 'PHONE', regex: /\+?60[\s-]?\d{1,2}[\s-]?\d{3}[\s-]?\d{4}/gi },
  { type: 'PERSON', regex: /Aisha Rahman/g },
  { type: 'LOCATION', regex: /Kuala Lumpur/g },
]

function getFindings(text) {
  return detectors.flatMap((detector) => [...text.matchAll(detector.regex)].map((match) => ({
    type: detector.type,
    value: match[0],
    index: match.index,
    end: match.index + match[0].length,
  }))).sort((a, b) => a.index - b.index)
}

function RedactedText({ text, findings, redacted }) {
  if (!findings.length) return text
  const output = []
  let cursor = 0
  findings.forEach((finding) => {
    if (finding.index < cursor) return
    output.push(text.slice(cursor, finding.index))
    output.push(<mark key={`${finding.type}-${finding.index}`} data-type={finding.type}>{redacted ? `[${finding.type}]` : finding.value}</mark>)
    cursor = finding.end
  })
  output.push(text.slice(cursor))
  return output
}

export default function GenGuardInstrument() {
  const [fixture, setFixture] = useState(0)
  const [redacted, setRedacted] = useState(false)
  const text = fixtures[fixture].text
  const findings = useMemo(() => getFindings(text), [text])
  const risk = Math.min(100, findings.length * 24)

  const selectFixture = (index) => {
    setFixture(index)
    setRedacted(false)
  }

  return (
    <section className="project project--genguard" id="genguard" aria-labelledby="genguard-heading">
      <ProjectHeader
        number="01"
        discipline="Browser privacy · local AI · final-year project"
        title={<span id="genguard-heading">GenGuard</span>}
        summary="A privacy-first Chrome extension that finds and redacts sensitive information before a prompt or file reaches ChatGPT or Gemini."
        status="Completed prototype"
      />

      <div className="genguard-bench" data-scroll-reveal>
        <div className="bench-toolbar">
          <div><span className="live-dot" aria-hidden="true" />Inspection bench</div>
          <p>Portfolio simulation · fixture data only</p>
          <div className="fixture-tabs" aria-label="Sample prompts">
            {fixtures.map((item, index) => <button className={fixture === index ? 'is-active' : ''} type="button" key={item.label} onClick={() => selectFixture(index)}>{item.label}</button>)}
          </div>
        </div>

        <div className="prompt-surface">
          <div className="prompt-copy">
            <p className="micro-label">Prompt / pre-flight</p>
            <div className="prompt-text"><RedactedText text={text} findings={findings} redacted={redacted} /></div>
            <div className="prompt-actions">
              <span>{findings.length} {findings.length === 1 ? 'finding' : 'findings'}</span>
              <button type="button" onClick={() => setRedacted((current) => !current)} disabled={!findings.length}>{redacted ? 'Restore fixture' : 'Redact all'}</button>
              <button className="send-button" type="button" disabled={findings.length > 0 && !redacted}>Send <span>↑</span></button>
            </div>
          </div>

          <aside className="risk-panel" aria-label="Simulated GenGuard findings">
            <div className="risk-readout">
              <p><span>Privacy risk</span><b>{risk}</b></p>
              <strong>{risk > 70 ? 'High' : risk > 0 ? 'Review' : 'Clear'}</strong>
              <i style={{ '--risk': `${risk}%` }} aria-hidden="true" />
            </div>
            <div className="finding-stack">
              {findings.length ? findings.map((finding) => (
                <div key={`${finding.type}-${finding.index}`}>
                  <span>{finding.type}</span><code>{redacted ? `[${finding.type}]` : finding.value}</code><em>{finding.type === 'PERSON' || finding.type === 'LOCATION' ? 'NER' : 'Regex'}</em>
                </div>
              )) : <p className="clear-state">No fixture patterns detected.</p>}
            </div>
          </aside>
        </div>
      </div>

      <div className="evidence-grid" data-scroll-reveal>
        <figure className="evidence-image">
          <img src="/projects/genguard/model-runtime.png" alt="GenGuard model panel showing its local ONNX and OCR runtimes" loading="lazy" />
          <figcaption>Actual prototype · local model + OCR runtime</figcaption>
        </figure>
        <div className="evidence-copy">
          <p className="micro-label">What runs locally</p>
          <h3>Three detectors. One decision surface. Nothing sent out for analysis.</h3>
          <div className="pipeline" aria-label="GenGuard detection pipeline">
            <span>Regex<small>Structured identifiers</small></span>
            <i>+</i>
            <span>ONNX NER<small>Contextual entities</small></span>
            <i>+</i>
            <span>OCR<small>Image-based text</small></span>
          </div>
          <dl className="metric-grid">
            <div><dt>96.7%</dt><dd>Test F1</dd></div>
            <div><dt>99.8%</dt><dd>Test recall</dd></div>
            <div><dt>71%</dt><dd>Smaller model</dd></div>
            <div><dt>83–88ms</dt><dd>Text inference</dd></div>
          </dl>
          <p className="evidence-note">Evaluated on a 2,000-row unseen test subset. The quantized browser model preserved the evaluated F1 score while reducing its file size from 1,061.98 MB to 308.27 MB. OCR averaged 314.6 ms per image.</p>
          <div className="project-tags"><span>React</span><span>TypeScript</span><span>Manifest V3</span><span>ONNX Runtime Web</span><span>Tesseract.js</span></div>
        </div>
      </div>
    </section>
  )
}
