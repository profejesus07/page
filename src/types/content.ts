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
