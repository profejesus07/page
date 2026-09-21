import { useEffect, useRef } from 'react'
import { useHasFinePointer, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

const LINK_DIST = 130
const MOUSE_DIST = 180
const DENSITY = 1 / 16000 // nodos por px²
const MAX_NODES = 110

/**
 * Red neuronal ambiental: nodos que derivan lentamente y se conectan con el
 * puntero. Ocupa el contenedor relativo más cercano (el Hero). Superposición sutil (pointer-events: none) para conservar el tono
 * académico. Se desactiva con "reducir movimiento" y en pantallas táctiles.
 */
export default function NeuralCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const finePointer = useHasFinePointer()
  const reduced = usePrefersReducedMotion()
  const enabled = finePointer && !reduced

  useEffect(() => {
    const canvas = canvasRef.current
    if (!enabled || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let nodes: Node[] = []
    let raf = 0
    const mouse = { x: -9999, y: -9999, active: false }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(MAX_NODES, Math.round(w * h * DENSITY))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }))
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      mouse.active = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= r.width && mouse.y <= r.height
    }
    const onLeave = () => {
      mouse.active = false
    }

    const frame = () => {
      ctx.clearRect(0, 0, w, h)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1

        if (mouse.active) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const d = Math.hypot(dx, dy)
          if (d < MOUSE_DIST && d > 1) {
            // atracción suave hacia el puntero
            n.x -= (dx / d) * 0.35
            n.y -= (dy / d) * 0.35
          }
        }
      }

      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(37, 99, 235, ${(1 - d / LINK_DIST) * 0.16})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        if (mouse.active) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y)
          if (d < MOUSE_DIST) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - d / MOUSE_DIST) * 0.55})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = 'rgba(37, 99, 235, 0.35)'
        ctx.beginPath()
        ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 90)
        g.addColorStop(0, 'rgba(16, 185, 129, 0.16)')
        g.addColorStop(1, 'rgba(16, 185, 129, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 90, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(frame)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(frame)
    }

    resize()
    raf = requestAnimationFrame(frame)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
