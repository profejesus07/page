import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Globe, GraduationCap, Play, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CodeTerminal } from "../components/academia/CodeTerminal";
import { MissionTimeline } from "../components/academia/MissionTimeline";
import { NeuronPanel } from "../components/academia/NeuronPanel";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { Badge } from "../components/ui/Badge";
import { Reveal, useRevealTransition } from "../components/ui/Reveal";
import { ACADEMIA, MISSION_PHASES, TERMINAL_SCRIPT } from "../data/academia";
import { siteLinks } from "../data/siteLinks";

const HUD_TAGS = ["Gamificación educativa", "Formación individual", "Niveles de hacker", "Objetos especiales"];

interface PortalLinkProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

function PortalLink({ label, href, icon: Icon }: PortalLinkProps) {
  if (!href) {
    return (
      <span
        title={`${label} (enlace pendiente)`}
        className="flex cursor-not-allowed items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white/35"
      >
        <Icon size={20} strokeWidth={2.2} />
        <span className="font-semibold">{label}</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-4 text-accent-light transition-colors duration-200 hover:bg-accent/20"
    >
      <Icon size={20} strokeWidth={2.2} />
      <span className="font-semibold">{label}</span>
    </a>
  );
}

/** Academia C.O.D.E.: experiencia narrativa de gamificación con NEURON como antagonista. */
export default function AcademiaCodePage() {
  const { academiaCode } = siteLinks;
  const [activeIndex, setActiveIndex] = useState(0);
  const onActivate = useCallback((i: number) => setActiveIndex(i), []);
  const reveal = useRevealTransition();
  const phase = MISSION_PHASES[activeIndex];

  const startMission = () => {
    document.getElementById("academia-mision")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      aria-labelledby="academia-title"
      className="academia-theme relative overflow-clip bg-[#040a13] py-24 sm:py-28"
    >
      {/* Ambientación: scanlines, grid y halos */}
      <div className="scanlines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-32 top-24 size-[30rem] rounded-full bg-secondary/20 blur-[140px]" aria-hidden />
      <div className="pointer-events-none absolute -right-32 bottom-24 size-[30rem] rounded-full bg-accent/10 blur-[140px]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" aria-hidden />

      <Container className="relative">
        {/* Cabecera */}
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <motion.p {...reveal(0)} className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-light">
              <span className="text-muted">//</span>
              <span className="h-px w-8 bg-accent/50" aria-hidden />
              Gamificación educativa
            </motion.p>
            <motion.h1
              {...reveal(0.08)}
              id="academia-title"
              data-text={ACADEMIA.name.toUpperCase()}
              className="glitch-text font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl lg:text-6xl"
            >
              {ACADEMIA.name.toUpperCase()}
            </motion.h1>
            <motion.p
              {...reveal(0.14)}
              className="mt-4 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-accent-light"
            >
              <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_rgb(16_185_129)]" aria-hidden />
              {ACADEMIA.motto}
            </motion.p>
            <motion.p {...reveal(0.2)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {ACADEMIA.intro}
            </motion.p>
            <motion.ul {...reveal(0.26)} className="mt-6 flex flex-wrap gap-2" aria-label="Claves de la experiencia">
              {HUD_TAGS.map((t) => (
                <li key={t}>
                  <Badge tone="secondary">{t}</Badge>
                </li>
              ))}
            </motion.ul>
            <motion.div {...reveal(0.32)} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button variant="accent" size="lg" onClick={startMission} icon={<Play className="size-4" aria-hidden />}>
                Iniciar misión
              </Button>
              <p className="flex items-start gap-2 text-xs leading-relaxed text-muted sm:max-w-xs">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent-light" aria-hidden />
                {ACADEMIA.disclaimer}
              </p>
            </motion.div>
          </div>

          <Reveal delay={0.2} direction="left">
            <CodeTerminal lines={TERMINAL_SCRIPT} />
          </Reveal>
        </div>

        {/* Misión interactiva */}
        <div id="academia-mision" className="mt-20 scroll-mt-24 sm:mt-24">
          <Reveal>
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-light">Misión // Recorrido</p>
                <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">De la amenaza a la liberación</h2>
              </div>
              <p className="max-w-md text-sm text-muted">
                Desplázate por las fases: NEURON reacciona en tiempo real a medida que los hackers avanzan.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Reveal direction="right">
                <NeuronPanel phase={phase} />
              </Reveal>
            </div>
            <MissionTimeline phases={MISSION_PHASES} activeIndex={activeIndex} onActivate={onActivate} />
          </div>
        </div>

        {/* Portales de acceso */}
        <div className="mt-24 flex flex-col items-center gap-5">
          <p className="text-sm font-bold uppercase tracking-wide text-white/50">Portales de acceso</p>
          <div className="grid w-full gap-3 sm:grid-cols-3">
            <PortalLink label="Portal estudiante" href={academiaCode.portalEstudiante} icon={GraduationCap} />
            <PortalLink label="Portal web" href={academiaCode.portalWeb} icon={Globe} />
            <PortalLink label="Gamificación" href={academiaCode.gamificacion} icon={Gamepad2} />
          </div>
          <Button href="/" variant="ghost-light" className="mt-4">
            Volver al inicio
          </Button>
        </div>
      </Container>
    </section>
  );
}
