type IconProps = { className?: string };

export function ChevronDown({ className }: IconProps) {
  return (
    <svg className={className} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg className={className} width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
      <path d="M0 6h12.5M7.5 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
