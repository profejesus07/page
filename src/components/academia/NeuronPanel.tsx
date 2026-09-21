import { lazy } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Activity, Brain, Wifi } from 'lucide-react'
import type { MissionPhase } from '../../types/content'
import { useIsMobile } from '../../hooks/useMediaQuery'
import { SceneFrame } from '../three/SceneFrame'
import { NeuronFallback } from '../three/Fallbacks'
import { cn } from '../../utils/cn'

const NeuronCore = lazy(() => import('../three/NeuronCore'))

interface Props {
  phase: MissionPhase
  className?: string
}

/** Panel "NEURON // AI SYSTEM": estado ficticio que reacciona a la fase narrativa activa. */
export function NeuronPanel({ phase, className }: Props) {
  const isMobile = useIsMobile()
  const reduce = useReducedMotion() ?? false
  const { control, status, lines } = phase.neuron
  const hostile = control > 50
  const offline = control === 0

  return (
    <div
      className={cn(
        'hud-corners relative overflow-hidden rounded-2xl border bg-[#050b14]/90 transition-colors duration-700',
        hostile ? 'border-secondary/40 shadow-[0_0_40px_-8px_rgb(124_58_237/0.5)]' : 'border-accent/40 shadow-[0_0_40px_-8px_rgb(16_185_129/0.45)]',
        className,
      )}
      role="region"
      aria-label="Panel de NEURON (ambientación narrativa)"
    >
      <div className="pointer-events-none absolute inset-0 scanlines opacity-50" aria-hidden />

      {/* Cabecera */}
      <div className="relative flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
          <Brain className={cn('size-4', hostile ? 'text-violet-300' : 'text-accent-light')} aria-hidden />
          <span className="text-slate-50">NEURON</span>
          <span className="text-muted">//</span>
          <span className="text-muted">AI SYSTEM</span>
        </div>
        <span
          className={cn(
            'flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em]',
            offline ? 'text-muted' : hostile ? 'text-violet-300' : 'text-accent-light',
          )}
        >
          <span
            className={cn('size-1.5 rounded-full', offline ? 'bg-muted' : hostile ? 'bg-violet-400' : 'bg-accent', !offline && !reduce && 'animate-pulse')}
            aria-hidden
          />
          {offline ? 'offline' : 'online'}
        </span>
      </div>

      {/* Escena 3D */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
        <SceneFrame className="size-full" fallback={<NeuronFallback control={control} className="size-full" />}>
          {(active) => <NeuronCore control={control} isMobile={isMobile} reducedMotion={reduce} active={active} />}
        </SceneFrame>
        <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          <span className="flex items-center gap-1.5">
            <Wifi className="size-3" aria-hidden /> student network
          </span>
          <span className="flex items-center gap-1.5">
            <Activity className="size-3" aria-hidden /> fase {phase.index}
          </span>
        </div>
      </div>

      {/* Estado */}
      <div className="relative space-y-4 border-t border-line p-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={status}
            initial={{ opacity: 0, y: reduce ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -6 }}
            transition={{ duration: 0.3 }}
            className={cn('font-mono text-xs font-medium uppercase tracking-[0.18em]', hostile ? 'text-violet-300' : 'text-accent-light')}
          >
            {status}
          </motion.p>
        </AnimatePresence>

        <div>
          <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            <span>Cognitive control</span>
            <span className="text-slate-50">{control}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface" role="progressbar" aria-valuenow={control} aria-valuemin={0} aria-valuemax={100} aria-label="Nivel de control de NEURON (ficción)">
            <motion.div
              className={cn('h-full rounded-full', hostile ? 'bg-gradient-to-r from-violet-600 to-secondary' : 'bg-gradient-to-r from-secondary to-accent')}
              animate={{ width: `${control}%` }}
              transition={{ duration: reduce ? 0 : 0.9, ease: 'easeOut' }}
            />
          </div>
        </div>

        <ul className="space-y-1 font-mono text-[11px] uppercase tracking-[0.14em]">
          <AnimatePresence mode="popLayout" initial={false}>
            {lines.map((l, i) => (
              <motion.li
                key={`${phase.id}-${l}`}
                initial={{ opacity: 0, x: reduce ? 0 : -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: i * 0.06 }}
                className="flex items-center gap-2 text-muted"
              >
                <span className={cn('size-1 rounded-full', hostile ? 'bg-violet-400' : 'bg-accent')} aria-hidden />
                {l}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}
