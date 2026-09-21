import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost-light";
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
    "bg-yellow text-navy hover:bg-yellow-2 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1)]",
  secondary: "bg-transparent text-navy border border-navy/25 hover:bg-navy/5",
  "ghost-light": "bg-white/10 text-white border border-white/30 hover:bg-white/20",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-blue-2 focus-visible:outline-offset-2";

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
