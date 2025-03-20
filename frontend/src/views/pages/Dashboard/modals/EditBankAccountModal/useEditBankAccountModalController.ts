import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { bankAccountsService } from '../../../../../app/services/bankAccountsService';
import { UpdateBankAccountParams } from '../../../../../app/services/bankAccountsService/update';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

const bankAccountSchema = z.object({
  initialBalance: z.union([
    z.string().nonempty('Saldo inicial é obrigatório.'),
    z.number(),
  ]),
  name: z.string().nonempty('Nome da conta é obrigatório.'),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória.'),
});

type BankAccountFormData = z.infer<typeof bankAccountSchema>;

export function useEditBankAccountModalController() {
  const {
    accountBeingEdited,
    isEditBankAccountModalOpen,
    closeEditBankAccountModal,
  } = useDashboard();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      initialBalance: accountBeingEdited?.initialBalance,
      name: accountBeingEdited?.name,
      color: accountBeingEdited?.color,
      type: accountBeingEdited?.type,
    },
  });

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

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await updateBankAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });

      reset();
      closeEditBankAccountModal();
      toast.success('A conta foi editada com sucesso!');
    } catch {
      toast.error('Erro ao salvar a conta!');
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleDeleteBankAccount() {
    try {
      await removeBankAccount(accountBeingEdited!.id);

      reset();
      handleCloseDeleteModal();
      closeEditBankAccountModal();
      toast.success('A conta foi removida com sucesso!');
    } catch {
      toast.error('Erro ao remover a conta!');
    }
  }

  return {
    errors,
    control,
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    isEditBankAccountModalOpen,
    register,
    handleSubmit,
    handleDeleteBankAccount,
    closeEditBankAccountModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}
