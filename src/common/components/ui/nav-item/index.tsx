import { type LucideIcon } from 'lucide-react';

import { cn } from '@/common/utils';

export function NavItem({ icon: Icon, label, active = false, onClick, className }: NavItem.Props) {
  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
      className={cn(
        'text-tiny relative flex h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-colors',
        active ? 'text-ink' : 'text-muted hover:text-ink',
        className,
      )}
    >
      <Icon className="size-5.5" strokeWidth={active ? 2.2 : 1.8} />
      <span className="truncate">{label}</span>
      {active && (
        <span className="bg-primary absolute top-1.5 right-1/2 size-1.5 translate-x-4 rounded-full" />
      )}
    </button>
  );
}

export namespace NavItem {
  export type Props = {
    icon: LucideIcon;
    label: string;
    active?: boolean;
    onClick?: () => void;
    className?: string;
  };
}
