import { useMediaQuery } from 'react-responsive';

import { useSearchFilterStore } from '@/store';

import { DatePickerRange } from '@/components';
import { Button } from '@/components/ui';
import { breakpoints } from '@/constants/breakpoints';

import './date-picker-range.scss';

export default function BlockDatePickerRange() {
  const { datePicker, updateDatePickerDates, resetDatePickerDates } =
    useSearchFilterStore();

  const getMessageForDate = () => {
    if (!datePicker.datesRange.from && !datePicker.datesRange.to)
      return datePicker.messageDeparture;
    if (datePicker.datesRange.from && !datePicker.datesRange.to)
      return datePicker.messageReturn;
    return null;
  };

  const isTabletMd = useMediaQuery({
    query: `(min-width: ${breakpoints.tabletMd}px)`,
  });

  return (
    <div className="block-date-picker-range">
      <DatePickerRange
        numberOfMonths={isTabletMd ? 2 : 1}
        selected={datePicker.datesRange}
        onSelectRange={updateDatePickerDates}
      />
      {isTabletMd && (
        <div className="date-result">
          {datePicker.datesRange.from && datePicker.datesRange.to ? (
            <>
              <span className="date-result__dates">
                {datePicker.formattedDates}
              </span>
              <span className="date-result__days">
                {`(${datePicker.daysRangeCount} ${datePicker.daysRangeCount >= 2 ? 'nights' : 'night'})`}
              </span>
              <Button
                view="transparent"
                size="sm"
                className="date-result__reset-btn"
                onClick={resetDatePickerDates}
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
