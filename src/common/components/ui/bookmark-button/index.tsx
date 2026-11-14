import { Bookmark } from 'lucide-react';

import { cn } from '@/common/utils';

export function BookmarkButton({ bookmarked, onToggle, label, className }: BookmarkButton.Props) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={bookmarked}
      onClick={() => onToggle?.(!bookmarked)}
      className={cn(
        'text-ink inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-70',
        className,
      )}
    >
      <Bookmark className="size-4.5" fill={bookmarked ? 'currentColor' : 'none'} strokeWidth={2} />
    </button>
  );
}

export namespace BookmarkButton {
  export type Props = {
    bookmarked: boolean;
    onToggle?: (next: boolean) => void;
    /** 접근성 레이블 (aria-label) */
    label: string;
    className?: string;
  };
}
