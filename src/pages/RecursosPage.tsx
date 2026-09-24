import { ExternalLink, Search, X } from "lucide-react";
import { useDeferredValue } from "react";
import { useSearchParams } from "react-router-dom";
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

/** Minúsculas y sin tildes, para que "matematicas" encuentre "Matemáticas". */
const normalize = (text: string) =>
  text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().trim();

export default function RecursosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const deferredQuery = useDeferredValue(query);

  const setQuery = (value: string) =>
    setSearchParams(value ? { q: value } : {}, { replace: true });

  const terms = normalize(deferredQuery).split(/\s+/).filter(Boolean);
  const filteredCategories = resourceCategories
    .map((category) => ({
      ...category,
      resources: category.resources.filter((resource) => {
        const haystack = normalize(`${resource.name} ${resource.description} ${category.title}`);
        return terms.every((term) => haystack.includes(term));
      }),
    }))
    .filter((category) => category.resources.length > 0);
  const totalFiltrados = filteredCategories.reduce((sum, category) => sum + category.resources.length, 0);

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

        <FadeIn className="w-full max-w-xl">
          <div className="flex flex-col items-center gap-2">
            <label className="relative w-full">
              <span className="sr-only">Buscar recursos</span>
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setQuery("")}
                placeholder="Buscar por nombre, uso o categoría…"
                className="w-full rounded-full border border-line bg-surface/70 py-3 pl-11 pr-11 text-sm text-white placeholder:text-muted outline-none transition-colors focus-visible:border-secondary sm:text-base [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Limpiar búsqueda"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.08] hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </label>
            {terms.length > 0 && (
              <p aria-live="polite" className="font-mono text-xs text-muted">
                {totalFiltrados} de {totalRecursos} recursos
              </p>
            )}
          </div>
        </FadeIn>

        <div className="flex w-full flex-col gap-12">
          {filteredCategories.length === 0 && (
            <p className="py-10 text-center text-muted">
              No se encontraron recursos para «{deferredQuery.trim()}». Prueba con otra palabra.
            </p>
          )}
          {filteredCategories.map((category, categoryIndex) => {
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
