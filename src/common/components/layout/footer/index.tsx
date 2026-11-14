import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { ICONS } from '@/common/assets';
import { SvgIcon } from '@/common/components/ui';
import { cn } from '@/common/utils';

/** 하단 탭 바 (Figma BottomNav · Active: Search | Map) */
export function Footer({ selected }: Footer.Props) {
  const { t } = useTranslation('common');

  const tabs = [
    { key: 'search', to: '/', icon: ICONS.search.src, label: t('search') },
    { key: 'map', to: '/floor', icon: ICONS.map.src, label: t('map') },
  ] as const;

  return (
    <footer className="border-ink bg-paper grid h-16 w-full grid-cols-2 border-t">
      {tabs.map((tab) => {
        const active = tab.key === selected;
        return (
          <Link
            key={tab.key}
            to={tab.to}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'border-ink flex flex-col items-center justify-center gap-1',
              active ? 'text-ink border-t-3' : 'text-sub',
            )}
          >
            <SvgIcon src={tab.icon} size={22} />
            <span className={cn('text-meta', active ? 'font-bold' : 'font-medium')}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </footer>
  );
}

export namespace Footer {
  export type Props = {
    selected?: 'search' | 'map';
  };
}
