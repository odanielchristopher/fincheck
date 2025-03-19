import { useDashboard } from '../../components/DashboardContext/useDashboard';

export function useNewBankAccountModalController() {
  const { isNewBankAccountModalOpen, closeNewBankAccountModal } =
    useDashboard();

  return { isNewBankAccountModalOpen, closeNewBankAccountModal };
}
