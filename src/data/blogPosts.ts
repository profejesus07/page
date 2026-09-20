import { Gamepad2, Laptop, Lightbulb } from "lucide-react";
import type { BlogPost } from "../types/content";

/**
 * Datos de ejemplo. Cuando exista un CMS o base de datos, esta lista
 * se reemplaza por el resultado de esa consulta sin tocar BlogPreview.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "ideas-para-gamificar-una-clase",
    title: "Ideas para gamificar una clase",
    excerpt: "Estrategias sencillas para convertir cualquier tema en un reto motivador para tus estudiantes.",
    category: "Gamificación",
    date: "2026-01-12",
    readingTime: "5 min",
    icon: Gamepad2,
  },
  {
    slug: "recursos-digitales-para-docentes",
    title: "Recursos digitales para docentes",
    excerpt: "Herramientas y plataformas útiles para preparar clases interactivas sin complicarte.",
    category: "Recursos",
    date: "2026-01-05",
    readingTime: "4 min",
    icon: Lightbulb,
  },
  {
    slug: "tecnologia-educativa-en-primaria",
    title: "Tecnología educativa en primaria",
    excerpt: "Cómo integrar la tecnología en el aula de primaria sin perder de vista lo pedagógico.",
    category: "Tecnología",
    date: "2025-12-18",
    readingTime: "6 min",
    icon: Laptop,
  },
];
