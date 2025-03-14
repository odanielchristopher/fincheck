/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useState } from 'react';
import { localStorageKeys } from '../../../../../app/config/localStorageKeys';

interface DashboardContextValue {
  areValuesVisible: boolean;
  toogleValuesVisibility(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(() => {
    const storageAreValuesVisible = localStorage.getItem(localStorageKeys.ARE_VALUES_VISIBLE);

    return storageAreValuesVisible === 'false' ? false : true;
  });

  const toogleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => {
      const newState = !prevState;

      localStorage.setItem(localStorageKeys.ARE_VALUES_VISIBLE, JSON.stringify(newState));

      return newState;
    });
  }, []);

  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toogleValuesVisibility }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
