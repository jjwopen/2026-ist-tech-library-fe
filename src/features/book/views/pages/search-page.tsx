import { useState } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { ICONS } from '@/common/assets';
import { Footer, PageShell, TopBar } from '@/common/components/layout';
import { SvgIcon } from '@/common/components/ui';

import { useSearchBooks } from '../../viewmodels';
import { ResultRow } from '../components/result-row';

/** S2 검색 결과 */
export function SearchPage({ query }: SearchPage.Props) {
  const { t } = useTranslation('book');
  const navigate = useNavigate();
  const [draft, setDraft] = useState(query);
  const { books } = useSearchBooks(query);

  return (
    <PageShell bottom={<Footer selected="search" />}>
      <TopBar>
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            navigate({ to: '/search', search: { q: draft.trim() } });
          }}
          className="border-ink flex h-11 min-w-0 flex-1 items-center gap-2 border px-3"
        >
          <SvgIcon src={ICONS.searchSmall.src} size={18} className="text-sub" />
          <input
            type="search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={t('search.placeholder')}
            aria-label={t('search.placeholder')}
            className="text-body-lg placeholder:text-sub min-w-0 flex-1 bg-transparent outline-hidden [&::-webkit-search-cancel-button]:hidden"
          />
        </form>
      </TopBar>

      <div className="flex items-center justify-between pt-4 pb-2">
        <span className="text-overline text-sub">{t('search.result')}</span>
        <span className="text-meta font-bold">
          {t('search.resultCount', { n: String(books.length) })}
        </span>
      </div>

      {books.length > 0 ? (
        books.map((book, index) => <ResultRow key={book.id} index={index + 1} book={book} />)
      ) : (
        <p className="border-ink text-body-lg text-sub border-t py-12 text-center">
          {t('search.empty')}
        </p>
      )}
    </PageShell>
  );
}

export namespace SearchPage {
  export type Props = {
    query: string;
  };
}
