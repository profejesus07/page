import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import Button from "../ui/Button";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";

interface LegalLayoutProps {
  icon: LucideIcon;
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}

/** Encabezado y contenedor comunes a las páginas legales (aviso legal, privacidad, términos). */
export default function LegalLayout({ icon: Icon, title, updated, intro, children }: LegalLayoutProps) {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-12rem] h-[26rem] w-[48rem] max-w-[150vw] -translate-x-1/2 rounded-full bg-secondary/15 blur-[120px]"
      />

      <Container className="relative max-w-3xl">
        <FadeIn className="flex flex-col items-start gap-5">
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-secondary/30 bg-secondary/15 text-secondary-light">
            <Icon size={26} strokeWidth={2.2} />
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-secondary-light">
            Legal
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h1>
          <p className="text-sm text-white/45">Última actualización: {updated}</p>
          <p className="max-w-2xl text-balance leading-relaxed text-muted">{intro}</p>
        </FadeIn>

        <FadeIn delay={100} className="prose-legal mt-12 flex flex-col gap-10">
          {children}
        </FadeIn>

        <div className="mt-16">
          <Button href="/" variant="secondary">
            Volver al inicio
          </Button>
        </div>
      </Container>
    </section>
  );
}

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

/** Bloque de sección con título, para usar dentro de LegalLayout. */
export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted sm:text-base [&_a]:text-secondary-light [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-accent-light [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-white/90">
        {children}
      </div>
    </div>
  );
}
