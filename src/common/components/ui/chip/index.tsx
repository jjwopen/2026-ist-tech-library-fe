import { cn } from '@/common/utils';

export function Chip({ label, selected = false, onClick, className }: Chip.Props) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'text-caption inline-flex h-9 shrink-0 items-center rounded-full border px-4 font-semibold whitespace-nowrap transition-colors',
        selected
          ? 'border-ink bg-ink text-on-ink'
          : 'border-line bg-surface text-ink hover:bg-surface-alt',
        className,
      )}
    >
      {label}
    </button>
  );
}

export namespace Chip {
  export type Props = {
    label: string;
    selected?: boolean;
    onClick?: () => void;
    className?: string;
  };
}
