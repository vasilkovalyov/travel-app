import { useEffect, useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';

import {
  getNextDay,
  getPrevDay,
  hoveredRangeDefault,
  selectedRangeDefault,
} from './datepicker.utils';
import { DatePickerProps } from './datepicker.type';

import './datepicker.scss';

export default function DatePicker({
  selected,
  onSelectRange,
}: DatePickerProps) {
  const [hoveredRange, setHoveredRange] =
    useState<DateRange>(hoveredRangeDefault);

  const [selectedRange, setSelectedRange] =
    useState<DateRange>(selectedRangeDefault);

  function onHandleDayClick(day: Date) {
    if (!selectedRange.from && !selectedRange.to) {
      setSelectedRange((prev) => ({
        ...prev,
        from: day,
      }));
      onSelectRange && onSelectRange(day, undefined);
      return;
    }

    if (selectedRange.from && selectedRange.from.getTime() === day.getTime())
      return;

    if (selectedRange.from && !selectedRange.to) {
      const dateFrom = new Date(selectedRange.from);

      if (dateFrom.getTime() > day.getTime()) {
        setSelectedRange({
          from: day,
          to: undefined,
        });
        return;
      }

      setSelectedRange((prev) => ({
        ...prev,
        to: day,
      }));
      onSelectRange && onSelectRange(selectedRange.from, day);

      return;
    }

    if (selectedRange.from && selectedRange.to) {
      setSelectedRange({
        from: day,
        to: undefined,
      });
      onSelectRange && onSelectRange(day, undefined);
      setHoveredRange(hoveredRangeDefault);

      return;
    }
  }

  const handleDayMouseEnter = (day: Date) => {
    if (selectedRange.from && selectedRange.to) return;
    if (!selectedRange.from) return;
    if (day <= selectedRange.from) return;

    const nextDayDate = getNextDay(selectedRange.from);

    if (day.getTime() === nextDayDate.getTime()) return false;

    if (selectedRange.to) {
      setHoveredRange({
        from: nextDayDate,
        to: getPrevDay(selectedRange.to),
      });
    } else {
      setHoveredRange({
        from: nextDayDate,
        to: getPrevDay(day),
      });
    }
  };

  const handleDayMouseLeave = () => {
    setHoveredRange(hoveredRangeDefault);
  };

  useEffect(() => {
    const isDatesRangeEmpty = !(selected && (selected.from || selected?.to));

    if (isDatesRangeEmpty) {
      setSelectedRange(selectedRangeDefault);
      return;
    }

    if (
      selectedRange.from === selected.from &&
      selectedRange.to === selected.to
    )
      return;

    setSelectedRange(selected);
  }, [selected]);

  return (
    <DayPicker
      numberOfMonths={2}
      mode="range"
      selected={selectedRange}
      captionLayout="dropdown-buttons"
      fromYear={new Date().getFullYear()}
      toYear={new Date().getFullYear() + 3}
      onDayClick={(day) => onHandleDayClick(day)}
      onDayMouseEnter={handleDayMouseEnter}
      onDayMouseLeave={handleDayMouseLeave}
      modifiers={{
        start: selectedRange.from as Date,
        end: selectedRange.to as Date,
        hoverRange: (hoveredRange.from &&
          hoveredRange.to &&
          hoveredRange) as DateRange,
      }}
      modifiersStyles={{
        hoverRange: {
          color: 'rgb(11, 60, 128)',
          backgroundColor: 'rgb(231, 235, 242)',
        },
      }}
      className="datepicker"
    />
  );
}
