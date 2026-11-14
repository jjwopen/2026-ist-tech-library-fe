import { cn } from '@/common/utils';

const SIZE_CLASS: Record<Avatar.Size, string> = {
  sm: 'size-8 text-tiny',
  md: 'size-10 text-label',
  lg: 'size-12 text-label',
};

export function Avatar({ src, name, size = 'md', className }: Avatar.Props) {
  return (
    <span
      className={cn(
        'bg-surface-alt text-muted inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        SIZE_CLASS[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        <span aria-label={name}>{getInitials(name)}</span>
      )}
    </span>
  );
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

export namespace Avatar {
  export type Size = 'sm' | 'md' | 'lg';

  export type Props = {
    src?: string;
    /** 대체 텍스트 및 이미지가 없을 때 이니셜로 사용 */
    name: string;
    size?: Size;
    className?: string;
  };
}
