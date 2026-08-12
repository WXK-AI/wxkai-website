export default function About({ content }) {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <p className="kicker" data-scroll-reveal>About / Capabilities</p>
      <h2 className="statement" id="about-heading" data-scroll-reveal>{content.about}</h2>
      <div className="about-bottom" data-scroll-reveal>
        <ul className="capabilities" aria-label="Capabilities">
          {content.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
        </ul>
        <a className="contact-link" href={`mailto:${content.email}`}>Let’s make something <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}
