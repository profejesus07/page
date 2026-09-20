import { ExternalLink } from "lucide-react";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import FadeIn from "../components/ui/FadeIn";
import SectionHeading from "../components/ui/SectionHeading";
import { resourceCategories } from "../data/resources";
import type { ResourceCategory } from "../types/content";

const accentStyles: Record<ResourceCategory["accent"], { badge: string; text: string; border: string }> = {
  amber: { badge: "bg-amber-500", text: "text-amber-600", border: "hover:border-amber-400/40" },
  violet: { badge: "bg-violet-500", text: "text-violet-600", border: "hover:border-violet-400/40" },
  blue: { badge: "bg-blue", text: "text-blue", border: "hover:border-blue/40" },
  emerald: { badge: "bg-emerald-500", text: "text-emerald-600", border: "hover:border-emerald-400/40" },
  rose: { badge: "bg-rose-500", text: "text-rose-600", border: "hover:border-rose-400/40" },
};

const totalRecursos = resourceCategories.reduce((sum, category) => sum + category.resources.length, 0);

export default function RecursosPage() {
  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-28">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <Container className="relative flex flex-col items-center gap-14">
        <FadeIn className="flex max-w-2xl flex-col items-center gap-5 text-center">
          <span className="rounded-full bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-violet-600">
            Recursos digitales
          </span>
          <SectionHeading title="Materiales interactivos para aprender jugando" />
          <p className="text-balance text-base leading-relaxed text-ink/65 sm:text-lg">
            Una recopilación propia de {totalRecursos} herramientas educativas gratuitas, organizadas
            en {resourceCategories.length} categorías. Cada una abre en una pestaña nueva y
            pertenece a su respectivo autor.
          </p>
        </FadeIn>

        <div className="flex w-full flex-col gap-12">
          {resourceCategories.map((category, categoryIndex) => {
            const accent = accentStyles[category.accent];
            const CategoryIcon = category.icon;

            return (
              <FadeIn key={category.title} delay={categoryIndex * 60}>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white ${accent.badge}`}>
                      <CategoryIcon size={19} strokeWidth={2.2} />
                    </div>
                    <h2 className="text-lg font-bold text-navy sm:text-xl">{category.title}</h2>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-ink/50 shadow-sm">
                      {category.resources.length}
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {category.resources.map((resource) => (
                      <a
                        key={resource.name}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex flex-col gap-2 rounded-2xl border border-navy/8 bg-white p-5 shadow-[0_2px_10px_-4px_rgba(9,38,74,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_28px_-14px_rgba(9,38,74,0.22)] ${accent.border}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-navy">{resource.name}</h3>
                          <ExternalLink
                            size={15}
                            className={`shrink-0 opacity-40 transition-opacity group-hover:opacity-100 ${accent.text}`}
                          />
                        </div>
                        <p className="text-sm leading-relaxed text-ink/65">{resource.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn>
          <Button href="/" variant="secondary">
            Volver al inicio
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
