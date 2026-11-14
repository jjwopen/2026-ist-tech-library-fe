import { cn } from '@/common/utils';

export function Logo({ label = 'Logo', className }: Logo.Props) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 32 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-ink h-8 w-6.5', className)}
    >
      <path d="M4 4l5 4h14l5-4v20c0 7-5.4 12-12 12S4 31 4 24V4z" />
      <circle cx="11" cy="17" r="4" />
      <circle cx="21" cy="17" r="4" />
      <path d="M14.5 23l1.5 2 1.5-2" />
      <path d="M10 30c2 1.4 3.9 2 6 2s4-.6 6-2" />
    </svg>
  );
}

export namespace Logo {
  export type Props = {
    label?: string;
    className?: string;
  };
}
