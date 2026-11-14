import { type ReactNode } from 'react';

import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Footer, PageShell, TopBar } from '@/common/components/layout';
import { cn } from '@/common/utils';

import {
  FLOORS,
  useFloorPlan,
  useFloorTarget,
  type FloorId,
  type FloorPlan,
} from '../../viewmodels';
import { EmptyState } from '../components/empty-state';
import { FloorMap } from '../components/floor-map';
import { LocationSheet } from '../components/location-sheet';

/** S3 층 평면도 — bookId가 있으면 찾는 책 위치를, 없으면 둘러보기 */
export function FloorPage({ floor, bookId }: FloorPage.Props) {
  return bookId ? <TargetFloor floor={floor} bookId={bookId} /> : <BrowseFloor floor={floor} />;
}

function BrowseFloor({ floor }: { floor: FloorId }) {
  const { plan } = useFloorPlan(floor);

  return (
    <FloorLayout floor={floor} plan={plan} bottom={<Footer selected="map" />}>
      {plan && <FloorMap plan={plan} />}
    </FloorLayout>
  );
}

function TargetFloor({ floor, bookId }: { floor: FloorId; bookId: string }) {
  const { plan, book, target, sameShelfCount, recMarkers, showRoute } = useFloorTarget(
    floor,
    bookId,
  );

  return (
    <FloorLayout
      floor={floor}
      bookId={bookId}
      plan={plan}
      bottom={book ? <LocationSheet book={book} /> : <Footer selected="map" />}
    >
      {plan && (
        <FloorMap
          plan={plan}
          target={target}
          sameShelfCount={sameShelfCount}
          recMarkers={recMarkers}
          showRoute={showRoute}
        />
      )}
    </FloorLayout>
  );
}

function FloorLayout({
  floor,
  bookId,
  plan,
  bottom,
  children,
}: {
  floor: FloorId;
  bookId?: string;
  plan: FloorPlan | null;
  bottom: ReactNode;
  children: ReactNode;
}) {
  const { t } = useTranslation('book');

  const legend = [
    { swatch: 'bg-accent size-2.5', label: t('tag.target') },
    { swatch: 'bg-rec size-2.5', label: t('legend.rec') },
    { swatch: 'bg-accent h-[3px] w-4', label: t('legend.route') },
  ];

  return (
    <PageShell bottom={bottom}>
      <TopBar>
        <span className="num-lg">{floor}</span>
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
          {children}
          <ul className="text-meta text-sub flex items-center gap-4 py-3">
            {legend.map(({ swatch, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <span className={swatch} />
                {label}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <EmptyState className="border-y">{t('floor.notReady')}</EmptyState>
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
