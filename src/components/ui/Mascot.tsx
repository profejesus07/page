import { motion } from "framer-motion";
import { useState } from "react";
import avatar from "../../assets/images/profe-jesus-avatar.webp";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { cn } from "../../utils/cn";
import SparkleBurst from "./SparkleBurst";

interface MascotProps {
  /** "idle": vaivén ligero (Hero). "floating": deriva lenta, como perdido en el espacio (404, próximamente). */
  variant?: "idle" | "floating";
  /** Si es true, al pasar el cursor saluda con un pequeño gesto feliz y destellos. */
  interactive?: boolean;
  alt?: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  fetchPriority?: "high" | "low" | "auto";
}

const LOOP_BY_VARIANT: Record<NonNullable<MascotProps["variant"]>, { keyframes: { y: number[]; rotate?: number[] }; duration: number }> = {
  idle: { keyframes: { y: [0, -8, 0] }, duration: 4.5 },
  floating: { keyframes: { y: [0, -16, 0], rotate: [-3, 3, -3] }, duration: 6.5 },
};

const GREETING = { rotate: [0, -10, 9, -7, 6, 0] };

/**
 * Personaje del sitio (el avatar del Profe Jesús) animado: un vaivén sutil en
 * reposo y, si es interactivo, un saludo feliz con destellos al pasar el
 * cursor. Es la versión propia de las "Mona" contextuales de GitHub.
 */
export default function Mascot({
  variant = "idle",
  interactive = false,
  alt = "",
  className,
  imgClassName,
  width,
  height,
  fetchPriority,
}: MascotProps) {
  const reduced = usePrefersReducedMotion();
  const [greeting, setGreeting] = useState(false);
  const { keyframes, duration } = LOOP_BY_VARIANT[variant];

  return (
    <motion.div
      className={cn("relative inline-block select-none", className)}
      animate={reduced ? undefined : keyframes}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      onHoverStart={() => interactive && !reduced && setGreeting(true)}
    >
      {interactive && <SparkleBurst active={greeting} />}
      <motion.img
        src={avatar}
        alt={alt}
        draggable={false}
        width={width}
        height={height}
        fetchPriority={fetchPriority}
        className={cn("pointer-events-none select-none", imgClassName)}
        animate={greeting ? GREETING : { rotate: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        onAnimationComplete={() => greeting && setGreeting(false)}
      />
    </motion.div>
  );
}
