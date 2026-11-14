import { type ReactNode } from 'react';

import { cn } from '@/common/utils';

const VARIANT_CLASS: Record<Tag.Variant, string> = {
  outline: 'border-ink text-ink border',
  accent: 'bg-accent border-accent border text-white',
  rec: 'bg-rec border-rec border text-white',
  'rec-outline': 'border-rec text-rec border',
};

export function Tag({ children, variant = 'outline', className }: Tag.Props) {
  return (
    <span
      className={cn(
        'text-overline inline-flex shrink-0 items-center px-1.5 py-0.5 tracking-[0.02em] whitespace-nowrap',
        VARIANT_CLASS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export namespace Tag {
  export type Variant = 'outline' | 'accent' | 'rec' | 'rec-outline';

  export type Props = {
    children: ReactNode;
    variant?: Variant;
    className?: string;
  };
}
