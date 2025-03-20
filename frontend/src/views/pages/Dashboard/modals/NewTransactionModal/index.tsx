import { Modal } from '../../../../components/Modal';
import { TransactionForm } from '../../components/TransactionForm';
import { useNewTransactionModalController } from './useNewTransactionModalController';

export function NewTransactionModal() {
  const {
    isLoading,
    newTransactionType,
    isNewTransactionModalOpen,
    handleSubmit,
    closeNewTransactionModal,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <TransactionForm
        buttonLabel="Criar"
        isLoading={isLoading}
        transactionType={newTransactionType ? newTransactionType : 'EXPENSE'}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
