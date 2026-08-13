export default function Experiments({ items }) {
  return (
    <section className="experiments" id="experiments" aria-labelledby="experiments-heading">
      <div className="section-index" data-scroll-reveal>
        <p className="micro-label">More experiments / 04–05</p>
        <p>Smaller surfaces. Same attention to boundaries.</p>
      </div>
      <h2 id="experiments-heading" className="visually-hidden">More experiments</h2>
      <div className="experiment-list">
        {items.map((item) => (
          <article key={item.number} data-scroll-reveal>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <em>{item.meta}</em>
            {item.href ? <a href={item.href} target="_blank" rel="noreferrer">{item.linkLabel} ↗</a> : <b>Case note</b>}
          </article>
        ))}
      </div>
    </section>
  )
}
