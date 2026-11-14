import { cn } from '@/common/utils';

/** 정사각형 마커 + 라벨 (대출 가능 / 대출 중 등) */
export function StatusMark({ label, active = true, className }: StatusMark.Props) {
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-1.5', className)}>
      <span
        aria-hidden
        className={cn('border-ink size-2 shrink-0 border', active ? 'bg-ink' : 'bg-paper')}
      />
      <span
        className={cn('text-meta font-medium whitespace-nowrap', active ? 'text-ink' : 'text-sub')}
      >
        {label}
      </span>
    </span>
  );
}

export namespace StatusMark {
  export type Props = {
    label: string;
    /** false면 빈 마커 + 보조색 텍스트 */
    active?: boolean;
    className?: string;
  };
}
