import { NumericFormat } from 'react-number-format';
import { cn } from '../../app/utils/cn';
import { FildError } from './FildError';

interface InputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
}

export function InputCurrency({ value, onChange, error }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        defaultValue={value}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          'w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none',
          error && 'text-red-900',
        )}
      />

      {error && <FildError message={error} />}
    </div>
  );
}
