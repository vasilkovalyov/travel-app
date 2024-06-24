import { DateRange } from 'react-day-picker';

export const selectedRangeDefault: DateRange = {
  from: undefined,
  to: undefined,
};

export const hoveredRangeDefault: DateRange = {
  from: undefined,
  to: undefined,
};

export function getNextDay(date: Date): Date {
  const dateBefore = new Date(date);
  const nextDayDate = dateBefore.setDate(dateBefore.getDate() + 1);
  return new Date(nextDayDate);
}

export function getPrevDay(date: Date): Date {
  const dateBefore = new Date(date);
  const prevDayDate = dateBefore.setDate(dateBefore.getDate() - 1);
  return new Date(prevDayDate);
}

export function isDateBetween(date: Date, startDate: Date, endDate: Date) {
  return date >= startDate && date <= endDate;
}
