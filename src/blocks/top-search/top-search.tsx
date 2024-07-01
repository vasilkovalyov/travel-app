import { useState } from 'react';
import cn from 'classnames';
import { Button, FieldPlaceholder, IconEnum, Input } from '@/components/ui';

import './top-search.scss';

export default function TopSearch() {
  const [visibleFilters, setVisibleFilters] = useState<boolean>(false);

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
          <Input label="Going to" largeSize clearTextButton />
          <Input label="Travel dates" largeSize clearTextButton />
          <Input label="Guests & Cabin Class" largeSize clearTextButton />
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
            <FieldPlaceholder title="London Gatwick (+ 5 others)" />
            <FieldPlaceholder title="Jul 8, 2024 - Jul 12, 2024" />
            <FieldPlaceholder title="2 Adults, 1 Room, Economy" />
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
    </div>
  );
}
