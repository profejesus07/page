import avatar from "../../assets/images/profe-jesus-avatar.webp";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";

export default function About() {
  return (
    <section id="sobre-mi" className="bg-background py-20 sm:py-24">
      <Container>
        <FadeIn className="gradient-border mx-auto flex max-w-3xl flex-col items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-b from-[#1a1627] to-surface px-6 py-14 text-center shadow-[0_40px_100px_-40px_rgb(139_92_246/0.5)] sm:px-14">
          <img
            src={avatar}
            alt="Retrato de Jesús Álvarez"
            className="h-20 w-20 rounded-full border border-white/15 bg-surface object-cover object-top ring-4 ring-secondary/25"
            loading="lazy"
            width={80}
            height={80}
          />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-secondary-light">
            Detrás del proyecto
          </span>
          <p className="text-balance text-lg leading-relaxed text-ink/80 sm:text-xl">
            Soy Jesús Álvarez, docente de primaria y creador de recursos educativos. Este espacio
            nace de mi interés por combinar la enseñanza, la creatividad y la tecnología para
            construir experiencias de aprendizaje diferentes.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
