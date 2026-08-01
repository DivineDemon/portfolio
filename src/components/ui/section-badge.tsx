interface SectionBadgeProps {
  label: string;
}

const SectionBadge = ({ label }: SectionBadgeProps) => {
  return (
    <p className="w-fit rounded-full bg-primary px-4 py-1.5 text-primary-foreground text-xs uppercase">
      {label}
    </p>
  );
};

export default SectionBadge;
