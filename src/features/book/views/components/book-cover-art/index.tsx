import { cn, isLightColor } from '@/common/utils';

const SIZE = {
  // 44 × 64 (검색 결과·추천 목록)
  sm: {
    box: 'h-16 w-11',
    shade: 'w-[3px]',
    title: 'top-[7px] left-[7px] w-8 text-[7px] leading-[9px]',
    imprint: 'bottom-2 left-[7px] h-0.5 w-3',
  },
  // 64 × 93 (홈 가로 목록)
  md: {
    box: 'h-[93px] w-16',
    shade: 'w-[4.4px]',
    title: 'top-[10px] left-[10px] w-[46.5px] text-[10.2px] leading-[13px]',
    imprint: 'bottom-[11.6px] left-[10px] h-[3px] w-[17.5px]',
  },
};

/** 표지 이미지 대신 대표색 + 제목으로 그리는 표지 (Figma BookCover) */
export function BookCoverArt({ title, color, size = 'sm', className }: BookCoverArt.Props) {
  const light = isLightColor(color);
  const style = SIZE[size];

  return (
    <div
      aria-hidden
      style={{ backgroundColor: color }}
      className={cn('relative shrink-0 overflow-hidden', style.box, className)}
    >
      <span className={cn('absolute inset-y-0 left-0 bg-black/20', style.shade)} />
      <span
        className={cn(
          'absolute font-bold',
          light ? 'text-print-ink' : 'text-print-paper',
          style.title,
        )}
      >
        {title}
      </span>
      <span className={cn('absolute', light ? 'bg-print-ink' : 'bg-print-paper', style.imprint)} />
    </div>
  );
}

export namespace BookCoverArt {
  export type Props = {
    title: string;
    /** 표지 대표색 (hex) */
    color: string;
    size?: 'sm' | 'md';
    className?: string;
  };
}
