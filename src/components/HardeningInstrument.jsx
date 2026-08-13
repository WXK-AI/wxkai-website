import { useState } from 'react'
import ProjectHeader from './ProjectHeader.jsx'

const findings = [
  {
    id: 'xss',
    title: 'Stored XSS',
    exposure: 'Database values were rendered directly into HTML, allowing stored input to execute in another user’s browser.',
    before: "$cell = '<td>' . $row['itemName'] . '</td>';",
    after: "htmlspecialchars($row['itemName'], ENT_QUOTES, 'UTF-8')",
    fix: 'Encode every output context and replace user-controlled upload names with server-generated filenames.',
  },
  {
    id: 'reset',
    title: 'Password reset',
    exposure: 'Knowing a username was enough to set a new password. The flow had no proof that the requester owned the account.',
    before: 'username + newPassword → UPDATE user',
    after: 'password_verify(currentPassword, storedHash)',
    fix: 'Require and verify the current password before any account password can change.',
  },
  {
    id: 'md5',
    title: 'MD5 hashing',
    exposure: 'Registration, login, and reset all used fast, unsalted MD5 hashes that were practical to recover after database exposure.',
    before: '$hashedPassword = md5($password);',
    after: '$hash = password_hash($password, PASSWORD_DEFAULT);',
    fix: 'Move every password path to PHP’s salted password_hash() and password_verify() functions.',
  },
]

export default function HardeningInstrument() {
  const [activeId, setActiveId] = useState('xss')
  const [view, setView] = useState('finding')
  const active = findings.find((finding) => finding.id === activeId)

  const selectFinding = (id) => {
    setActiveId(id)
    setView('finding')
  }

  return (
    <section className="project project--hardening" id="hardening" aria-labelledby="hardening-heading">
      <ProjectHeader
        number="03"
        discipline="Secure software · audit · remediation"
        title={<span id="hardening-heading">Software<br />Hardening</span>}
        summary="A scoped audit and remediation of an existing open-source PHP inventory system: find the break, prove it locally, patch the root cause, then retest."
        status="Academic case study"
      />

      <div className="audit-context" data-scroll-reveal>
        <div className="audit-count"><strong>28</strong><span>initial findings</span></div>
        <div className="severity-ledger" aria-label="Initial finding severities">
          <div><span style={{ '--width': '100%' }} /><b>10</b><em>Critical</em></div>
          <div><span style={{ '--width': '90%' }} /><b>09</b><em>High</em></div>
          <div><span style={{ '--width': '60%' }} /><b>06</b><em>Medium</em></div>
          <div><span style={{ '--width': '30%' }} /><b>03</b><em>Low</em></div>
        </div>
        <p>Initial context from dynamic and static analysis. The implementation deliberately scoped and verified three remediations; it does not claim all 28 findings were closed.</p>
      </div>

      <div className={`patch-panel patch-panel--${view}`} data-scroll-reveal>
        <div className="finding-channels" role="tablist" aria-label="Remediated findings">
          {findings.map((finding, index) => (
            <button role="tab" aria-selected={activeId === finding.id} className={activeId === finding.id ? 'is-active' : ''} type="button" key={finding.id} onClick={() => selectFinding(finding.id)}>
              <span>0{index + 1}</span><strong>{finding.title}</strong><i aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className="finding-readout">
          <div className="finding-mode" role="group" aria-label="Finding or fix view">
            <button className={view === 'finding' ? 'is-active' : ''} type="button" onClick={() => setView('finding')}>Finding</button>
            <button className={view === 'fix' ? 'is-active' : ''} type="button" onClick={() => setView('fix')}>Applied fix</button>
          </div>
          <p className="micro-label">{view === 'finding' ? 'Exposure / before' : 'Mitigation / after'}</p>
          <h3>{active.title}</h3>
          <p className="finding-description">{view === 'finding' ? active.exposure : active.fix}</p>
          <pre><code>{view === 'finding' ? active.before : active.after}</code></pre>
          <div className="verification-line"><span>{view === 'finding' ? 'Reproduced locally' : 'Retested after change'}</span><i aria-hidden="true" /><b>{view === 'finding' ? 'Exposed' : 'Mitigated'}</b></div>
        </div>
      </div>

      <div className="hardening-method" data-scroll-reveal>
        {['Identify', 'Reproduce', 'Change the cause', 'Run the proof again'].map((step, index) => <div key={step}><span>0{index + 1}</span><p>{step}</p></div>)}
      </div>
    </section>
  )
}
