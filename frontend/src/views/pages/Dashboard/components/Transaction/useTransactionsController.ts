import { useEffect, useState } from 'react';
import { useTransactions } from '../../../../../app/hooks/useTransactions';
import { TransactionsFilters } from '../../../../../app/services/transactionsService/getAll';
import { useDashboard } from '../DashboardContext/useDashboard';

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { transactions, isLoading, isInitialLoading, refetchTransactions } =
    useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter,
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleApplyFilters(filters: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilters('bankAccountId')(filters.bankAccountId);

    handleChangeFilters('year')(filters.year);

    setIsFiltersModalOpen(false);
  }

  return {
    isInitialLoading,
    isLoading,
    filters,
    transactions,
    areValuesVisible,
    isFiltersModalOpen,
    handleApplyFilters,
    handleChangeFilters,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  };
}
