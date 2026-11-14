import { Star } from 'lucide-react';

import { cn } from '@/common/utils';

export function Rating({ value, max = 5, variant = 'stars', className }: Rating.Props) {
  if (variant === 'compact') {
    return (
      <span className={cn('text-label text-ink inline-flex items-center gap-1', className)}>
        <Star className="text-primary size-3.5" fill="currentColor" strokeWidth={0} />
        {value.toFixed(1)}
      </span>
    );
  }

  const filled = Math.round(value);
  return (
    <span
      role="img"
      aria-label={`${value} / ${max}`}
      className={cn('inline-flex items-center gap-1', className)}
    >
      {Array.from({ length: max }, (_, index) => (
        <Star
          key={index}
          className={cn('size-3', index < filled ? 'text-primary' : 'text-track')}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

export namespace Rating {
  export type Props = {
    value: number;
    max?: number;
    /** stars: 별 목록, compact: 별 1개 + 숫자 */
    variant?: 'stars' | 'compact';
    className?: string;
  };
}
