import { ArrowRight } from "lucide-react";
import { categories } from "../../data/categories";
import type { Category } from "../../types/content";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import SmartLink from "../ui/SmartLink";

const violet = { badge: "border-secondary/30 bg-secondary/15 text-secondary-light", text: "text-secondary-light" };

const accentStyles: Record<Category["accent"], { badge: string; text: string }> = {
  blue: violet,
  green: { badge: "border-accent/30 bg-accent/15 text-accent-light", text: "text-accent-light" },
  purple: violet,
  yellow: violet,
  rose: violet,
};

export default function CategoryCards() {
  return (
    <section id="explorar" className="relative bg-background py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-14">
        <FadeIn>
          <SectionHeading
            eyebrow="Explorar"
            title="¿Qué encontrarás aquí?"
            subtitle="Herramientas para enseñar y aprender mejor"
          />
        </FadeIn>

        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const accent = accentStyles[category.accent];
            const Icon = category.icon;

            return (
              <FadeIn key={category.slug} delay={index * 90}>
                <SmartLink
                  id={category.slug}
                  href={category.href}
                  data-spotlight
                  className="spotlight-card group flex h-full scroll-mt-24 flex-col gap-3 rounded-2xl border border-line bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_24px_60px_-24px_rgb(139_92_246/0.45)]"
                >
                  <div className={`grid h-11 w-11 place-items-center rounded-xl border ${accent.badge}`}>
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <h3 className="text-base font-bold text-white">{category.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted">{category.description}</p>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${accent.text}`}>
                    Ver más
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </SmartLink>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
