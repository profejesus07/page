import { Compass } from "lucide-react";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] items-center bg-background py-20">
      <Container>
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 rounded-xl border border-line bg-white px-8 py-14 text-center shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1)]">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-secondary/10 text-secondary">
            <Compass size={30} strokeWidth={2.2} />
          </div>
          <span className="text-sm font-bold uppercase tracking-wide text-secondary">Error 404</span>
          <h1 className="text-3xl font-extrabold text-primary">Esta página no existe</h1>
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
