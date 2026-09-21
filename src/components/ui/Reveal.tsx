import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none' | 'scale'

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
  scale: { scale: 0.94 },
}

export const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Devuelve props de framer-motion para una aparición al entrar en pantalla.
 * Con prefers-reduced-motion solo aplica un fade muy corto.
 */
export function useRevealTransition() {
  const reduce = useReducedMotion()
  return (delay = 0, direction: Direction = 'up') => {
    const from = reduce ? {} : offsets[direction]
    return {
      initial: { opacity: 0, ...from },
      whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
      viewport: { once: true, margin: '0px 0px -10% 0px' },
      transition: { duration: reduce ? 0.2 : 0.7, delay: reduce ? 0 : delay, ease: EASE },
    }
  }
}

interface RevealProps {
  children: ReactNode
  delay?: number
  direction?: Direction
  className?: string
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
}

/** Contenedor que aparece progresivamente al hacer scroll. */
export function Reveal({ children, delay = 0, direction = 'up', className, as = 'div' }: RevealProps) {
  const reveal = useRevealTransition()
  const Tag = motion[as]
  return (
    <Tag {...reveal(delay, direction)} className={className}>
      {children}
    </Tag>
  )
}

/** Variantes para listas con aparición escalonada. */
export function useStaggerVariants(stagger = 0.08): { container: Variants; item: Variants } {
  const reduce = useReducedMotion()
  return {
    container: {
      hidden: {},
      show: { transition: { staggerChildren: reduce ? 0 : stagger } },
    },
    item: {
      hidden: { opacity: 0, y: reduce ? 0 : 24 },
      show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.6, ease: EASE } },
    },
  }
}
