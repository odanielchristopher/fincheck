import { Transaction } from '../../../../../app/entities/Transaction';
import { TrashIcon } from '../../../../assets/icons/TrashIcon';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal';
import { Modal } from '../../../../components/Modal';
import { TransactionForm } from '../../components/TransactionForm';
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
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
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
      <TransactionForm
        isLoading={isLoading}
        onSubmit={handleSubmit}
        transactionType={transaction.type}
        transaction={transaction}
        buttonLabel="Salvar"
      />
    </Modal>
  );
}
