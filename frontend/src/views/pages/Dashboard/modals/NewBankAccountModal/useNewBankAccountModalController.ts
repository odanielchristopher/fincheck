import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { bankAccountsService } from '../../../../../app/services/bankAccountsService';
import { CreateBankAccountParams } from '../../../../../app/services/bankAccountsService/create';
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber';
import { useDashboard } from '../../components/DashboardContext/useDashboard';

const bankAccountSchema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório.'),
  name: z.string().nonempty('Nome da conta é obrigatório.'),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória.'),
});

type BankAccountFormData = z.infer<typeof bankAccountSchema>;

export function useNewBankAccountModalController() {
  const { isNewBankAccountModalOpen, closeNewBankAccountModal } =
    useDashboard();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
  });

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

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await createBankAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      reset();
      closeNewBankAccountModal();
      toast.success('Conta foi criada com sucesso!');
    } catch {
      toast.error('Erro ao cadastrar a conta!');
    }
  });

  return {
    errors,
    control,
    isLoading,
    isNewBankAccountModalOpen,
    register,
    handleSubmit,
    closeNewBankAccountModal,
  };
}
