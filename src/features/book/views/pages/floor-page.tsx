import { type ReactNode } from 'react';

import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Footer, PageShell, TopBar } from '@/common/components/layout';
import { cn } from '@/common/utils';

import {
  FLOORS,
  useFloorMap,
  useFloorTarget,
  type FloorId,
  type FloorMap as FloorMapData,
} from '../../viewmodels';
import { EmptyState } from '../components/empty-state';
import { FloorMap } from '../components/floor-map';
import { LocationSheet } from '../components/location-sheet';

/** S3 층 도면 — bookId가 있으면 찾는 책 위치를, 없으면 둘러보기 */
export function FloorPage({ floor, bookId }: FloorPage.Props) {
  return bookId ? (
    <BookFloor floor={floor} bookId={bookId} />
  ) : (
    <BrowseFloor floor={floor ?? '3F'} />
  );
}

function BrowseFloor({ floor }: { floor: FloorId }) {
  const { map } = useFloorMap(floor);

  return (
    <FloorLayout floor={floor} map={map} bottom={<Footer selected="map" />}>
      {map && <FloorMap map={map} />}
    </FloorLayout>
  );
}

function BookFloor({ floor, bookId }: { floor?: FloorId; bookId: string }) {
  const { book, map, onFloor, target, recShelfIds, sameShelfCount, recMarkers, ...rest } =
    useFloorTarget(bookId, floor);

  return (
    <FloorLayout
      floor={rest.floor}
      bookId={bookId}
      map={map}
      bottom={onFloor ? <LocationSheet book={book} /> : <Footer selected="map" />}
    >
      {map && (
        <FloorMap
          map={map}
          target={target}
          recShelfIds={recShelfIds}
          sameShelfCount={sameShelfCount}
          recMarkers={recMarkers}
        />
      )}
    </FloorLayout>
  );
}

function FloorLayout({
  floor,
  bookId,
  map,
  bottom,
  children,
}: {
  floor: FloorId;
  bookId?: string;
  map: FloorMapData | null;
  bottom: ReactNode;
  children: ReactNode;
}) {
  const { t } = useTranslation('book');

  const legend = [
    { swatch: 'bg-accent', label: t('tag.target') },
    { swatch: 'bg-rec', label: t('legend.rec') },
  ];

  return (
    <PageShell bottom={bottom}>
      <TopBar>
        <span className="num-lg">{floor}</span>
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

      {map ? (
        <>
          {children}
          <ul className="text-meta text-sub flex items-center gap-4 py-3">
            {legend.map(({ swatch, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <span className={cn('size-2.5', swatch)} />
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
    floor?: FloorId;
    bookId?: string;
  };
}
