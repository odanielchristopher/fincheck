import { ChevronDownIcon } from '@radix-ui/react-icons';
import { ExpensesIcon } from '../../../../assets/icons/ExpensesIcon';
import { IncomeIcon } from '../../../../assets/icons/IncomeIcon';
import { TransactionsIcon } from '../../../../assets/icons/TransactionsIcon';
import { DropdownMenu } from '../../../../components/DropdownMenu';

export function TransactionTypeDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2">
          <TransactionsIcon />
          <span className="text-sm text-gray-800 font-medium tracking-[-0.5px]">
            Transações
          </span>

          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px]">
        <DropdownMenu.Item className="gap-2">
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2">
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2">
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
