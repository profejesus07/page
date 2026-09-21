import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { isWebGLAvailable } from '../../utils/webgl'
import { cn } from '../../utils/cn'

interface Props {
  /** Render de la escena; recibe `active` para pausar el frameloop fuera de pantalla. */
  children: (active: boolean) => ReactNode
  /** Alternativa cuando WebGL no está disponible o mientras se carga. */
  fallback: ReactNode
  className?: string
}

/**
 * Contenedor para escenas 3D:
 * - comprueba WebGL (si no hay, muestra el fallback CSS),
 * - carga la escena solo cuando está cerca del viewport,
 * - pausa el render cuando sale de pantalla.
 */
export function SceneFrame({ children, fallback, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [webgl] = useState<boolean>(() => isWebGLAvailable())
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const nearObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          nearObs.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    const visObs = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 })
    nearObs.observe(el)
    visObs.observe(el)
    return () => {
      nearObs.disconnect()
      visObs.disconnect()
    }
  }, [])

  const showScene = webgl && near

  return (
    <div ref={ref} className={cn('relative', className)}>
      {showScene ? <Suspense fallback={fallback}>{children(visible)}</Suspense> : fallback}
    </div>
  )
}
