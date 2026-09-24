import { Compass } from "lucide-react";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";

export default function NotFoundPage() {
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
        <div className="gradient-border mx-auto flex max-w-xl flex-col items-center gap-6 rounded-3xl bg-gradient-to-b from-[#1a1627] to-surface px-8 py-14 text-center shadow-[0_40px_100px_-40px_rgb(139_92_246/0.5)]">
          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-secondary/30 bg-secondary/15 text-secondary-light">
            <Compass size={30} strokeWidth={2.2} />
          </div>
          <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-secondary-light">Error 404</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Esta página no existe</h1>
          <p className="text-balance leading-relaxed text-muted">
            El contenido que buscas no está disponible o se movió de lugar. Vuelve al inicio para
            seguir explorando.
          </p>
          <Button href="/" variant="secondary">
            Volver al inicio
          </Button>
        </div>
      </Container>
    </section>
  );
}
