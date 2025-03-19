import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PlusIcon } from '@radix-ui/react-icons';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { EyeIcon } from '../../../../assets/icons/EyeIcon';
import { Spinner } from '../../../../components/Spinner';
import { AccountCard } from './AccountCard';
import { SliderNavigation } from './SliderNavigation';
import { useAccountsController } from './useAccountsController';

export function Accounts() {
  const {
    accounts,
    isLoading,
    sliderState,
    windowWidth,
    currentBalance,
    areValuesVisible,
    setSliderState,
    toogleValuesVisibility,
    openNewBankAccountModal,
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col justify-start">
      {isLoading && (
        <div className="flex-1 w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950/50 fill-white w-10 h-10" />
        </div>
      )}

      {!isLoading && (
        <>
          <div className="text-white">
            <span className="tracking-[-0.5px] block">Saldo total</span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  'text-2xl tracking-[-1px]',
                  !areValuesVisible && 'blur-md',
                )}
              >
                {formatCurrency(currentBalance)}
              </strong>

              <button
                onClick={() => toogleValuesVisibility()}
                className="h-8 w-8 flex items-center justify-center"
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-end flex-col mt-10 lg:mt-0">
            {accounts.length === 0 && (
              <>
                <div className="mb-4" slot="container-start">
                  <strong className="text-white text-lg font-bold tracking-[-1px]">
                    Minhas contas
                  </strong>
                </div>

                <button
                  onClick={openNewBankAccountModal}
                  className="h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white"
                >
                  <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>

                  <span className="font-medium tracking-[-0.5px] block w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
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

                    <SliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard
                        type={account.type}
                        name={account.name}
                        balance={account.currentBalance}
                        color={account.color}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
