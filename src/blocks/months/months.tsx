import { useState } from 'react';
import cn from 'classnames';
import { addMonths, format, startOfMonth, endOfMonth } from 'date-fns';

import { Counter } from '@/components';
import { Button } from '@/components/ui';
import { shortDateFormat } from '@/constants/dates';

import './months.scss';

type MonthType = {
  date: Date;
  value: string;
  title: string;
};

function getNextMonths(countMonth: number): MonthType[] {
  const months: MonthType[] = [];
  const currentDate = startOfMonth(new Date());

  for (let i = 0; i < countMonth; i++) {
    const futureDate = addMonths(currentDate, i);
    const formattedDate = format(futureDate, shortDateFormat);
    months.push({
      date: futureDate,
      value: futureDate.toISOString().split('T')[0],
      title: formattedDate,
    });
  }

  return months;
}

export default function BlockMonths() {
  const countNextMonth = 18;
  const defaultDayCount = 7;
  const messageMonthsDate = 'Select a month';

  const [days, setDays] = useState<number>(defaultDayCount);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  function onHandleChangeDays(days: number) {
    setDays(days);
  }

  function onHandleReset() {
    setDays(defaultDayCount);
    setSelectedDate(null);
  }

  function onHandleSelectMonth(date: Date) {
    const lastDayMonthDate = endOfMonth(date);
    console.log(lastDayMonthDate);
    setSelectedDate(date);
  }

  return (
    <div className="block-months">
      <div className="block-months__content">
        <Counter
          id="month-days"
          input={false}
          title="nights"
          className="block-months__counter"
          minValue={1}
          value={days}
          onChange={onHandleChangeDays}
        />
        <div className="block-months__grid">
          {getNextMonths(countNextMonth).map(({ date, title, value }) => {
            const dateValue = date?.toISOString().split('T')[0];
            const isSelected =
              selectedDate?.toISOString().split('T')[0] === dateValue;

            return (
              <label
                key={dateValue}
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
                  onChange={() => onHandleSelectMonth(date)}
                />
                <span className="month-btn__title">{title}</span>
                <div className="month-btn__border"></div>
              </label>
            );
          })}
        </div>
      </div>
      <div className="months-info">
        {selectedDate ? (
          <>
            <span className="dates-info__date">
              {format(selectedDate, shortDateFormat)}
            </span>
            <span className="dates-info__nights">({days} nights)</span>
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
          messageMonthsDate
        )}
      </div>
    </div>
  );
}
