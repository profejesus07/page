import { CanvasTexture, SRGBColorSpace } from 'three'

let cached: CanvasTexture | null = null

/** Textura circular suave para que los puntos se vean como partículas y no cuadrados. */
export function getPointTexture(): CanvasTexture | null {
  if (cached) return cached
  if (typeof document === 'undefined') return null
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.8)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  cached = new CanvasTexture(canvas)
  cached.colorSpace = SRGBColorSpace
  return cached
}
