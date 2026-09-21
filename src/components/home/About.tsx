import avatar from "../../assets/images/profe-jesus-avatar.webp";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";

export default function About() {
  return (
    <section id="sobre-mi" className="bg-surface py-20 sm:py-24">
      <Container>
        <FadeIn className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-xl border border-line bg-white shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1)] px-6 py-12 text-center sm:px-14">
          <img
            src={avatar}
            alt="Retrato de Jesús Álvarez"
            className="h-20 w-20 rounded-full border-4 border-white object-cover object-top shadow-md"
            loading="lazy"
            width={80}
            height={80}
          />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue">Detrás del proyecto</span>
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
