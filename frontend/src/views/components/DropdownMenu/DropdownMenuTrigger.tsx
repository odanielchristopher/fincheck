import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';

interface DropdownMenuTriggerProps extends RdxDropdownMenu.DropdownMenuTriggerProps {
  children: React.ReactNode;
}

export function DropdownMenuTrigger({ children, ...props }: DropdownMenuTriggerProps) {
  return (
    <RdxDropdownMenu.Trigger className="outline-none" {...props}>
      {children}
    </RdxDropdownMenu.Trigger>
  );
}
