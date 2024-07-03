export type FacilityType = {
  facility_type_id: number;
  name: string;
};

export type HotelFacilityType = {
  name: string;
  hotel_facility_type_id: number;
  facility_type_id: number;
};

export type RoomType = {
  room_type_id: number;
  name: string;
};

export type RoomFacilityType = {
  name: string;
  room_facility_type_id: number;
  facility_type_id: number;
};

export type HotelType = {
  name: string;
  hotel_type_id: number;
};
