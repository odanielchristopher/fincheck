import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { bankAccountsService } from '../../../../../app/services/bankAccountsService';
import { CreateBankAccountParams } from '../../../../../app/services/bankAccountsService/create';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { BankAccountFormData } from '../../components/BankAccountForm/useBankAccountFormController';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

export function useNewBankAccountModalController() {
  const { isNewBankAccountModalOpen, closeNewBankAccountModal } =
    useDashboard();

  const queryClient = useQueryClient();

  const { mutateAsync: createBankAccount, isPending: isLoading } = useMutation({
    mutationFn: (data: CreateBankAccountParams) =>
      bankAccountsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bankAccounts'],
      });
    },
  });

  async function handleSubmit(data: BankAccountFormData) {
    try {
      await createBankAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      closeNewBankAccountModal();
      toast.success('Conta foi criada com sucesso!');
    } catch {
      toast.error('Erro ao cadastrar a conta!');
    }
  }

  return {
    isLoading,
    isNewBankAccountModalOpen,
    handleSubmit,
    closeNewBankAccountModal,
  };
}
