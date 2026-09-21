import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { MissionPhase } from '../../types/content'
import { cn } from '../../utils/cn'
import { EASE } from '../ui/Reveal'

interface Props {
  phases: MissionPhase[]
  activeIndex: number
  onActivate: (index: number) => void
}

/**
 * Línea de misión: las fases aparecen al hacer scroll y la fase centrada en pantalla
 * se convierte en la activa (actualiza el panel NEURON). También se puede activar con clic/teclado.
 */
export function MissionTimeline({ phases, activeIndex, onActivate }: Props) {
  const refs = useRef<Array<HTMLLIElement | null>>([])
  const reduce = useReducedMotion()

  // Observa qué fase está en el centro del viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index)
            if (!Number.isNaN(idx)) onActivate(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [onActivate, phases.length])

  return (
    <ol className="relative space-y-4" aria-label="Fases de la misión">
      {/* Línea vertical */}
      <div className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-line" aria-hidden />
      <motion.div
        className="absolute left-[1.35rem] top-6 w-px origin-top bg-gradient-to-b from-accent via-secondary to-secondary"
        animate={{ height: `calc(${(activeIndex / Math.max(1, phases.length - 1)) * 100}% - 3rem)` }}
        transition={{ duration: reduce ? 0 : 0.6, ease: 'easeOut' }}
        aria-hidden
      />

      {phases.map((phase, i) => {
        const Icon = phase.icon
        const isActive = i === activeIndex
        const isPast = i < activeIndex
        return (
          <motion.li
            key={phase.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            data-index={i}
            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
            className="relative pl-14"
          >
            {/* Nodo */}
            <span
              className={cn(
                'absolute left-0 top-4 grid size-11 place-items-center rounded-full border transition-all duration-500',
                isActive
                  ? 'scale-110 border-accent bg-accent/15 text-accent-light shadow-[0_0_40px_-8px_rgb(16_185_129/0.45)]'
                  : isPast
                    ? 'border-secondary/60 bg-secondary/10 text-secondary'
                    : 'border-line bg-background text-muted',
              )}
              aria-hidden
            >
              <Icon className="size-5" />
            </span>

            <button
              type="button"
              onClick={() => {
                onActivate(i)
                refs.current[i]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
              }}
              aria-current={isActive ? 'step' : undefined}
              className={cn(
                'hud-corners w-full rounded-2xl border p-5 text-left transition-all duration-500 sm:p-6',
                isActive
                  ? 'border-accent/40 bg-accent/[0.06] shadow-[0_0_40px_-8px_rgb(16_185_129/0.45)]'
                  : 'border-line bg-surface/30 hover:border-line-strong hover:bg-surface/50',
              )}
            >
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-light">
                <span className="shrink-0 whitespace-nowrap">Fase {phase.index}</span>
                <span className="hidden h-px flex-1 bg-line sm:block" aria-hidden />
                <span className="ml-auto text-right text-muted">{phase.subtitle}</span>
              </p>
              <h4 className="mt-3 font-display text-xl font-bold sm:text-2xl">{phase.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">{phase.description}</p>
              <p className={cn('mt-4 font-mono text-[10.5px] uppercase tracking-[0.16em]', isActive ? 'text-violet-300' : 'text-muted/70')}>
                NEURON · {phase.neuron.status}
              </p>
            </button>
          </motion.li>
        )
      })}
    </ol>
  )
}
