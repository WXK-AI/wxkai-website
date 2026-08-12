import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const Scene = lazy(() => import('./Scene.jsx'))

const projects = [
  { number: '01', title: 'Signals', type: 'Interactive experience', year: '2026' },
  { number: '02', title: 'Soft Systems', type: 'Product & identity', year: '2025' },
  { number: '03', title: 'Afterlight', type: 'Creative development', year: '2025' },
]

function App() {
  const page = useRef()

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from('[data-reveal]', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      })
      gsap.from('.scene', { opacity: 0, scale: 0.88, duration: 1.5, delay: 0.25, ease: 'expo.out' })
    }, page)

    return () => context.revert()
  }, [])

  return (
    <main ref={page}>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="WXK home">WXK<span>®</span></a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
        </div>
        <a className="availability" href="mailto:hello@wxkai.ccwu.cc">
          <i aria-hidden="true" /> Available for work
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow" data-reveal>Independent creative developer · Malaysia</div>
        <h1 aria-label="Ideas into motion">
          <span data-reveal>Ideas into</span>
          <span className="accent" data-reveal>motion.</span>
        </h1>
        <p className="intro" data-reveal>
          I design and build expressive digital experiences where technology, identity, and culture meet.
        </p>
        <a className="scroll-link" href="#work" data-reveal>Explore selected work <span>↓</span></a>
        <div className="scene" aria-hidden="true"><Suspense fallback={null}><Scene /></Suspense></div>
      </section>

      <section className="work" id="work">
        <div className="section-heading">
          <p>Selected work</p>
          <p>2025—2026</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project" key={project.number}>
              <span>{project.number}</span>
              <h2>{project.title}</h2>
              <p>{project.type}</p>
              <span>{project.year}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <p className="kicker">About</p>
        <p className="statement">Curious by nature. Precise by practice. I turn ambitious ideas into memorable things for the screen.</p>
        <a href="mailto:hello@wxkai.ccwu.cc">Let’s make something ↗</a>
      </section>

      <footer>
        <p>WXK © {new Date().getFullYear()}</p>
        <p>Kuala Lumpur · <span id="local-time">GMT+8</span></p>
        <div><a href="#top">Instagram</a><a href="#top">GitHub</a><a href="#top">LinkedIn</a></div>
      </footer>
    </main>
  )
}

export default App
