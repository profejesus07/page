import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

/** Botón flotante que aparece al bajar y sube suavemente al inicio de la página. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
      className={`fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-surface/90 text-white/80 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.7)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/50 hover:text-white sm:bottom-8 sm:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp size={18} strokeWidth={2.4} />
    </button>
  );
}
