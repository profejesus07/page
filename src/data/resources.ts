import { BookOpenText, Calculator, Code2, Palette, Trophy } from "lucide-react";
import type { ResourceCategory } from "../types/content";

/**
 * Recopilación propia de recursos educativos digitales, organizada por
 * categoría. Todos los enlaces abren en una pestaña nueva y pertenecen a
 * sus respectivos autores.
 */
export const resourceCategories: ResourceCategory[] = [
  {
    title: "Evaluación y Gamificación",
    accent: "amber",
    icon: Trophy,
    resources: [
      {
        name: "Kahoot!",
        description: "Cuestionarios interactivos, encuestas y debates en tiempo real.",
        url: "https://kahoot.com/",
      },
      {
        name: "Quizizz",
        description: "Cuestionarios autoguiados y competencias a su propio ritmo.",
        url: "https://quizizz.com/",
      },
      {
        name: "Gimkit",
        description: "Juego de preguntas estratégico con moneda virtual y mejoras.",
        url: "https://www.gimkit.com/",
      },
      {
        name: "Quizlet",
        description: "Estudio mediante tarjetas de memoria (flashcards) y vocabulario.",
        url: "https://quizlet.com/",
      },
      {
        name: "Mentimeter",
        description: "Encuestas en vivo, nubes de palabras y preguntas abiertas.",
        url: "https://mentimeter.com/",
      },
      {
        name: "Cerebriti",
        description: "Juegos interactivos creados por usuarios sobre cualquier materia escolar.",
        url: "https://www.cerebriti.com/",
      },
    ],
  },
  {
    title: "Creación de Contenidos Interactivos",
    accent: "violet",
    icon: Palette,
    resources: [
      {
        name: "Wordwall",
        description: "Actividades interactivas como sopas de letras, ruletas y más.",
        url: "https://wordwall.net/",
      },
      {
        name: "Edpuzzle",
        description: "Transforma videos en lecciones interactivas con preguntas.",
        url: "https://edpuzzle.com/",
      },
      {
        name: "Educaplay",
        description: "Actividades multimedia como crucigramas y mapas interactivos.",
        url: "https://www.educaplay.com/",
      },
      {
        name: "Genially",
        description: "Creación de presentaciones e infografías interactivas.",
        url: "https://genially.com/",
      },
      {
        name: "Canva Educación",
        description: "Diseño de materiales visuales y presentaciones para el aula.",
        url: "https://www.canva.com/es_es/educacion/",
      },
    ],
  },
  {
    title: "Lógica, Programación y Retos",
    accent: "blue",
    icon: Code2,
    resources: [
      {
        name: "Scratch",
        description: "Aprende a programar creando tus propios juegos, historias y animaciones.",
        url: "https://scratch.mit.edu/",
      },
      {
        name: "Code.org",
        description: "Lecciones guiadas de programación y pensamiento computacional jugando.",
        url: "https://code.org/",
      },
    ],
  },
  {
    title: "Práctica Académica y Matemáticas",
    accent: "emerald",
    icon: Calculator,
    resources: [
      {
        name: "Mundo Primaria",
        description: "Juegos educativos gratuitos para niños clasificados por asignaturas.",
        url: "https://www.mundoprimaria.com/",
      },
      {
        name: "Cristic",
        description: "Colección de juegos educativos organizados por curso y temática escolar.",
        url: "https://www.cristic.com/",
      },
      {
        name: "Vedoque",
        description: "Actividades enfocadas en mejorar habilidades específicas como mecanografía y ortografía.",
        url: "https://www.vedoque.com/",
      },
      {
        name: "Math Playground",
        description: "Juegos especializados en matemáticas, desde aritmética hasta geometría y lógica.",
        url: "https://es.mathplayground.com/",
      },
    ],
  },
  {
    title: "Lectura, Cultura y Apoyo Escolar",
    accent: "rose",
    icon: BookOpenText,
    resources: [
      {
        name: "Maguaré",
        description: "Portal cultural con juegos y cuentos folclóricos colombianos.",
        url: "https://maguare.gov.co/",
      },
      {
        name: "Árbol ABC",
        description: "Juegos educativos para preescolar y primaria en español e inglés.",
        url: "https://arbolabc.com/",
      },
      {
        name: "Educa en Vivo",
        description: "Recursos y transmisiones educativas para apoyo escolar.",
        url: "https://educaenvivo.com/",
      },
      {
        name: "Cápsulas Educativas",
        description: "Recursos digitales del Ministerio de Educación de Colombia.",
        url: "https://colombiaaprende.edu.co/",
      },
      {
        name: "Read Along",
        description: "Herramienta de Google con asistente virtual para practicar la lectura en voz alta.",
        url: "https://readalong.google.com/",
      },
      {
        name: "Bosque de Fantasías",
        description: "Cuentos, fábulas y recursos gramaticales para trabajar la comprensión lectora.",
        url: "https://bosquedefantasias.com/",
      },
    ],
  },
];
