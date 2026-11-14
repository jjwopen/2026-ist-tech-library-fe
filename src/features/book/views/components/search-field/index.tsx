import { useState } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { ICONS } from '@/common/assets';
import { SvgIcon } from '@/common/components/ui';
import { cn } from '@/common/utils';

/**
 * 검색어를 입력하면 검색 결과 화면으로 이동하는 검색창.
 * hero: 홈의 큰 검색창(우측 검정 버튼), compact: 검색 결과 상단(좌측 돋보기)
 */
export function SearchField({ defaultValue = '', variant = 'hero', className }: SearchField.Props) {
  const { t } = useTranslation('book');
  const navigate = useNavigate();
  const [query, setQuery] = useState(defaultValue);
  const hero = variant === 'hero';

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        navigate({ to: '/search', search: { q: query.trim() } });
      }}
      className={cn(
        'border-ink flex min-w-0 items-center',
        hero ? 'h-14 border-2' : 'h-11 flex-1 gap-2 border px-3',
        className,
      )}
    >
      {!hero && <SvgIcon src={ICONS.searchSmall} size={18} className="text-sub" />}
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('search.placeholder')}
        aria-label={t('search.placeholder')}
        className={cn(
          'text-body-lg placeholder:text-sub min-w-0 flex-1 bg-transparent outline-hidden [&::-webkit-search-cancel-button]:hidden',
          hero && 'pl-4',
        )}
      />
      {hero && (
        <button
          type="submit"
          aria-label={t('search.submit')}
          className="bg-ink text-paper -mr-0.5 flex size-14 shrink-0 items-center justify-center"
        >
          <SvgIcon src={ICONS.searchWhite} size={22} />
        </button>
      )}
    </form>
  );
}

export namespace SearchField {
  export type Props = {
    defaultValue?: string;
    variant?: 'hero' | 'compact';
    className?: string;
  };
}
