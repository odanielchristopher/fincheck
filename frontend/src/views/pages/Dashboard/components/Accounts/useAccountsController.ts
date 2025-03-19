import { useState } from 'react';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toogleValuesVisibility, openNewBankAccountModal } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    isLoading: false,
    accounts: [],
    sliderState,
    windowWidth,
    areValuesVisible,
    setSliderState,
    toogleValuesVisibility,
    openNewBankAccountModal,
  };
}
