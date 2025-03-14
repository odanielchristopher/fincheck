import { useSwiper } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";

interface SliderOptionProps {
  index: number;
  month: string;
  isActive: boolean;
}

export function SliderOption({ index, month, isActive }: SliderOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideTo(index)}
      className={cn(
        'w-full rounded-full h-12 text-sm text-gray-800 font-medium tracking-[-0.5px]',
        isActive && 'bg-white',
      )}
    >
      {month}
    </button>
  );
}
