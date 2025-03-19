import * as RdxPopover from '@radix-ui/react-popover';
import { cn } from '../../../app/utils/cn';

interface PopoverContentProps
  extends RdxPopover.PopoverContentProps {
  children: React.ReactNode;
}

export function PopoverContent({
  children,
  className,
  ...props
}: PopoverContentProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        className={cn(
          'rounded-2xl p-2 bg-white z-[99] space-y-1 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
          'data-[side=bottom]:animate-slide-down-and-fade',
          'data-[side=top]:animate-slide-up-and-fade',
          className,
        )}
        {...props}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}
