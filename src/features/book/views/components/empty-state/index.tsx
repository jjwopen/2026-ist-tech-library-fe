import { type ReactNode } from 'react';

import { cn } from '@/common/utils';

/** 결과·데이터가 없을 때 가운데 정렬 안내 문구 */
export function EmptyState({ children, className }: EmptyState.Props) {
  return (
    <p className={cn('border-ink text-body-lg text-sub border-t py-24 text-center', className)}>
      {children}
    </p>
  );
}

export namespace EmptyState {
  export type Props = {
    children: ReactNode;
    className?: string;
  };
}
