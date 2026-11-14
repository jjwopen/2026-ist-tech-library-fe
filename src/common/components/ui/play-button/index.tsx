import { Play } from 'lucide-react';

import { cn } from '@/common/utils';

export function PlayButton({ label, size = 'md', onClick, className }: PlayButton.Props) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'bg-primary text-on-primary hover:bg-primary-hover inline-flex shrink-0 items-center justify-center rounded-full transition-colors',
        size === 'sm' ? 'size-10' : 'size-12',
        className,
      )}
    >
      <Play className={size === 'sm' ? 'size-3' : 'size-3.5'} fill="currentColor" strokeWidth={0} />
    </button>
  );
}

export namespace PlayButton {
  export type Props = {
    /** 접근성 레이블 (aria-label) */
    label: string;
    size?: 'sm' | 'md';
    onClick?: () => void;
    className?: string;
  };
}
