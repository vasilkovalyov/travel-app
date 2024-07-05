import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { startOfMonth, endOfMonth } from 'date-fns';

import { DateRange } from '@/types/common';
import {
  getFormattedDateMonthString,
  getFormattedDateString,
} from '@/utils/common';

export type GuestType = {
  rooms: number;
  adults: number;
  children: number[];
};

interface SearchFiltersState {
  countNextMonth: number;
  defaultDayCount: number;
  guests: GuestType;
  guestsFormattedMessage: string;
  datesDatePicker: DateRange;
  datesMonth: DateRange;
  monthDays: number;
  formattedDatesForDatePicker: string;
  formattedDatesForMonth: string;
  activeFormattedDates: string;
  activeTabDates: string;
  updateGuests: (guests: GuestType) => void;
  updateDatePickerDates: (from: Date, to?: Date) => void;
  resetDatesDatePicker: () => void;
  updateDatesForMonthByCounter: (days: number) => void;
  updateDatesForMonth: (from: Date) => void;
  resetDatesForMonth: () => void;
  clearActiveFormattedDates: () => void;
  updateTab: (tab: string) => void;
  updateMonthDays: (days: number) => void;
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

const defaultDays = 7;

const useSearchFilterStore = create<SearchFiltersState>()(
  devtools(
    immer((set) => ({
      countNextMonth: 18,
      defaultDayCount: defaultDays,
      guests: {
        rooms: 1,
        adults: 1,
        children: [],
      },
      guestsFormattedMessage: '',
      datesDatePicker: defaultDateRange,
      datesMonth: defaultDateRange,
      monthDays: defaultDays,
      formattedDatesForDatePicker: '',
      formattedDatesForMonth: '',
      activeFormattedDates: '',
      activeTabDates: 'dates',
      updateDatePickerDates: (from: Date, to?: Date) => {
        set(() => ({
          datesDatePicker: { from, to },
        }));
        set(() => {
          const formattedDateStr = getFormattedDateString(from, to);

          return {
            formattedDatesForDatePicker: formattedDateStr,
            activeFormattedDates: formattedDateStr,
          };
        });
      },
      resetDatesDatePicker: () => {
        set(() => ({
          activeFormattedDates: '',
          datesDatePicker: defaultDateRange,
          formattedDatesForDatePicker: '',
        }));
      },
      updateDatesForMonthByCounter: (days: number) => {
        set((state) => {
          if (state.datesMonth.from) {
            const formattedDateStr = getFormattedDateMonthString(
              state.datesMonth.from,
              days,
            );

            return {
              formattedDatesForMonth: formattedDateStr,
              activeFormattedDates: formattedDateStr,
            };
          }

          return {
            monthDays: days,
          };
        });
      },
      updateDatesForMonth: (date: Date) => {
        set((state) => {
          const formattedDateStr = getFormattedDateMonthString(
            date,
            state.monthDays,
          );
          return {
            datesMonth: {
              from: startOfMonth(date),
              to: endOfMonth(date),
            },
            monthDays: state.monthDays,
            formattedDatesForMonth: formattedDateStr,
            activeFormattedDates: formattedDateStr,
          };
        });
      },
      resetDatesForMonth: () => {
        set(() => ({
          monthDays: defaultDays,
          datesMonth: defaultDateRange,
          activeFormattedDates: '',
          formattedDatesForMonth: '',
        }));
      },
      updateGuests: (guests: GuestType) => {
        set(() => ({
          guests: guests,
          guestsFormattedMessage: getGuestFormattedMessage(guests),
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
      updateMonthDays: (days: number) => {
        return {
          monthDays: days,
        };
      },
    })),
  ),
);

export default useSearchFilterStore;
