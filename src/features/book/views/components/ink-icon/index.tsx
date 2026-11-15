import { cn } from '@/common/utils';

/** 붓으로 그린 듯한 가는 선 아이콘 — 모두 currentColor */
const PATHS = {
  back: {
    viewBox: '0 0 22 12',
    w: 22,
    h: 12,
    d: 'M21 6.1C15.2 5.8 8.8 6.3 2 6M6.6 1.6C5 3 3.3 4.5 1.5 6c1.8 1.5 3.5 3 5.2 4.6',
  },
  close: {
    viewBox: '0 0 16 16',
    w: 16,
    h: 16,
    d: 'M2 2.2c4 3.9 8 7.9 12.4 12.3M14 2.1c-4 4-8 8-12.4 12.3',
  },
  search: {
    viewBox: '0 0 20 20',
    w: 20,
    h: 20,
    d: 'M9 3.3c3.5-.2 5.9 2.4 5.7 5.7-.2 3.3-2.8 5.6-6 5.5-3.3-.2-5.6-2.8-5.4-6C3.5 5.4 5.8 3.5 9 3.3m4.2 10.1c1.4 1.4 2.6 2.6 4 4',
  },
  arrow: {
    viewBox: '0 0 30 16',
    w: 32,
    h: 17,
    d: 'M1.2 8.2C9 7.6 18 7.7 28 8M20 1.6c2.9 2 5.6 4.3 8.2 6.4-2.6 2.1-5.3 4.3-8 6.4',
  },
  shelf: {
    viewBox: '0 0 24 24',
    w: 22,
    h: 22,
    d: 'M3 20.4c6-.3 12 .2 18-.1M5 20V9.6M8 20V7M16 20V8M19 20v-9.4M12 20V5.4',
  },
} as const;

export function InkIcon({ name, className }: InkIcon.Props) {
  const icon = PATHS[name];
  return (
    <svg
      viewBox={icon.viewBox}
      width={icon.w}
      height={icon.h}
      aria-hidden
      className={cn('p-ink', className)}
    >
      <path d={icon.d} />
    </svg>
  );
}

export namespace InkIcon {
  export type Props = {
    name: keyof typeof PATHS;
    className?: string;
  };
}
