import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { startOfMonth, endOfMonth, intervalToDuration } from 'date-fns';

import { DateRange } from '@/types/common';
import {
  getFormattedDateMonthString,
  getFormattedDateString,
} from '@/utils/common';

import { DatepickerTabEnum } from '@/blocks/date-pickers-search';
import { GuestType, SearchFiltersState } from './types';

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
      datePicker: {
        messageDepartureDate: 'Select a departure date',
        messageReturnDate: 'Select a return date',
        datesDatePicker: defaultDateRange,
        formattedDatesForDatePicker: '',
        datesDays: 0,
      },
      dateMonth: {
        messageMonthsDate: 'Select a month',
        countNextMonth: 18,
        defaultDayCount: defaultDays,
        datesMonth: defaultDateRange,
        monthDays: defaultDays,
        formattedDatesForMonth: '',
      },
      guests: {
        rooms: 1,
        adults: 1,
        children: [],
      },
      guestsFormattedMessage: '',
      activeFormattedDates: '',
      activeTabDates: DatepickerTabEnum.Dates,
      updateDatePickerDates: (from: Date, to?: Date) => {
        set((state) => ({
          datePicker: {
            ...state.datePicker,
            datesDatePicker: { from, to },
          },
        }));
        set((state) => {
          if (!to) return;
          return {
            datePicker: {
              ...state.datePicker,
              datePicker: intervalToDuration({
                start: from,
                end: to,
              }).days,
            },
          };
        });
        set((state) => {
          const formattedDateStr = getFormattedDateString(from, to);
          return {
            datePicker: {
              ...state.datePicker,
              formattedDatesForDatePicker: formattedDateStr,
            },
            activeFormattedDates: formattedDateStr,
          };
        });
      },
      resetDatesDatePicker: () => {
        set((state) => ({
          activeFormattedDates: '',
          datePicker: {
            ...state.datePicker,
            datesDatePicker: defaultDateRange,
            formattedDatesForDatePicker: '',
          },
        }));
      },
      updateDatesForMonthByCounter: (days: number) => {
        set((state) => {
          if (state.dateMonth.datesMonth.from) {
            const formattedDateStr = getFormattedDateMonthString(
              state.dateMonth.datesMonth.from,
              days,
            );

            return {
              activeFormattedDates: formattedDateStr,
              dateMonth: {
                ...state.dateMonth,
                monthDays: days,
                formattedDatesForMonth: formattedDateStr,
              },
            };
          }

          return {
            dateMonth: {
              ...state.dateMonth,
              monthDays: days,
            },
          };
        });
      },
      updateDatesForMonth: (date: Date) => {
        set((state) => {
          const formattedDateStr = getFormattedDateMonthString(
            date,
            state.dateMonth.monthDays,
          );
          return {
            dateMonth: {
              ...state.dateMonth,
              datesMonth: {
                from: startOfMonth(date),
                to: endOfMonth(date),
              },
              monthDays: state.dateMonth.monthDays,
              formattedDatesForMonth: formattedDateStr,
            },
            activeFormattedDates: formattedDateStr,
          };
        });
      },
      resetDatesForMonth: () => {
        set((state) => ({
          activeFormattedDates: '',
          dateMonth: {
            ...state.dateMonth,
            monthDays: state.dateMonth.defaultDayCount,
            datesMonth: defaultDateRange,
            formattedDatesForMonth: '',
          },
        }));
      },
      updateGuests: (guests: GuestType) => {
        set(() => ({
          guests: guests,
          guestsFormattedMessage: getGuestFormattedMessage(guests),
        }));
      },
      updateTab: (tab: DatepickerTabEnum) => {
        set((state) => {
          let formattedDateStr = '';
          if (tab === DatepickerTabEnum.Dates) {
            formattedDateStr = state.datePicker.formattedDatesForDatePicker;
          }
          if (tab === DatepickerTabEnum.Month) {
            formattedDateStr = state.dateMonth.formattedDatesForMonth;
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
        set((state) => {
          return {
            dateMonth: {
              ...state.dateMonth,
              monthDays: days,
            },
          };
        });
      },
    })),
  ),
);

export default useSearchFilterStore;
