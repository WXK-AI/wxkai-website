import { useCallback, useEffect, useRef, useState } from 'react'
import { person } from '../data/copy.js'
import { resolveSection } from '../data/indexEntries.js'
import { ROMANS, SECTIONS } from '../data/sections.js'
import { isTypingTarget } from '../lib/keys.js'
import { prefersReducedMotion } from '../lib/media.js'
import DocumentIndex from './DocumentIndex.jsx'

function sectionFromHash() {
  const id = window.location.hash.replace(/^#/, '')
  return resolveSection(id)
}

function hashTargetId() {
  return window.location.hash.replace(/^#/, '')
}

function scrollToSection(id, behavior) {
  const element = document.getElementById(id)
  if (!element) return
  element.scrollIntoView({ behavior, block: 'start' })
}

export default function DocumentShell({ children }) {
  const [current, setCurrent] = useState(() => sectionFromHash() ?? SECTIONS[0])
  const [indexOpen, setIndexOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const allowHashWrite = useRef(!window.location.hash)
  const indexButtonRef = useRef(null)
  const invokerRef = useRef(null)

  useEffect(() => {
    const hashedId = hashTargetId()
    if (!hashedId) return undefined
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
    const target = document.getElementById(hashedId) ? hashedId : sectionFromHash()?.id
    if (target) scrollToSection(target, behavior)
    const timer = window.setTimeout(() => {
      allowHashWrite.current = true
    }, 800)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onHash = () => {
      const hashedId = hashTargetId()
      const hashed = resolveSection(hashedId)
      if (!hashedId) return
      const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
      const target = document.getElementById(hashedId) ? hashedId : hashed?.id
      if (target) scrollToSection(target, behavior)
      if (hashed) setCurrent(hashed)
      setIndexOpen(false)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    let frame = 0
    const update = () => {
      const offset = 52
      let next = SECTIONS[0]
      SECTIONS.forEach((section) => {
        const element = document.getElementById(section.id)
        if (!element) return
        if (element.getBoundingClientRect().top - offset <= 1) next = section
      })
      setCurrent((prev) => (prev.id === next.id ? prev : next))
      const desired = `#${next.id}`
      if (allowHashWrite.current && window.location.hash !== desired) {
        window.history.replaceState(null, '', desired)
      }
      const max = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      setProgress((prev) => (Math.abs(prev - nextProgress) < 0.001 ? prev : nextProgress))
    }
    const onScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const closeIndex = useCallback(() => {
    setIndexOpen(false)
    window.requestAnimationFrame(() => {
      const invoker = invokerRef.current
      if (invoker && typeof invoker.focus === 'function' && document.contains(invoker)) {
        invoker.focus()
      } else {
        indexButtonRef.current?.focus()
      }
    })
  }, [])

  const toggleIndex = useCallback(() => {
    setIndexOpen((open) => {
      if (open) {
        window.requestAnimationFrame(() => {
          const invoker = invokerRef.current
          if (invoker && typeof invoker.focus === 'function' && document.contains(invoker)) {
            invoker.focus()
          } else {
            indexButtonRef.current?.focus()
          }
        })
        return false
      }
      invokerRef.current = document.activeElement
      return true
    })
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && indexOpen) {
        event.preventDefault()
        closeIndex()
        return
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        toggleIndex()
        return
      }

      if (
        (event.key === 'i' || event.key === 'I')
        && !event.metaKey
        && !event.ctrlKey
        && !event.altKey
        && !isTypingTarget(event.target)
      ) {
        event.preventDefault()
        toggleIndex()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeIndex, indexOpen, toggleIndex])

  useEffect(() => {
    if (!indexOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [indexOpen])

  const navigateFromIndex = useCallback((href) => {
    closeIndex()
    const id = href.replace(/^#/, '')
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
    window.requestAnimationFrame(() => {
      scrollToSection(id, behavior)
      const section = resolveSection(id)
      if (!section) return
      setCurrent(section)
      if (allowHashWrite.current) {
        const desired = `#${section.id}`
        if (window.location.hash !== desired) {
          window.history.replaceState(null, '', desired)
        }
      }
    })
  }, [closeIndex])

  return (
    <div className="document">
      <a className="skip" href="#contents" inert={indexOpen || undefined}>Skip to contents</a>
      <header className="running-head">
        <a className="running-name" href="#half-title">{person.name}</a>
        <button
          ref={indexButtonRef}
          className="running-index"
          type="button"
          aria-expanded={indexOpen}
          aria-controls="document-index"
          aria-keyshortcuts="i Meta+K Control+K"
          onClick={toggleIndex}
        >
          Index
        </button>
        <p className="running-title">{current.title}</p>
        <div
          className="read-rule"
          style={{ width: `${Math.round(progress * 1000) / 10}%` }}
          aria-hidden="true"
        />
      </header>
      <main inert={indexOpen || undefined}>{children}</main>
      <footer className="running-foot">
        <p>Marked Copy</p>
        <nav aria-label="Reading position">
          <ol className="position">
            {ROMANS.map((roman) => {
              const section = SECTIONS.find((item) => item.roman === roman)
              return (
                <li key={roman}>
                  <a
                    href={`#${section.id}`}
                    aria-current={current.roman === roman ? 'location' : undefined}
                  >
                    {roman}
                  </a>
                </li>
              )
            })}
          </ol>
        </nav>
      </footer>
      <DocumentIndex
        open={indexOpen}
        currentId={current.id}
        onClose={closeIndex}
        onNavigate={navigateFromIndex}
      />
    </div>
  )
}
