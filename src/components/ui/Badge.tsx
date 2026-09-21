import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

type Tone = 'accent' | 'primary' | 'secondary' | 'muted'

const tones: Record<Tone, string> = {
  accent: 'border-accent/30 bg-accent/10 text-accent-light',
  primary: 'border-secondary/40 bg-secondary/15 text-blue-300',
  secondary: 'border-violet-500/40 bg-violet-500/15 text-violet-300',
  muted: 'border-line bg-surface/50 text-muted',
}

interface Props {
  children: ReactNode
  tone?: Tone
  className?: string
  mono?: boolean
}

/** Etiqueta pequeña para categorías, estados y metadatos. */
export function Badge({ children, tone = 'muted', className, mono = true }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none',
        mono && 'font-mono uppercase tracking-[0.12em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
