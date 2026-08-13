export default function ProjectHeader({ number, discipline, title, summary, status, children }) {
  return (
    <header className="project-header" data-scroll-reveal>
      <div className="project-number"><span>{number}</span><i aria-hidden="true" /></div>
      <div className="project-heading">
        <p className="micro-label">{discipline}</p>
        <h2>{title}</h2>
      </div>
      <div className="project-summary">
        <p>{summary}</p>
        <span className="project-status"><i aria-hidden="true" />{status}</span>
        {children}
      </div>
    </header>
  )
}
