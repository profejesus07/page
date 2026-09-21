import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface SmartLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

/**
 * Ancla (#...) usa <a> si ya estamos en el inicio (scroll nativo), o <Link>
 * hacia "/" con ese hash si estamos en otra página (navega y luego baja a
 * la sección, ver ScrollToTop). URL externa o mailto/tel siempre usa <a>;
 * una ruta interna normal usa <Link>.
 */
export default function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  const { pathname } = useLocation();

  if (href.startsWith("#")) {
    if (pathname === "/") {
      return (
        <a href={href} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link to={{ pathname: "/", hash: href }} {...rest}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  );
}
