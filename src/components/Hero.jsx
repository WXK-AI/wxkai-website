export default function Hero({ content, children }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="eyebrow" data-hero-reveal>{content.role} · {content.location}</div>
      <h1 aria-label={content.headline.join(' ')}>
        <span data-hero-reveal>{content.headline[0]}</span>
        <span className="accent" data-hero-reveal>{content.headline[1]}</span>
      </h1>
      <p className="intro" data-hero-reveal>{content.introduction}</p>
      <a className="scroll-link" href="#work" data-hero-reveal>
        Explore the demo <span aria-hidden="true">↓</span>
      </a>
      <div className="scene" aria-hidden="true">{children}</div>
    </section>
  )
}
