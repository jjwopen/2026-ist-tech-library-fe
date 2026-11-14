import { cn } from '@/common/utils';

export function CountBadge({ count, dot = true, label, className }: CountBadge.Props) {
  return (
    <span
      aria-label={label}
      className={cn(
        'border-line bg-surface text-tiny text-ink relative inline-flex size-9 shrink-0 items-center justify-center rounded-full border font-bold',
        className,
      )}
    >
      {count}
      {dot && <span className="bg-primary absolute -top-0.5 right-0 size-1.5 rounded-full" />}
    </span>
  );
}

export namespace CountBadge {
  export type Props = {
    count: number;
    /** 우측 상단 강조 점 표시 */
    dot?: boolean;
    label?: string;
    className?: string;
  };
}
