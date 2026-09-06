type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  children: React.ReactNode;
};

export function SectionHeading({ id, eyebrow, children }: SectionHeadingProps) {
  return (
    <div className="px-4 text-center">
      {eyebrow && <p className="mb-1 text-[9px] tracking-[0.3em] text-muted-foreground uppercase lg:text-[11px]">{eyebrow}</p>}
      <h2 id={id} className="font-heading text-[30px] leading-tight font-bold tracking-[-0.02em] lg:text-5xl">
        {children}
      </h2>
    </div>
  );
}
