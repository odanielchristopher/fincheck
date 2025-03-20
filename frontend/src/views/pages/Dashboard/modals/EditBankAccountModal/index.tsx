import { TrashIcon } from '../../../../assets/icons/TrashIcon';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal';
import { Modal } from '../../../../components/Modal';
import { BankAccountForm } from '../../components/BankAccountForm';
import { useEditBankAccountModalController } from './useEditBankAccountModalController';

export function EditBankAccountModal() {
  const {
    isLoading,
    isLoadingDelete,
    isEditBankAccountModalOpen,
    isDeleteModalVisible,
    handleSubmit,
    accountBeingEdited,
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
      <BankAccountForm
        buttonLabel="Salvar"
        isLoading={isLoading}
        account={accountBeingEdited ?? undefined}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
