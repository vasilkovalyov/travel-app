import { DateRange } from 'react-day-picker';

export type DatePickerProps = {
  selected?: DateRange;
  onSelectRange?: (from: Date, to?: Date) => void;
};
