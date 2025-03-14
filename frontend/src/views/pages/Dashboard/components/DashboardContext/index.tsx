/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useState } from 'react';

interface DashboardContextValue {
  areValuesVisible: boolean;
  toogleValuesVisibility(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);

  const toogleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toogleValuesVisibility }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
