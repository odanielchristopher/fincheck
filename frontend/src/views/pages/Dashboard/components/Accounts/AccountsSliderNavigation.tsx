import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

interface AccountsSliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export function AccountsSliderNavigation({ isBeginning, isEnd }: AccountsSliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div>
      <button
        className="p-3 rounded-full text-white enabled:hover:bg-black/10 disabled:opacity-40 transition-colors"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <button
        className="p-3 rounded-full text-white enabled:hover:bg-black/10 disabled:opacity-40 transition-colors"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
