/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useState } from 'react';
import { localStorageKeys } from '../../../../../app/config/localStorageKeys';

interface DashboardContextValue {
  areValuesVisible: boolean;
  newTransactionType: TransactionType | null;
  isNewBankAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  toogleValuesVisibility(): void;
  openNewBankAccountModal(): void;
  closeNewBankAccountModal(): void;
  openNewTransactionModal(type: TransactionType): void;
  closeNewTransactionModal(): void;
}

type TransactionType = 'INCOME' | 'EXPENSE';

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(() => {
    const storageAreValuesVisible = localStorage.getItem(
      localStorageKeys.ARE_VALUES_VISIBLE,
    );

    return storageAreValuesVisible === 'false' ? false : true;
  });
  const [isNewBankAccountModalOpen, setIsNewBankAccountModalOpen] =
    useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [newTransactionType, setNewTransactionType] = useState<TransactionType | null>(null);

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

  const openNewTransactionModal = useCallback((type: TransactionType) => {
    setIsNewTransactionModalOpen(true);
    setNewTransactionType(type);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        newTransactionType,
        isNewTransactionModalOpen,
        isNewBankAccountModalOpen,
        toogleValuesVisibility,
        openNewBankAccountModal,
        closeNewBankAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
