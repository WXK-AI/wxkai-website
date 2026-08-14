export default function Chapter({
  id,
  numeral,
  title,
  mark,
  children,
  variant = 'chapter',
}) {
  const headingId = `${id}-title`
  const Heading = variant === 'half-title' ? 'h1' : 'h2'

  return (
    <section id={id} className={`chapter ${variant}`} aria-labelledby={headingId}>
      {numeral ? (
        <p className="chapter-numeral" aria-hidden="true">{numeral}</p>
      ) : null}
      <Heading id={headingId} className="chapter-title">
        {numeral ? <span className="visually-hidden">{numeral}. </span> : null}
        {title}
      </Heading>
      <aside className="marking">{mark}</aside>
      <div className="prose">{children}</div>
      <div className="quiet" aria-hidden="true" />
    </section>
  )
}
