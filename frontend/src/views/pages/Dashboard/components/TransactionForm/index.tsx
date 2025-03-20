import { Controller } from 'react-hook-form';

import { Button } from '../../../../components/Button';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Select } from '../../../../components/Select';

import { Transaction } from '../../../../../app/entities/Transaction';

import {
  TransactionFormData,
  useTransactionFormController,
} from './useTransactionFormController';

interface TransactionFormProps {
  isLoading: boolean;
  transactionBeingEdited?: Transaction;
  transactionType: Transaction['type'];
  buttonLabel: string;
  onSubmit(data: TransactionFormData): Promise<void>;
}

export function TransactionForm({
  isLoading,
  transactionBeingEdited,
  transactionType,
  buttonLabel,
  onSubmit,
}: TransactionFormProps) {
  const { accounts, categories, control, errors, register, handleSubmit } =
    useTransactionFormController({
      transactionBeingEdited,
      transactionType,
      onSubmit,
    });

  const isExpense = transactionType === 'EXPENSE';

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span className="text-gray-600 text-xs tracking-[-0.5px]">
          Valor {isExpense ? 'da despesa' : 'da receita'}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
          <Controller
            control={control}
            name="value"
            defaultValue="0"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                value={value}
                onChange={onChange}
                error={errors.value?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <Input
          type="text"
          placeholder={isExpense ? 'Nome da despesa' : 'Nome da receita'}
          error={errors.name?.message}
          {...register('name')}
        />

        <Controller
          control={control}
          name="categoryId"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder="Categoria"
              onChange={onChange}
              value={value}
              error={errors.categoryId?.message}
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            />
          )}
        />

        <Controller
          control={control}
          name="bankAccountId"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder={isExpense ? 'Pagar com' : 'Receber com'}
              onChange={onChange}
              value={value}
              error={errors.bankAccountId?.message}
              options={accounts.map((account) => ({
                value: account.id,
                label: account.name,
              }))}
            />
          )}
        />

        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <DatePickerInput
              value={value}
              onChange={onChange}
              error={errors.date?.message}
            />
          )}
        />
      </div>

      <Button className="w-full mt-6" type="submit" isLoading={isLoading}>
        {buttonLabel}
      </Button>
    </form>
  );
}
