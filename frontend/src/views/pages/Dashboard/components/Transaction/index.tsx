import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperSlide } from 'swiper/react';

import { MONTHS } from '../../../../../app/config/constants';
import { FilterIcon } from '../../../../assets/icons/FilterIcon';
import { TransactionsIcon } from '../../../../assets/icons/TransactionsIcon';
import { SliderNavigation } from './SliderNavigation';
import { SliderOption } from './SliderOption';

export function Transactions() {
  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-32 md:p-10">
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

      <div className="mt-4">Content</div>
    </div>
  );
}
