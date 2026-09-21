import { useEffect, useState } from 'react'

interface Options {
  /** Milisegundos por carácter. */
  speed?: number
  /** Pausa entre líneas. */
  linePause?: number
  /** Si es false, muestra todo de inmediato (reduced motion). */
  animate?: boolean
  /** Reinicia la animación cuando cambia. */
  playKey?: number
}

interface State {
  rendered: string[]
  done: boolean
}

/** Escribe líneas de texto progresivamente (efecto terminal). */
export function useTypewriter(
  lines: string[],
  { speed = 22, linePause = 260, animate = true, playKey = 0 }: Options = {},
): State {
  const [state, setState] = useState<State>({ rendered: [], done: false })

  useEffect(() => {
    if (!animate) return
    let cancelled = false
    let lineIdx = 0
    let charIdx = 0
    let timer: number

    const tick = () => {
      if (cancelled) return
      if (lineIdx >= lines.length) {
        setState((s) => ({ ...s, done: true }))
        return
      }
      const line = lines[lineIdx]
      charIdx += 1
      // Se capturan valores inmutables: el updater se ejecuta más tarde y el closure cambia.
      const at = lineIdx
      const text = line.slice(0, charIdx)
      setState((s) => {
        const next = s.rendered.slice(0, at)
        next[at] = text
        return { rendered: next, done: false }
      })
      if (charIdx >= line.length) {
        lineIdx += 1
        charIdx = 0
        timer = window.setTimeout(tick, linePause)
      } else {
        timer = window.setTimeout(tick, speed)
      }
    }

    // Reinicio diferido (evita setState síncrono dentro del efecto).
    timer = window.setTimeout(() => {
      setState({ rendered: [], done: false })
      tick()
    }, 200)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [lines, speed, linePause, animate, playKey])

  // Sin animación se muestra todo el texto directamente.
  if (!animate) return { rendered: lines, done: true }
  return state
}
