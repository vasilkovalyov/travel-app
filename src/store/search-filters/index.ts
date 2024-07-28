import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { startOfMonth, endOfMonth, intervalToDuration, format } from 'date-fns';

import { DateRange } from '@/types/common';
import {
  getCountKeysOfArray,
  getFormattedDateMonthString,
  getFormattedDateString,
} from '@/utils/common';

import { DatepickerTabEnum } from '@/blocks/date-pickers-search';
import { GuestType, SearchFiltersState } from './types';
import { GuestRoomType } from '@/blocks/guest-class-search';
import {
  getGuestFormattedMessage,
  getGuestTypeInfo,
  getTotalChildren,
  getUpdatedRoom,
} from './utils';
import { standartDateFormatReversed } from '@/constants/dates';

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
    immer((set, get) => ({
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
      _setRooms: (rooms: GuestRoomType[]) =>
        set((state) => {
          const result = getGuestTypeInfo(rooms);
          state.guests.rooms = rooms;
          state.guests.result = result;
          state.guests.formattedMessage = getGuestFormattedMessage(result);
        }),
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
          const room = state.guests.rooms[0];
          const guestResult: GuestType = {
            rooms: 1,
            adults: room.adults,
            children: room.children.length,
          };
          state.guests.result = guestResult;
          state.guests.rooms.length = 1;
          state.guests.formattedMessage = getGuestFormattedMessage(guestResult);
        }),
      updateAdults: (roomNumber: number, adultCount: number) =>
        set((state) => {
          const updatedRooms = [...state.guests.rooms];
          updatedRooms[roomNumber - 1].adults = adultCount;
          state.guests.rooms = updatedRooms;
          state.guests.result.adults = getCountKeysOfArray(
            updatedRooms,
            'adults',
          );
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
            const guestResult = getCountKeysOfArray(updatedRooms, 'children');
            state.guests.result.children = guestResult;
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
          state.activeFormattedDates = formattedDateStr;
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
          state.activeFormattedDates = '';
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
      _getCheckInOutUrlSearchParams: () => {
        const state = get();
        const dateRange = state.datePicker.datesRange;
        const url = new URLSearchParams();

        if (dateRange.from) {
          url.append(
            'checkIn',
            format(dateRange.from, standartDateFormatReversed),
          );
        }
        if (dateRange.to) {
          url.append(
            'checkOut',
            format(dateRange.to, standartDateFormatReversed),
          );
        }
        return url;
      },
      _getGuestsUrlSearchParams: () => {
        const state = get();
        const url = new URLSearchParams();

        let childAgesTotal: number[] = [];

        for (let [index, room] of state.guests.rooms.entries()) {
          url.append(`rooms.${index}.adults`, room.adults.toString());
          if (room.children.length) {
            url.append(`rooms.${index}.childAges`, room.children.join(','));
          }
          childAgesTotal = [...childAgesTotal, ...room.children];
        }

        url.append('adults', state.guests.result.adults.toString());
        url.append('childAges', childAgesTotal.join(','));

        return url;
      },
      setToStoreSearchParamsFromUrl: (params: URLSearchParams) => {
        const state = get();
        let rooms: GuestRoomType[] = [];

        const rangeDates: Date[] = [];
        for (const [key, item] of params.entries()) {
          if (key === 'checkIn') rangeDates.push(new Date(item));
          if (key === 'checkOut') rangeDates.push(new Date(item));
          if (key.split('.')[2] === 'adults') {
            const index = +key.split('.')[1];
            rooms[index] = {
              ...rooms[index],
              room: index,
              adults: +item,
            };
          }
          if (key.split('.')[2] === 'childAges') {
            const index = +key.split('.')[1];
            rooms[index] = {
              ...rooms[index],
              room: index,
              children: item.split(',').map((item) => Number(item.trim())),
            };
          }
        }
        state.updateDatePickerDates(rangeDates[0], rangeDates[1]);
        state._setRooms(rooms);
      },
      getSearchFilterUrlParams: () => {
        const state = get();

        return new URLSearchParams({
          ...Object.fromEntries(state._getCheckInOutUrlSearchParams()),
          ...Object.fromEntries(state._getGuestsUrlSearchParams()),
        });
      },
    })),
  ),
);

export default useSearchFilterStore;
