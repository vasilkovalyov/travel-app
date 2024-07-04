import { DateRange } from '@/types/common';

export type DatePickerProps = {
  selected?: DateRange;
  onSelectRange?: (from: Date, to?: Date) => void;
};
