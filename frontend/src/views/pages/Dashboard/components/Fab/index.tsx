import { PlusIcon } from '@radix-ui/react-icons';
import { BankAccountIcon } from '../../../../assets/icons/BankAccountIcon';
import { CategoryIcon } from '../../../../assets/icons/categories/CategoryIcon';
import { DropdownMenu } from '../../../../components/DropdownMenu';
import { useDashboard } from '../DashboardContext/useDashboard';

export function Fab() {
  const { openNewBankAccountModal } = useDashboard();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="fixed right-4 bottom-4 bg-teal-900 text-white p-3 rounded-full flex items-center justify-center hover:bg-teal-900/90 transition-colors">
          <PlusIcon className="w-6 h-6" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content side="top" align="end">
        <DropdownMenu.Item className="gap-2 justify-start">
          <CategoryIcon type="income" />
          Nova receitas
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2 justify-start">
          <CategoryIcon type="expense" />
          Nova despesas
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="gap-2 justify-start"
          onSelect={openNewBankAccountModal}
        >
          <BankAccountIcon />
          Nova conta
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
