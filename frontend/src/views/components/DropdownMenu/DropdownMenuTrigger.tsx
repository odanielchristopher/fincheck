import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DropdownMenuTriggerProps extends RdxDropdownMenu.DropdownMenuTriggerProps {}

export function DropdownMenuTrigger({ children, ...props }: DropdownMenuTriggerProps) {
  return (
    <RdxDropdownMenu.Trigger className="outline-none" {...props}>
      {children}
    </RdxDropdownMenu.Trigger>
  );
}
