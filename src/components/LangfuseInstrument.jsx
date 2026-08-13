import { useState } from 'react'
import ProjectHeader from './ProjectHeader.jsx'

const metrics = [
  { id: 'cost', label: 'Cost', value: '$42.80', note: 'Aggregated spend across the selected range.', bars: [32, 44, 38, 67, 52, 74, 61] },
  { id: 'tokens', label: 'Tokens', value: '8.42m', note: 'Input and output volume, never the content itself.', bars: [28, 54, 45, 62, 80, 65, 76] },
  { id: 'latency', label: 'Latency', value: '842ms', note: 'The time traces take from request to response.', bars: [64, 70, 58, 48, 44, 38, 34] },
  { id: 'errors', label: 'Errors', value: '0.8%', note: 'Failure rate across observed model calls.', bars: [72, 44, 60, 30, 18, 24, 12] },
  { id: 'models', label: 'Models', value: '07', note: 'Usage distribution by model identifier.', bars: [82, 64, 47, 31, 24, 16, 11] },
]

export default function LangfuseInstrument() {
  const [activeId, setActiveId] = useState('cost')
  const active = metrics.find((metric) => metric.id === activeId)

  return (
    <section className="project project--langfuse" id="langfuse" aria-labelledby="langfuse-heading">
      <ProjectHeader
        number="02"
        discipline="Native macOS · observability · public GitHub"
        title={<span id="langfuse-heading">Langfuse<br />Menubar</span>}
        summary="A glanceable Swift dashboard for cost, tokens, latency, errors, and model usage—without turning private prompt content into a feature."
        status="Active build"
      >
        <a className="text-link" href="https://github.com/WXK-AI/langfuse-menubar" target="_blank" rel="noreferrer">View source ↗</a>
      </ProjectHeader>

      <div className="langfuse-console" data-scroll-reveal>
        <div className="mac-menubar" aria-hidden="true">
          <span>● ● ●</span><p>Finder &nbsp; File &nbsp; Edit &nbsp; View</p><div><b>◉</b> &nbsp; 10:24</div>
        </div>
        <div className="menubar-stage">
          <div className="privacy-contract">
            <p className="micro-label">Access contract / 03 rules</p>
            <h3>The useful numbers come through. The conversation does not.</h3>
            <ol>
              <li><span>01</span><strong>Credentials</strong><em>Stored in macOS Keychain</em></li>
              <li><span>02</span><strong>API mode</strong><em>Read-only</em></li>
              <li><span>03</span><strong>Prompt bodies</strong><em>Never requested or displayed</em></li>
            </ol>
          </div>

          <div className="menubar-popover">
            <header><div><i aria-hidden="true" /><strong>Langfuse</strong></div><span>Sample data</span></header>
            <div className="metric-switcher" role="tablist" aria-label="Langfuse sample metrics">
              {metrics.map((metric) => (
                <button role="tab" aria-selected={activeId === metric.id} className={activeId === metric.id ? 'is-active' : ''} type="button" key={metric.id} onClick={() => setActiveId(metric.id)}>
                  <span>{metric.label}</span><b>{metric.value}</b>
                </button>
              ))}
            </div>
            <div className="metric-detail">
              <div className="metric-detail-copy"><p>{active.label}</p><strong>{active.value}</strong><span>Last 7 days · sample</span></div>
              <div className="mini-chart" aria-hidden="true">
                {active.bars.map((height, index) => <i key={`${active.id}-${index}`} style={{ height: `${height}%` }} />)}
              </div>
              <p>{active.note}</p>
            </div>
            <footer><span>Read only</span><span>⌘ Refresh</span></footer>
          </div>
        </div>
      </div>

      <div className="langfuse-notes" data-scroll-reveal>
        <p>Built in Swift for the place this information is most useful: one click from the macOS menu bar.</p>
        <div className="project-tags project-tags--dark"><span>Swift</span><span>SwiftUI</span><span>Keychain</span><span>Langfuse API</span><span>macOS</span></div>
      </div>
    </section>
  )
}
