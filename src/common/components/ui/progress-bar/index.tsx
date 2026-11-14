import { cn } from '@/common/utils';

export function ProgressBar({ value, label, className }: ProgressBar.Props) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn('bg-track h-1 w-full overflow-hidden rounded-full', className)}
    >
      <div
        className="bg-ink h-full rounded-full transition-[width]"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export namespace ProgressBar {
  export type Props = {
    /** 0 ~ 100 */
    value: number;
    label?: string;
    className?: string;
  };
}
