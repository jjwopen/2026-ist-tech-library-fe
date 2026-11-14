import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { PageShell, TopBar } from '@/common/components/layout';
import { buttonClass } from '@/common/components/ui';

import { useShelfView } from '../../viewmodels';
import { EmptyState } from '../components/empty-state';
import { ShelfFront } from '../components/shelf-front';
import { ShelfPanel } from '../components/shelf-panel';
import { useBookLabels } from '../hooks';

/** S4 서가 정면 */
export function ShelfPage({ bookId }: ShelfPage.Props) {
  const { t } = useTranslation('book');
  const labels = useBookLabels();
  const { shelf, recommendations, selected, select, clearSelection } = useShelfView(bookId);

  if (!shelf) {
    return (
      <PageShell>
        <TopBar />
        <EmptyState className="border-t-0">{t('shelf.notReady')}</EmptyState>
      </PageShell>
    );
  }

  const { location } = shelf.target;

  return (
    <PageShell className="pb-4">
      <TopBar
        trailing={
          recommendations.length > 0 && (
            <Link
              to="/books/$bookId/recommendations"
              params={{ bookId }}
              className={buttonClass({ variant: 'rec-outline' })}
            >
              {t('shelf.recCount', { n: recommendations.length })}
            </Link>
          )
        }
      >
        <span className="num-lg">{shelf.shelf}</span>
        <span className="text-subtitle truncate">
          {t('shelf.titleSuffix', { side: labels.side(shelf.side) })}
        </span>
      </TopBar>

      {location.slot && (
        <p className="flex items-end gap-2.5 pt-5 pb-4">
          <span className="text-display-sm text-accent">
            {t('shelf.slot', { slot: location.slot })}
          </span>
          <span className="text-h2">{labels.position(location.position)}</span>
        </p>
      )}

      <ShelfFront shelf={shelf} selectedRank={selected?.rank} onSelectRec={select} />

      <div className="text-meta text-sub flex items-center justify-between py-3">
        <span className="flex items-center gap-1">
          {t('legend.high')}
          <span className="bg-accent size-2.5" />
          <span className="bg-heat-mid size-2.5" />
          <span className="bg-heat-low size-2.5" />
          {t('legend.low')}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="border-rec bg-paper h-3 w-2.5 border-2" />
          {t('legend.rec')}
        </span>
      </div>

      <ShelfPanel shelf={shelf} selected={selected} onClearSelection={clearSelection} />
    </PageShell>
  );
}

export namespace ShelfPage {
  export type Props = {
    bookId: string;
  };
}
