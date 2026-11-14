import { type ReactNode } from 'react';

import { useCanGoBack, useRouter } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { ICONS } from '@/common/assets';
import { SvgIcon } from '@/common/components/ui';
import { cn } from '@/common/utils';

/** 뒤로 가기 + 화면 제목/검색창을 담는 상단 바 (높이 64) */
export function TopBar({ children, trailing, bordered = true, className }: TopBar.Props) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const handleBack = () => {
    if (canGoBack) return router.history.back();
    router.navigate({ to: '/' });
  };

  return (
    <div
      className={cn(
        'flex h-16 w-full shrink-0 items-center gap-2',
        bordered && 'border-ink border-b',
        className,
      )}
    >
      <button
        type="button"
        onClick={handleBack}
        aria-label={t('back')}
        className="text-ink flex size-11 shrink-0 items-center"
      >
        <SvgIcon src={ICONS.back} size={22} />
      </button>
      <div className="flex min-w-0 flex-1 items-center gap-2">{children}</div>
      {trailing}
    </div>
  );
}

export namespace TopBar {
  export type Props = {
    children?: ReactNode;
    /** 우측 액션 영역 */
    trailing?: ReactNode;
    /** 하단 구분선 표시 여부 */
    bordered?: boolean;
    className?: string;
  };
}
