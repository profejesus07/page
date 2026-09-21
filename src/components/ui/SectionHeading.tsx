interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignClasses}`}>
      {eyebrow && (
        <span
          className={`text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-blue-2" : "text-blue"}`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-balance text-3xl font-extrabold leading-tight sm:text-4xl ${light ? "text-white" : "text-navy"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-balance text-base sm:text-lg ${light ? "text-white/75" : "text-ink"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
