import avatar from "../../assets/images/profe-jesus-avatar.webp";
import Button from "../ui/Button";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white pb-20 pt-14 sm:pt-20 lg:pb-28 lg:pt-24">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <Container className="grid items-center gap-14 lg:grid-cols-[45%_55%] lg:gap-10">
        <FadeIn className="flex flex-col items-start gap-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue">
            Bienvenidos a mi espacio educativo
          </span>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] text-navy sm:text-5xl lg:text-[3.4rem]">
            Hola, soy
            <br />
            <span className="text-blue underline-scribble">Profe Jesús Álvarez</span>
          </h1>

          <p className="text-balance text-lg font-medium text-ink sm:text-xl">
            Docente de primaria, creador de contenidos y apasionado por la tecnología educativa.
          </p>

          <p className="text-balance text-base leading-relaxed text-ink/65">
            Aquí encontrarás contenidos académicos, recursos digitales, gamificación y herramientas
            para que aprender sea una experiencia significativa.
          </p>

          <div className="flex w-full flex-col gap-3 pt-2 sm:flex-row sm:w-auto">
            <Button href="#explorar" size="lg">
              Explorar contenido
            </Button>
            <Button href="#sobre-mi" variant="secondary" size="lg">
              Conocer mis proyectos
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={150} className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[16rem] overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-navy to-blue-2/60 shadow-[0_30px_60px_-20px_rgba(9,38,74,0.45)] sm:max-w-xs lg:max-w-sm">
            <div className="bg-dot-grid absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />

            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-yellow/25 blur-2xl" />
            <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-blue-2/40 blur-2xl" />
            <div className="absolute left-1/2 top-[30%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-2/30 blur-2xl" />

            <img
              src={avatar}
              alt="Avatar 3D de Profe Jesús Álvarez, personaje con lentes y camisa negra, identidad visual del sitio"
              className="absolute bottom-0 left-1/2 h-[102%] w-auto -translate-x-1/2 select-none object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]"
              width={483}
              height={650}
              fetchPriority="high"
            />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
