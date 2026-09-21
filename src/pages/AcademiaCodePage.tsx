import { AlertTriangle, Gamepad2, Globe, GraduationCap, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import FadeIn from "../components/ui/FadeIn";
import { siteLinks } from "../data/siteLinks";

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

export default function AcademiaCodePage() {
  const { academiaCode } = siteLinks;

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-white sm:py-28">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <Container className="relative max-w-3xl">
        <FadeIn>
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-primary-dark/60 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              <span className="ml-3 font-mono text-xs tracking-wide text-white/40">
                sistema_escolar — consola_de_emergencia
              </span>
            </div>

            <div className="flex flex-col gap-7 px-6 py-10 sm:px-10">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5">
                <AlertTriangle size={15} className="text-gold" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-gold">
                  Transmisión de emergencia
                </span>
              </div>

              <h1 className="text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
                Academia <span className="text-gold">C.O.D.E.</span>
              </h1>

              <div className="flex flex-col gap-5 text-balance leading-relaxed text-white/75">
                <p>
                  Una Superinteligencia Artificial fuera de control, conocida como{" "}
                  <strong className="font-mono text-white">N.E.U.R.O.N.</strong> (Nodo Electrónico de
                  Ubicuidad y Redirección Operativa Neuronal), ha tomado el control del servidor
                  central de la escuela. N.E.U.R.O.N. ha comenzado a infiltrar la mente de los
                  estudiantes a través de las pantallas y señales de la red, bloqueando su pensamiento
                  crítico, su creatividad y su capacidad de expresarse.
                </p>
                <p>
                  La Academia C.O.D.E. es el último foco de resistencia. Su misión es reclutar y
                  formar a una nueva generación de Hackers de la Lengua capaces de descifrar el
                  código fuente de N.E.U.R.O.N., destruir sus cortafuegos de manipulación, liberar
                  las mentes de sus compañeros y salvar la escuela antes de que sea demasiado tarde.
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                <ShieldAlert size={22} className="mt-0.5 shrink-0 text-accent-light" />
                <div>
                  <p className="font-mono text-sm font-bold tracking-wide text-white">N.E.U.R.O.N.</p>
                  <p className="mt-1 text-sm text-white/55">
                    Nodo Electrónico de Ubicuidad y Redirección Operativa Neuronal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={120} className="mt-10 flex flex-col items-center gap-5">
          <p className="text-sm font-bold uppercase tracking-wide text-white/50">Portales de acceso</p>
          <div className="grid w-full gap-3 sm:grid-cols-3">
            <PortalLink label="Portal estudiante" href={academiaCode.portalEstudiante} icon={GraduationCap} />
            <PortalLink label="Portal web" href={academiaCode.portalWeb} icon={Globe} />
            <PortalLink label="Gamificación" href={academiaCode.gamificacion} icon={Gamepad2} />
          </div>

          <Button href="/" variant="ghost-light" className="mt-4">
            Volver al inicio
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
