import { Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!menuOpen) return;

    const closeIfOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (menuPanelRef.current?.contains(target) || menuButtonRef.current?.contains(target)) return;
      setMenuOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeIfOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-primary/95 text-white backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-transparent shadow-[0_4px_20px_-8px_rgba(15,23,42,0.35)]" : "border-white/10"
      }`}
    >
      <Container className="flex items-center justify-between gap-4 py-2.5">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img
            src={avatar}
            alt="Avatar de Profe Jesús Álvarez"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full border-2 border-accent object-cover object-top"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-white/70">Profe</span>
            <span className="text-base font-extrabold text-white">Jesús Álvarez</span>
            <span className="hidden text-[11px] font-medium tracking-wide text-accent-light sm:block">
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
                className="mr-1 w-44 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 outline-none focus-visible:border-accent lg:w-56"
                onBlur={() => setSearchOpen(false)}
              />
            )}
            <button
              type="button"
              aria-label={searchOpen ? "Cerrar búsqueda" : "Buscar"}
              onClick={() => setSearchOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-white transition-colors hover:bg-accent/25"
            >
              <Search size={19} />
            </button>
          </div>

          <div className="hidden sm:block">
            <Button href="#examenes" size="md" variant="accent">
              Entrar a exámenes
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-white transition-colors hover:bg-accent/25"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-30 bg-primary/25 backdrop-blur-[2px] transition-opacity duration-200 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={menuPanelRef}
        className={`absolute right-3 top-full z-40 mt-2 w-[calc(100vw-1.5rem)] max-w-sm origin-top-right overflow-hidden rounded-xl border border-line bg-white shadow-[0_10px_15px_-3px_rgb(0_0_0/0.15)] transition-all duration-200 ease-out sm:right-4 ${
          menuOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="flex max-h-[75vh] flex-col gap-1 overflow-y-auto p-3">
          {navLinks.map((link) => (
            <SmartLink
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3.5 py-2.5 text-base font-semibold text-muted transition-colors hover:bg-background hover:text-primary"
            >
              {link.label}
            </SmartLink>
          ))}
          <div className="mt-2 flex flex-col gap-2.5 border-t border-line pt-3">
            <input
              type="search"
              placeholder="Buscar contenidos..."
              className="w-full rounded-full border border-line bg-background px-4 py-2.5 text-sm text-muted outline-none focus-visible:border-accent"
            />
            <Button href="#examenes" size="md" className="w-full">
              Entrar a exámenes
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
