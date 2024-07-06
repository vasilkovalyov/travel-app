import { format } from 'date-fns';

import { useSearchFilterStore } from '@/store';

import { Button } from '@/components/ui';
import { shortDateFormat } from '@/constants/dates';
import { DatepickerTabEnum } from '../utils';

import './date-picker-modal-result.scss';

export default function DatePickerModalResult({
  onHandleClick,
}: {
  onHandleClick?: () => void;
}) {
  const {
    activeTabDates,
    datesMonth,
    monthDays,
    datesDays,
    datesDatePicker,
    messageMonthsDate,
    messageDepartureDate,
    messageReturnDate,
    formattedDatesForDatePicker,
    resetDatesForMonth,
    resetDatesDatePicker,
  } = useSearchFilterStore();

  const getMessageForDate = () => {
    if (!datesDatePicker.from && !datesDatePicker.to)
      return messageDepartureDate;
    if (datesDatePicker.from && !datesDatePicker.to) return messageReturnDate;
    return null;
  };

  function renderInfoForDates() {
    if (datesDatePicker.from && datesDatePicker.to) {
      return (
        <>
          <span className="date-result__dates">
            {formattedDatesForDatePicker}
          </span>
          <span className="date-result__days">
            {`(${datesDays} ${datesDays >= 2 ? 'nights' : 'night'})`}
          </span>
        </>
      );
    }
    return getMessageForDate();
  }

  function renderInfoForMonth() {
    if (datesMonth.from) {
      return (
        <>
          <span className="date-result__dates">
            {format(datesMonth.from, shortDateFormat)}
          </span>
          <span className="date-result__days">
            {`(${monthDays} ${monthDays >= 2 ? 'nights' : 'night'})`}
          </span>
        </>
      );
    }
    return messageMonthsDate;
  }

  function onHandleReset() {
    if (activeTabDates === DatepickerTabEnum.Dates) {
      resetDatesDatePicker();
    }
    if (activeTabDates === DatepickerTabEnum.Month) {
      resetDatesForMonth();
    }
  }

  return (
    <div className="block-date-picker-modal-result">
      <div className="date-result date-result--dark">
        {activeTabDates === DatepickerTabEnum.Dates && renderInfoForDates()}
        {activeTabDates === DatepickerTabEnum.Month && renderInfoForMonth()}
      </div>
      <div className="block-date-picker-modal-result__controls">
        <Button view="transparent" size="sm" onClick={onHandleReset}>
          Reset
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="block-date-picker-modal-result__next-btn"
          onClick={onHandleClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
