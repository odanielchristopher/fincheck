import * as RdxPopover from '@radix-ui/react-popover';

interface PopoverTriggerProps extends RdxPopover.PopoverTriggerProps {
  children: React.ReactNode;
}

export function PopoverTrigger({ children, ...props }: PopoverTriggerProps) {
  return (
    <RdxPopover.Trigger className="outline-none" {...props}>
      {children}
    </RdxPopover.Trigger>
  );
}
