import { useTranslation } from 'react-i18next';

/** 화면 데이터를 불러오는 동안 표시 (라우트 Suspense fallback) */
export function PendingPage() {
  const { t } = useTranslation('common');

  return (
    <div className="bg-canvas min-h-dvh">
      <div
        role="status"
        className="bg-paper text-sub max-w-mobile mx-auto flex min-h-dvh w-full flex-col items-center justify-center gap-3"
      >
        <span className="border-rule-light border-t-ink size-6 animate-spin rounded-full border-2" />
        <span className="text-meta">{t('loading')}</span>
      </div>
    </div>
  );
}
