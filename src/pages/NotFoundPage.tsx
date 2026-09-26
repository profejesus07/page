import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import Mascot from "../components/ui/Mascot";

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
        <div className="gradient-border relative mx-auto flex max-w-xl flex-col items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-b from-[#1a1627] to-surface px-8 py-14 text-center shadow-[0_40px_100px_-40px_rgb(139_92_246/0.5)]">
          <div
            aria-hidden
            className="bg-stars pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_75%_75%_at_50%_20%,black,transparent)]"
          />

          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/30 blur-3xl"
            />

            <Mascot
              variant="floating"
              interactive
              className="relative h-28 w-28"
              imgClassName="h-28 w-28 rounded-full border border-white/15 bg-surface object-cover object-top ring-4 ring-secondary/25"
            />

            <div className="absolute -top-5 left-1/2 w-max max-w-[12rem] -translate-x-1/2 rounded-2xl border border-white/10 bg-surface px-3.5 py-2 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.7)]">
              <p className="text-[11px] font-semibold leading-snug text-white/85">
                ¡Uy! Esto se perdió en el espacio…
              </p>
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-surface"
              />
            </div>
          </div>

          <span className="relative font-mono text-xs font-medium uppercase tracking-[0.16em] text-secondary-light">
            Error 404
          </span>
          <h1 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Esta página no existe
          </h1>
          <p className="relative text-balance leading-relaxed text-muted">
            El contenido que buscas no está disponible o se movió de lugar. Vuelve al inicio para
            seguir explorando.
          </p>
          <Button href="/" variant="secondary" className="relative">
            Volver al inicio
          </Button>
        </div>
      </Container>
    </section>
  );
}
