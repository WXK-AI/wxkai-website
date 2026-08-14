import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { person } from '../data/copy.js'
import { INDEX_ENTRIES } from '../data/indexEntries.js'
import { printCopy, useCopyAddress } from '../lib/clipboard.js'

function normalize(value) {
  return value.trim().toLowerCase()
}

function matches(entry, query) {
  const needle = normalize(query)
  if (!needle) return true
  const hay = [entry.label, entry.locator, entry.kind].join(' ')
  return normalize(hay).includes(needle)
}

function IndexLine({ entry, selected, current, onSelect }) {
  const showLeader = Boolean(entry.locator)
  return (
    <button
      id={entry.id}
      className={`index-option is-${entry.kind}${selected ? ' is-selected' : ''}`}
      type="button"
      role="option"
      aria-selected={selected}
      aria-current={current ? 'location' : undefined}
      tabIndex={-1}
      onClick={() => onSelect(entry)}
    >
      <span className="index-label">{entry.label}</span>
      {showLeader ? <span className="index-leader" aria-hidden="true" /> : null}
      {showLeader ? <span className="index-locator">{entry.locator}</span> : null}
    </button>
  )
}

function IndexSheet({ currentId, onClose, onNavigate }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const sheetRef = useRef(null)
  const filterRef = useRef(null)
  const { status, failed, fallbackRef, copyAddress } = useCopyAddress()

  const filtered = useMemo(
    () => INDEX_ENTRIES.filter((entry) => matches(entry, query)),
    [query],
  )

  const activeEntry = filtered[active] ?? null

  const activate = useCallback((entry) => {
    if (!entry) return
    if (entry.kind === 'action' && entry.action === 'print') {
      onClose()
      window.setTimeout(() => {
        printCopy()
      }, 40)
      return
    }
    if (entry.kind === 'action' && entry.action === 'copy') {
      copyAddress()
      return
    }
    onNavigate(entry.href)
  }, [copyAddress, onClose, onNavigate])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      filterRef.current?.focus()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!activeEntry) return
    document.getElementById(activeEntry.id)?.scrollIntoView({ block: 'nearest' })
  }, [activeEntry])

  useEffect(() => {
    const root = sheetRef.current
    if (!root) return undefined

    const focusables = () =>
      [...root.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
        .filter((node) => !node.hasAttribute('disabled') && node.tabIndex !== -1)

    const onKeyDown = (event) => {
      if (event.key === 'Tab') {
        const items = focusables()
        if (items.length === 0) return
        const first = items[0]
        const last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActive((index) => Math.min(filtered.length - 1, index + 1))
        return
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActive((index) => Math.max(0, index - 1))
        return
      }
      if (event.key === 'Home') {
        event.preventDefault()
        setActive(0)
        return
      }
      if (event.key === 'End') {
        event.preventDefault()
        setActive(Math.max(0, filtered.length - 1))
        return
      }
      if (event.key === 'Enter') {
        if (document.activeElement === filterRef.current || document.activeElement?.getAttribute('role') === 'option') {
          event.preventDefault()
          activate(activeEntry)
        }
      }
    }

    root.addEventListener('keydown', onKeyDown)
    return () => root.removeEventListener('keydown', onKeyDown)
  }, [activate, activeEntry, filtered.length])

  return (
    <div
      ref={sheetRef}
      className="index-sheet"
      id="document-index"
      role="dialog"
      aria-modal="true"
      aria-labelledby="index-title"
    >
      <div className="index-inner">
        <h2 className="index-title" id="index-title">Index</h2>
        <p id="index-hint" className="visually-hidden">
          Type to filter. Arrow keys move. Enter opens an entry. Escape closes the index.
        </p>
        <label className="index-filter-label" htmlFor="index-filter">Filter</label>
        <input
          ref={filterRef}
          id="index-filter"
          className="index-filter"
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-controls="index-list"
          aria-activedescendant={activeEntry?.id}
          aria-autocomplete="list"
          aria-describedby="index-hint"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
          enterKeyHint="go"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
          }}
        />

        {filtered.length === 0 ? (
          <p className="index-empty">No entries.</p>
        ) : null}
        <div
          className="index-list"
          id="index-list"
          role="listbox"
          aria-label="Index entries"
        >
          {filtered.map((entry, index) => {
            const previous = filtered[index - 1]
            const actionStart = entry.kind === 'action' && previous?.kind !== 'action'
            return (
              <div key={entry.id} className={actionStart ? 'index-action-block' : undefined}>
                <IndexLine
                  entry={entry}
                  selected={active === index}
                  current={entry.kind === 'gathering' && entry.sectionId === currentId}
                  onSelect={(item) => {
                    setActive(index)
                    activate(item)
                  }}
                />
              </div>
            )
          })}
        </div>

        <p className="copy-live" aria-live="polite">
          {status}
        </p>
        <p
          ref={fallbackRef}
          className={failed ? 'index-address' : 'visually-hidden'}
        >
          {person.email}
        </p>

        <button className="doc-button index-close" type="button" onClick={onClose}>
          Close the index
        </button>
      </div>
    </div>
  )
}

export default function DocumentIndex({ open, currentId, onClose, onNavigate }) {
  if (!open) return null
  return createPortal(
    <IndexSheet currentId={currentId} onClose={onClose} onNavigate={onNavigate} />,
    document.body,
  )
}
