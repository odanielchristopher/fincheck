import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { transactionsService } from '../../../../../app/services/transactionsService';
import { CreateTransactionParams } from '../../../../../app/services/transactionsService/create';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { useDashboard } from '../../components/DashboardContext/useDashboard';
import { TransactionFormData } from '../../components/TransactionForm/useTransactionFormController';


export function useNewTransactionModalController() {
  const {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  } = useDashboard();

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => newTransactionType === category.type,
    );
  }, [categoriesList, newTransactionType]);


  const queryClient = useQueryClient();

  const { mutateAsync: createTransaction, isPending: isLoading } = useMutation({
    mutationFn: (data: CreateTransactionParams) =>
      transactionsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    }
  });

  async function handleSubmit(data: TransactionFormData) {
    try {
      await createTransaction({
        ...data,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
        type: newTransactionType!,
      });

      toast.success(
        newTransactionType === 'EXPENSE'
        ? 'Despesa cadastrada com sucesso!'
        : 'Receita cadastrada com sucesso!'
      );
      closeNewTransactionModal();
    } catch {
      toast.error(
        newTransactionType === 'EXPENSE'
          ? 'Erro ao cadastrar despesa!'
          : 'Erro ao cadastrar receita!'
      );
    }
  }

  return {
    accounts,
    isLoading,
    categories,
    newTransactionType,
    isNewTransactionModalOpen,
    handleSubmit,
    closeNewTransactionModal,
  };
}
