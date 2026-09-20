import { GraduationCap, LayoutTemplate, MonitorSmartphone, Sparkles, Users } from "lucide-react";
import type { Service } from "../types/content";

export const services: Service[] = [
  {
    title: "Diseño de gamificaciones",
    description: "Experiencias de aprendizaje gamificadas a la medida de cada grupo y objetivo.",
    icon: Sparkles,
  },
  {
    title: "Plataformas de exámenes",
    description: "Evaluaciones digitales con seguimiento y reportes claros para docentes.",
    icon: LayoutTemplate,
  },
  {
    title: "Recursos digitales personalizados",
    description: "Materiales interactivos y presentaciones adaptados a tu institución.",
    icon: GraduationCap,
  },
  {
    title: "Aplicaciones para PC y Android",
    description:
      "Desarrollo de aplicaciones a la medida para llevar asistencia, calificaciones, observador del estudiante u otros procesos, según lo que necesite el docente o la institución.",
    icon: MonitorSmartphone,
  },
  {
    title: "Acompañamiento a docentes y escuelas",
    description: "Asesoría para integrar tecnología y gamificación en el aula.",
    icon: Users,
  },
];
