import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EyeIcon } from '../../../../assets/icons/EyeIcon';
import { AccountCard } from './AccountCard';
import { AccountsSliderNavigation } from './AccountsSliderNavigation';
import { useAccountsController } from './useAccountsController';

export function Accounts() {
  const { sliderState, windowWidth, setSliderState } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col justify-start">
      <div className="text-white">
        <span className="tracking-[-0.5px] block">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px]">R$ 1000,00</strong>

          <button className="h-8 w-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex justify-end flex-col mt-10 lg:mt-0">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
            onSlideChange={(swiper) => {
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
              });
            }}
          >
            <div
              className="flex justify-between items-center mb-4"
              slot="container-start"
            >
              <strong className="text-white text-lg font-bold tracking-[-1px]">
                Minhas contas
              </strong>

              <AccountsSliderNavigation
                isBeginning={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
            </div>

            <SwiperSlide>
              <AccountCard
                type="CHECKING"
                name="Nubank"
                balance={123}
                color="#7950F2"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                type="INVESTMENT"
                name="XP"
                balance={248}
                color="#333"
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                type="CASH"
                name="Carteira"
                balance={1008.3}
                color="#0F0"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
