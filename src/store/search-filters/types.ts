import { DatepickerTabEnum } from '@/blocks/date-pickers-search';
import { DateRange } from '@/types/common';

export type GuestType = {
  rooms: number;
  adults: number;
  children: number[];
};

export interface SearchFiltersState {
  datePicker: {
    messageDepartureDate: string;
    messageReturnDate: string;
    datesDatePicker: DateRange;
    formattedDatesForDatePicker: string;
    datesDays: number;
  };
  dateMonth: {
    messageMonthsDate: string;
    countNextMonth: number;
    defaultDayCount: number;
    datesMonth: DateRange;
    monthDays: number;
    formattedDatesForMonth: string;
  };
  guests: GuestType;
  guestsFormattedMessage: string;
  activeFormattedDates: string;
  activeTabDates: DatepickerTabEnum;
  updateGuests: (guests: GuestType) => void;
  updateDatePickerDates: (from: Date, to?: Date) => void;
  resetDatesDatePicker: () => void;
  updateDatesForMonthByCounter: (days: number) => void;
  updateDatesForMonth: (from: Date) => void;
  resetDatesForMonth: () => void;
  clearActiveFormattedDates: () => void;
  updateTab: (tab: DatepickerTabEnum) => void;
  updateMonthDays: (days: number) => void;
}
