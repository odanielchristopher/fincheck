import { CrossCircledIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
}

export function Input({ id, name, placeholder, error, ...props }: InputProps) {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        {...props}
        id={inputId}
        name={name}
        className={twMerge(
          clsx(
            'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 outline-none pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all',
          ),
        )}
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
