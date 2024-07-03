import cn from 'classnames';
import { useStaticFilterStore } from '@/store';

import { Button } from '@/components/ui';
import { Accordion, FilterCategory, FilterRangePrices } from '@/components';

import { SidebarCategory } from './filter.type';
import SidebarFilterSkeleton from './filter-skeleton';

import './filter.scss';

function renderSkeletons() {
  const skeletons = Array.from(Array(3).keys());

  return (
    <>
      {skeletons.map((item) => (
        <SidebarFilterSkeleton key={item} />
      ))}
    </>
  );
}

export default function BlockFilter({ className }: { className?: string }) {
  const visibleLimit = 6;
  const {
    loading,
    facilitiesTypes,
    hotelFacilitiesTypes,
    roomTypes,
    roomFacilityTypes,
    hotelTypes,
    selectedFilters,
    updateSelectFilters,
    resetSelectFilters,
  } = useStaticFilterStore((store) => store);

  const categories: SidebarCategory[] = [
    {
      id: 'facility_type',
      title: 'Facilities Types',
      items: facilitiesTypes.map((item) => {
        return {
          id: item.facility_type_id,
          title: item.name,
        };
      }),
    },
    {
      id: 'hotel_facility_type',
      title: 'Hotel Facilities Types',
      items: hotelFacilitiesTypes.map((item) => {
        return {
          id: item.hotel_facility_type_id,
          title: item.name,
        };
      }),
    },
    {
      id: 'room_type',
      title: 'Room Types',
      items: roomTypes.map((item) => {
        return {
          id: item.room_type_id,
          title: item.name,
        };
      }),
    },
    {
      id: 'room_facility_type',
      title: 'Room Facility Types',
      items: roomFacilityTypes.map((item) => {
        return {
          id: item.room_facility_type_id,
          title: item.name,
        };
      }),
    },
    {
      id: 'hotel_type',
      title: 'Hotel Types',
      items: hotelTypes.map((item) => {
        return {
          id: item.hotel_type_id,
          title: item.name,
        };
      }),
    },
  ];

  return (
    <form className={cn('block-filter', className)}>
      <Button
        type="reset"
        view="outline"
        size="lg"
        onClick={resetSelectFilters}
      >
        Reset filters
      </Button>
      {!loading ? (
        <>
          <Accordion
            title="Total price"
            expanded={true}
            className="accordion-filter-category"
          >
            <FilterRangePrices min={100} max={1000} currency="$" />
          </Accordion>
          {categories.map((category) => (
            <Accordion
              key={category.id}
              title={category.title}
              expanded={true}
              className="accordion-filter-category"
            >
              <FilterCategory
                name="board-type"
                items={category.items}
                checkedItems={selectedFilters[category.id]}
                visibleLimit={visibleLimit}
                onChange={(e) => {
                  updateSelectFilters(category.id, e);
                }}
              />
            </Accordion>
          ))}
        </>
      ) : (
        renderSkeletons()
      )}
    </form>
  );
}
