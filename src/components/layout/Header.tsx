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
      className={`sticky top-0 z-50 border-b text-white backdrop-blur-xl transition-colors duration-300 ${
        scrolled ? "border-white/[0.08] bg-background/75" : "border-transparent bg-background/40"
      }`}
    >
      <Container className="relative z-40 flex items-center justify-between gap-4 py-2.5">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img
            src={avatar}
            alt="Avatar de Profe Jesús Álvarez"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full border border-white/15 bg-surface object-cover object-top ring-2 ring-secondary/40"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-white/60">Profe</span>
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
                className="mr-1 w-44 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus-visible:border-secondary lg:w-56"
                onBlur={() => setSearchOpen(false)}
              />
            )}
            <button
              type="button"
              aria-label={searchOpen ? "Cerrar búsqueda" : "Buscar"}
              onClick={() => setSearchOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <Search size={19} />
            </button>
          </div>

          <div className="hidden sm:block">
            <Button href="/academia-code" size="md" variant="accent">
              Academia Code
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={menuPanelRef}
        className={`absolute right-3 top-full z-40 mt-2 w-[calc(100vw-1.5rem)] max-w-sm origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-surface/95 shadow-[0_24px_60px_-12px_rgb(0_0_0/0.7)] backdrop-blur-xl transition-all duration-200 ease-out sm:right-4 ${
          menuOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="flex max-h-[75vh] flex-col gap-1 overflow-y-auto p-3">
          {navLinks.map((link) => (
            <SmartLink
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3.5 py-2.5 text-base font-semibold text-ink/85 transition-colors hover:bg-white/[0.05] hover:text-secondary-light"
            >
              {link.label}
            </SmartLink>
          ))}
          <div className="mt-2 flex flex-col gap-2.5 border-t border-line pt-3">
            <input
              type="search"
              placeholder="Buscar contenidos..."
              className="w-full rounded-full border border-line bg-background px-4 py-2.5 text-sm text-ink placeholder:text-muted outline-none focus-visible:border-secondary"
            />
            <Button href="/academia-code" size="md" className="w-full">
              Academia Code
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
