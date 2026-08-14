import { useEffect, useRef, useState } from 'react'
import { findings } from '../data/findings.js'
import { microcopy } from '../data/copy.js'

function pad(number) {
  return String(number).padStart(2, '0')
}

export default function Register({ onScopeNote }) {
  const [openId, setOpenId] = useState(null)
  const [focusIndex, setFocusIndex] = useState(0)
  const [live, setLive] = useState('')
  const listRef = useRef(null)
  const shouldMoveFocus = useRef(false)

  useEffect(() => {
    if (!shouldMoveFocus.current) return
    shouldMoveFocus.current = false
    const option = listRef.current?.querySelector(`#finding-${findings[focusIndex].number}`)
    option?.focus()
  }, [focusIndex])

  const activate = (finding) => {
    if (finding.status === 'open') {
      setOpenId(null)
      setLive(microcopy.notInScope)
      onScopeNote?.(microcopy.notInScope)
      return
    }
    const next = openId === finding.id ? null : finding.id
    setOpenId(next)
    setLive(next ? `${finding.name}. Before and after proof.` : '')
    onScopeNote?.('')
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      shouldMoveFocus.current = true
      setFocusIndex((index) => Math.min(findings.length - 1, index + 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      shouldMoveFocus.current = true
      setFocusIndex((index) => Math.max(0, index - 1))
    } else if (event.key === 'Home') {
      event.preventDefault()
      shouldMoveFocus.current = true
      setFocusIndex(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      shouldMoveFocus.current = true
      setFocusIndex(findings.length - 1)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      activate(findings[focusIndex])
    }
  }

  return (
    <div>
      <div
        ref={listRef}
        className="register"
        role="listbox"
        aria-label="Findings register, 28 issues"
        aria-activedescendant={`finding-${findings[focusIndex].number}`}
        onKeyDown={onKeyDown}
      >
        {findings.map((finding, index) => {
          const expanded = finding.status === 'remediated' && openId === finding.id
          return (
            <div
              key={finding.id}
              id={`finding-${finding.number}`}
              className={finding.status === 'remediated' ? 'register-row is-remediated' : 'register-row'}
              role="option"
              aria-selected={focusIndex === index}
              aria-expanded={finding.status === 'remediated' ? expanded : undefined}
              tabIndex={focusIndex === index ? 0 : -1}
              onClick={() => {
                setFocusIndex(index)
                activate(finding)
              }}
            >
              <span className="register-n">{pad(finding.number)}</span>
              <span className="register-name">{finding.name}</span>
              <span className="register-status">
                {finding.status === 'remediated' ? 'Remediated' : 'Open'}
              </span>
              {expanded ? (
                <div className="finding-proof">
                  <p>Before. {finding.before}</p>
                  <p>After. {finding.after}</p>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
      <p className="register-live" aria-live="polite">{live}</p>
    </div>
  )
}
