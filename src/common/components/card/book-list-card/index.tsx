import { BookCover, BookmarkButton, PriceTag, Rating } from '@/common/components/ui';
import { cn } from '@/common/utils';

export function BookListCard({
  coverSrc,
  title,
  author,
  rating,
  price,
  priceVariant = 'filled',
  onPriceClick,
  bookmarked,
  bookmarkLabel,
  onBookmarkToggle,
  className,
}: BookListCard.Props) {
  return (
    <article className={cn('flex gap-4', className)}>
      <BookCover src={coverSrc} title={title} size="sm" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-title text-ink line-clamp-2 font-medium wrap-break-word">
              {title}
            </h3>
            <p className="text-caption text-muted mt-0.5 truncate">{author}</p>
          </div>
          <BookmarkButton
            bookmarked={bookmarked}
            label={bookmarkLabel}
            onToggle={onBookmarkToggle}
            className="-mt-2.5 -mr-2.5"
          />
        </div>
        <div className="mt-auto flex items-end justify-between gap-3">
          <Rating value={rating} variant="compact" />
          <PriceTag price={price} variant={priceVariant} onClick={onPriceClick} />
        </div>
      </div>
    </article>
  );
}

export namespace BookListCard {
  export type Props = {
    coverSrc?: string;
    title: string;
    author: string;
    rating: number;
    price: number | string;
    priceVariant?: 'filled' | 'outline';
    onPriceClick?: () => void;
    bookmarked: boolean;
    bookmarkLabel: string;
    onBookmarkToggle?: (next: boolean) => void;
    className?: string;
  };
}
