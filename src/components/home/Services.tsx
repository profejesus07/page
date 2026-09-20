import { services } from "../../data/services";
import Button from "../ui/Button";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";

export default function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden bg-navy py-20 sm:py-28">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-blue-2/20 blur-3xl" />

      <Container className="relative flex flex-col items-center gap-12">
        <FadeIn className="flex max-w-2xl flex-col items-center gap-5 text-center">
          <SectionHeading
            eyebrow="Servicios"
            title="Gamificaciones y soluciones educativas"
            light
          />
          <p className="text-balance text-base leading-relaxed text-white/75 sm:text-lg">
            Diseño e implementación de experiencias de aprendizaje gamificadas, plataformas de
            exámenes y recursos digitales personalizados para docentes y escuelas.
          </p>
        </FadeIn>

        <div className="grid w-full gap-4 sm:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.title} delay={index * 90}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-white/12 bg-white/[0.06] p-5 transition-colors duration-300 hover:bg-white/[0.1]">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-yellow/15 text-yellow">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{service.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{service.description}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn>
          <Button href="/servicios" size="lg">
            Conoce más
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
