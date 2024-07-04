import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { format } from 'date-fns';

import { baseDateFormat } from '@/constants/dates';

import { DateRange } from '@/types/common';

export type GuestType = {
  rooms: number;
  adults: number;
  children: number[];
};

interface SearchFiltersState {
  guests: GuestType;
  guestsFormattedMessage: string;
  datesDatePicker: DateRange;
  datesMonth: DateRange;
  formattedDatesForDatePicker: string;
  formattedDatesForMonth: string;
  activeFormattedDates: string;
  activeTabDates: string;
  updateGuests: (guests: GuestType) => void;
  updateDatePickerDates: (from: Date, to?: Date) => void;
  clearActiveFormattedDates: () => void;
  clearDatesDatePicker: () => void;
  updateTab: (tab: string) => void;
}

const defaultDateRange: DateRange = {
  from: undefined,
  to: undefined,
};

const getGuestFormattedMessage = (guests: GuestType): string => {
  let adults = `${guests.adults} ${guests.adults > 1 ? 'adults' : 'adult'}`;
  let rooms = `${guests.rooms} ${guests.rooms > 1 ? 'rooms' : 'room'}`;
  const childrenLength = guests.children.length;
  let children = childrenLength
    ? `, ${childrenLength} ${childrenLength > 1 ? 'children' : 'child'}`
    : '';
  return `${adults}, ${rooms}${children}`;
};

const useSearchFilterStore = create<SearchFiltersState>()(
  devtools(
    immer((set) => ({
      guests: {
        rooms: 1,
        adults: 1,
        children: [],
      },
      guestsFormattedMessage: '',
      datesDatePicker: defaultDateRange,
      datesMonth: defaultDateRange,
      formattedDatesForDatePicker: '',
      formattedDatesForMonth: '',
      activeFormattedDates: '',
      activeTabDates: 'dates',
      updateGuests: (guests: GuestType) => {
        set(() => ({
          guests: guests,
          guestsFormattedMessage: getGuestFormattedMessage(guests),
        }));
      },
      updateDatePickerDates: (from: Date, to?: Date) => {
        set(() => ({
          datesDatePicker: { from, to },
        }));
        set(() => {
          const formattedDateFrom = format(from, baseDateFormat);
          let formattedDateTo = '';

          if (to) formattedDateTo = format(to, baseDateFormat);

          const formattedDateStr = `${formattedDateFrom + ' - '} ${formattedDateTo}`;

          return {
            formattedDatesForDatePicker: formattedDateStr,
            activeFormattedDates: formattedDateStr,
          };
        });
      },
      clearDatesDatePicker: () => {
        set(() => ({
          activeFormattedDates: '',
          datesDatePicker: defaultDateRange,
          formattedDatesForDatePicker: '',
        }));
      },
      updateTab: (tab: string) => {
        set((state) => {
          let formattedDateStr = '';
          if (tab === 'dates') {
            formattedDateStr = state.formattedDatesForDatePicker;
          }
          if (tab === 'month') {
            formattedDateStr = state.formattedDatesForMonth;
          }

          return {
            activeTabDates: tab,
            activeFormattedDates: formattedDateStr,
          };
        });
      },
      clearActiveFormattedDates: () => {
        set(() => ({
          activeFormattedDates: '',
        }));
      },
    })),
  ),
);

export default useSearchFilterStore;
