import avatar from "../../assets/images/profe-jesus-avatar.webp";
import Button from "../ui/Button";
import Container from "../ui/Container";
import CursorGlow from "../ui/CursorGlow";
import FadeIn from "../ui/FadeIn";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-background pb-24 pt-16 sm:pt-24 lg:pb-32 lg:pt-28"
    >
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-20rem] h-[38rem] w-[64rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.35),rgb(236_72_153/0.12)_55%,transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <CursorGlow />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[52%_48%] lg:gap-10">
        <FadeIn className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-secondary-light backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_rgb(16_185_129)]" aria-hidden />
            Bienvenidos a mi espacio educativo
          </span>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4rem]">
            Hola, soy
            <br />
            <span className="text-gradient">Profe Jesús Álvarez</span>
          </h1>

          <p className="text-balance text-lg font-medium text-ink/85 sm:text-xl">
            Docente de primaria, creador de contenidos y apasionado por la tecnología educativa.
          </p>

          <p className="max-w-xl text-balance text-base leading-relaxed text-muted">
            Aquí encontrarás contenidos académicos, recursos digitales, gamificación y herramientas
            para que aprender sea una experiencia significativa.
          </p>

          <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
            <Button href="#explorar" size="lg">
              Explorar contenido
            </Button>
            <Button href="#sobre-mi" variant="secondary" size="lg">
              Conocer mis proyectos
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={150} className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/30 blur-[110px]"
          />
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[16rem] overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#1f1933] to-surface shadow-[0_40px_120px_-30px_rgb(139_92_246/0.6)] sm:max-w-xs lg:max-w-sm">
            <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black,transparent)]" />

            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-fuchsia-500/25 blur-2xl" />
            <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-accent/25 blur-2xl" />
            <div className="absolute left-1/2 top-[30%] h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/40 blur-2xl" />

            <img
              src={avatar}
              alt="Avatar 3D de Profe Jesús Álvarez, personaje con lentes y camisa negra, identidad visual del sitio"
              className="absolute bottom-0 left-1/2 h-[102%] w-auto -translate-x-1/2 select-none object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
              width={483}
              height={650}
              fetchPriority="high"
            />

            <div aria-hidden className="gradient-border pointer-events-none absolute inset-0 rounded-[inherit]" />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
