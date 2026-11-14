import { type ReactNode } from 'react';

import { cn } from '@/common/utils';

export function AppLayout({ header, bottomBar, children, className }: AppLayout.Props) {
  return (
    <div className="bg-canvas min-h-dvh">
      <div
        className={cn(
          'bg-surface text-ink max-w-mobile relative mx-auto flex min-h-dvh w-full flex-col',
          className,
        )}
      >
        {header && (
          <header className="border-line bg-surface sticky top-0 z-10 shrink-0 border-b pt-[env(safe-area-inset-top)]">
            <div className="flex h-14 items-center px-5">{header}</div>
          </header>
        )}
        <main className="flex-1 px-5 py-6">{children}</main>
        {bottomBar && (
          <nav className="border-line bg-surface sticky bottom-0 z-10 shrink-0 border-t pb-[env(safe-area-inset-bottom)]">
            {bottomBar}
          </nav>
        )}
      </div>
    </div>
  );
}

export namespace AppLayout {
  export type Props = {
    /** 상단 고정 헤더 */
    header?: ReactNode;
    /** 하단 고정 탭 바 */
    bottomBar?: ReactNode;
    children: ReactNode;
    className?: string;
  };
}
