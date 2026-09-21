import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/profe-jesus-avatar.webp";
import { navLinks } from "../../data/navigation";
import Button from "../ui/Button";
import Container from "../ui/Container";
import SmartLink from "../ui/SmartLink";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-transparent shadow-[0_4px_20px_-8px_rgba(9,38,74,0.18)]" : "border-navy/5"
      }`}
    >
      <Container className="flex items-center justify-between gap-4 py-2.5">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img
            src={avatar}
            alt="Avatar de Profe Jesús Álvarez"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full border-2 border-yellow object-cover object-top"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-ink/70">Profe</span>
            <span className="text-base font-extrabold text-navy">Jesús Álvarez</span>
            <span className="hidden text-[11px] font-medium tracking-wide text-blue sm:block">
              Educación • Gamificación • Tecnología
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden items-center sm:flex">
            {searchOpen && (
              <input
                autoFocus
                type="search"
                placeholder="Buscar contenidos..."
                className="mr-1 w-44 rounded-full border border-navy/15 bg-surface px-4 py-2 text-sm text-ink outline-none focus-visible:border-blue lg:w-56"
                onBlur={() => setSearchOpen(false)}
              />
            )}
            <button
              type="button"
              aria-label={searchOpen ? "Cerrar búsqueda" : "Buscar"}
              onClick={() => setSearchOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-navy transition-colors hover:bg-surface"
            >
              <Search size={19} />
            </button>
          </div>

          <div className="hidden sm:block">
            <Button href="#examenes" size="md">
              Entrar a exámenes
            </Button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-navy transition-colors hover:bg-surface"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      <div
        className={`absolute inset-x-0 top-full z-40 max-h-[75vh] origin-top overflow-y-auto border-t border-navy/10 bg-white shadow-lg transition-all duration-200 ease-out ${
          menuOpen ? "scale-y-100 opacity-100" : "pointer-events-none scale-y-95 opacity-0"
        }`}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <SmartLink
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-semibold text-ink/80 transition-colors hover:bg-surface hover:text-blue"
            >
              {link.label}
            </SmartLink>
          ))}
          <input
            type="search"
            placeholder="Buscar contenidos..."
            className="mt-2 w-full rounded-full border border-navy/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus-visible:border-blue"
          />
          <Button href="#examenes" size="md" className="mt-3 w-full">
            Entrar a exámenes
          </Button>
        </Container>
      </div>
    </header>
  );
}
