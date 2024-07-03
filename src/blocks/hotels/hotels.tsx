import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useStaticFilterStore } from '@/store';

import { HotelCard, FilterModal, hotelModel } from '@/components';
import { Button, IconEnum } from '@/components/ui';
import { BlockFilter } from '../filter';

import { breakpoints } from '@/constants/breakpoints';

import './hotels.scss';

export default function BlockHotels() {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const { selectedFilterCount } = useStaticFilterStore((store) => store);

  const isTabletMd = useMediaQuery({
    query: `(min-width: ${breakpoints.tabletMd}px)`,
  });

  return (
    <section className="block-hotels">
      <div className="block-hotels__container container">
        <div className="block-hotels__content">
          <h2>174 Holiday results</h2>
          <p>
            Some of these hotels are sponsored, which may affect their position
            in our listings. Not found what you’re looking for? Try reducing
            your search to one destination or call our travel experts.
          </p>
        </div>
        {!isTabletMd && (
          <div className="block-hotels__filter-toggler-container">
            <Button
              icon={IconEnum.FILTER}
              iconSize={20}
              className="filter-toggler-btn"
              size="md"
              onClick={() => setOpenFilter(!openFilter)}
            >
              Filter results{''}
              {selectedFilterCount !== 0 && (
                <span className="filter-toggler-btn__counter">
                  {selectedFilterCount}
                </span>
              )}
            </Button>
          </div>
        )}
        <div className="block-hotels__grid">
          {isTabletMd && (
            <aside className="block-hotels__sidebar">
              <BlockFilter />
            </aside>
          )}
          <div className="block-hotels__list">
            <HotelCard {...hotelModel} />
          </div>
        </div>
      </div>
      {openFilter && (
        <FilterModal
          open={openFilter}
          title="Filter Results"
          onHandleClose={() => setOpenFilter(false)}
        >
          <BlockFilter />
        </FilterModal>
      )}
    </section>
  );
}
