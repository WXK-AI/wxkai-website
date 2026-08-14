import { Fragment, useRef, useState } from 'react'
import { lab } from '../data/copy.js'
import { microcopy } from '../data/copy.js'
import { usePrefersReducedMotion } from '../lib/media.js'

const VMS = ['A', 'B', 'C']

export default function IsolationPlate() {
  const [pass, setPass] = useState(1)
  const [home, setHome] = useState('A')
  const [live, setLive] = useState('')
  const [snap, setSnap] = useState(false)
  const [ghost, setGhost] = useState(null)
  const drag = useRef(null)
  const tokenRef = useRef(null)
  const reduceMotion = usePrefersReducedMotion()

  const refuse = (message) => {
    setLive(message)
    if (reduceMotion) return
    setSnap(false)
    requestAnimationFrame(() => setSnap(true))
  }

  const attemptEnter = (vm) => {
    if (pass === 1 && home === vm) return
    if (pass === 2) {
      refuse(microcopy.entryRefused)
      return
    }
    refuse(microcopy.isolated)
  }

  const applyMitigations = () => {
    setPass(2)
    setHome('bench')
    setLive('Mitigations applied. Second pass stamped Rerun.')
  }

  const onPointerDown = (event) => {
    if (event.button != null && event.button !== 0) return
    const rect = tokenRef.current.getBoundingClientRect()
    drag.current = {
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      w: rect.width,
      h: rect.height,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.preventDefault()
    if (!reduceMotion) {
      setGhost({ x: rect.left, y: rect.top, w: rect.width, h: rect.height })
    }
  }

  const onPointerMove = (event) => {
    if (!drag.current || reduceMotion) return
    setGhost({
      x: event.clientX - drag.current.offsetX,
      y: event.clientY - drag.current.offsetY,
      w: drag.current.w,
      h: drag.current.h,
    })
  }

  const endDrag = (event) => {
    if (!drag.current) return
    const x = event.clientX
    const y = event.clientY
    drag.current = null
    setGhost(null)
    const hit = document.elementsFromPoint(x, y).find((node) => node.dataset?.vm)
    if (hit) attemptEnter(hit.dataset.vm)
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      attemptEnter(home === 'A' ? 'B' : home === 'B' ? 'C' : 'A')
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      attemptEnter(home === 'C' ? 'B' : home === 'B' ? 'A' : 'C')
    } else if (event.key === 'ArrowDown' && home === 'bench') {
      event.preventDefault()
      attemptEnter('A')
    }
  }

  const token = (
    <div
      ref={tokenRef}
      className={snap ? 'token is-snap' : 'token'}
      role="button"
      tabIndex={0}
      aria-label="Fake healthcare record. Arrow keys attempt a move between isolated machines."
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      onAnimationEnd={() => setSnap(false)}
    >
      {lab.tokenLabel}
    </div>
  )

  return (
    <div className="lab">
      <div className="lab-bench">
        <p className="lab-kicker">Lab bench</p>
        {home === 'bench' ? token : null}
        {pass === 2 ? <p className="stamp">Rerun</p> : null}
      </div>
      <div className="isolation">
        {VMS.map((vm, index) => (
          <Fragment key={vm}>
            {index > 0 ? <div className="gutter" aria-hidden="true" /> : null}
            <div className="vm" data-vm={vm}>
              <p className="lab-kicker">VM {vm}</p>
              {home === vm ? token : null}
            </div>
          </Fragment>
        ))}
      </div>
      <div className="lab-moves">
        {VMS.map((vm) => (
          <button
            key={vm}
            className="doc-button"
            type="button"
            onClick={() => attemptEnter(vm)}
          >
            Move to VM {vm}
          </button>
        ))}
        <button
          className="doc-button"
          type="button"
          onClick={applyMitigations}
          disabled={pass === 2}
        >
          Apply mitigations
        </button>
      </div>
      <p className="lab-status" aria-live="polite">{live}</p>
      {ghost ? (
        <div
          className="token-ghost"
          style={{ left: ghost.x, top: ghost.y, width: ghost.w, height: ghost.h }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  )
}
