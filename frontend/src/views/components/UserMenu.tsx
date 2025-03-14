import { ExitIcon } from '@radix-ui/react-icons';
import { useAuth } from '../../app/hooks/useAuth';
import { DropdownMenu } from './DropdownMenu';

export function UserMenu() {
  const { signout } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100">
          <span className="text-sm tracking-[-0.5px] font-medium text-teal-900">
            DA
          </span>
        </div>
      </DropdownMenu.Trigger>

        <DropdownMenu.Content className="w-32" align="end">
          <DropdownMenu.Item onSelect={signout} className="flex items-center justify-between gap-2">
            Sair

            <ExitIcon className="w-6 h-6" />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
