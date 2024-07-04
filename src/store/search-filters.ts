import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { format } from 'date-fns';

import { baseDateFormat } from '@/constants/dates';

import { DateRange } from '@/types/common';

interface SearchFiltersState {
  datesDatePicker: DateRange;
  datesMonth: DateRange;
  formattedDatesForDatePicker: string;
  formattedDatesForMonth: string;
  activeFormattedDates: string;
  activeTabDates: string;
  updateDatePickerDates: (from: Date, to?: Date) => void;
  clearActiveFormattedDates: () => void;
  clearDatesDatePicker: () => void;
  updateTab: (tab: string) => void;
}

const defaultDateRange: DateRange = {
  from: undefined,
  to: undefined,
};

const useSearchFilterStore = create<SearchFiltersState>()(
  devtools(
    immer((set) => ({
      guestsFormattedMessage: '',
      datesDatePicker: defaultDateRange,
      datesMonth: defaultDateRange,
      formattedDatesForDatePicker: '',
      formattedDatesForMonth: '',
      activeFormattedDates: '',
      activeTabDates: 'dates',
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
