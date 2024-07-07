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
import { SearchFiltersState } from './types';
import { GuestRoomType } from '@/blocks/guest-class-search';
import {
  getGuestFormattedMessage,
  getGuestTypeInfo,
  getTotalChildren,
  getUpdatedRoom,
} from './utils';

const defaultDateRange: DateRange = {
  from: undefined,
  to: undefined,
};

const defaultGuests = {
  result: {
    rooms: 1,
    adults: 1,
    children: 0,
  },
  formattedMessage: '',
  rooms: [
    {
      room: 1,
      adults: 1,
      children: [],
    },
  ],
};

const defaultDays = 7;

const useSearchFilterStore = create<SearchFiltersState>()(
  devtools(
    immer((set) => ({
      datePicker: {
        messageDeparture: 'Select a departure date',
        messageReturn: 'Select a return date',
        formattedDates: '',
        datesRange: defaultDateRange,
        daysRangeCount: 0,
      },
      dateMonth: {
        messageMonthsDate: 'Select a month',
        formattedDates: '',
        countMonth: 18,
        defaultDayCount: defaultDays,
        datesRange: defaultDateRange,
        days: defaultDays,
      },
      guests: defaultGuests,
      guestsFormattedMessage: '',
      activeFormattedDates: '',
      activeTabDates: DatepickerTabEnum.Dates,
      updateRooms: (rooms: GuestRoomType[], roomNumber: number) =>
        set((state) => {
          const updatedRooms = getUpdatedRoom(rooms, roomNumber);
          const result = getGuestTypeInfo(updatedRooms);
          state.guests.rooms = updatedRooms;
          state.guests.result = result;
          state.guests.formattedMessage = getGuestFormattedMessage(result);
        }),
      resetGuests: () =>
        set((state) => {
          state.guests = defaultGuests;
        }),
      updateAdults: (roomNumber: number, adultCount: number) =>
        set((state) => {
          const updatedRooms = [...state.guests.rooms];
          updatedRooms[roomNumber - 1].adults = adultCount;
          state.guests.rooms = updatedRooms;
          state.guests.result.adults = adultCount;
          state.guests.formattedMessage = getGuestFormattedMessage(
            state.guests.result,
          );
        }),
      updateChildren: (roomNumber: number, childrenCount: number) =>
        set((state) => {
          const updatedRooms = [...state.guests.rooms];
          if (childrenCount === 0) {
            updatedRooms[roomNumber - 1].children = [];
            state.guests.rooms = updatedRooms;
            const guestResult = getGuestTypeInfo(updatedRooms);
            state.guests.result.children = guestResult.children;
            state.guests.formattedMessage = getGuestFormattedMessage(
              state.guests.result,
            );
            return;
          }
          if (updatedRooms[roomNumber - 1].children.length > childrenCount) {
            updatedRooms[roomNumber - 1].children.pop();
          } else {
            updatedRooms[roomNumber - 1].children.push(0);
          }
          state.guests.rooms = updatedRooms;
          state.guests.result.children = getTotalChildren(updatedRooms);
          state.guests.formattedMessage = getGuestFormattedMessage(
            state.guests.result,
          );
        }),
      updateChildAge: (
        roomNumber: number,
        childNumber: number,
        childAge: number,
      ) =>
        set((state) => {
          const updatedRooms = [...state.guests.rooms];
          updatedRooms[roomNumber - 1].children[childNumber] = childAge;
          state.guests.rooms = updatedRooms;
        }),
      updateDatePickerDates: (from: Date, to?: Date) =>
        set((state) => {
          if (to) {
            state.datePicker.daysRangeCount =
              intervalToDuration({
                start: from,
                end: to,
              }).days || 0;
          }
          const formattedDateStr = getFormattedDateString(from, to);
          state.datePicker.formattedDates = formattedDateStr;
          state.activeFormattedDates = formattedDateStr;
          state.datePicker.datesRange = { from, to };
        }),
      resetDatePickerDates: () =>
        set((state) => {
          state.activeFormattedDates = '';
          state.datePicker.datesRange = defaultDateRange;
          state.datePicker.formattedDates = '';
          state.datePicker.daysRangeCount = 0;
        }),
      updateDateMonthByCounter: (days: number) =>
        set((state) => {
          if (state.dateMonth.datesRange.from) {
            const formattedDateStr = getFormattedDateMonthString(
              state.dateMonth.datesRange.from,
              days,
            );

            state.activeFormattedDates = formattedDateStr;
            state.dateMonth.days = days;
            state.dateMonth.formattedDates = formattedDateStr;
          }
          state.dateMonth.days = days;
        }),
      updateDateMonth: (date: Date) =>
        set((state) => {
          const formattedDateStr = getFormattedDateMonthString(
            date,
            state.dateMonth.days,
          );
          state.dateMonth.datesRange = {
            from: startOfMonth(date),
            to: endOfMonth(date),
          };
          state.dateMonth.days = state.dateMonth.days;
          state.dateMonth.formattedDates = formattedDateStr;
        }),
      updateDaysMonth: (days: number) =>
        set((state) => {
          state.dateMonth.days = days;
        }),
      resetDateMonth: () =>
        set((state) => {
          state.dateMonth.days = state.dateMonth.defaultDayCount;
          state.dateMonth.datesRange = defaultDateRange;
          state.dateMonth.formattedDates = '';
        }),
      clearActiveFormattedDates: () =>
        set((state) => {
          state.activeFormattedDates = '';
        }),
      updateTab: (tab: DatepickerTabEnum) =>
        set((state) => {
          let formattedDateStr = '';
          if (tab === DatepickerTabEnum.Dates) {
            formattedDateStr = state.datePicker.formattedDates;
          }
          if (tab === DatepickerTabEnum.Month) {
            formattedDateStr = state.dateMonth.formattedDates;
          }

          state.activeTabDates = tab;
          state.activeFormattedDates = formattedDateStr;
        }),
    })),
  ),
);

export default useSearchFilterStore;
