import avatar from "../../assets/images/profe-jesus-avatar.webp";
import { navLinks } from "../../data/navigation";
import { socialLinks } from "../../data/social";
import Container from "../ui/Container";
import SmartLink from "../ui/SmartLink";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src={avatar}
              alt="Avatar de Profe Jesús Álvarez"
              className="h-11 w-11 rounded-full border-2 border-accent object-cover object-top"
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
              className="w-fit text-sm text-white/75 transition-colors hover:text-accent"
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
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent hover:text-primary"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center gap-2 py-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>© {year} Profe Jesús Álvarez. Todos los derechos reservados.</p>
          <p>Hecho con dedicación para la comunidad educativa.</p>
        </Container>
      </div>
    </footer>
  );
}
