import { type ReactNode } from 'react';

import { cn } from '@/common/utils';

export function SectionTitle({ title, action, className }: SectionTitle.Props) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <h2 className="text-title text-ink">{title}</h2>
      {action}
    </div>
  );
}

export namespace SectionTitle {
  export type Props = {
    title: string;
    /** 우측 영역 (e.g. 더보기 링크) */
    action?: ReactNode;
    className?: string;
  };
}
