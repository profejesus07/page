import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Ghost, ScrollText, Activity } from 'lucide-react'
import type { StoryPhase } from '../../types/content'
import { cn } from '../../utils/cn'

interface Props {
  phase: StoryPhase
  className?: string
}

/** Palabras que Mutis robó. Vuelven de a una, en orden, a medida que avanza la crónica. */
const WORDS = [
  { word: 'friend', angle: 200 },
  { word: 'magic', angle: 250 },
  { word: 'school', angle: 300 },
  { word: 'dream', angle: 340 },
  { word: 'happy', angle: 20 },
  { word: 'book', angle: 60 },
  { word: 'family', angle: 100 },
  { word: 'star', angle: 140 },
  { word: 'music', angle: 170 },
  { word: 'water', angle: 225 },
  { word: 'sun', angle: 315 },
  { word: 'hello', angle: 45 },
] as const

function wordPosition(angle: number, returned: boolean) {
  const radians = (angle * Math.PI) / 180
  const [rx, ry] = returned ? [46, 42] : [28, 25]
  return { left: `${50 + Math.cos(radians) * rx}%`, top: `${50 + Math.sin(radians) * ry}%` }
}

/** Panel "MUTIS // EL LADRÓN": estado ficticio que reacciona a la fase narrativa activa. */
export function MutisPanel({ phase, className }: Props) {
  const reduce = useReducedMotion() ?? false
  const { stolen, status, lines } = phase.mutis
  const defeated = stolen === 0
  const returnedCount = Math.round(((100 - stolen) / 100) * WORDS.length)

  return (
    <div
      className={cn(
        'hud-corners-gold relative overflow-hidden rounded-2xl border bg-[#0a0616]/90 transition-colors duration-700',
        defeated ? 'border-accent/40 shadow-[0_0_40px_-8px_rgb(234_179_8/0.45)]' : 'border-fuchsia-400/30 shadow-[0_0_40px_-8px_rgb(217_70_239/0.45)]',
        className,
      )}
      role="region"
      aria-label="Panel de Mutis, el Ladrón de Palabras (ambientación narrativa)"
    >
      <div className="pointer-events-none absolute inset-0 scanlines-gold opacity-50" aria-hidden />

      {/* Cabecera */}
      <div className="relative flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
          <Ghost className={cn('size-4', defeated ? 'text-accent-light' : 'text-fuchsia-300')} aria-hidden />
          <span className="text-slate-50">MUTIS</span>
          <span className="text-muted">//</span>
          <span className="text-muted">EL LADRÓN</span>
        </div>
        <span
          className={cn(
            'flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em]',
            defeated ? 'text-accent-light' : 'text-fuchsia-300',
          )}
        >
          <span className={cn('size-1.5 rounded-full', defeated ? 'bg-accent' : 'bg-fuchsia-400', !reduce && 'animate-pulse')} aria-hidden />
          {defeated ? 'desvanecido' : 'activo'}
        </span>
      </div>

      {/* Escena: aura de Mutis y las palabras que orbitan */}
      <div className="relative mx-auto h-56 w-full max-w-sm sm:h-64">
        <div
          className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgb(217_70_239/0.35),transparent_68%)] transition-opacity duration-700"
          style={{ opacity: stolen / 100 }}
          aria-hidden
        />
        <div
          className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgb(234_179_8/0.35),transparent_68%)] transition-opacity duration-700"
          style={{ opacity: 1 - stolen / 100 }}
          aria-hidden
        />
        <svg viewBox="0 0 200 200" className="absolute inset-4 size-[calc(100%-2rem)]" aria-hidden>
          <g className="origin-center motion-safe:animate-spin-slow" fill="none" strokeLinecap="round">
            <circle cx="100" cy="100" r="92" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="2 9" className="text-accent" />
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="14 10" className="text-fuchsia-300" />
          </g>
        </svg>

        <div
          className={cn(
            'absolute top-1/2 left-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 transition-[filter,transform] duration-700 motion-safe:animate-float',
            defeated ? 'scale-90 border-accent/50 bg-accent/10' : 'border-fuchsia-400/50 bg-fuchsia-500/10',
          )}
        >
          <Ghost className={cn('size-10', defeated ? 'text-accent-light/70' : 'text-fuchsia-200')} aria-hidden />
        </div>

        {WORDS.map(({ word, angle }, index) => {
          const returned = index < returnedCount
          return (
            <span key={word} lang="en" style={wordPosition(angle, returned)} className="absolute -translate-x-1/2 -translate-y-1/2 transition-[left,top,opacity] duration-700">
              <span
                className={cn(
                  'block rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold transition-colors duration-700',
                  returned ? 'border-accent/60 bg-accent/15 text-accent-light shadow-[0_0_10px_rgb(234_179_8/0.35)]' : 'border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-200/80',
                )}
              >
                {word}
              </span>
            </span>
          )
        })}
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
            className={cn('font-mono text-xs font-medium uppercase tracking-[0.18em]', defeated ? 'text-accent-light' : 'text-fuchsia-300')}
          >
            {status}
          </motion.p>
        </AnimatePresence>

        <div>
          <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            <span>Palabras robadas</span>
            <span className="text-slate-50">{stolen}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface" role="progressbar" aria-valuenow={stolen} aria-valuemin={0} aria-valuemax={100} aria-label="Palabras que Mutis aún esconde (ficción)">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-fuchsia-500 to-accent"
              animate={{ width: `${stolen}%` }}
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
                <span className={cn('size-1 rounded-full', defeated ? 'bg-accent' : 'bg-fuchsia-400')} aria-hidden />
                {l}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="flex items-center justify-between border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          <span className="flex items-center gap-1.5">
            <ScrollText className="size-3" aria-hidden /> reino de eldoria
          </span>
          <span className="flex items-center gap-1.5">
            <Activity className="size-3" aria-hidden /> fase {phase.index}
          </span>
        </div>
      </div>
    </div>
  )
}
