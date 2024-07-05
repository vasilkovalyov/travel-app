import { format, intervalToDuration } from 'date-fns';

import { useSearchFilterStore } from '@/store';

import { DatePickerRange } from '@/components';
import { Button } from '@/components/ui';
import { baseDateFormat } from '@/constants/dates';

import './dates.scss';

export default function BlockDates() {
  const messageDepartureDate = 'Select a departure date';
  const messageReturnDate = 'Select a return date';

  const { datesDatePicker, updateDatePickerDates, resetDatesDatePicker } =
    useSearchFilterStore();

  const getMessageForDate = () => {
    if (!datesDatePicker.from && !datesDatePicker.to)
      return messageDepartureDate;
    if (datesDatePicker.from && !datesDatePicker.to) return messageReturnDate;
    return null;
  };

  return (
    <div className="block-dates">
      <DatePickerRange
        selected={datesDatePicker}
        onSelectRange={updateDatePickerDates}
      />
      <div className="dates-info">
        {datesDatePicker.from && datesDatePicker.to ? (
          <>
            <span className="dates-info__date">
              {format(datesDatePicker.from, baseDateFormat)}
            </span>{' '}
            <span>-</span>{' '}
            <span className="dates-info__date">
              {format(datesDatePicker.to, baseDateFormat)}
            </span>
            <span className="dates-info__nights">
              {intervalToDuration({
                start: datesDatePicker.from,
                end: datesDatePicker.to,
              }).days + ' nights'}
            </span>
            <Button
              view="transparent"
              size="sm"
              className="dates-info__reset-btn"
              onClick={resetDatesDatePicker}
            >
              Reset
            </Button>
          </>
        ) : (
          getMessageForDate()
        )}
      </div>
    </div>
  );
}
