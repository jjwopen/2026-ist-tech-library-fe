import { type LucideIcon } from 'lucide-react';

import { cn } from '@/common/utils';

export function IconButton({
  icon: Icon,
  label,
  variant = 'ghost',
  size = 'md',
  badge = false,
  onClick,
  type = 'button',
  className,
}: IconButton.Props) {
  return (
    <button
      type={type}
      aria-label={label}
      onClick={onClick}
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full transition-colors',
        size === 'sm' ? 'size-10' : 'size-11',
        variant === 'solid' && 'bg-ink text-on-ink hover:opacity-85',
        variant === 'surface' && 'bg-surface text-ink hover:bg-surface-alt shadow-sm',
        variant === 'ghost' && 'text-ink hover:bg-surface-alt',
        className,
      )}
    >
      <Icon className={size === 'sm' ? 'size-4' : 'size-5'} strokeWidth={2} />
      {badge && (
        <span className="bg-primary border-surface absolute top-0 right-0 size-3 rounded-full border-2" />
      )}
    </button>
  );
}

export namespace IconButton {
  export type Props = {
    icon: LucideIcon;
    /** 접근성 레이블 (aria-label) */
    label: string;
    variant?: 'solid' | 'surface' | 'ghost';
    size?: 'sm' | 'md';
    /** 우측 상단 알림 점 표시 */
    badge?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit';
    className?: string;
  };
}
