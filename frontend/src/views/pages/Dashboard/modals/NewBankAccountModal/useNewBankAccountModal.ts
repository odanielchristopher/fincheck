import { useDashboard } from '../../components/DashboardContext/useDashboard';

export function useNewBankAccountModal() {
  const { isNewBankAccountModalOpen, closeNewBankAccountModal } =
    useDashboard();

  return { isNewBankAccountModalOpen, closeNewBankAccountModal };
}
