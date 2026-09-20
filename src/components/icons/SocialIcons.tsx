import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function TikTokIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
      <path d="M16.6 5.82c-.9-.79-1.46-1.94-1.46-3.22H12.4v13.44c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 0 1 0-5.44c.26 0 .5.03.74.1V10.6a5.63 5.63 0 0 0-.74-.05 5.63 5.63 0 1 0 5.63 5.63V9.4a8.17 8.17 0 0 0 4.77 1.53V8.03a4.85 4.85 0 0 1-3.48-2.21Z" />
    </svg>
  );
}

export function YoutubeIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      aria-hidden="true"
      {...rest}
    >
      <rect x="2.5" y="5.5" width="19" height="13" rx="4.5" />
      <path d="M10.3 9.4v5.2l4.6-2.6-4.6-2.6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      aria-hidden="true"
      {...rest}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2Zm5.8 14.2c-.3.8-1.5 1.5-2.4 1.6-.6.1-1.4.2-4.1-.9-3.1-1.3-5.1-4.4-5.3-4.6-.2-.3-1.3-1.7-1.3-3.2 0-1.5.8-2.3 1.1-2.6.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.3.6.9 2 1 2.1.1.2.1.4 0 .6-.1.2-.2.3-.3.5-.2.2-.3.3-.5.5-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.4 1.5 2.7 1.6.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.8.9 2.1 1 .3.1.5.2.6.3.1.2.1.7-.2 1.4Z" />
    </svg>
  );
}

export function FacebookIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      aria-hidden="true"
      {...rest}
    >
      <circle cx="12" cy="12" r="9" />
      <path
        d="M13.6 9.3h1.5V7h-1.7c-1.6 0-2.6 1-2.6 2.7v1.4H9.2v2.3h1.6V17h2.2v-3.6h1.6l.3-2.3h-1.9v-1.1c0-.4.2-.7.6-.7Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
