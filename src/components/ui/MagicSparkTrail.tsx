import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useHasFinePointer, usePrefersReducedMotion } from "../../hooks/useMediaQuery";

// Mismos tonos del degradado de marca (text-gradient): violeta, fucsia y dorado suave.
const COLORS = ["196 181 253", "240 171 252", "253 186 116"];

const TRAIL = [
  { size: 14, stiffness: 300, damping: 22 },
  { size: 11, stiffness: 190, damping: 22 },
  { size: 8.5, stiffness: 130, damping: 23 },
  { size: 6.5, stiffness: 95, damping: 24 },
  { size: 5, stiffness: 70, damping: 25 },
];

interface DotProps {
  leaderX: MotionValue<number>;
  leaderY: MotionValue<number>;
  opacity: MotionValue<number>;
  size: number;
  stiffness: number;
  damping: number;
  color: string;
}

function TrailDot({ leaderX, leaderY, opacity, size, stiffness, damping, color }: DotProps) {
  const x = useSpring(leaderX, { stiffness, damping, mass: 0.5 });
  const y = useSpring(leaderY, { stiffness, damping, mass: 0.5 });

  return (
    <motion.div
      className="absolute left-0 top-0 rounded-full"
      style={{
        width: size * 3.4,
        height: size * 3.4,
        x,
        y,
        opacity,
        marginLeft: -(size * 1.7),
        marginTop: -(size * 1.7),
        background: `radial-gradient(circle, rgba(${color}, 0.85), rgba(${color}, 0) 70%)`,
        filter: "blur(1px)",
      }}
    />
  );
}

/**
 * Estela de chispas mágicas: pequeños destellos con brillo que van perdiendo
 * tamaño y se retrasan cada vez más, como una cola de cometa que sigue al
 * cursor. Basado en divs con resortes independientes (sin canvas), para que
 * siempre se pinte de forma fiable. Se desactiva con "reducir movimiento" y
 * en pantallas táctiles.
 */
export default function MagicSparkTrail() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;

  const leaderX = useMotionValue(-100);
  const leaderY = useMotionValue(-100);
  const opacity = useSpring(useMotionValue(0), { stiffness: 120, damping: 26 });

  useEffect(() => {
    if (!enabled) return;
    const parent = wrapperRef.current?.parentElement;
    if (!parent) return;

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      leaderX.set(e.clientX - r.left);
      leaderY.set(e.clientY - r.top);
      opacity.set(1);
    };
    const onLeave = () => opacity.set(0);

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, leaderX, leaderY, opacity]);

  if (!enabled) return null;

  return (
    <div ref={wrapperRef} className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      {TRAIL.map((dot, i) => (
        <TrailDot key={i} leaderX={leaderX} leaderY={leaderY} opacity={opacity} color={COLORS[i % COLORS.length]} {...dot} />
      ))}
      <motion.div
        className="absolute left-0 top-0 size-2 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.8)]"
        style={{ x: leaderX, y: leaderY, opacity, marginLeft: -4, marginTop: -4 }}
      />
    </div>
  );
}
