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
                  className="group flex h-full flex-col gap-4 rounded-xl border border-line bg-white p-6 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_30px_-14px_rgba(15,23,42,0.25)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
                      {post.category}
                    </span>
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-background text-primary">
                      <Icon size={18} strokeWidth={2.2} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold leading-snug text-primary">{post.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>

                  <div className="flex items-center justify-between border-t border-primary/8 pt-4 text-xs font-medium text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} />
                      {dateFormatter.format(new Date(post.date))}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} />
                      {post.readingTime}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
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
