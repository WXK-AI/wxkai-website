export default function ProjectList({ projects }) {
  return (
    <section className="work" id="work" aria-labelledby="work-heading">
      <div className="section-heading" data-scroll-reveal>
        <div>
          <p className="section-label">Selected work</p>
          <h2 id="work-heading">Experiments in progress.</h2>
        </div>
        <p>Self-initiated · 2026</p>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <article className="project-card" key={project.number} data-scroll-reveal>
            <div className={`project-visual project-visual--${project.visual}`} aria-hidden="true">
              <span>{project.number}</span>
              <i />
            </div>
            <div className="project-meta">
              <span>{project.type}</span>
              <span>{project.year}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <span className="project-status">{project.status}</span>
          </article>
        ))}
      </div>
      <p className="demo-note" data-scroll-reveal>
        These concept studies define the first demo’s creative direction. Real case studies can replace them without changing the layout.
      </p>
    </section>
  )
}
