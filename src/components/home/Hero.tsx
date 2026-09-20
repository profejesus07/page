import { BookOpen, Gamepad2, MonitorPlay } from "lucide-react";
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

            <svg
              className="absolute left-4 top-5 w-16 rotate-[-6deg] opacity-90 sm:left-5 sm:top-6 sm:w-20"
              viewBox="0 0 120 84"
              fill="none"
              aria-hidden="true"
            >
              <rect x="1" y="1" width="118" height="82" rx="10" fill="#0D3565" stroke="#FFD42A" strokeWidth="2" />
              <path
                d="M16 30 Q30 18 46 28 T80 24"
                stroke="#FFD42A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.85"
              />
              <path
                d="M16 48 Q34 40 52 50 T100 44"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
              <path
                d="M16 64 L46 64"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
            </svg>

            <img
              src={avatar}
              alt="Avatar 3D de Profe Jesús Álvarez, personaje con lentes y camisa negra, identidad visual del sitio"
              className="absolute bottom-0 left-1/2 aspect-[818/858] h-[68%] w-auto -translate-x-1/2 select-none object-cover object-top drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]"
              width={480}
              height={600}
              fetchPriority="high"
            />

            <svg
              className="absolute bottom-0 left-1/2 w-[78%] -translate-x-1/2"
              viewBox="0 0 320 110"
              fill="none"
              aria-hidden="true"
            >
              <path d="M0 90 L320 90 L296 110 L24 110 Z" fill="#071B38" opacity="0.9" />
              <rect x="90" y="34" width="140" height="60" rx="8" fill="#0D3565" stroke="#1769D1" strokeWidth="2" />
              <rect x="98" y="42" width="124" height="42" rx="3" fill="#0B294E" />
              <circle cx="160" cy="63" r="4" fill="#FFD42A" />
              <path d="M70 90 L250 90 L262 100 L58 100 Z" fill="#123A6B" />
            </svg>

            <div className="absolute right-4 top-[38%] flex w-10 -translate-y-1/2 animate-float items-center justify-center rounded-xl bg-white p-2 shadow-lg sm:right-5 sm:w-11">
              <BookOpen className="text-blue" size={18} strokeWidth={2.2} />
            </div>
            <div
              className="animate-float-slow absolute left-3 top-[16%] flex w-9 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg sm:w-10"
              style={{ animationDelay: "1.2s" }}
            >
              <Gamepad2 className="text-emerald-500" size={16} strokeWidth={2.2} />
            </div>
            <div
              className="animate-float absolute bottom-[16%] right-3 flex w-9 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg sm:w-10"
              style={{ animationDelay: "0.6s" }}
            >
              <MonitorPlay className="text-violet-500" size={16} strokeWidth={2.2} />
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
