import { type CSSProperties } from 'react';

import { cn } from '@/common/utils';

/**
 * SVG 에셋을 마스크로 그려 `currentColor`를 따르게 하는 아이콘.
 * 활성/비활성처럼 색이 바뀌는 자리에서 원본 도형을 그대로 재사용합니다.
 */
export function SvgIcon({ src, size, label, className }: SvgIcon.Props) {
  const style: CSSProperties = {
    width: size,
    height: size,
    maskImage: `url("${src}")`,
    WebkitMaskImage: `url("${src}")`,
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
  };

  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={style}
      className={cn('inline-block shrink-0 bg-current', className)}
    />
  );
}

export namespace SvgIcon {
  export type Props = {
    src: string;
    /** 렌더 크기(px) */
    size: number;
    /** 의미가 있는 아이콘일 때만 지정 */
    label?: string;
    className?: string;
  };
}
