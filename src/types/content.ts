import type { LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

export interface NavLink {
  label: string;
  href: string;
  /** Se muestra en el menú de escritorio. En móvil y footer siempre aparecen todos. */
  primary?: boolean;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "blue" | "green" | "purple" | "yellow";
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  icon: LucideIcon;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconComponent;
}

export interface DigitalResource {
  name: string;
  description: string;
  url: string;
}

export interface ResourceCategory {
  title: string;
  accent: "amber" | "violet" | "blue" | "emerald" | "rose";
  icon: LucideIcon;
  resources: DigitalResource[];
}
