import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * En cada cambio de ruta: si la URL trae un hash (p. ej. al navegar desde
 * otra página hacia "/#academia-code"), baja suavemente hasta esa sección
 * una vez que el DOM del destino está montado. Si no hay hash, sube al
 * tope de la página.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const frame = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
