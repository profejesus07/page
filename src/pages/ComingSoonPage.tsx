import { type LucideIcon, Sparkles } from "lucide-react";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import Mascot from "../components/ui/Mascot";

interface ComingSoonPageProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  /** Si la sección ya tiene un portal real, se muestra un CTA en vez de "Próximamente". */
  link?: { href: string; label: string };
}

export default function ComingSoonPage({ title, description, icon: Icon = Sparkles, link }: ComingSoonPageProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-background py-20">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 blur-[120px]"
      />
      <Container className="relative">
        <div className="gradient-border relative mx-auto flex max-w-xl flex-col items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-b from-[#1a1627] to-surface px-8 py-14 text-center shadow-[0_40px_100px_-40px_rgb(139_92_246/0.5)]">
          <div
            aria-hidden
            className="bg-stars pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]"
          />

          <Mascot
            variant="floating"
            className="pointer-events-none absolute right-5 top-5 h-14 w-14 opacity-90 sm:right-8 sm:top-8"
            imgClassName="h-14 w-14 rounded-full border border-white/15 bg-surface object-cover object-top ring-2 ring-secondary/30"
          />

          <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-secondary/30 bg-secondary/15 text-secondary-light">
            <Icon size={30} strokeWidth={2.2} />
          </div>
          {link ? (
            <span className="relative rounded-full border border-accent/30 bg-accent/15 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent-light">
              Disponible
            </span>
          ) : (
            <span className="relative rounded-full border border-creative/30 bg-creative/15 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-orange-300">
              Próximamente
            </span>
          )}
          <h1 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h1>
          <p className="relative text-balance leading-relaxed text-muted">{description}</p>
          <div className="relative flex flex-col gap-3 sm:flex-row">
            {link && (
              <Button href={link.href} variant="accent">
                {link.label}
              </Button>
            )}
            <Button href="/" variant="secondary">
              Volver al inicio
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
