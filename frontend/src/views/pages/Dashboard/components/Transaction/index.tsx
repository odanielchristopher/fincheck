import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperSlide } from 'swiper/react';

import { MONTHS } from '../../../../../app/config/constants';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { CategoryIcon } from '../../../../assets/icons/categories/CategoryIcon';
import { FilterIcon } from '../../../../assets/icons/FilterIcon';
import { TransactionsIcon } from '../../../../assets/icons/TransactionsIcon';
import { Spinner } from '../../../../components/Spinner';
import { SliderNavigation } from './SliderNavigation';
import { SliderOption } from './SliderOption';
import { useTransactionsController } from './useTransactionsController';

export function Transactions() {
  const { areValuesVisible, isLoading } = useTransactionsController();

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-3 md:p-10 flex flex-col">
      {isLoading && (
        <div className="flex-1 w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isLoading && (
        <>
          <header className="">
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2">
                <TransactionsIcon />
                <span className="text-sm text-gray-800 font-medium tracking-[-0.5px]">
                  Transações
                </span>

                <ChevronDownIcon className="text-gray-900" />
              </button>

              <button className="p-3 flex items-center justify-center rounded-full">
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper slidesPerView={3} centeredSlides>
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
            <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex-1 flex items-center gap-3">
                <CategoryIcon type="expense" />

                <div className="flex-1">
                  <strong className="block text-gray-800 font-bold tracking-[-0.5px]">
                    Almoço
                  </strong>
                  <span className="text-gray-600 text-sm">04/02/25</span>
                </div>
              </div>

              <span
                className={cn(
                  'text-red-800 tracking-[-0.5px] font-medium',
                  !areValuesVisible && 'blur-sm',
                )}
              >
                - {formatCurrency(120.3)}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex-1 flex items-center gap-3">
                <CategoryIcon type="income" />

                <div className="flex-1">
                  <strong className="block text-gray-800 font-bold tracking-[-0.5px]">
                    Vendas
                  </strong>
                  <span className="text-gray-600 text-sm">04/02/25</span>
                </div>
              </div>

              <span
                className={cn(
                  'text-green-800 tracking-[-0.5px] font-medium',
                  !areValuesVisible && 'blur-sm',
                )}
              >
                + {formatCurrency(120.3)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
