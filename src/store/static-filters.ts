import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { getTotalCountOfNumbersInObject } from '@/utils/common';

// import bookingApi from '@/api/booking';
// import { ResponseItemsType } from '@/types/services';

import {
  FacilityType,
  HotelFacilityType,
  RoomType,
  RoomFacilityType,
  HotelType,
} from '@/types/static-filters';

import hotelsData from '@/assets/data/hotels.json';
import facilityTypesData from '@/assets/data/facility-types.json';
import hotelFacilityTypesData from '@/assets/data/hotel-facility-types.json';
import roomFacilityTypesData from '@/assets/data/room-facility-types.json';
import roomTypesData from '@/assets/data/room-types.json';

interface StaticFiltersState {
  selectedFilters: {
    [key in string]: number[];
  };
  selectedFilterCount: number;
  loading: boolean;
  facilitiesTypes: FacilityType[];
  hotelFacilitiesTypes: HotelFacilityType[];
  roomTypes: RoomType[];
  roomFacilityTypes: RoomFacilityType[];
  hotelTypes: HotelType[];
  startLoading: () => void;
  endLoading: () => void;
  updateSelectFilters: (key: string, ids: number[]) => void;
  resetSelectFilters: () => void;
  fetchFacilitiesTypes: () => void;
  fetchHotelsFacilitiesTypes: () => void;
  fetchRoomTypes: () => void;
  fetchRoomFacilityTypes: () => void;
  fetchHotelTypes: () => void;
}

const defaultSelectedFilters = {
  facility_type: [],
  hotel_facility_type: [],
  room_type: [],
  room_facility_type: [],
  hotel_type: [],
};

const useStaticFilterStore = create<StaticFiltersState>()(
  devtools(
    immer((set) => ({
      loading: false,
      selectedFilters: defaultSelectedFilters,
      selectedFilterCount: 0,
      facilitiesTypes: [],
      hotelFacilitiesTypes: [],
      roomTypes: [],
      roomFacilityTypes: [],
      hotelTypes: [],
      resetSelectFilters: () => {
        set(() => ({
          selectedFilters: defaultSelectedFilters,
          selectedFilterCount: 0,
        }));
      },
      updateSelectFilters: (key: string, ids: number[]) => {
        set((state) => ({
          selectedFilters: {
            ...state.selectedFilters,
            [key]: ids,
          },
        }));
        set((state) => {
          const update = getTotalCountOfNumbersInObject(state.selectedFilters);
          return {
            selectedFilterCount: update,
          };
        });
      },

      startLoading: () => {
        set({ loading: true });
      },
      endLoading: () => {
        set({ loading: false });
      },
      fetchFacilitiesTypes: async () => {
        // const response = await bookingApi.get<ResponseItemsType<FacilityType>>(
        //   'static/facility-types',
        // );
        // set({ facilitiesTypes: response.data.result });
        set({ facilitiesTypes: facilityTypesData.result });
      },
      fetchHotelsFacilitiesTypes: async () => {
        // const response = await bookingApi.get<
        //   ResponseItemsType<HotelFacilityType>
        // >('static/hotel-facility-types');
        // set({ hotelFacilitiesTypes: response.data.result });
        set({ hotelFacilitiesTypes: hotelFacilityTypesData.result });
      },
      fetchRoomTypes: async () => {
        // const response =
        //   await bookingApi.get<ResponseItemsType<RoomType>>(
        //     'static/room-types',
        //   );
        // set({ roomTypes: response.data.result });
        set({ roomTypes: roomTypesData.result });
      },
      fetchRoomFacilityTypes: async () => {
        // const response = await bookingApi.get<
        //   ResponseItemsType<RoomFacilityType>
        // >('static/room-facility-types');
        // set({ roomFacilityTypes: response.data.result });
        set({ roomFacilityTypes: roomFacilityTypesData.result });
      },
      fetchHotelTypes: async () => {
        // const response =
        //   await bookingApi.get<ResponseItemsType<HotelType>>(
        //     'static/hotel-types',
        //   );
        // set({ hotelTypes: response.data.result });
        set({ hotelTypes: hotelsData.result });
      },
    })),
  ),
);

export default useStaticFilterStore;
