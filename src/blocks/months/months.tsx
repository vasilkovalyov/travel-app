import cn from 'classnames';
import { addMonths, format, startOfMonth } from 'date-fns';

import { useSearchFilterStore } from '@/store';

import { Counter } from '@/components';
import { Button } from '@/components/ui';
import { shortDateFormat, standartDateFormat } from '@/constants/dates';

import './months.scss';

type MonthType = {
  date: Date;
  value: string;
  title: string;
};

function getNextMonths(countMonth: number): MonthType[] {
  const months: MonthType[] = [];
  const currentDate = startOfMonth(new Date().setUTCDate(1));

  for (let i = 0; i < countMonth; i++) {
    const futureDate = addMonths(currentDate, i);
    months.push({
      date: futureDate,
      value: format(futureDate, standartDateFormat),
      title: format(futureDate, shortDateFormat),
    });
  }

  return months;
}

export default function BlockMonths() {
  const messageMonthsDate = 'Select a month';

  const {
    datesMonth,
    countNextMonth,
    monthDays,
    updateDatesForMonthByCounter,
    updateDatesForMonth,
    resetDatesForMonth,
  } = useSearchFilterStore();

  const isCurrentDate = (date: Date): boolean => {
    if (!datesMonth.from) return false;
    const formattedDateMonth = format(datesMonth.from, standartDateFormat);
    const formattedDate = format(date, standartDateFormat);

    if (formattedDateMonth === formattedDate) {
      return true;
    }
    return false;
  };

  return (
    <div className="block-months">
      <div className="block-months__content">
        <Counter
          id="month-days"
          input={false}
          title="nights"
          className="block-months__counter"
          minValue={1}
          value={monthDays}
          onChange={updateDatesForMonthByCounter}
        />
        <div className="block-months__grid">
          {getNextMonths(countNextMonth).map(({ date, title, value }) => {
            const isSelected = isCurrentDate(date);
            return (
              <label
                key={date.toISOString()}
                className={cn('month-btn', {
                  'month-btn--selected': isSelected,
                })}
              >
                <input
                  type="radio"
                  name="month-options"
                  className="month-btn__input"
                  value={value}
                  checked={isSelected}
                  onChange={() => updateDatesForMonth(date)}
                />
                <span className="month-btn__title">{title}</span>
                <div className="month-btn__border"></div>
              </label>
            );
          })}
        </div>
      </div>
      <div className="months-info">
        {datesMonth.from ? (
          <>
            <span className="dates-info__date">
              {format(datesMonth.from, shortDateFormat)}
            </span>
            <span className="dates-info__nights">({monthDays} nights)</span>
            <Button
              view="transparent"
              size="sm"
              className="dates-info__reset-btn"
              onClick={resetDatesForMonth}
            >
              Reset
            </Button>
          </>
        ) : (
          messageMonthsDate
        )}
      </div>
    </div>
  );
}
