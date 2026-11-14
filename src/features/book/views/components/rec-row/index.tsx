import { ICONS } from '@/common/assets';
import { SvgIcon, Tag } from '@/common/components/ui';
import { cn } from '@/common/utils';

import { type Recommendation } from '../../../viewmodels';
import { useBookLabels } from '../../hooks';
import { BookCoverArt } from '../book-cover-art';
import { MiniShelf } from '../mini-shelf';
import { ViewLocationLink } from '../view-location-link';

/** 추천 목록 한 줄 (Figma RecRow) */
export function RecRow({ recommendation, className }: RecRow.Props) {
  const labels = useBookLabels();
  const { rank, kind, reason, where, book } = recommendation;

  return (
    <article className={cn('border-ink flex items-start gap-3.5 border-t py-4', className)}>
      <span className="num-lg text-rec w-10 shrink-0">{labels.index(rank)}</span>
      <BookCoverArt title={book.title} color={book.coverColor} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start gap-2">
          <h3 className="min-w-0 flex-1 text-base/[22px] font-bold tracking-[-0.01em]">
            {book.title}
          </h3>
          <Tag variant="rec-outline">{labels.recKind(kind)}</Tag>
        </div>
        <p className="text-meta text-sub">{book.authors}</p>
        <p className="text-small font-normal">{reason}</p>
        <div className="flex items-center justify-between">
          <span className="text-small flex items-center gap-2">
            {where.type === 'same-shelf' ? (
              <MiniShelf slot={where.slot} />
            ) : (
              <SvgIcon src={ICONS.pinSmall} size={16} />
            )}
            {labels.recWhere(where)}
          </span>
          <ViewLocationLink book={book} />
        </div>
      </div>
    </article>
  );
}

export namespace RecRow {
  export type Props = {
    recommendation: Recommendation;
    className?: string;
  };
}
