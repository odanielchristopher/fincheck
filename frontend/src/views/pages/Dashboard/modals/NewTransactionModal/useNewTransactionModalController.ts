import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { transactionsService } from '../../../../../app/services/transactionsService';
import { CreateTransactionParams } from '../../../../../app/services/transactionsService/create';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

const transactionSchema = z.object({
  value: z.string().nonempty('Valor é obrigatório.'),
  name: z.string().nonempty('Nome é obrigatório.'),
  categoryId: z.string().nonempty('Categoria é obrigatória.'),
  bankAccountId: z.string().nonempty('Conta é obrigatória.'),
  date: z.date(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

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

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync: createTransaction, isPending: isLoading } = useMutation({
    mutationFn: (data: CreateTransactionParams) =>
      transactionsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    }
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await createTransaction({
        ...data,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
        type: newTransactionType!,
      });

      reset();
      closeNewTransactionModal();
      toast.success('Transação criada com sucesso!');
    } catch {
      toast.error('Erro ao cadastrar transação!');
    }
  });

  return {
    errors,
    accounts,
    isLoading,
    categories,
    control,
    newTransactionType,
    isNewTransactionModalOpen,
    register,
    handleSubmit,
    closeNewTransactionModal,
  };
}
