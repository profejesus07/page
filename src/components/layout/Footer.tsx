import avatar from "../../assets/images/profe-jesus-avatar.webp";
import { legalLinks, navLinks } from "../../data/navigation";
import { socialLinks } from "../../data/social";
import Container from "../ui/Container";
import SmartLink from "../ui/SmartLink";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-background text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-16rem] left-1/2 h-[26rem] w-[56rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.18),transparent)] blur-2xl"
      />
      <Container className="relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt="Avatar de Profe Jesús Álvarez"
              className="h-11 w-11 rounded-full border border-white/15 bg-surface object-cover object-top ring-2 ring-secondary/40"
              width={44}
              height={44}
              loading="lazy"
            />
            <div className="leading-tight">
              <p className="text-base font-extrabold">Profe Jesús Álvarez</p>
              <p className="text-xs font-medium text-accent-light">Educación • Gamificación • Tecnología</p>
            </div>
          </div>
          <p className="max-w-xs text-sm text-white/60">Grandes ideas para transformar el aprendizaje.</p>
        </div>

        <nav aria-label="Enlaces del sitio" className="flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-wide text-white/50">Enlaces</p>
          {navLinks.map((link) => (
            <SmartLink
              key={link.href}
              href={link.href}
              className="w-fit text-sm text-white/65 transition-colors hover:text-secondary-light"
            >
              {link.label}
            </SmartLink>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold uppercase tracking-wide text-white/50">Síguenos</p>
          <div className="flex flex-wrap gap-2.5">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              if (!social.href) {
                return (
                  <span
                    key={social.label}
                    aria-hidden="true"
                    title={`${social.label} (enlace pendiente)`}
                    className="grid h-10 w-10 cursor-not-allowed place-items-center rounded-full bg-white/5 text-white/30"
                  >
                    <Icon size={18} />
                  </span>
                );
              }

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-colors hover:border-secondary/60 hover:bg-secondary/20 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/[0.08]">
        <Container className="flex flex-col items-center gap-4 py-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>© {year} Profe Jesús Álvarez. Todos los derechos reservados.</p>
          <nav aria-label="Enlaces legales" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            {legalLinks.map((link) => (
              <SmartLink key={link.href} href={link.href} className="transition-colors hover:text-secondary-light">
                {link.label}
              </SmartLink>
            ))}
          </nav>
          <p>Hecho con dedicación para la comunidad educativa.</p>
        </Container>
      </div>
    </footer>
  );
}
