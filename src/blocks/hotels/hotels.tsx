import { FilterPanel, HotelCard, hotelModel } from '@/components';
import { BlockSidebarFilter } from '../sidebar-filter';
import { Button, IconEnum } from '@/components/ui';

import './hotels.scss';

export default function BlockHotels() {
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
        <div className="block-hotels__filter-toggler-container">
          <Button
            icon={IconEnum.FILTER}
            iconSize={20}
            className="filter-toggler-btn"
            size="md"
          >
            Filter results{' '}
            <span className="filter-toggler-btn__counter">1</span>
          </Button>
        </div>
        <div className="block-hotels__grid">
          <BlockSidebarFilter className="block-hotels__sidebar-filter" />
          <div className="block-hotels__list">
            <HotelCard {...hotelModel} />
          </div>
        </div>
      </div>
    </section>
  );
}
