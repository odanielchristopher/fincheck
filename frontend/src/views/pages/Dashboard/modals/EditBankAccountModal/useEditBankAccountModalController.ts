import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { bankAccountsService } from '../../../../../app/services/bankAccountsService';
import { UpdateBankAccountParams } from '../../../../../app/services/bankAccountsService/update';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { BankAccountFormData } from '../../components/BankAccountForm/useBankAccountFormController';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

export function useEditBankAccountModalController() {
  const {
    accountBeingEdited,
    isEditBankAccountModalOpen,
    closeEditBankAccountModal,
  } = useDashboard();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: updateBankAccount, isPending: isLoading } = useMutation({
    mutationFn: (data: UpdateBankAccountParams) =>
      bankAccountsService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bankAccounts'],
      });
    },
  });

  const { mutateAsync: removeBankAccount, isPending: isLoadingDelete } =
    useMutation({
      mutationFn: (bankAccountId: string) =>
        bankAccountsService.remove(bankAccountId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['bankAccounts'],
        });
      },
    });

  async function handleSubmit(data: BankAccountFormData) {
    try {
      await updateBankAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });

      closeEditBankAccountModal();
      toast.success('A conta foi editada com sucesso!');
    } catch {
      toast.error('Erro ao salvar a conta!');
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleDeleteBankAccount() {
    try {
      await removeBankAccount(accountBeingEdited!.id);

      handleCloseDeleteModal();
      closeEditBankAccountModal();
      toast.success('A conta foi removida com sucesso!');
    } catch {
      toast.error('Erro ao remover a conta!');
    }
  }

  return {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    isEditBankAccountModalOpen,
    accountBeingEdited,
    handleSubmit,
    handleDeleteBankAccount,
    closeEditBankAccountModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}
