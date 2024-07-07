import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Popover } from 'react-tiny-popover';
import { useMediaQuery } from 'react-responsive';
import { format } from 'date-fns';

import { useSearchFilterStore } from '@/store';
import { FilterToggler, Modal } from '@/components';
import { shortDateFormat3 } from '@/constants/dates';
import { breakpoints } from '@/constants/breakpoints';
import { Button, FieldPlaceholder, IconEnum } from '@/components/ui';

import {
  BlockDatePickerTab,
  DatePickerModalResult,
} from '../date-pickers-search';
import { BlockGuestClass, GuestClassModalResult } from '../guest-class-search';

import './top-search.scss';

enum EnumFilterToggler {
  Destination = 'destination',
  TravelDates = 'travel_dates',
  Guests = 'guests',
}

export default function TopSearch() {
  const { datePicker, guests, activeFormattedDates } = useSearchFilterStore();

  const [visibleFilters, setVisibleFilters] = useState<boolean>(false);
  const [popoverActive, setPopoverActive] = useState<EnumFilterToggler | null>(
    null,
  );
  // const [modalDestinationActive, setModalDestinationActive] =
  //   useState<boolean>(false);
  const [modalTravelActive, setModalTravelActive] = useState<boolean>(false);
  const [modalGuestsActive, setModalGuestsActive] = useState<boolean>(false);

  const isTabletMd = useMediaQuery({
    query: `(min-width: ${breakpoints.tabletMd}px)`,
  });

  function onHandleClickFilter(nameFilter: EnumFilterToggler | null) {
    if (isTabletMd) {
      setPopoverActive(nameFilter);
    }
  }

  function onHandleClickModal(nameFilter: EnumFilterToggler) {
    if (isTabletMd) return;
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

  return (
    <div className="top-search">
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
          className={cn('top-search__filters', {
            'top-search__filters--visible': visibleFilters,
          })}
        >
          <FilterToggler
            id="destination-field"
            label="Going to"
            placeholder="Destination name"
            onFocus={() => {
              onHandleClickFilter(EnumFilterToggler.Destination);
            }}
            onClick={() => {
              onHandleClickModal(EnumFilterToggler.Destination);
            }}
          />
          <Popover
            isOpen={popoverActive === EnumFilterToggler.TravelDates}
            positions={['bottom', 'left']}
            align="center"
            padding={20}
            onClickOutside={() => onHandleClickFilter(null)}
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
              onFocus={() => {
                onHandleClickFilter(EnumFilterToggler.TravelDates);
              }}
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
            onClickOutside={() => onHandleClickFilter(null)}
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
              onFocus={() => onHandleClickFilter(EnumFilterToggler.Guests)}
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
          >
            Search
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
          <Button icon={IconEnum.EDIT} variant="secondary" size="sm">
            Edit
          </Button>
          <Button
            className="top-search__placeholders-btn"
            view="transparent"
            onClick={() => setVisibleFilters(true)}
          ></Button>
        </div>
      </div>
      <Modal
        open={modalTravelActive}
        title="Travel dates"
        bottomContent={
          <DatePickerModalResult
            onHandleClick={() => setModalTravelActive(false)}
          />
        }
        onHandleClose={() => setModalTravelActive(false)}
      >
        <BlockDatePickerTab />
      </Modal>
      <Modal
        title="Guests & Cabin Class"
        open={modalGuestsActive}
        bottomContent={
          <GuestClassModalResult
            onHandleClick={() => setModalGuestsActive(false)}
          />
        }
        onHandleClose={() => setModalGuestsActive(false)}
      >
        <BlockGuestClass />
      </Modal>
    </div>
  );
}
