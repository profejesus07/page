import type { LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

export interface NavLink {
  label: string;
  href: string;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "blue" | "green" | "purple" | "yellow" | "rose";
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

/** Fase narrativa de Academia C.O.D.E. */
export interface MissionPhase {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  /** Estado que NEURON muestra mientras esta fase está activa. */
  neuron: {
    status: string;
    control: number; // 0–100 nivel de control cognitivo (ambientación)
    lines: string[];
  };
}
