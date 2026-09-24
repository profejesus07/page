import { Mail } from "lucide-react";
import { WhatsAppIcon } from "../icons/SocialIcons";
import { contactInfo } from "../../data/contact";
import { services } from "../../data/services";
import Button from "../ui/Button";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";

export default function Services() {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden border-y border-white/[0.06] bg-primary-dark py-20 sm:py-28"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-secondary/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-[120px]" />

      <Container className="relative flex flex-col items-center gap-12">
        <FadeIn className="flex max-w-2xl flex-col items-center gap-5 text-center">
          <SectionHeading eyebrow="Servicios" title="Gamificaciones y soluciones educativas" />
          <p className="text-balance text-base leading-relaxed text-muted sm:text-lg">
            Diseño e implementación de experiencias de aprendizaje gamificadas, plataformas de
            exámenes, aplicaciones a la medida y recursos digitales personalizados para docentes y
            escuelas.
          </p>
        </FadeIn>

        <div className="grid w-full gap-4 sm:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.title} delay={index * 90}>
                <div
                  data-spotlight
                  className="spotlight-card flex h-full items-start gap-4 rounded-2xl border border-line bg-surface/70 p-6 transition-colors duration-300 hover:border-white/15"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-secondary/30 bg-secondary/15 text-secondary-light">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{service.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{service.description}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn className="flex flex-col items-center gap-4">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">
            ¿Quieres conocer más? Escríbeme
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={contactInfo.whatsappHref} size="lg" variant="accent" icon={<WhatsAppIcon size={18} />}>
              WhatsApp
            </Button>
            <Button
              href={`mailto:${contactInfo.email}`}
              variant="ghost-light"
              size="lg"
              icon={<Mail size={18} />}
            >
              {contactInfo.email}
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
