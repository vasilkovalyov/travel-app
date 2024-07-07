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
    dateMonth,
    datePicker,
    resetDateMonth,
    resetDatePickerDates,
  } = useSearchFilterStore();

  const getMessageForDate = () => {
    if (!datePicker.datesRange.from && !datePicker.datesRange.to)
      return datePicker.messageDeparture;
    if (datePicker.datesRange.from && !datePicker.datesRange.to)
      return datePicker.messageReturn;
    return null;
  };

  function renderInfoForDates() {
    if (datePicker.datesRange.from && datePicker.datesRange.to) {
      return (
        <>
          <span className="date-result__dates">
            {datePicker.formattedDates}
          </span>
          <span className="date-result__days">
            {`(${datePicker.daysRangeCount} ${datePicker.daysRangeCount >= 2 ? 'nights' : 'night'})`}
          </span>
        </>
      );
    }
    return getMessageForDate();
  }

  function renderInfoForMonth() {
    if (dateMonth.datesRange.from) {
      return (
        <>
          <span className="date-result__dates">
            {format(dateMonth.datesRange.from, shortDateFormat)}
          </span>
          <span className="date-result__days">
            {`(${dateMonth.days} ${dateMonth.days >= 2 ? 'nights' : 'night'})`}
          </span>
        </>
      );
    }
    return dateMonth.messageMonthsDate;
  }

  function onHandleReset() {
    if (activeTabDates === DatepickerTabEnum.Dates) {
      resetDatePickerDates();
    }
    if (activeTabDates === DatepickerTabEnum.Month) {
      resetDateMonth();
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
