
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { Transaction } from '../../../../../app/entities/Transaction';

import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';

import { transactionsService } from '../../../../../app/services/transactionsService';
import { UpdateTransactionParams } from '../../../../../app/services/transactionsService/update';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

import { TransactionFormData } from '../../components/TransactionForm/useTransactionFormController';


export function useEditTransactionModalController(
  transactionBeingEdited: Transaction,
  onClose: () => void,
) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => transactionBeingEdited.type === category.type,
    );
  }, [categoriesList, transactionBeingEdited]);

  const queryClient = useQueryClient();

  const { mutateAsync: updateTransaction, isPending: isLoading } = useMutation({
    mutationFn: (data: UpdateTransactionParams) =>
      transactionsService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    },
  });

  const { mutateAsync: removeTransaction, isPending: isLoadingDelete } = useMutation({
    mutationFn: (transactionId: string) =>
      transactionsService.remove(transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    },
  });

  async function handleSubmit(data: TransactionFormData) {
    try {
      await updateTransaction({
        ...data,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
        type: transactionBeingEdited.type,
        id: transactionBeingEdited.id,
      });

      toast.success(
        transactionBeingEdited.type === 'EXPENSE'
          ? 'A despesa foi salva com sucesso!'
          : 'A receita foi salva com sucesso!'
      );
      onClose();
    } catch {
      toast.error(
        transactionBeingEdited.type === 'EXPENSE'
          ? 'Erro ao salvar a despesa!'
          : 'Erro ao salvar a receita!'
      );
    }
  };

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transactionBeingEdited.id);

      handleCloseDeleteModal();
      onClose();
      toast.success(
        transactionBeingEdited.type === 'EXPENSE'
          ? 'Despesa removida com sucesso!'
          : 'Receita removida com sucesso!'
      );
    } catch {
      toast.error(
        transactionBeingEdited.type === 'EXPENSE'
          ? 'Erro ao remover a despesa!'
          : 'Erro ao remover a receita!'
      );
    }
  }

  return {
    accounts,
    isLoading,
    categories,
    isDeleteModalOpen,
    isLoadingDelete,
    handleSubmit,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
  };
}
