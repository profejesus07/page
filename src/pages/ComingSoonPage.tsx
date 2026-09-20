import { type LucideIcon, Sparkles } from "lucide-react";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";

interface ComingSoonPageProps {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export default function ComingSoonPage({ title, description, icon: Icon = Sparkles }: ComingSoonPageProps) {
  return (
    <section className="flex min-h-[70vh] items-center bg-surface py-20">
      <Container>
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 rounded-3xl border border-navy/8 bg-white px-8 py-14 text-center shadow-[0_2px_10px_-4px_rgba(9,38,74,0.1)]">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue/10 text-blue">
            <Icon size={30} strokeWidth={2.2} />
          </div>
          <span className="rounded-full bg-yellow/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-600">
            Próximamente
          </span>
          <h1 className="text-3xl font-extrabold text-navy">{title}</h1>
          <p className="text-balance leading-relaxed text-ink/65">{description}</p>
          <Button href="/" variant="secondary">
            Volver al inicio
          </Button>
        </div>
      </Container>
    </section>
  );
}
