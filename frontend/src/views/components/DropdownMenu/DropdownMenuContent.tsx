import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../../../app/utils/cn';

interface DropdownMenuContentProps
  extends RdxDropdownMenu.DropdownMenuContentProps {
  children: React.ReactNode;
}

export function DropdownMenuContent({
  children,
  className,
  sideOffset,
  ...props
}: DropdownMenuContentProps) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        className={cn(
          'rounded-2xl p-2 bg-white z-50 space-y-1 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
          'data-[side=bottom]:animate-slide-down-and-fade',
          'data-[side=top]:animate-slide-up-and-fade',
          className,
        )}
        sideOffset={sideOffset ?? 4}
        {...props}
      >
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  );
}
