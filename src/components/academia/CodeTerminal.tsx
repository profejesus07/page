import { useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { RotateCcw, Terminal } from 'lucide-react'
import { useTypewriter } from '../../hooks/useTypewriter'
import { cn } from '../../utils/cn'

interface Props {
  lines: string[]
  title?: string
  className?: string
}

function lineTone(line: string): string {
  if (line.startsWith('[!!]')) return 'text-violet-300'
  if (line.startsWith('[ok]')) return 'text-accent-light'
  if (line.startsWith('>')) return 'text-slate-50'
  return 'text-muted'
}

/** Terminal ficticia que escribe el protocolo de la academia al entrar en pantalla. */
export function CodeTerminal({ lines, title = 'academia-code — terminal', className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const reduce = useReducedMotion()
  const [playKey, setPlayKey] = useState(0)
  // Empieza al entrar en pantalla o al pulsar "reproducir de nuevo".
  const started = inView || playKey > 0

  const { rendered, done } = useTypewriter(lines, { animate: started && !reduce, playKey })
  const output = started ? rendered : []

  return (
    <div
      ref={ref}
      className={cn('hud-corners overflow-hidden rounded-2xl border border-accent/25 bg-[#050b14]/90 shadow-[0_0_40px_-8px_rgb(16_185_129/0.45)]', className)}
      role="region"
      aria-label="Terminal de Academia CODE (ambientación)"
    >
      <div className="flex items-center justify-between gap-3 border-b border-accent/15 bg-accent/5 px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          <Terminal className="size-3.5 text-accent-light" aria-hidden />
          {title}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPlayKey((k) => k + 1)}
            className="grid size-7 place-items-center rounded-md text-muted transition-colors hover:bg-accent/10 hover:text-accent-light"
            aria-label="Reproducir de nuevo"
            title="Reproducir de nuevo"
          >
            <RotateCcw className="size-3.5" aria-hidden />
          </button>
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-violet-500/70" />
            <span className="size-2.5 rounded-full bg-secondary/70" />
            <span className="size-2.5 rounded-full bg-accent/70" />
          </span>
        </div>
      </div>
      <div className="relative min-h-[15.5rem] p-4 font-mono text-[12.5px] leading-6 sm:text-[13px]">
        <div className="pointer-events-none absolute inset-0 scanlines opacity-60" aria-hidden />
        <ol className="relative" aria-live="polite">
          {output.map((line, i) => (
            <li key={i} className={cn('whitespace-pre-wrap break-words', lineTone(line))}>
              {line}
              {i === output.length - 1 && !done && (
                <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent animate-blink" aria-hidden />
              )}
            </li>
          ))}
          {done && (
            <li className="text-accent-light">
              <span className="inline-block h-4 w-2 translate-y-0.5 bg-accent animate-blink" aria-hidden />
            </li>
          )}
        </ol>
      </div>
    </div>
  )
}
