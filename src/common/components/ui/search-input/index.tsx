import { Search } from 'lucide-react';

import { cn } from '@/common/utils';

import { IconButton } from '../icon-button';

export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  className,
}: SearchInput.Props) {
  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(value);
      }}
      className={cn(
        'bg-surface-alt flex h-12 w-full items-center rounded-full pr-1 pl-5',
        className,
      )}
    >
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="text-body text-ink placeholder:text-muted min-w-0 flex-1 bg-transparent outline-hidden [&::-webkit-search-cancel-button]:hidden"
      />
      <IconButton
        icon={Search}
        label={placeholder ?? 'Search'}
        variant="surface"
        size="sm"
        type="submit"
      />
    </form>
  );
}

export namespace SearchInput {
  export type Props = {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: (value: string) => void;
    placeholder?: string;
    className?: string;
  };
}
