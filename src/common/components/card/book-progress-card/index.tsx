import { BookCover, PlayButton, ProgressBar } from '@/common/components/ui';
import { cn } from '@/common/utils';

export function BookProgressCard({
  coverSrc,
  title,
  author,
  progress,
  playLabel,
  onPlay,
  className,
}: BookProgressCard.Props) {
  return (
    <article className={cn('flex gap-4', className)}>
      <BookCover src={coverSrc} title={title} />
      <div className="flex min-w-0 flex-1 flex-col py-1">
        <h3 className="text-heading text-ink line-clamp-2 wrap-break-word">{title}</h3>
        <p className="text-body text-muted mt-1.5 truncate">{author}</p>
        <ProgressBar value={progress} label={title} className="mt-3" />
        <PlayButton label={playLabel} onClick={onPlay} className="mt-auto" />
      </div>
    </article>
  );
}

export namespace BookProgressCard {
  export type Props = {
    coverSrc?: string;
    title: string;
    author: string;
    /** 읽은 진행률 0 ~ 100 */
    progress: number;
    playLabel: string;
    onPlay?: () => void;
    className?: string;
  };
}
