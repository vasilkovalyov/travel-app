import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import bookingApi from '@/api/booking';
import { CountryType, CityType } from '@/types/locations';
import { ResponseItemsType } from '@/types/services';

interface CountriesState {
  countries: CountryType[];
  cities: CityType[];
  selectedCountry: CountryType | null;
  selectedCity: CityType | null;
  fetchCountries: (countryName?: string) => void;
  fetchCities: (countryName: string) => void;
}

const useCountryStore = create<CountriesState>()(
  devtools(
    immer((set) => ({
      countries: [],
      cities: [],
      selectedCountry: null,
      selectedCity: null,
      fetchCities: async (countryName: string) => {
        const response = await bookingApi.get<ResponseItemsType<CityType>>(
          'static/cities',
          {
            params: {
              country: countryName,
            },
          },
        );
        set({ cities: response.data.result });
      },
      fetchCountries: async (name?: string) => {
        const response = await bookingApi.get<ResponseItemsType<CountryType>>(
          'static/country',
          {
            params: {
              country: name,
            },
          },
        );

        set({ countries: response.data.result });
      },
    })),
  ),
);

export default useCountryStore;
