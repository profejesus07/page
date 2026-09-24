import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type Variant = "primary" | "secondary" | "accent" | "creative" | "ghost-light";
type Size = "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
}

interface LinkProps extends BaseProps {
  href: string;
  onClick?: never;
  type?: never;
}

interface ButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: never;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-secondary text-white hover:bg-violet-500 shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_8px_30px_-10px_rgb(139_92_246/0.8)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_10px_40px_-8px_rgb(139_92_246/0.9)]",
  secondary:
    "bg-white/[0.04] text-ink border border-white/10 hover:bg-white/[0.08] hover:border-white/20",
  accent: "bg-accent text-background hover:bg-accent-light shadow-[0_8px_30px_-12px_rgb(16_185_129/0.8)]",
  creative: "bg-creative text-background hover:bg-orange-400",
  "ghost-light": "bg-white/[0.04] text-white border border-white/10 hover:bg-white/[0.08] hover:border-white/20",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  href,
  ...rest
}: LinkProps | ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  const { pathname } = useLocation();

  if (href) {
    const isExternal = href.startsWith("http");
    const isAnchor = href.startsWith("#");
    const isProtocolLink = href.startsWith("mailto:") || href.startsWith("tel:");

    if (isAnchor && pathname !== "/") {
      return (
        <Link to={{ pathname: "/", hash: href }} className={classes}>
          {children}
          {icon}
        </Link>
      );
    }

    if (isAnchor || isExternal || isProtocolLink) {
      return (
        <a
          href={href}
          className={classes}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
          {icon}
        </a>
      );
    }

    return (
      <Link to={href} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {icon}
    </button>
  );
}
