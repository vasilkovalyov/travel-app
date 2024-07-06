import { useMediaQuery } from 'react-responsive';

import { useSearchFilterStore } from '@/store';

import { DatePickerRange } from '@/components';
import { Button } from '@/components/ui';
import { breakpoints } from '@/constants/breakpoints';

import './date-picker-range.scss';

export default function BlockDatePickerRange() {
  const {
    datesDays,
    datesDatePicker,
    messageDepartureDate,
    messageReturnDate,
    formattedDatesForDatePicker,
    updateDatePickerDates,
    resetDatesDatePicker,
  } = useSearchFilterStore();

  const getMessageForDate = () => {
    if (!datesDatePicker.from && !datesDatePicker.to)
      return messageDepartureDate;
    if (datesDatePicker.from && !datesDatePicker.to) return messageReturnDate;
    return null;
  };

  const isTabletMd = useMediaQuery({
    query: `(min-width: ${breakpoints.tabletMd}px)`,
  });

  return (
    <div className="block-date-picker-range">
      <DatePickerRange
        numberOfMonths={isTabletMd ? 2 : 1}
        selected={datesDatePicker}
        onSelectRange={updateDatePickerDates}
      />
      {isTabletMd && (
        <div className="date-result">
          {datesDatePicker.from && datesDatePicker.to ? (
            <>
              <span className="date-result__dates">
                {formattedDatesForDatePicker}
              </span>
              <span className="date-result__days">
                {`(${datesDays} ${datesDays >= 2 ? 'nights' : 'night'})`}
              </span>
              <Button
                view="transparent"
                size="sm"
                className="date-result__reset-btn"
                onClick={resetDatesDatePicker}
              >
                Reset
              </Button>
            </>
          ) : (
            getMessageForDate()
          )}
        </div>
      )}
    </div>
  );
}
