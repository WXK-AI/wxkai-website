import { useState } from 'react'
import { viper } from '../data/copy.js'

export default function DpiStrip() {
  const [dpi, setDpi] = useState(viper.dpiSteps[2])

  const move = (direction) => {
    const index = viper.dpiSteps.indexOf(dpi)
    const next = viper.dpiSteps[index + direction]
    if (next != null) setDpi(next)
  }

  return (
    <div className="dpi">
      <div
        className="dpi-strip"
        role="radiogroup"
        aria-label="DPI"
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            event.preventDefault()
            move(1)
          }
          if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            event.preventDefault()
            move(-1)
          }
        }}
      >
        {viper.dpiSteps.map((step) => (
          <button
            key={step}
            className="dpi-mark"
            type="button"
            role="radio"
            aria-checked={dpi === step}
            tabIndex={dpi === step ? 0 : -1}
            onClick={() => setDpi(step)}
          >
            {step}
          </button>
        ))}
      </div>
      <p className="dpi-readout" aria-live="polite">
        Polling remains {viper.pollingHz} Hz. DPI is now {dpi}.
      </p>
    </div>
  )
}
