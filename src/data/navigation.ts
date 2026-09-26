import type { NavLink } from "../types/content";

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Academia C.O.D.E.", href: "#academia-code" },
  { label: "Recursos", href: "#recursos" },
  { label: "Exámenes", href: "#examenes" },
  { label: "Servicios", href: "#servicios" },
];

/** Páginas legales, enlazadas desde el pie de página. */
export const legalLinks: NavLink[] = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos", href: "/terminos" },
];
