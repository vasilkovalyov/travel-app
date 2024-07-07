import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { addMonths, format, startOfMonth } from 'date-fns';

import { useSearchFilterStore } from '@/store';

import { Counter } from '@/components';
import { Button } from '@/components/ui';
import { breakpoints } from '@/constants/breakpoints';
import {
  shortDateFormat,
  shortDateFormat2,
  standartDateFormat,
} from '@/constants/dates';

import './date-picker-month.scss';

type MonthType = {
  date: Date;
  value: string;
  title: string;
};

function getNextMonths(
  countMonth: number,
  titleFormat: string = shortDateFormat,
): MonthType[] {
  const months: MonthType[] = [];
  const currentDate = startOfMonth(new Date().setUTCDate(1));

  for (let i = 0; i < countMonth; i++) {
    const futureDate = addMonths(currentDate, i);
    months.push({
      date: futureDate,
      value: format(futureDate, standartDateFormat),
      title: format(futureDate, titleFormat),
    });
  }

  return months;
}

export default function BlockDatePickerMonth() {
  const {
    dateMonth,
    updateDateMonthByCounter,
    updateDateMonth,
    resetDateMonth,
  } = useSearchFilterStore();

  const isTabletMd = useMediaQuery({
    query: `(min-width: ${breakpoints.tabletMd}px)`,
  });

  const isCurrentDate = (date: Date): boolean => {
    if (!dateMonth.datesRange.from) return false;
    const formattedDateMonth = format(
      dateMonth.datesRange.from,
      standartDateFormat,
    );
    const formattedDate = format(date, standartDateFormat);

    return formattedDateMonth === formattedDate;
  };

  const getMonthes = isTabletMd
    ? getNextMonths(dateMonth.countMonth)
    : getNextMonths(dateMonth.countMonth, shortDateFormat2);

  return (
    <div className="block-date-picker-month">
      <div className="block-date-picker-month__content">
        <Counter
          id="month-days"
          input={false}
          title="nights"
          className="block-date-picker-month__counter"
          minValue={1}
          value={dateMonth.days}
          onChange={updateDateMonthByCounter}
        />
        <div className="block-date-picker-month__grid">
          {getMonthes.map(({ date, title, value }) => {
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
                  onChange={() => updateDateMonth(date)}
                />
                <span className="month-btn__title">{title}</span>
                <div className="month-btn__border"></div>
              </label>
            );
          })}
        </div>
      </div>
      {isTabletMd && (
        <div className="date-result">
          {dateMonth.datesRange.from ? (
            <>
              <span className="date-result__dates">
                {format(dateMonth.datesRange.from, shortDateFormat)}
              </span>
              <span className="date-result__days">
                {`(${dateMonth.days} ${dateMonth.days >= 2 ? 'nights' : 'night'})`}
              </span>
              <Button
                view="transparent"
                size="sm"
                className="date-result__reset-btn"
                onClick={resetDateMonth}
              >
                Reset
              </Button>
            </>
          ) : (
            dateMonth.messageMonthsDate
          )}
        </div>
      )}
    </div>
  );
}
