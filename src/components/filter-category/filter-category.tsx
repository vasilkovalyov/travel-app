import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Button, Checkbox, Icon, IconEnum } from '../ui';

import {
  getFilterItemsChekedId,
  getFilterItemsExtended,
  getFilterItemsUpdateChecked,
} from './filter-category.utils';

import {
  FilterCategoryProps,
  FilterSelectCategoryType,
} from './filter-category.type';

import './filter-category.scss';

export default function FilterCategory({
  name,
  title,
  items = [],
  checkedItems = [],
  visibleLimit = 6,
  onChange,
}: FilterCategoryProps) {
  const [visibleItems, setVisibleItems] = useState<FilterSelectCategoryType[]>(
    [],
  );
  const [invisibleItems, setInvisibleItems] = useState<
    FilterSelectCategoryType[]
  >([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isShowedMore, setIsShowedMore] = useState<boolean>(false);

  useEffect(() => {
    const filterItemsExtended = getFilterItemsExtended(items, checkedItems);
    if (visibleLimit && filterItemsExtended.length > visibleLimit) {
      const visibleFilterItems = filterItemsExtended.splice(0, visibleLimit);
      setVisibleItems(visibleFilterItems);
      setInvisibleItems(filterItemsExtended);
    } else {
      setVisibleItems(filterItemsExtended);
    }
  }, []);

  function onHandleChangeCheckbox(id: number) {
    const filterItemsUpdateChecked = getFilterItemsUpdateChecked(
      visibleItems,
      id,
    );
    setVisibleItems(filterItemsUpdateChecked);

    let invisibleFormattedFilters: FilterSelectCategoryType[] = invisibleItems;

    if (isShowedMore) {
      invisibleFormattedFilters = getFilterItemsUpdateChecked(
        invisibleItems,
        id,
      );
      setInvisibleItems(invisibleFormattedFilters);
    }

    const checkedIds = getFilterItemsChekedId([
      ...filterItemsUpdateChecked,
      ...invisibleFormattedFilters,
    ]);

    onChange && onChange(checkedIds);
  }

  function renderFilterItems(filterItems: FilterSelectCategoryType[]) {
    return filterItems.map(({ id, title, checked }) => (
      <li key={id} className="filter-category__item">
        <Checkbox
          name={name}
          label={title}
          checked={checked}
          onChange={(_) => {
            onHandleChangeCheckbox(id);
          }}
        />
      </li>
    ));
  }

  return (
    <div className="filter-category">
      <div
        role="button"
        className={cn('filter-category__toggler', {
          'filter-category__toggler--active': isExpanded,
        })}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h5 className="filter-category__heading">{title}</h5>
        <Icon icon={IconEnum.CHEVRON_DOWN} />
      </div>
      <div
        className={cn('filter-category__toggle-box', {
          'filter-category__toggle-box--active': !isExpanded,
        })}
      >
        <ul className="filter-category__list">
          {visibleItems.length ? renderFilterItems(visibleItems) : null}
          {isShowedMore && invisibleItems.length
            ? renderFilterItems(invisibleItems)
            : null}
          {items.length > visibleLimit && (
            <Button
              view="transparent"
              className={cn('filter-category__show-more-btn', {
                'filter-category__show-more-btn--active': isShowedMore,
              })}
              icon={IconEnum.CHEVRON_DOWN}
              iconRight
              onClick={() => setIsShowedMore(!isShowedMore)}
            >
              {isShowedMore
                ? 'Show less'
                : `Show ${invisibleItems.length} more`}
            </Button>
          )}
        </ul>
      </div>
    </div>
  );
}