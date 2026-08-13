export default function About({ content }) {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="section-index" data-scroll-reveal>
        <p className="micro-label">Profile / continuing</p>
        <p>Research · product thinking · implementation</p>
      </div>
      <div className="about-grid">
        <h2 id="about-heading" data-scroll-reveal>Curious about the seams between systems—and patient enough to make them useful.</h2>
        <div className="about-details" data-scroll-reveal>
          <p>I’m studying {content.education} at {content.school}. My work moves between privacy engineering, secure software, and native tools.</p>
          <p>I care about the boundary: what a system sees, where data moves, and whether the interface tells the truth about both.</p>
          <div className="about-links">
            {content.socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label} <span>↗</span></a>)}
            <a href={`mailto:${content.email}`}>Email <span>↗</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}
