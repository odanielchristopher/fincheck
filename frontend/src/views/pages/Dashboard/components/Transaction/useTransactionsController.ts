import { useDashboard } from '../DashboardContext/useDashboard';

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  return {
    isInitialLoading: false,
    isLoading: false,
    areValuesVisible,
    transactions: [],
  };
}
