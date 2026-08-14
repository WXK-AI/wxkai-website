import { useCallback, useEffect, useRef, useState } from 'react'
import { person } from '../data/copy.js'

const IDLE_MS = 2400

export function selectElementText(element) {
  if (!element) return
  const selection = window.getSelection()
  if (!selection) return
  const range = document.createRange()
  range.selectNodeContents(element)
  selection.removeAllRanges()
  selection.addRange(range)
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.setAttribute('aria-hidden', 'true')
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '0'
  textarea.style.width = '2px'
  textarea.style.height = '2px'
  textarea.style.padding = '0'
  textarea.style.border = '0'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  textarea.setSelectionRange(0, text.length)

  let copied = false
  try {
    copied = document.execCommand('copy')
  } catch {
    copied = false
  }

  textarea.remove()
  return copied
}

export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return { ok: true, message: 'Address copied.' }
    }
  } catch {
    // Use the visible-selection fallback below.
  }

  if (fallbackCopy(text)) {
    return { ok: true, message: 'Address copied.' }
  }

  return { ok: false, message: 'Copy failed. The address is selected.' }
}

export function useCopyAddress() {
  const [status, setStatus] = useState('')
  const [failed, setFailed] = useState(false)
  const fallbackRef = useRef(null)
  const timerRef = useRef(0)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  useEffect(() => {
    if (!failed) return undefined
    const frame = window.requestAnimationFrame(() => {
      selectElementText(fallbackRef.current)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [failed, status])

  const copyAddress = useCallback(async () => {
    window.clearTimeout(timerRef.current)
    const result = await copyText(person.email)
    setStatus(result.message)
    setFailed(!result.ok)
    if (result.ok) {
      timerRef.current = window.setTimeout(() => {
        setStatus('')
        setFailed(false)
      }, IDLE_MS)
    }
  }, [])

  return { status, failed, fallbackRef, copyAddress }
}

export function printCopy() {
  window.print()
}
