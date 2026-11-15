import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import {
  SHELF_COLUMNS,
  SHELF_ROWS,
  type BookLocation,
  type ShelfMarker,
} from '../../../viewmodels';

const ROWS = Array.from({ length: SHELF_ROWS }, (_, index) => index + 1);
const COLUMNS = Array.from({ length: SHELF_COLUMNS }, (_, index) => index + 1);

/** 추정 칸에서 멀어질수록 가능성이 낮아짐 (같은 칸 → 양옆 1칸 → 2칸) */
const HEAT_CLASS = ['bg-accent', 'bg-heat-mid', 'bg-heat-low'];

/**
 * 서가 한 면을 칸(행) × 열 격자로 그림.
 * 청구기호로 추정한 칸을 가능성 색으로, 같은 면의 추천 책을 번호로 표시
 */
export function ShelfGrid({
  location,
  recMarkers = [],
  selectedRank,
  onSelectRec,
  className,
}: ShelfGrid.Props) {
  const { t } = useTranslation('book');

  return (
    <div
      role="group"
      aria-label={t('shelf.label', { shelf: location.shelf })}
      className={cn('flex w-full flex-col gap-1', className)}
    >
      <div className="text-sub flex gap-2 pl-5.5">
        {COLUMNS.map((column) => (
          <span
            key={column}
            className={cn('num flex-1 text-center', column === location.column && 'text-accent')}
          >
            {column}
          </span>
        ))}
      </div>
      {ROWS.map((row) => (
        <div key={row} className="flex items-stretch gap-2">
          <span
            className={cn(
              'num flex w-3.5 shrink-0 items-center justify-center',
              row === location.slot ? 'text-accent' : 'text-sub',
            )}
          >
            {row}
          </span>
          <div className="bg-print-ink flex flex-1 gap-0.5 p-0.5">
            {COLUMNS.map((column) => {
              const distance = Math.abs(column - location.column);
              const heat = row === location.slot ? HEAT_CLASS[distance] : undefined;
              const marker = recMarkers.find((rec) => rec.slot === row && rec.column === column);

              return (
                <div key={column} className="bg-field relative h-14 flex-1">
                  {heat && (
                    <>
                      <span className={cn('absolute inset-0 opacity-32', heat)} />
                      <span className={cn('absolute inset-x-0 top-0 h-[5px]', heat)} />
                    </>
                  )}
                  {marker && (
                    <button
                      type="button"
                      aria-pressed={selectedRank === marker.rank}
                      aria-label={t('shelf.recSpine', { rank: marker.rank })}
                      onClick={() => onSelectRec?.(marker.rank)}
                      className="border-rec absolute inset-1 flex items-start justify-center border-3"
                    >
                      <span className="bg-rec font-num text-print-paper flex size-4 items-center justify-center text-[11px] font-bold">
                        {marker.rank}
                      </span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export namespace ShelfGrid {
  export type Props = {
    location: BookLocation;
    recMarkers?: ShelfMarker[];
    selectedRank?: number | null;
    onSelectRec?: (rank: number) => void;
    className?: string;
  };
}
