import { ClipboardCheck, MonitorPlay, Terminal, Wand2 } from "lucide-react";
import type { Category } from "../types/content";

export const categories: Category[] = [
  {
    slug: "academia-code",
    title: "Academia C.O.D.E.",
    description: "Una misión gamificada para hackear el código de N.E.U.R.O.N. y liberar el pensamiento crítico.",
    icon: Terminal,
    accent: "green",
    href: "/academia-code",
  },
  {
    slug: "eldoria",
    title: "Chronicles of Eldoria",
    description: "Aventura gamificada para aprender inglés: mapa, misiones, guardianes y rangos.",
    icon: Wand2,
    accent: "rose",
    href: "/eldoria",
  },
  {
    slug: "recursos",
    title: "Recursos digitales",
    description: "Materiales interactivos, OVA, presentaciones, videos y más.",
    icon: MonitorPlay,
    accent: "purple",
    href: "/recursos",
  },
  {
    slug: "examenes",
    title: "Plataforma de exámenes",
    description: "Evalúa, realiza seguimiento y genera reportes fácilmente.",
    icon: ClipboardCheck,
    accent: "yellow",
    href: "/examenes",
  },
];
