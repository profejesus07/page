import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "../../data/blogPosts";
import Button from "../ui/Button";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";

const dateFormatter = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", year: "numeric" });

export default function BlogPreview() {
  return (
    <section id="blog" className="bg-background py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-14">
        <FadeIn>
          <SectionHeading title="Desde el blog" subtitle="Ideas, guías y reflexiones sobre educación y tecnología" />
        </FadeIn>

        <div className="grid w-full gap-6 md:grid-cols-3">
          {blogPosts.map((post, index) => {
            const Icon = post.icon;
            return (
              <FadeIn key={post.slug} delay={index * 90}>
                <Link
                  to="/blog"
                  data-spotlight
                  className="spotlight-card group flex h-full flex-col gap-4 rounded-2xl border border-line bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-secondary/30 bg-secondary/15 px-3 py-1 text-xs font-bold text-secondary-light">
                      {post.category}
                    </span>
                    <div className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/[0.04] text-ink">
                      <Icon size={18} strokeWidth={2.2} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold leading-snug text-white">{post.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>

                  <div className="flex items-center justify-between border-t border-line pt-4 text-xs font-medium text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} />
                      {dateFormatter.format(new Date(post.date))}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} />
                      {post.readingTime}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-light">
                    Leer más
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <Button href="/blog" variant="secondary" size="lg">
          Ver todos los artículos
        </Button>
      </Container>
    </section>
  );
}
