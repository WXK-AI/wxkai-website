export default function Navigation({ content }) {
  return (
    <nav className="nav" aria-label="Main navigation">
      <a className="brand" href="#top" aria-label={`${content.name} home`}>
        {content.name}<span>®</span>
      </a>
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#about">About</a>
      </div>
      <a className="availability" href={`mailto:${content.email}`}>
        <i aria-hidden="true" /> {content.availability}
      </a>
    </nav>
  )
}
