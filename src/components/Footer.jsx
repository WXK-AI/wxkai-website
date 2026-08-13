import { useEffect, useState } from 'react'

function formatLocalTime(timezone) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

export default function Footer({ content }) {
  const [localTime, setLocalTime] = useState(() => formatLocalTime(content.timezone))

  useEffect(() => {
    const timer = window.setInterval(() => setLocalTime(formatLocalTime(content.timezone)), 60_000)
    return () => window.clearInterval(timer)
  }, [content.timezone])

  return (
    <footer>
      <p>{content.name} © {new Date().getFullYear()} · {content.release}</p>
      <p>{content.location} · {localTime}</p>
      <div>
        {content.socials.map((social) => (
          <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>
        ))}
        <a href={`mailto:${content.email}`}>Email</a>
      </div>
    </footer>
  )
}
