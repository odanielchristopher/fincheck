import { useState } from 'react';
import { cn } from '../../app/utils/cn';
import { formatDate } from '../../app/utils/formatDate';
import { DatePicker } from './DatePicker';
import { FildError } from './FildError';
import { Popover } from './Popover';

interface DatePickerInputProps {
  value?: Date;
  onChange?(value: Date): void;
  className?: string;
  error?: string;
}

export function DatePickerInput({
  value,
  className,
  error,
  onChange,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            type="button"
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] pt-4 text-gray-700 outline-none focus:border-gray-800 transition-all text-left relative',
              error && '!border-red-900',
              className,
            )}
          >
            <span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none">
              Data
            </span>

            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>

      {error && <FildError message={error} />}
    </div>
  );
}
