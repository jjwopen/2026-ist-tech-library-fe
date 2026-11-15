import { forwardRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import { InkIcon } from '../ink-icon';

/** 한지 위에 붓으로 그은 줄 하나 — 적고 화살표를 누르면 찾기 */
export const SearchBar = forwardRef<HTMLInputElement, SearchBar.Props>(function SearchBar(
  { onSubmit, className },
  ref,
) {
  const { t } = useTranslation('book');
  const [query, setQuery] = useState('');

  return (
    <form
      role="search"
      className={cn('p-search', className)}
      onSubmit={(event) => {
        event.preventDefault();
        if (!query.trim()) return;
        (document.activeElement as HTMLElement | null)?.blur();
        onSubmit(query.trim());
      }}
    >
      <input
        ref={ref}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('home.placeholder')}
        aria-label={t('home.searchLabel')}
        autoComplete="off"
        enterKeyHint="search"
      />
      <button type="submit" className="p-icon-btn p-go" aria-label={t('home.submit')}>
        <InkIcon name="arrow" />
      </button>
      <span className="p-brush" aria-hidden data-brush />
    </form>
  );
});

export namespace SearchBar {
  export type Props = {
    onSubmit: (query: string) => void;
    className?: string;
  };
}
