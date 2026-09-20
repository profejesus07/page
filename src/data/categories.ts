import { BookOpen, ClipboardCheck, Gamepad2, MonitorPlay } from "lucide-react";
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
    slug: "gamificacion",
    title: "Gamificación",
    description: "Juegos, retos y dinámicas para motivar y fortalecer el aprendizaje.",
    icon: Gamepad2,
    accent: "green",
    href: "/gamificacion",
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
