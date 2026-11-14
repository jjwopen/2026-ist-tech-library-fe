import { Fragment } from 'react';

import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Button, buttonClass, StatusMark, Tag } from '@/common/components/ui';
import { cn } from '@/common/utils';

import { type Recommendation, type ShelfView } from '../../../viewmodels';
import { useBookLabels } from '../../hooks';

/** 서가 정면 하단 패널 — 기본은 찾는 책, 추천 책을 누르면 추천 정보 */
export function ShelfPanel({ shelf, selected, onClearSelection, className }: ShelfPanel.Props) {
  const { t } = useTranslation('book');
  const labels = useBookLabels();
  const { target, neighbors } = shelf;

  return (
    <section className={cn('border-ink flex flex-col gap-2 border-t-2 pt-3.5', className)}>
      {selected ? (
        <>
          <div className="flex items-center justify-between">
            <Tag variant="rec">
              {t('shelf.recTag', {
                rank: String(selected.rank),
                kind: labels.recKind(selected.kind),
              })}
            </Tag>
            {selected.book.location.slot && (
              <span className="text-meta text-rec font-bold">
                {t('shelf.slot', { slot: String(selected.book.location.slot) })}
              </span>
            )}
          </div>
          <h2 className="text-h2">{selected.book.title}</h2>
          <p className="text-meta text-sub">
            {selected.book.authors} · {selected.reason}
          </p>
          <div className="flex gap-2 pt-1">
            <Button variant="outline" size="lg" className="flex-1" onClick={onClearSelection}>
              {t('shelf.viewTarget')}
            </Button>
            <Link
              to="/books/$bookId/recommendations"
              params={{ bookId: target.id }}
              className={buttonClass({ variant: 'rec', size: 'lg', className: 'flex-1' })}
            >
              {t('shelf.recList')}
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Tag variant="accent">{t('tag.target')}</Tag>
            <StatusMark label={labels.loan(target.loan)} active={target.loan.available} />
          </div>
          <h2 className="text-h2">{target.title}</h2>
          <p className="text-meta text-sub">
            {target.authors} · {target.callNumber}
          </p>
          {neighbors.prev && neighbors.next && (
            <div className="text-meta text-sub flex flex-wrap items-center gap-1.5">
              <span>{t('shelf.callOrder')}</span>
              {[neighbors.prev, null, neighbors.next].map((callNumber, index) => (
                <Fragment key={index}>
                  {index > 0 && <span aria-hidden>→</span>}
                  {callNumber ? (
                    <Tag>{callNumber}</Tag>
                  ) : (
                    <Tag variant="accent">{t('shelf.thisBook')}</Tag>
                  )}
                </Fragment>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export namespace ShelfPanel {
  export type Props = {
    shelf: ShelfView;
    selected: Recommendation | null;
    onClearSelection: () => void;
    className?: string;
  };
}
