import { useTranslation } from 'react-i18next';

import { cn, isLightColor } from '@/common/utils';

import { type HeatLevel, type ShelfSpine, type ShelfView } from '../../../viewmodels';

const HEAT_CLASS: Record<HeatLevel, string> = {
  high: 'bg-accent',
  mid: 'bg-heat-mid',
  low: 'bg-heat-low',
};

/** 서가 정면 (Figma `27번 서가 앞면`) — 칸 번호 + 책등 + 가능성 구간 + 추천 책 */
export function ShelfFront({ shelf, selectedRank, onSelectRec, className }: ShelfFront.Props) {
  const { t } = useTranslation('book');
  const targetSlot = shelf.target.location.slot;

  return (
    <div className={cn('flex w-full items-start gap-2', className)}>
      <ol className="flex shrink-0 flex-col gap-0.5 pt-0.5">
        {shelf.rows.map((_, index) => (
          <li
            key={index}
            className={cn(
              'font-num text-meta flex h-16 w-3.5 items-center justify-center font-bold tracking-[0.02em]',
              index + 1 === targetSlot ? 'text-accent' : 'text-sub',
            )}
          >
            {index + 1}
          </li>
        ))}
      </ol>
      <div
        role="group"
        aria-label={t('shelf.label', { shelf: String(shelf.shelf) })}
        className="flex min-w-0 flex-1 flex-col gap-0.5 bg-[#111] p-0.5"
      >
        {shelf.rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="bg-field relative flex h-16 w-full items-end gap-0.5 overflow-hidden px-2"
          >
            {row.map((spine, index) =>
              spine.recRank ? (
                <button
                  key={index}
                  type="button"
                  aria-pressed={selectedRank === spine.recRank}
                  aria-label={t('shelf.recSpine', { rank: String(spine.recRank) })}
                  onClick={() => onSelectRec?.(spine.recRank!)}
                  className="shrink-0"
                >
                  <Spine spine={spine} />
                </button>
              ) : (
                <Spine key={index} spine={spine} />
              ),
            )}
            {rowIndex + 1 === shelf.heat.slot && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 flex"
                style={{ left: shelf.heat.offset }}
              >
                {shelf.heat.segments.map((segment, index) => (
                  <span key={index} style={{ width: segment.width }} className="relative h-full">
                    <span
                      className={cn('absolute inset-0 opacity-32', HEAT_CLASS[segment.level])}
                    />
                    <span
                      className={cn('absolute inset-x-0 top-0 h-[5px]', HEAT_CLASS[segment.level])}
                    />
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Spine({ spine }: { spine: ShelfSpine }) {
  const light = isLightColor(spine.color);
  const ink = light ? 'bg-[#111]' : 'bg-white';
  const rec = !!spine.recRank;

  return (
    <span
      aria-hidden
      style={{ width: spine.width, height: spine.height, backgroundColor: spine.color }}
      className={cn('relative block shrink-0 overflow-hidden', rec && 'border-rec border-3')}
    >
      {spine.band && (
        <>
          <span className={cn('absolute inset-x-0 top-1 h-px', ink)} />
          <span className={cn('absolute inset-x-0 top-[7px] h-px', ink)} />
        </>
      )}
      {spine.label && (
        <span
          className={cn(
            'absolute inset-x-0 flex flex-col items-center text-[7px]/2 font-bold',
            rec ? 'top-[21px]' : 'top-[11px]',
            light ? 'text-[#111]' : 'text-white',
          )}
        >
          {[...spine.label].map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </span>
      )}
      {/* 청구기호 라벨 */}
      <span
        className={cn(
          'absolute h-[9px] border-[0.5px] border-[#111] bg-white',
          rec ? 'inset-x-0 bottom-px' : 'inset-x-0.5 bottom-1',
        )}
      >
        <span className="absolute inset-x-0.5 top-[2.5px] h-px bg-[#111]" />
        <span className="absolute inset-x-0.5 top-[5.5px] h-px bg-[#111]" />
      </span>
      {rec && (
        <span className="bg-rec font-num absolute top-px left-1/2 flex size-4 -translate-x-1/2 items-center justify-center text-[11px] font-bold text-white">
          {spine.recRank}
        </span>
      )}
    </span>
  );
}

export namespace ShelfFront {
  export type Props = {
    shelf: ShelfView;
    selectedRank?: number | null;
    onSelectRec?: (rank: number) => void;
    className?: string;
  };
}
