import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Popover } from 'react-tiny-popover';
import { useMediaQuery } from 'react-responsive';
import { format } from 'date-fns';

import { useSearchFilterStore } from '@/store';
import {
  FilterToggler,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from '@/components';
import { shortDateFormat3 } from '@/constants/dates';
import { breakpoints } from '@/constants/breakpoints';
import { Button, FieldPlaceholder, IconEnum } from '@/components/ui';

import {
  BlockDatePickerTab,
  DatePickerModalResult,
} from '../date-pickers-search';
import { BlockGuestClass, GuestClassModalResult } from '../guest-class-search';
import { dataAttributes } from './top-search.attributes';

import './top-search.scss';

enum EnumFilterToggler {
  Destination = 'destination',
  TravelDates = 'travel_dates',
  Guests = 'guests',
}

export default function TopSearch() {
  const {
    datePicker,
    guests,
    activeFormattedDates,
    getSearchFilterUrlParams,
    setToStoreSearchParamsFromUrl,
  } = useSearchFilterStore();

  const [visibleFilters, setVisibleFilters] = useState<boolean>(false);
  const [popoverActive, setPopoverActive] = useState<EnumFilterToggler | null>(
    null,
  );

  const [modalTravelActive, setModalTravelActive] = useState<boolean>(false);
  const [modalGuestsActive, setModalGuestsActive] = useState<boolean>(false);

  const isTabletMd = useMediaQuery({
    query: `(min-width: ${breakpoints.tabletMd}px)`,
  });

  function onHandleClickModal(nameFilter: EnumFilterToggler) {
    if (isTabletMd) {
      setPopoverActive(nameFilter);
      return;
    }
    if (nameFilter === EnumFilterToggler.TravelDates) {
      setModalTravelActive(true);
      return;
    }
    if (nameFilter === EnumFilterToggler.Guests) {
      setModalGuestsActive(true);
      return;
    }
  }

  const getFilterPlaceholderDescription = () => {
    const dateFrom =
      datePicker.datesRange.from &&
      format(datePicker.datesRange.from, shortDateFormat3);
    const dateTo =
      datePicker.datesRange.to &&
      format(datePicker.datesRange.to, shortDateFormat3);

    const dates = dateFrom && dateTo ? `${dateFrom} - ${dateTo} · ` : '';

    const guestText = guests.result.adults >= 2 ? 'adults' : 'adult';
    const roomText = guests.result.rooms >= 2 ? 'rooms' : 'room';
    const childText = guests.result.children >= 2 ? 'children' : 'child';

    const childrenText = guests.result.children
      ? `, ${guests.result.children} ${childText}`
      : '';

    return `${dates} ${guests.result.adults} ${guestText}, ${guests.result.rooms} ${roomText} ${childrenText}`;
  };

  function onHandleSearch() {
    const currentUrl = new URL(window.location.toString());
    const formattedUrl = getSearchFilterUrlParams();
    for (let [key, item] of formattedUrl.entries()) {
      currentUrl.searchParams.set(key, item);
    }
    window.history.pushState({}, '', currentUrl.href);
  }

  useEffect(() => {
    const currentUrl = new URL(window.location.toString());
    setToStoreSearchParamsFromUrl(currentUrl.searchParams);
  }, []);

  return (
    <div data-testid={dataAttributes.rootBlock} className="top-search">
      <div className="container top-search__container">
        <div
          className={cn('top-search__toggler', {
            'top-search__toggler--visible': visibleFilters,
          })}
        >
          <Button
            view="outline"
            icon={IconEnum.EYE_CROSSED}
            size="sm"
            onClick={() => setVisibleFilters(false)}
          >
            Hide
          </Button>
        </div>
        <div
          className={cn('top-search__placeholders', {
            'top-search__placeholders--hide': visibleFilters,
          })}
        >
          <FieldPlaceholder
            // title="Anywhere · LGW + 5"
            description={getFilterPlaceholderDescription()}
            className="top-search__placeholder-common"
          />
          <div className="top-search__placeholders-grid">
            <FieldPlaceholder title="Anywhere" />
            <FieldPlaceholder title={activeFormattedDates} />
            <FieldPlaceholder title={guests.formattedMessage} />
          </div>
          <Button
            icon={IconEnum.EDIT}
            variant="secondary"
            size="sm"
            tabIndex={1}
          >
            Edit
          </Button>
          <Button
            className="top-search__placeholders-btn"
            view="transparent"
            onClick={() => setVisibleFilters(true)}
          ></Button>
        </div>
        <div
          className={cn('top-search__filters', {
            'top-search__filters--visible': visibleFilters,
          })}
        >
          <FilterToggler
            id="destination-field"
            label="Going to"
            placeholder="Destination name"
            resetToggler
            dataTestIdInput={dataAttributes.filterTogglerDestinationInput}
            dataTestIdButton={dataAttributes.filterTogglerDestinationBottom}
            onClick={() => {
              onHandleClickModal(EnumFilterToggler.Destination);
            }}
          />
          <Popover
            isOpen={popoverActive === EnumFilterToggler.TravelDates}
            positions={['bottom', 'left']}
            align="center"
            padding={20}
            onClickOutside={() => setPopoverActive(null)}
            clickOutsideCapture={true}
            content={
              <div className="popover">
                <BlockDatePickerTab />
              </div>
            }
          >
            <FilterToggler
              id="travel-date-field"
              label="Travel dates"
              text={activeFormattedDates}
              readonly
              dataTestIdInput={dataAttributes.filterTogglerTravelInput}
              dataTestIdButton={dataAttributes.filterTogglerTravelBottom}
              onClick={() => {
                onHandleClickModal(EnumFilterToggler.TravelDates);
              }}
            />
          </Popover>
          <Popover
            isOpen={popoverActive === EnumFilterToggler.Guests}
            positions={['bottom', 'right']}
            align="end"
            padding={20}
            onClickOutside={() => setPopoverActive(null)}
            clickOutsideCapture={true}
            content={
              <div className="popover">
                <BlockGuestClass />
              </div>
            }
          >
            <FilterToggler
              id="guests-field"
              label="Guests & cabin class"
              text={guests.formattedMessage}
              readonly
              dataTestIdInput={dataAttributes.filterTogglerGuestsInput}
              dataTestIdButton={dataAttributes.filterTogglerGuestsButton}
              onClick={() => {
                onHandleClickModal(EnumFilterToggler.Guests);
              }}
            />
          </Popover>
          <Button
            icon={IconEnum.SEARCH}
            iconSize={24}
            variant="secondary"
            size="xl"
            className="top-search__search-btn"
            onClick={onHandleSearch}
          >
            Search
          </Button>
        </div>
      </div>
      <Modal
        open={modalTravelActive}
        onClose={() => setModalTravelActive(false)}
      >
        <ModalHeader title="Travel dates" />
        <ModalContent innerPadding>
          <BlockDatePickerTab />
        </ModalContent>
        <ModalFooter>
          <DatePickerModalResult
            onHandleClick={() => setModalTravelActive(false)}
          />
        </ModalFooter>
      </Modal>
      <Modal
        open={modalGuestsActive}
        onClose={() => setModalGuestsActive(false)}
      >
        <ModalHeader title="Guests & Cabin Class" />
        <ModalContent innerPadding>
          <BlockGuestClass />
        </ModalContent>
        <ModalFooter>
          <GuestClassModalResult
            onHandleClick={() => setModalGuestsActive(false)}
          />
        </ModalFooter>
      </Modal>
    </div>
  );
}
