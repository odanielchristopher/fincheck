import { Swiper, SwiperSlide } from 'swiper/react';

import { CategoryIcon } from '../../../../assets/icons/categories/CategoryIcon';
import { FilterIcon } from '../../../../assets/icons/FilterIcon';
import emptyStateImage from '../../../../assets/images/empty-state.svg';

import { MONTHS } from '../../../../../app/config/constants';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';

import { Spinner } from '../../../../components/Spinner';

import { FiltersModal } from './FiltersModal';
import { SliderNavigation } from './SliderNavigation';
import { SliderOption } from './SliderOption';
import { TransactionTypeDropdown } from './TransactionTypeDropdown';

import { formatDate } from '../../../../../app/utils/formatDate';
import { EditTransactionModal } from '../../modals/EditTransactionModal';
import { useTransactionsController } from './useTransactionsController';

export function Transactions() {
  const {
    filters,
    isLoading,
    transactions,
    areValuesVisible,
    isInitialLoading,
    isFiltersModalOpen,
    transactionBeingEdited,
    isEditTransactionModalOpen,
    handleApplyFilters,
    handleChangeFilters,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleCloseEditModal,
    handleOpenEditModal,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-3 md:p-10 flex flex-col">
      {isInitialLoading && (
        <div className="flex-1 w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header className="">
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

              <button
                onClick={handleOpenFiltersModal}
                className="p-3 flex items-center justify-center rounded-full"
              >
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={(swiper) => {
                  if (swiper.realIndex === filters.month) {
                    return;
                  }

                  handleChangeFilters('month')(swiper.realIndex);
                }}
              >
                <SliderNavigation />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        month={month}
                        isActive={isActive}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <img src={emptyStateImage} alt="Empty state" />
                <p className="text-gray-700">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditTransactionModalOpen}
                    onClose={handleCloseEditModal}
                    transaction={transactionBeingEdited}
                  />
                )}

                {transactions.map((transaction) => {
                  const isExpense = transaction.type === 'EXPENSE';

                  return (
                    <div
                      key={transaction.id}
                      role="button"
                      onClick={() => handleOpenEditModal(transaction)}
                      className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                    >
                      <div className="flex-1 flex items-center gap-3">
                        <CategoryIcon
                          type={isExpense ? 'expense' : 'income'}
                          category={transaction.category?.icon}
                        />

                        <div className="flex-1">
                          <strong className="block text-gray-800 font-bold tracking-[-0.5px]">
                            {transaction.name}
                          </strong>
                          <span className="text-gray-600 text-sm">
                            {formatDate(new Date(transaction.date))}
                          </span>
                        </div>
                      </div>

                      <span
                        className={cn(
                          'text-teal-900 tracking-[-0.5px] font-medium',
                          !areValuesVisible && 'blur-sm',
                          isExpense && 'text-red-800',
                        )}
                      >
                        {isExpense ? '-' : '+'}{' '}
                        {formatCurrency(transaction.value)}
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
