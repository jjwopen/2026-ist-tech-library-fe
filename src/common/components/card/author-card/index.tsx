import { Avatar, CountBadge, Rating } from '@/common/components/ui';
import { cn } from '@/common/utils';

export function AuthorCard({
  avatarSrc,
  name,
  rating,
  bookCount,
  onClick,
  className,
}: AuthorCard.Props) {
  return (
    <article
      onClick={onClick}
      className={cn('flex items-center gap-3', onClick && 'cursor-pointer', className)}
    >
      <Avatar src={avatarSrc} name={name} size="md" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="text-title text-ink truncate font-medium">{name}</h3>
        <Rating value={rating} />
      </div>
      <CountBadge count={bookCount} />
    </article>
  );
}

export namespace AuthorCard {
  export type Props = {
    avatarSrc?: string;
    name: string;
    rating: number;
    bookCount: number;
    onClick?: () => void;
    className?: string;
  };
}
