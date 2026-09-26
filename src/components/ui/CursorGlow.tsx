import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHasFinePointer, usePrefersReducedMotion } from "../../hooks/useMediaQuery";

const SPRING = { stiffness: 80, damping: 22, mass: 0.7 };
const SIZE = 420;

/**
 * Resplandor único y discreto que acompaña al cursor dentro del contenedor
 * padre, con inercia suave (spring). Un solo tono, sin partículas ni mezclas
 * de color. Se desactiva con "reducir movimiento" y en pantallas táctiles.
 */
export default function CursorGlow() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;

  const x = useSpring(useMotionValue(-SIZE), SPRING);
  const y = useSpring(useMotionValue(-SIZE), SPRING);
  const opacity = useSpring(useMotionValue(0), { stiffness: 80, damping: 28 });

  useEffect(() => {
    if (!enabled) return;
    const parent = wrapperRef.current?.parentElement;
    if (!parent) return;

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      x.set(e.clientX - r.left - SIZE / 2);
      y.set(e.clientY - r.top - SIZE / 2);
      opacity.set(1);
    };
    const onLeave = () => opacity.set(0);

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y, opacity]);

  if (!enabled) return null;

  return (
    <div ref={wrapperRef} className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute left-0 top-0 rounded-full blur-3xl"
        style={{
          width: SIZE,
          height: SIZE,
          x,
          y,
          opacity,
          background: "radial-gradient(circle, rgb(139 92 246 / 0.16), transparent 70%)",
        }}
      />
    </div>
  );
}
