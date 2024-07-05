import { format } from 'date-fns';

import { baseDateFormat, shortDateFormat2 } from '@/constants/dates';

export function getTotalCountOfNumbersInObject(obj: {
  [key in string]: number[];
}): number {
  return Object.keys(obj).reduce(
    (previous, key) => previous + obj[key].length,
    0,
  );
}

export function getFormattedDateString(from: Date, to?: Date): string {
  const formattedDateFrom = format(from, baseDateFormat);
  let formattedDateTo = '';

  if (to) formattedDateTo = format(to, baseDateFormat);

  const formattedDateStr = `${formattedDateFrom + ' - '} ${formattedDateTo}`;

  return formattedDateStr;
}

export function getFormattedDateMonthString(date: Date, days: number): string {
  const formattedDateFrom = format(date, shortDateFormat2);
  const daysStr = days >= 2 ? 'days' : 'day';

  return `${formattedDateFrom}, ${days} ${daysStr}`;
}
