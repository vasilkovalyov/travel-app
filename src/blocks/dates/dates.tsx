import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { format, intervalToDuration } from 'date-fns';

import { DatePickerRange } from '@/components';
import { Button } from '@/components/ui';
import { baseDateFormat } from '@/constants/dates';

import './dates.scss';

const defaultRangeDates: DateRange = {
  from: undefined,
  to: undefined,
};

export default function BlockDates() {
  const [selectedDates, setSelectedDates] =
    useState<DateRange>(defaultRangeDates);

  const messageDepartureDate = 'Select a departure date';
  const messageReturnDate = 'Select a return date';

  const getMessageForDate = () => {
    if (!selectedDates.from && !selectedDates.to) return messageDepartureDate;
    if (selectedDates.from && !selectedDates.to) return messageReturnDate;
    return null;
  };

  return (
    <div className="block-dates">
      <DatePickerRange
        selected={selectedDates}
        onSelectRange={(from, to) => {
          setSelectedDates({ from, to });
        }}
      />
      <div className="block-dates__footer">
        <div className="block-dates__radiogroup"></div>
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
                (
                {
                  intervalToDuration({
                    start: selectedDates.from,
                    end: selectedDates.to,
                  }).days
                }{' '}
                nights)
              </span>
              <Button
                view="transparent"
                size="sm"
                className="dates-info__reset-btn"
                onClick={() => setSelectedDates(defaultRangeDates)}
              >
                Reset
              </Button>
            </>
          ) : (
            getMessageForDate()
          )}
        </div>
      </div>
    </div>
  );
}
