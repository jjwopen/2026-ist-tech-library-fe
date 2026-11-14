import { type ReactNode } from 'react';

import { cn } from '@/common/utils';

/** 홈 섹션 — 제목 + 보조 문구 + 우측 링크, 굵은 구분선, 가로 스크롤 목록 */
export function BookRail({ title, caption, action, children, className }: BookRail.Props) {
  return (
    <section className={cn('flex flex-col', className)}>
      <div className="border-ink flex items-baseline gap-2 border-b-2 pb-2">
        <h2 className="shrink-0 text-base font-bold whitespace-nowrap">{title}</h2>
        {caption && <span className="text-meta text-sub min-w-0 truncate">{caption}</span>}
        {action && (
          <div className="text-meta ml-auto shrink-0 font-medium whitespace-nowrap">{action}</div>
        )}
      </div>
      <div className="scrollbar-hidden -mr-5 flex gap-3.5 overflow-x-auto pt-2.5 pr-5">
        {children}
      </div>
    </section>
  );
}

export namespace BookRail {
  export type Props = {
    title: string;
    caption?: string;
    /** 우측 "전체 →" 등 */
    action?: ReactNode;
    children: ReactNode;
    className?: string;
  };
}
