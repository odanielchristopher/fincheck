import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { Transaction } from '../../../../../app/entities/Transaction';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { transactionsService } from '../../../../../app/services/transactionsService';
import { UpdateTransactionParams } from '../../../../../app/services/transactionsService/update';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';

const transactionSchema = z.object({
  value: z.union([z.string().nonempty('Valor é obrigatório.'), z.number()]),
  name: z.string().nonempty('Nome é obrigatório.'),
  categoryId: z.string().nonempty('Categoria é obrigatória.'),
  bankAccountId: z.string().nonempty('Conta é obrigatória.'),
  date: z.date(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export function useEditTransactionModalController(
  transactionBeingEdited: Transaction,
  onClose: () => void,
) {
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => transactionBeingEdited.type === category.type,
    );
  }, [categoriesList, transactionBeingEdited]);

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      name: transactionBeingEdited.name,
      value: transactionBeingEdited.value,
      date: new Date(transactionBeingEdited.date),
      bankAccountId: transactionBeingEdited.bankAccountId,
      categoryId: transactionBeingEdited.category?.id,
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: updateTransaction, isPending: isLoading } = useMutation({
    mutationFn: (data: UpdateTransactionParams) =>
      transactionsService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
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
  });

  return {
    errors,
    accounts,
    isLoading,
    categories,
    control,
    register,
    handleSubmit,
  };
}
