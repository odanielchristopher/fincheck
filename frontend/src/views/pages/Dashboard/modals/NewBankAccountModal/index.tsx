import { Modal } from '../../../../components/Modal';
import { BankAccountForm } from '../../components/BankAccountForm';
import { useNewBankAccountModalController } from './useNewBankAccountModalController';

export function NewBankAccountModal() {
  const {
    isLoading,
    isNewBankAccountModalOpen,
    handleSubmit,
    closeNewBankAccountModal,
  } = useNewBankAccountModalController();

  return (
    <Modal
      title="Nova conta"
      open={isNewBankAccountModalOpen}
      onClose={closeNewBankAccountModal}
    >
      <BankAccountForm
        buttonLabel="Criar"
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
