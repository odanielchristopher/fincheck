import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Transaction } from '../../../../../app/entities/Transaction';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useCategories } from '../../../../../app/hooks/useCategories';

const transactionSchema = z.object({
  value: z.union([z.string().nonempty('Valor é obrigatório.'), z.number()]),
  name: z.string().nonempty('Nome é obrigatório.'),
  categoryId: z.string().nonempty('Categoria é obrigatória.'),
  bankAccountId: z.string().nonempty('Conta é obrigatória.'),
  date: z.date(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

interface UseTransactionFormControllerProps {
  transactionBeingEdited?: Transaction;
  transactionType: Transaction['type'];
  onSubmit(data: TransactionFormData): Promise<void>;
}

export function useTransactionFormController({
  transactionBeingEdited,
  transactionType,
  onSubmit,
}: UseTransactionFormControllerProps) {
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => transactionType === category.type,
    );
  }, [categoriesList, transactionType]);

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      name: transactionBeingEdited?.name,
      value: transactionBeingEdited?.value,
      date: transactionBeingEdited
        ? new Date(transactionBeingEdited.date)
        : new Date(),
      bankAccountId: transactionBeingEdited?.bankAccountId,
      categoryId: transactionBeingEdited?.category?.id,
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    await onSubmit(data);
  });

  return {
    errors,
    accounts,
    categories,
    control,
    register,
    handleSubmit,
  };
}
