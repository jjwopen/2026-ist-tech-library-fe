import { cn } from '@/common/utils';

export function PriceTag({
  price,
  currency = '$',
  variant = 'filled',
  onClick,
  className,
}: PriceTag.Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'text-label inline-flex h-10 min-w-14 shrink-0 items-center justify-center rounded-full border px-3.5 transition-opacity hover:opacity-80',
        variant === 'filled' ? 'border-ink bg-ink text-on-ink' : 'border-track bg-surface text-ink',
        className,
      )}
    >
      {currency}
      {price}
    </button>
  );
}

export namespace PriceTag {
  export type Props = {
    price: number | string;
    currency?: string;
    variant?: 'filled' | 'outline';
    onClick?: () => void;
    className?: string;
  };
}
