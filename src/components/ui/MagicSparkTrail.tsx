import { useEffect, useRef } from "react";
import { useHasFinePointer, usePrefersReducedMotion } from "../../hooks/useMediaQuery";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 1 → 0
  size: number;
  color: string; // "r g b"
  rotation: number;
  spin: number;
}

// Mismos tonos del degradado de marca (text-gradient): violeta, fucsia y dorado suave.
const COLORS = ["196 181 253", "240 171 252", "253 186 116"];
const MAX_SPARKS = 160;
const SPARKS_PER_TICK = 2;
const SPAWN_INTERVAL = 16; // ms entre grupos de chispas

/**
 * Estela de chispas mágicas: pequeños destellos con brillo e inercia que
 * el cursor va dejando a su paso, con caída y desvanecimiento suaves.
 * Se desactiva con "reducir movimiento" y en pantallas táctiles.
 */
export default function MagicSparkTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!enabled || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let sparks: Spark[] = [];
    let lastSpawn = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x: number, y: number) => {
      for (let i = 0; i < SPARKS_PER_TICK; i++) {
        if (sparks.length >= MAX_SPARKS) sparks.shift();
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.25 + Math.random() * 0.55;
        sparks.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.2,
          life: 1,
          size: 1.4 + Math.random() * 2.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rotation: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.08,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      const now = performance.now();
      if (now - lastSpawn < SPAWN_INTERVAL) return;
      lastSpawn = now;
      spawn(x, y);
    };

    const drawSpark = (s: Spark) => {
      const alpha = Math.max(s.life, 0);
      const glow = s.size * 4 * (0.4 + s.life * 0.6);

      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glow);
      gradient.addColorStop(0, `rgba(${s.color}, ${0.55 * alpha})`);
      gradient.addColorStop(1, `rgba(${s.color}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, glow, 0, Math.PI * 2);
      ctx.fill();

      const len = s.size * 3 * alpha;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.85 * alpha})`;
      ctx.lineWidth = Math.max(0.6, s.size * 0.35);
      ctx.beginPath();
      ctx.moveTo(-len, 0);
      ctx.lineTo(len, 0);
      ctx.moveTo(0, -len);
      ctx.lineTo(0, len);
      ctx.stroke();

      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(0, 0, s.size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      sparks = sparks.filter((s) => s.life > 0);
      for (const s of sparks) {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.006; // gravedad sutil
        s.vx *= 0.98;
        s.vy *= 0.98;
        s.rotation += s.spin;
        s.life -= 0.018;
        drawSpark(s);
      }
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };

    resize();
    raf = requestAnimationFrame(frame);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
}
