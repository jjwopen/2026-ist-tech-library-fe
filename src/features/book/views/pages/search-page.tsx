import { useTranslation } from 'react-i18next';

import { Footer, PageShell, TopBar } from '@/common/components/layout';

import { useSearchBooks } from '../../viewmodels';
import { EmptyState } from '../components/empty-state';
import { ResultRow } from '../components/result-row';
import { SearchField } from '../components/search-field';

/** S2 검색 결과 */
export function SearchPage({ query }: SearchPage.Props) {
  const { t } = useTranslation('book');
  const { books, total } = useSearchBooks(query);

  return (
    <PageShell bottom={<Footer selected="search" />}>
      <TopBar>
        <SearchField key={query} defaultValue={query} variant="compact" />
      </TopBar>

      <div className="flex items-center justify-between pt-4 pb-2">
        <span className="text-overline text-sub">{t('search.result')}</span>
        <span className="text-meta font-bold">{t('search.resultCount', { n: total })}</span>
      </div>

      {books.length > 0 ? (
        books.map((book, index) => <ResultRow key={book.id} index={index + 1} book={book} />)
      ) : (
        <EmptyState className="py-12">
          {query.trim() ? t('search.empty') : t('search.prompt')}
        </EmptyState>
      )}
    </PageShell>
  );
}

export namespace SearchPage {
  export type Props = {
    query: string;
  };
}
