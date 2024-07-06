import { DateRange } from '@/types/common';

export type DatePickerProps = {
  selected?: DateRange;
  numberOfMonths?: number;
  onSelectRange?: (from: Date, to?: Date) => void;
};
