import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
import { bankAccountsService } from '../../../../../app/services/bankAccountsService';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toogleValuesVisibility, openNewBankAccountModal } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { data = [], isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountsService.getAll,
  });

  const currentBalance = useMemo(() => {
    if (!data) {
      return 0;
    }

    return data.reduce((total, account) => total + account.currentBalance, 0);
  }, [data]);

  return {
    isLoading: isFetching,
    accounts: data,
    sliderState,
    windowWidth,
    currentBalance,
    areValuesVisible,
    setSliderState,
    toogleValuesVisibility,
    openNewBankAccountModal,
  };
}
