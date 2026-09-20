import { BookOpen, ClipboardCheck, MonitorPlay, Terminal } from "lucide-react";
import type { Category } from "../types/content";

export const categories: Category[] = [
  {
    slug: "contenidos",
    title: "Contenidos académicos",
    description: "Planeaciones, guías, actividades y material para cada área y grado.",
    icon: BookOpen,
    accent: "blue",
    href: "/contenidos",
  },
  {
    slug: "academia-code",
    title: "Academia C.O.D.E.",
    description: "Una misión gamificada para hackear el código de N.E.U.R.O.N. y liberar el pensamiento crítico.",
    icon: Terminal,
    accent: "green",
    href: "/academia-code",
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
