import { useState } from 'react';
import cn from 'classnames';
import { Popover } from 'react-tiny-popover';
import { useMediaQuery } from 'react-responsive';

import { useSearchFilterStore } from '@/store';
import { FilterToggler, Modal } from '@/components';
import { breakpoints } from '@/constants/breakpoints';
import { Button, FieldPlaceholder, IconEnum } from '@/components/ui';

import GuestClass from '../guests-class/guests-class';
import {
  BlockDatePickerTab,
  DatePickerModalResult,
} from '../date-pickers-search';

import './top-search.scss';

enum EnumFilterToggler {
  Destination = 'destination',
  TravelDates = 'travel_dates',
  Guests = 'guests',
}

export default function TopSearch() {
  const { activeFormattedDates, guestsFormattedMessage } =
    useSearchFilterStore();

  const [visibleFilters, setVisibleFilters] = useState<boolean>(false);
  const [popoverActive, setPopoverActive] = useState<string | null>(null);

  const [modalTravelActive, setModalTravelActive] = useState<boolean>(false);

  const isTabletMd = useMediaQuery({
    query: `(min-width: ${breakpoints.tabletMd}px)`,
  });

  function onHandleClickFilter(nameFilter: string | null) {
    if (isTabletMd) {
      setPopoverActive(nameFilter);
    }
  }

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
            label="Going to"
            placeholder="Destination name"
            onFocus={() => {
              onHandleClickFilter(EnumFilterToggler.Destination);
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
              label="Travel dates"
              text={activeFormattedDates}
              readonly
              onFocus={() => {
                onHandleClickFilter(EnumFilterToggler.TravelDates);
              }}
              onClick={() => {
                setModalTravelActive(true);
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
                <GuestClass />
              </div>
            }
          >
            <FilterToggler
              label="Guests & cabin class"
              text={guestsFormattedMessage}
              readonly
              onFocus={() => onHandleClickFilter(EnumFilterToggler.Guests)}
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
            title="Anywhere · LGW + 5"
            description="Jul 8 - Jul 12 · 2 Adults, 1 Room, Economy"
            className="top-search__placeholder-common"
          />
          <div className="top-search__placeholders-grid">
            <FieldPlaceholder title="Anywhere" />
            <FieldPlaceholder title={activeFormattedDates} />
            <FieldPlaceholder title={guestsFormattedMessage} />
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
    </div>
  );
}
