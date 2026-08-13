import { useEffect, useState } from 'react'

const projectSections = [
  { id: 'genguard', label: '01 / GenGuard' },
  { id: 'langfuse', label: '02 / Langfuse Menubar' },
  { id: 'hardening', label: '03 / Hardening' },
  { id: 'experiments', label: '04–05 / Experiments' },
]

function formatLocalTime(timezone) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

export default function Navigation({ content }) {
  const [time, setTime] = useState(() => formatLocalTime(content.timezone))
  const [active, setActive] = useState('top')

  useEffect(() => {
    const timer = window.setInterval(() => setTime(formatLocalTime(content.timezone)), 60_000)
    return () => window.clearInterval(timer)
  }, [content.timezone])

  useEffect(() => {
    const ids = ['top', ...projectSections.map((section) => section.id), 'about']
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-42% 0px -48% 0px', threshold: [0, 0.2, 0.5] })

    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  const activeLabel = projectSections.find((section) => section.id === active)?.label ?? (active === 'about' ? 'About / Contact' : 'Personal control surface')

  return (
    <nav className="status-bar" aria-label="Main navigation">
      <a className="status-brand" href="#top" aria-label="Wong Xin Kai home">XK<span>•</span>MY</a>
      <p className="status-now" aria-live="polite"><span>Channel</span>{activeLabel}</p>
      <div className="status-links">
        <a href={content.socials[0].href} target="_blank" rel="noreferrer">GH</a>
        <a href={content.socials[1].href} target="_blank" rel="noreferrer">IN</a>
        <a href={`mailto:${content.email}`}>Mail</a>
      </div>
      <p className="status-time"><span className="live-dot" aria-hidden="true" />MYT {time}</p>
    </nav>
  )
}
