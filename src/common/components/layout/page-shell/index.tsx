import { type ReactNode } from 'react';

import { cn } from '@/common/utils';

/** 모바일 웹 화면 틀 — 좌우 20px 여백, 하단 탭/시트를 화면 아래에 고정 */
export function PageShell({ children, bottom, className }: PageShell.Props) {
  return (
    <div className="bg-canvas min-h-dvh">
      <div className="bg-paper text-ink max-w-mobile relative mx-auto flex min-h-dvh w-full flex-col">
        <main
          className={cn(
            'flex flex-1 flex-col px-5 pt-[env(safe-area-inset-top)]',
            !bottom && 'pb-[calc(env(safe-area-inset-bottom)+1.5rem)]',
            className,
          )}
        >
          {children}
        </main>
        {bottom && (
          <div className="bg-paper sticky bottom-0 z-10 shrink-0 pb-[env(safe-area-inset-bottom)]">
            {bottom}
          </div>
        )}
      </div>
    </div>
  );
}

export namespace PageShell {
  export type Props = {
    children: ReactNode;
    /** 하단 고정 영역 (탭 바, 바텀 시트) */
    bottom?: ReactNode;
    className?: string;
  };
}
