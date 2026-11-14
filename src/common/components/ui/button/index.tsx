import { type ButtonHTMLAttributes } from 'react';

import { cn } from '@/common/utils';

const VARIANT_CLASS: Record<Button.Variant, string> = {
  primary: 'bg-ink text-paper px-4',
  outline: 'bg-paper border-ink text-ink border-[1.5px] px-4',
  rec: 'bg-rec px-4 text-white',
  'rec-outline': 'bg-paper border-rec text-rec border-[1.5px] px-4',
  text: 'text-ink text-small font-bold',
};

/** `<Link>` 등 다른 요소에 버튼 스타일만 입힐 때 사용 */
export function buttonClass({
  variant = 'primary',
  size = 'md',
  className,
}: Button.StyleProps = {}) {
  return cn(
    'text-sm inline-flex shrink-0 items-center justify-center font-bold whitespace-nowrap transition-opacity hover:opacity-85 disabled:opacity-40',
    size === 'lg' ? 'h-12' : 'h-11',
    VARIANT_CLASS[variant],
    className,
  );
}

export function Button({ variant, size, className, type = 'button', ...rest }: Button.Props) {
  return <button type={type} className={buttonClass({ variant, size, className })} {...rest} />;
}

export namespace Button {
  export type Variant = 'primary' | 'outline' | 'rec' | 'rec-outline' | 'text';

  export type StyleProps = {
    variant?: Variant;
    /** md: 44px, lg: 48px */
    size?: 'md' | 'lg';
    className?: string;
  };

  export type Props = StyleProps & ButtonHTMLAttributes<HTMLButtonElement>;
}
