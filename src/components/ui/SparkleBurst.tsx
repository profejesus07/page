import { AnimatePresence, motion } from "framer-motion";

interface SparkleBurstProps {
  active: boolean;
  className?: string;
}

const SPARKS = [
  { top: "4%", left: "10%", size: 9, delay: 0 },
  { top: "14%", left: "84%", size: 7, delay: 0.06 },
  { top: "70%", left: "90%", size: 8, delay: 0.12 },
  { top: "86%", left: "18%", size: 6, delay: 0.04 },
  { top: "38%", left: "-6%", size: 6, delay: 0.16 },
  { top: "-4%", left: "52%", size: 7, delay: 0.02 },
];

/** Destellos breves y de un solo tono que celebran un saludo del Mascot. */
export default function SparkleBurst({ active, className = "" }: SparkleBurstProps) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-visible ${className}`}>
      <AnimatePresence>
        {active &&
          SPARKS.map((spark, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-accent-light shadow-[0_0_8px_rgb(16_185_129/0.85)]"
              style={{ top: spark.top, left: spark.left, width: spark.size, height: spark.size }}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.8], y: -16 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: spark.delay, ease: "easeOut" }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
