import { BlockHotels } from '@/blocks';
import TopSearch from '@/blocks/top-search/top-search';
import { useStaticFilterStore } from '@/store';
import { useEffect } from 'react';
// import bookingApi from '@/api/booking';

export default function Home() {
  const {
    fetchFacilitiesTypes,
    fetchHotelTypes,
    fetchHotelsFacilitiesTypes,
    fetchRoomFacilityTypes,
    fetchRoomTypes,
    startLoading,
    endLoading,
  } = useStaticFilterStore((store) => store);

  function loadingFilters() {
    try {
      startLoading();
      fetchFacilitiesTypes();
      fetchHotelTypes();
      fetchHotelsFacilitiesTypes();
      fetchRoomFacilityTypes();
      fetchRoomTypes();
    } catch (e) {
      console.log(e);
    } finally {
      endLoading();
    }
  }

  useEffect(() => {
    loadingFilters();
  }, []);

  return (
    <div>
      <TopSearch />
      <BlockHotels />
    </div>
  );
}
