import { useDashboard } from '../DashboardContext/useDashboard';

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  return {
    isLoading: false,
    areValuesVisible,
  };
}
