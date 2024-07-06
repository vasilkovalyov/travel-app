import { useMediaQuery } from 'react-responsive';

import { useSearchFilterStore } from '@/store';

import { DatePickerRange } from '@/components';
import { Button } from '@/components/ui';
import { breakpoints } from '@/constants/breakpoints';

import './date-picker-range.scss';

export default function BlockDatePickerRange() {
  const { dateMonth, datePicker, updateDatePickerDates, resetDatesDatePicker } =
    useSearchFilterStore();

  const getMessageForDate = () => {
    if (!datePicker.datesDatePicker.from && !datePicker.datesDatePicker.to)
      return datePicker.messageDepartureDate;
    if (datePicker.datesDatePicker.from && !datePicker.datesDatePicker.to)
      return datePicker.messageReturnDate;
    return null;
  };

  const isTabletMd = useMediaQuery({
    query: `(min-width: ${breakpoints.tabletMd}px)`,
  });

  return (
    <div className="block-date-picker-range">
      <DatePickerRange
        numberOfMonths={isTabletMd ? 2 : 1}
        selected={datePicker.datesDatePicker}
        onSelectRange={updateDatePickerDates}
      />
      {isTabletMd && (
        <div className="date-result">
          {datePicker.datesDatePicker.from && datePicker.datesDatePicker.to ? (
            <>
              <span className="date-result__dates">
                {datePicker.formattedDatesForDatePicker}
              </span>
              <span className="date-result__days">
                {`(${datePicker.datesDays} ${datePicker.datesDays >= 2 ? 'nights' : 'night'})`}
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
