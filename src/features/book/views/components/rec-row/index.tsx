import { ICONS } from '@/common/assets';
import { SvgIcon, Tag } from '@/common/components/ui';
import { cn } from '@/common/utils';

import { type Book, type Recommendation } from '../../../viewmodels';
import { useBookLabels } from '../../hooks';
import { BookCoverArt } from '../book-cover-art';
import { MiniShelf } from '../mini-shelf';
import { ViewLocationLink } from '../view-location-link';

/** 추천 목록 한 줄 (Figma RecRow) */
export function RecRow({ recommendation, target, className }: RecRow.Props) {
  const labels = useBookLabels();
  const { rank, title, authors, reasons, explanation, coverColor, book } = recommendation;
  const location = book?.location;
  const sameShelf =
    !!location &&
    target.location?.floor === location.floor &&
    target.location.shelf === location.shelf &&
    target.location.side === location.side;

  return (
    <article className={cn('border-ink flex items-start gap-3.5 border-t py-4', className)}>
      <span className="num-lg text-rec w-10 shrink-0">{labels.index(rank)}</span>
      <BookCoverArt title={title} color={coverColor} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start gap-2">
          <h3 className="min-w-0 flex-1 text-base/[22px] font-bold tracking-[-0.01em]">{title}</h3>
          {reasons[0] && <Tag variant="rec-outline">{reasons[0]}</Tag>}
        </div>
        {authors && <p className="text-meta text-sub">{authors}</p>}
        <p className="text-small line-clamp-3 font-normal">{explanation}</p>
        <div className="flex min-h-11 items-center justify-between">
          <span className={cn('text-small flex items-center gap-2', !location && 'text-sub')}>
            {sameShelf ? (
              <MiniShelf slot={location.slot} />
            ) : (
              <SvgIcon src={ICONS.pinSmall} size={16} />
            )}
            {labels.recWhere(recommendation, target)}
          </span>
          {book && location && <ViewLocationLink book={book} />}
        </div>
      </div>
    </article>
  );
}

export namespace RecRow {
  export type Props = {
    recommendation: Recommendation;
    /** 추천 기준 도서 — 같은 서가 여부 판단 */
    target: Book;
    className?: string;
  };
}
