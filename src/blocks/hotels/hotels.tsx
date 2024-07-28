import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useSearchFilterStore, useStaticFilterStore } from '@/store';
import { breakpoints } from '@/constants/breakpoints';

import {
  HotelCard,
  hotelModel,
  ModalAside,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Modal,
  SwitcherList,
} from '@/components';
import { Button, IconEnum } from '@/components/ui';
import { BlockFilter } from '../filter';

import './hotels.scss';

export default function BlockHotels() {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openModalSortBy, setOpenModalSortBy] = useState<boolean>(false);
  const { selectedFilterCount } = useStaticFilterStore((store) => store);

  const {
    sortByList,
    selectedSortId,
    updateSortBy,
    getSelectedSortTitle,
    getSearchFilterUrlParams,
  } = useSearchFilterStore();

  const isTabletMd = useMediaQuery({
    query: `(min-width: ${breakpoints.tabletMd}px)`,
  });

  function onHandleCloseModal() {
    setOpenFilter(false);
  }

  function closeSortByModal() {
    setOpenModalSortBy(false);
  }

  function onHandleChangeSort(id: string) {
    updateSortBy(id);
    closeSortByModal();
    const currentUrl = new URL(window.location.toString());
    const formattedUrl = getSearchFilterUrlParams();
    for (let [key, item] of formattedUrl.entries()) {
      currentUrl.searchParams.set(key, item);
    }
    window.history.pushState({}, '', currentUrl.href);
  }

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
              Filter results
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
          <div className="block-hotels__main-content">
            <div className="block-hotels__configuration-list">
              <div className="sort-by">
                <p className="sort-by__title">Sort by:</p>
                <Button
                  view="transparent"
                  size="lg"
                  onClick={() => setOpenModalSortBy(true)}
                >
                  {getSelectedSortTitle()}
                </Button>
              </div>
            </div>
            <div className="block-hotels__list">
              <HotelCard {...hotelModel} />
              <HotelCard {...hotelModel} />
              <HotelCard {...hotelModel} />
            </div>
          </div>
        </div>
      </div>
      <ModalAside
        id="side-modal-filter"
        title="Filter Results"
        open={openFilter}
        onClose={onHandleCloseModal}
      >
        <ModalHeader title="Filter Results" />
        <ModalContent innerPadding>
          <BlockFilter />
        </ModalContent>
        <ModalFooter>
          <Button
            variant="secondary"
            size="lg"
            fullwidth
            onClick={onHandleCloseModal}
          >
            Looking for matches
          </Button>
        </ModalFooter>
      </ModalAside>
      <Modal open={openModalSortBy} onClose={closeSortByModal} size="small">
        <ModalHeader title="Sort by" />
        <ModalContent>
          <SwitcherList
            items={sortByList}
            checkedId={selectedSortId}
            onClick={onHandleChangeSort}
          />
        </ModalContent>
      </Modal>
    </section>
  );
}
