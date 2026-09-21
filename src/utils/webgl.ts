let cached: boolean | null = null

/** Detecta si el navegador puede crear un contexto WebGL (con caché). */
export function isWebGLAvailable(): boolean {
  if (cached !== null) return cached
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    cached = Boolean(gl && 'getParameter' in (gl as object))
  } catch {
    cached = false
  }
  return cached
}
