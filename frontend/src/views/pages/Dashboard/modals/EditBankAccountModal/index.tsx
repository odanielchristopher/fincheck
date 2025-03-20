import { Controller } from 'react-hook-form';
import { TrashIcon } from '../../../../assets/icons/TrashIcon';
import { Button } from '../../../../components/Button';
import { ColorsDropdownInput } from '../../../../components/ColorsDropdownInput';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal';
import { Input } from '../../../../components/Input';
import { InputCurrency } from '../../../../components/InputCurrency';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useEditBankAccountModalController } from './useEditBankAccountModalController';

export function EditBankAccountModal() {
  const {
    errors,
    control,
    isLoading,
    isLoadingDelete,
    isEditBankAccountModalOpen,
    isDeleteModalVisible,
    register,
    handleSubmit,
    handleDeleteBankAccount,
    closeEditBankAccountModal,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  } = useEditBankAccountModalController();

  if (isDeleteModalVisible) {
    return (
      <ConfirmDeleteModal
        open
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteBankAccount}
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de
          receita e despesa relacionados."
        onClose={handleCloseDeleteModal}
      />
    );
  }

  return (
    <Modal
      title="Editar conta"
      open={isEditBankAccountModalOpen}
      onClose={closeEditBankAccountModal}
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
          Criar
        </Button>
      </form>
    </Modal>
  );
}
