import { ArrowRight } from "lucide-react";
import { categories } from "../../data/categories";
import type { Category } from "../../types/content";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import SmartLink from "../ui/SmartLink";

const accentStyles: Record<Category["accent"], { badge: string; text: string; border: string }> = {
  blue: { badge: "bg-blue", text: "text-blue", border: "hover:border-blue/30" },
  green: { badge: "bg-emerald-500", text: "text-emerald-600", border: "hover:border-emerald-400/30" },
  purple: { badge: "bg-violet-500", text: "text-violet-600", border: "hover:border-violet-400/30" },
  yellow: { badge: "bg-amber-500", text: "text-amber-600", border: "hover:border-yellow/50" },
  rose: { badge: "bg-rose-500", text: "text-rose-600", border: "hover:border-rose-400/30" },
};

export default function CategoryCards() {
  return (
    <section id="explorar" className="bg-surface py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-14">
        <FadeIn>
          <SectionHeading title="¿Qué encontrarás aquí?" subtitle="Herramientas para enseñar y aprender mejor" />
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
                  className={`group flex h-full scroll-mt-24 flex-col gap-3 rounded-2xl border border-navy/8 bg-white p-5 shadow-[0_2px_10px_-4px_rgba(9,38,74,0.1)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_30px_-14px_rgba(9,38,74,0.25)] ${accent.border}`}
                >
                  <div className={`grid h-12 w-12 place-items-center rounded-full text-white ${accent.badge}`}>
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <h3 className="text-base font-bold text-navy">{category.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-ink/65">{category.description}</p>
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
