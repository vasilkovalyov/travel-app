import { DatepickerTabEnum } from '@/blocks/date-pickers-search';
import { GuestRoomType } from '@/blocks/guest-class-search';
import { DateRange } from '@/types/common';

export type GuestType = {
  rooms: number;
  adults: number;
  children: number;
};

export interface SearchFiltersState {
  datePicker: {
    messageDeparture: string;
    messageReturn: string;
    datesRange: DateRange;
    formattedDates: string;
    daysRangeCount: number;
  };
  dateMonth: {
    formattedDates: string;
    messageMonthsDate: string;
    countMonth: number;
    defaultDayCount: number;
    datesRange: DateRange;
    days: number;
  };
  guests: {
    result: GuestType;
    formattedMessage: string;
    rooms: GuestRoomType[];
  };
  activeFormattedDates: string;
  activeTabDates: DatepickerTabEnum;
  sortByList: {
    id: string;
    title: string;
  }[];
  selectedSortId: string;
  updateSortBy: (id: string) => void;
  getSelectedSortTitle: () => string;
  _setRooms: (rooms: GuestRoomType[]) => void;
  updateRooms: (rooms: GuestRoomType[], roomNumber: number) => void;
  resetGuests: () => void;
  updateAdults: (roomNumber: number, adultCount: number) => void;
  updateChildren: (roomNumber: number, childrenCount: number) => void;
  updateChildAge: (
    roomNumber: number,
    childNumber: number,
    childAge: number,
  ) => void;
  updateDatePickerDates: (from: Date, to?: Date) => void;
  resetDatePickerDates: () => void;
  updateDateMonthByCounter: (days: number) => void;
  updateDateMonth: (from: Date) => void;
  updateDaysMonth: (days: number) => void;
  resetDateMonth: () => void;
  clearActiveFormattedDates: () => void;
  updateTab: (tab: DatepickerTabEnum) => void;
  _getSortUrlSearchParameter: () => URLSearchParams;
  _getCheckInOutUrlSearchParams: () => URLSearchParams;
  _getGuestsUrlSearchParams: () => URLSearchParams;
  setToStoreSearchParamsFromUrl: (params: URLSearchParams) => void;
  getSearchFilterUrlParams: () => URLSearchParams;
}
