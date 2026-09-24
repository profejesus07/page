import { ExternalLink } from "lucide-react";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import FadeIn from "../components/ui/FadeIn";
import SectionHeading from "../components/ui/SectionHeading";
import { resourceCategories } from "../data/resources";
import type { ResourceCategory } from "../types/content";

const violet = { badge: "border-secondary/30 bg-secondary/15 text-secondary-light", text: "text-secondary-light" };

const accentStyles: Record<ResourceCategory["accent"], { badge: string; text: string }> = {
  amber: { badge: "border-accent/30 bg-accent/15 text-accent-light", text: "text-accent-light" },
  violet,
  blue: violet,
  emerald: violet,
  rose: violet,
};

const totalRecursos = resourceCategories.reduce((sum, category) => sum + category.resources.length, 0);

export default function RecursosPage() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-18rem] h-[34rem] w-[60rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.3),rgb(236_72_153/0.1)_55%,transparent)] blur-2xl" />

      <Container className="relative flex flex-col items-center gap-14">
        <FadeIn className="flex max-w-2xl flex-col items-center gap-5 text-center">
          <SectionHeading eyebrow="Recursos digitales" title="Materiales interactivos para aprender jugando" />
          <p className="text-balance text-base leading-relaxed text-muted sm:text-lg">
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
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${accent.badge}`}>
                      <CategoryIcon size={19} strokeWidth={2.2} />
                    </div>
                    <h2 className="text-lg font-bold text-white sm:text-xl">{category.title}</h2>
                    <span className="rounded-full border border-line bg-white/[0.04] px-2.5 py-0.5 font-mono text-xs font-medium text-muted">
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
                        data-spotlight
                        className="spotlight-card group flex flex-col gap-2 rounded-2xl border border-line bg-surface/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-white">{resource.name}</h3>
                          <ExternalLink
                            size={15}
                            className={`shrink-0 opacity-40 transition-opacity group-hover:opacity-100 ${accent.text}`}
                          />
                        </div>
                        <p className="text-sm leading-relaxed text-muted">{resource.description}</p>
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
