import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Checkbox, Icon, IconEnum } from '../ui';

import {
  getCheckedIdFilters,
  getFormattedFilters,
  getUpdatedCheckedFilters,
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
}: FilterCategoryProps) {
  const [filterItems, setFilterItem] = useState<FilterSelectCategoryType[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isOpened, setIsOpened] = useState<boolean>(true);

  useEffect(() => {
    const formattedFilters = getFormattedFilters(items, checkedItems);
    setFilterItem(formattedFilters);
    setSelectedIds(getCheckedIdFilters(formattedFilters));
  }, []);

  function onHandleChangeCheckbox(id: number) {
    const formattedFilters = getUpdatedCheckedFilters(filterItems, id);
    setFilterItem(formattedFilters);
    setSelectedIds(getCheckedIdFilters(formattedFilters));
  }

  return (
    <div className="filter-category">
      <div
        role="button"
        className={cn('filter-category__toggler', {
          'filter-category__toggler--active': isOpened,
        })}
        onClick={() => setIsOpened(!isOpened)}
      >
        <h5 className="filter-category__heading">{title}</h5>
        <Icon icon={IconEnum.CHEVRON_DOWN} />
      </div>
      <div
        className={cn('filter-category__toggle-box', {
          'filter-category__toggle-box--active': !isOpened,
        })}
      >
        <ul className="filter-category__list">
          {filterItems.length
            ? filterItems.map(({ id, title, checked }) => (
                <li key={id} className="filter-category__item">
                  <Checkbox
                    name={name}
                    label={title}
                    checked={checked}
                    onChange={(e) => {
                      onHandleChangeCheckbox(id);
                    }}
                  />
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}
