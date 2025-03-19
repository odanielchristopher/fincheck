/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useState } from 'react';
import { localStorageKeys } from '../../../../../app/config/localStorageKeys';

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewBankAccountModalOpen: boolean;
  toogleValuesVisibility(): void;
  openNewBankAccountModal(): void;
  closeNewBankAccountModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(() => {
    const storageAreValuesVisible = localStorage.getItem(
      localStorageKeys.ARE_VALUES_VISIBLE,
    );

    return storageAreValuesVisible === 'false' ? false : true;
  });
  const [isNewBankAccountModalOpen, setIsNewBankAccountModalOpen] =
    useState(true);

  const toogleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => {
      const newState = !prevState;

      localStorage.setItem(
        localStorageKeys.ARE_VALUES_VISIBLE,
        JSON.stringify(newState),
      );

      return newState;
    });
  }, []);

  const openNewBankAccountModal = useCallback(() => {
    setIsNewBankAccountModalOpen(true);
  }, []);

  const closeNewBankAccountModal = useCallback(() => {
    setIsNewBankAccountModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        isNewBankAccountModalOpen,
        toogleValuesVisibility,
        openNewBankAccountModal,
        closeNewBankAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
