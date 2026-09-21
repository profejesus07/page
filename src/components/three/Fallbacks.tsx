import { cn } from '../../utils/cn'

/** Alternativa CSS al núcleo NEURON cuando WebGL no está disponible. */
export function NeuronFallback({ control, className }: { control: number; className?: string }) {
  const hue = 270 - (270 - 160) * (1 - control / 100)
  const color = `hsl(${hue} 90% 65%)`
  return (
    <div className={cn('relative grid place-items-center', className)} aria-hidden>
      <div className="absolute size-[70%] rounded-full border animate-spin-slow" style={{ borderColor: color, opacity: 0.5, borderStyle: 'dashed' }} />
      <div className="absolute size-[50%] rotate-45 border-2 animate-pulse-soft" style={{ borderColor: color }} />
      <div className="absolute size-[30%] rounded-full blur-2xl" style={{ background: color, opacity: 0.4 }} />
      <div className="absolute size-[14%] rotate-45" style={{ background: color, boxShadow: `0 0 50px 10px ${color}` }} />
    </div>
  )
}
