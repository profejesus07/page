interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignClasses}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-secondary-light">
          <span className="size-1.5 rounded-full bg-secondary shadow-[0_0_10px_rgb(139_92_246)]" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="text-balance text-base text-muted sm:text-lg">{subtitle}</p>}
    </div>
  );
}
