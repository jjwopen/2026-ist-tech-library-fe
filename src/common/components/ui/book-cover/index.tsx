import { BookOpen } from 'lucide-react';

import { cn } from '@/common/utils';

export function BookCover({ src, title, size = 'md', className }: BookCover.Props) {
  return (
    <div
      className={cn(
        'bg-surface-alt text-muted flex shrink-0 items-center justify-center overflow-hidden rounded-xs',
        size === 'sm' ? 'h-23 w-14.5' : 'h-38 w-24',
        className,
      )}
    >
      {src ? (
        <img src={src} alt={title} className="size-full object-cover" />
      ) : (
        <BookOpen aria-label={title} className={size === 'sm' ? 'size-5' : 'size-7'} />
      )}
    </div>
  );
}

export namespace BookCover {
  export type Props = {
    src?: string;
    /** 대체 텍스트 */
    title: string;
    size?: 'sm' | 'md';
    className?: string;
  };
}
