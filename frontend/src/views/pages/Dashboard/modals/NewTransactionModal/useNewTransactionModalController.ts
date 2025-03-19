import { useDashboard } from '../../components/DashboardContext/useDashboard';

export function useNewTransactionModalController() {
  const {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  } = useDashboard();

  return {
    newTransactionType,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
  };
}
