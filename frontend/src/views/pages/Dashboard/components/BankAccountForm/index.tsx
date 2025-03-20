import { Controller } from 'react-hook-form';
import { BankAccount } from '../../../../../app/entities/BankAccount';
import { Button } from '../../../../components/Button';
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Select } from '../../../../components/Select';
import {
  BankAccountFormData,
  useBankAccountFormController,
} from './useBankAccountFormController';

interface BankAccountFormProps {
  isLoading: boolean;
  account?: BankAccount;
  onSubmit(data: BankAccountFormData): Promise<void>;
  buttonLabel: string;
}

export function BankAccountForm({
  buttonLabel,
  isLoading,
  account,
  onSubmit,
}: BankAccountFormProps) {
  const { control, errors, handleSubmit, register } =
    useBankAccountFormController({ account, onSubmit });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span className="text-gray-600 text-xs tracking-[-0.5px]">
          Saldo inicial
        </span>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
          <Controller
            control={control}
            name="initialBalance"
            defaultValue={0}
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                value={value}
                onChange={onChange}
                error={errors.initialBalance?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Nome da conta"
          {...register('name')}
          error={errors.name?.message}
        />

        <Controller
          control={control}
          name="type"
          defaultValue="CHECKING"
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder="Tipo"
              onChange={onChange}
              value={value}
              error={errors.type?.message}
              options={[
                {
                  value: 'CHECKING',
                  label: 'Conta corrente',
                },
                {
                  value: 'INVESTMENT',
                  label: 'Investimentos',
                },
                {
                  value: 'CASH',
                  label: 'Dinheiro físico',
                },
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name="color"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <ColorsDropdownInput
              onChange={onChange}
              value={value}
              error={errors.color?.message}
            />
          )}
        />
      </div>

      <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
        {buttonLabel}
      </Button>
    </form>
  );
}
