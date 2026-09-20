import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

interface SmartLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

/** Ancla (#...) o URL externa usa <a>; una ruta interna usa <Link> de React Router. */
export default function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  if (href.startsWith("#") || href.startsWith("http")) {
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
