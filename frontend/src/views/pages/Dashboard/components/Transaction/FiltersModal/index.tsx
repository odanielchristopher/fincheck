import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { cn } from '../../../../../../app/utils/cn';
import { Button } from '../../../../../components/Button';
import { Modal } from '../../../../../components/Modal';
import { useFiltersModal } from './useFiltersModal';

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
}

const mockedBankAccounts = [
  {
    id: '123',
    name: 'Nubank',
  },
  {
    id: '132',
    name: 'XP investimentos',
  },
  {
    id: '153',
    name: 'Dinheiro',
  },
];

export function FiltersModal({ open, onClose }: FiltersModalProps) {
  const {
    selectedYear,
    selectedBankAccountId,
    handleChangeYear,
    handleSelectBankAccount,
  } = useFiltersModal();

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div>
        <span className="text-lg font-bold tracking-[-1px] text-gray-800">
          Conta
        </span>

        <div className="space-y-2 mt-2">
          {mockedBankAccounts.map((bankAccount) => (
            <button
              key={bankAccount.id}
              onClick={() => handleSelectBankAccount(bankAccount.id)}
              className={cn(
                'p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors',
                selectedBankAccountId === bankAccount.id && '!bg-gray-200',
              )}
            >
              {bankAccount.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg font-bold tracking-[-1px]">Ano</span>

        <div className="mt-2 w-52 flex items-center justify-between">
          <button
            onClick={() => handleChangeYear(-1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">
              {selectedYear}
            </span>
          </div>

          <button
            onClick={() => handleChangeYear(1)}
            className="w-12 h-12 flex items-center justify-center"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button className="w-full mt-10">Aplicar filtros</Button>
    </Modal>
  );
}
