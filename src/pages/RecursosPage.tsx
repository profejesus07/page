import {
  BookOpenText,
  Calculator,
  Code2,
  ExternalLink,
  type LucideIcon,
  Palette,
  Trophy,
} from "lucide-react";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import FadeIn from "../components/ui/FadeIn";
import SectionHeading from "../components/ui/SectionHeading";
import { siteLinks } from "../data/siteLinks";

interface ResourceCategory {
  title: string;
  count: number;
  description: string;
  icon: LucideIcon;
}

const categories: ResourceCategory[] = [
  {
    title: "Evaluación y Gamificación",
    count: 6,
    description: "Kahoot!, Quizizz, Gimkit, Quizlet, Mentimeter, Cerebriti y más.",
    icon: Trophy,
  },
  {
    title: "Creación de Contenidos Interactivos",
    count: 5,
    description: "Wordwall, Edpuzzle, Educaplay, Genially, Canva Educación.",
    icon: Palette,
  },
  {
    title: "Lógica, Programación y Retos",
    count: 2,
    description: "Scratch y Code.org para pensamiento computacional.",
    icon: Code2,
  },
  {
    title: "Práctica Académica y Matemáticas",
    count: 4,
    description: "Mundo Primaria, Cristic, Vedoque, Math Playground.",
    icon: Calculator,
  },
  {
    title: "Lectura, Cultura y Apoyo Escolar",
    count: 6,
    description: "Maguaré, Árbol ABC, Educa en Vivo, Read Along y más.",
    icon: BookOpenText,
  },
];

const totalRecursos = categories.reduce((sum, category) => sum + category.count, 0);

export default function RecursosPage() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-28">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <Container className="relative flex flex-col items-center gap-12">
        <FadeIn className="flex max-w-2xl flex-col items-center gap-5 text-center">
          <span className="rounded-full bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-violet-600">
            Recursos digitales
          </span>
          <SectionHeading title="Materiales interactivos para aprender jugando" />
          <p className="text-balance text-base leading-relaxed text-ink/65 sm:text-lg">
            Una recopilación propia de {totalRecursos} herramientas educativas gratuitas,
            organizadas en {categories.length} categorías: evaluación gamificada, creación de
            contenidos, programación, práctica académica y apoyo a la lectura.
          </p>
        </FadeIn>

        <div className="grid w-full gap-4 sm:grid-cols-2">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <FadeIn key={category.title} delay={index * 80}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-navy/8 bg-white p-5 shadow-[0_2px_10px_-4px_rgba(9,38,74,0.1)]">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-600">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-navy">{category.title}</h3>
                      <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-bold text-ink/50">
                        {category.count}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink/65">{category.description}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn className="flex flex-col items-center gap-4">
          <p className="max-w-md text-balance text-center text-sm text-ink/55">
            Todos los recursos abren en una pestaña nueva y pertenecen a sus respectivos autores.
          </p>
          <Button href={siteLinks.recursosHub} size="lg" icon={<ExternalLink size={18} />}>
            Ver todos los recursos
          </Button>
          <Button href="/" variant="secondary">
            Volver al inicio
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
