import { useCallback, useSyncExternalStore } from 'react'

/** Suscripción reactiva a una media query (sin renders en cascada). */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )
  const getSnapshot = () => window.matchMedia(query).matches
  const getServerSnapshot = () => false
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Pantallas estrechas (móvil / tablet pequeña). */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')

/** Dispositivo con puntero preciso (ratón/trackpad). */
export const useHasFinePointer = () => useMediaQuery('(pointer: fine)')

/** Preferencia del sistema de reducir movimiento. */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
