import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { BankAccount } from '../../../../../app/entities/BankAccount';

const bankAccountSchema = z.object({
  initialBalance: z.union([
    z.string().nonempty('Saldo inicial é obrigatório.'),
    z.number(),
  ]),
  name: z.string().nonempty('Nome da conta é obrigatório.'),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória.'),
});

export type BankAccountFormData = z.infer<typeof bankAccountSchema>;

interface UseBankAccountFormControllerProps {
  account?: BankAccount;
  onSubmit(data: BankAccountFormData): Promise<void>;
}

export function useBankAccountFormController({
  account,
  onSubmit,
}: UseBankAccountFormControllerProps) {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      initialBalance: account?.initialBalance,
      name: account?.name,
      color: account?.color,
      type: account?.type,
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    await onSubmit(data);
  });


  return {
    errors,
    control,
    register,
    handleSubmit,
  };
}
