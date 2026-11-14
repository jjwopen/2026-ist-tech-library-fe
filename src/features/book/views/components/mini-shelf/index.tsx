import { cn } from '@/common/utils';

/** 서가 칸 수만큼 막대를 쌓고 해당 칸만 강조하는 작은 서가 아이콘 */
const SLOTS = 5;

export function MiniShelf({ slot, className }: MiniShelf.Props) {
  return (
    <span aria-hidden className={cn('flex shrink-0 flex-col gap-0.5', className)}>
      {Array.from({ length: SLOTS }, (_, index) => (
        <span
          key={index}
          className={cn('h-[3px] w-[18px]', index + 1 === slot ? 'bg-rec' : 'bg-rule-light')}
        />
      ))}
    </span>
  );
}

export namespace MiniShelf {
  export type Props = {
    /** 강조할 칸 (1부터) */
    slot: number;
    className?: string;
  };
}
