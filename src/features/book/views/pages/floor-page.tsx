import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Footer, PageShell, TopBar } from '@/common/components/layout';
import { cn } from '@/common/utils';

import { FLOORS, useFloorPlan, type FloorId } from '../../viewmodels';
import { FloorMap } from '../components/floor-map';
import { LocationSheet } from '../components/location-sheet';

/** S3 층 평면도 — bookId가 있으면 찾는 책 위치를, 없으면 둘러보기 */
export function FloorPage({ floor, bookId }: FloorPage.Props) {
  const { t } = useTranslation('book');
  const { plan, target, targetSpot, highlightColumn, showRoute, sameShelfCount, recMarkers } =
    useFloorPlan(floor, bookId);

  return (
    <PageShell bottom={target ? <LocationSheet book={target} /> : <Footer selected="map" />}>
      <TopBar>
        <span className="font-num text-[28px]/7 font-bold tracking-[-0.02em]">{floor}</span>
        {plan && <span className="text-subtitle">{plan.name}</span>}
      </TopBar>

      <nav aria-label={t('floor.tabs')} className="flex gap-2 pt-4 pb-3">
        {FLOORS.map((item) => {
          const active = item === floor;
          return (
            <Link
              key={item}
              to="/floor"
              search={{ floor: item, bookId }}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'border-ink text-small flex h-11 flex-1 items-center justify-center border font-bold',
                active ? 'bg-ink text-paper' : 'bg-paper text-ink',
              )}
            >
              {item}
            </Link>
          );
        })}
      </nav>

      {plan ? (
        <>
          <FloorMap
            plan={plan}
            highlightColumn={highlightColumn}
            target={
              target && targetSpot
                ? { x: targetSpot.x, y: targetSpot.y, shelf: target.location.shelf }
                : undefined
            }
            sameShelfCount={sameShelfCount}
            recMarkers={recMarkers}
            showRoute={showRoute}
          />
          <ul className="text-meta text-sub flex items-center gap-4 py-3">
            <li className="flex items-center gap-1.5">
              <span className="bg-accent size-2.5" />
              {t('tag.target')}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="bg-rec size-2.5" />
              {t('legend.rec')}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="bg-accent h-[3px] w-4" />
              {t('legend.route')}
            </li>
          </ul>
        </>
      ) : (
        <p className="border-ink text-body-lg text-sub border-y py-24 text-center">
          {t('floor.notReady')}
        </p>
      )}
    </PageShell>
  );
}

export namespace FloorPage {
  export type Props = {
    floor: FloorId;
    bookId?: string;
  };
}
