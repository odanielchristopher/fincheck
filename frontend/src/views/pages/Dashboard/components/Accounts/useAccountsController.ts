import { useMemo, useState } from 'react';

import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toogleValuesVisibility, openNewBankAccountModal } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isLoading } = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0);
  }, [accounts]);

  return {
    isLoading,
    accounts,
    sliderState,
    windowWidth,
    currentBalance,
    areValuesVisible,
    setSliderState,
    toogleValuesVisibility,
    openNewBankAccountModal,
  };
}
