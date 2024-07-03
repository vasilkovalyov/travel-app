export type CountryType = {
  country: string;
  name: string;
  area: string;
};

export type CityType = {
  city_id: number;
  name: string;
  nr_hotels: number;
  country: string;
  latitude: string;
  longitude: string;
  timezone_name: string;
  timezone_offset: number;
};
