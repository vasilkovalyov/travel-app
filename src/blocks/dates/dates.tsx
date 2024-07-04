import { useEffect, useState } from 'react';

import { format, intervalToDuration } from 'date-fns';

import { useSearchFilterStore } from '@/store';

import { DatePickerRange } from '@/components';
import { Button } from '@/components/ui';
import { baseDateFormat } from '@/constants/dates';
import { DateRange } from '@/types/common';

import './dates.scss';

const defaultRangeDates: DateRange = {
  from: undefined,
  to: undefined,
};

export default function BlockDates() {
  const messageDepartureDate = 'Select a departure date';
  const messageReturnDate = 'Select a return date';

  const [selectedDates, setSelectedDates] =
    useState<DateRange>(defaultRangeDates);
  const { datesDatePicker, updateDatePickerDates, clearDatesDatePicker } =
    useSearchFilterStore();

  useEffect(() => {
    setSelectedDates({
      from: datesDatePicker.from,
      to: datesDatePicker.to,
    });
  }, [datesDatePicker]);

  function onHandleReset() {
    setSelectedDates(defaultRangeDates);
    clearDatesDatePicker();
  }

  function onHandleDatePickerRange(from: Date, to?: Date) {
    setSelectedDates({ from, to });
    updateDatePickerDates(from, to);
  }

  const getMessageForDate = () => {
    if (!selectedDates.from && !selectedDates.to) return messageDepartureDate;
    if (selectedDates.from && !selectedDates.to) return messageReturnDate;
    return null;
  };

  const getCountNights = (from: Date, to: Date) => {
    return (
      intervalToDuration({
        start: from,
        end: to,
      }).days + ' nights'
    );
  };

  return (
    <div className="block-dates">
      <DatePickerRange
        selected={selectedDates}
        onSelectRange={onHandleDatePickerRange}
      />
      <div className="dates-info">
        {selectedDates.from && selectedDates.to ? (
          <>
            <span className="dates-info__date">
              {format(selectedDates.from, baseDateFormat)}
            </span>{' '}
            <span>-</span>{' '}
            <span className="dates-info__date">
              {format(selectedDates.to, baseDateFormat)}
            </span>
            <span className="dates-info__nights">
              {getCountNights(selectedDates.from, selectedDates.to)}
            </span>
            <Button
              view="transparent"
              size="sm"
              className="dates-info__reset-btn"
              onClick={onHandleReset}
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
