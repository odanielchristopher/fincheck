import { Controller } from 'react-hook-form';
import { Transaction } from '../../../../../app/entities/Transaction';
import { TrashIcon } from '../../../../assets/icons/TrashIcon';
import { Button } from '../../../../components/Button';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal';
import { DatePickerInput } from '../../../../components/DatePickerInput';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useEditTransactionModalController } from './useEditTransactionModalController';

interface EditTransactionModalProps {
  transaction: Transaction;
  open: boolean;
  onClose(): void;
}

export function EditTransactionModal({
  open,
  transaction,
  onClose,
}: EditTransactionModalProps) {
  const {
    control,
    errors,
    categories,
    isLoading,
    accounts,
    isDeleteModalOpen,
    isLoadingDelete,
    register,
    handleSubmit,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction.type === 'EXPENSE';

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        open
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteTransaction}
        title={
          isExpense
            ? "Tem certeza que deseja excluir esta despesa?"
            : "Tem certeza que deseja excluir esta receita?"
        }
        onClose={handleCloseDeleteModal}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      open={open}
      onClose={onClose}
      rightAction={
        <button
          onClick={handleOpenDeleteModal}
          className="w-full h-full rounded-full flex items-center justify-center"
        >
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
    >
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
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
