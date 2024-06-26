import {
  FilterCategoryItemType,
  FilterSelectCategoryType,
} from './filter-category.type';

export function getFilterItemsExtended(
  items: FilterCategoryItemType[],
  checkedItems: number[],
): FilterSelectCategoryType[] {
  return items.map(({ id, title }) => {
    return {
      id: id,
      title: title,
      checked: checkedItems.length ? checkedItems.includes(id) : false,
    };
  });
}

export function getFilterItemsUpdateChecked(
  items: FilterSelectCategoryType[],
  id: number,
) {
  return items.map((item) => {
    if (item.id !== id) return item;
    return {
      ...item,
      checked: !item.checked,
    };
  });
}

export function getFilterItemsChekedId(
  items: FilterSelectCategoryType[],
): number[] {
  return items.reduce<number[]>((acc, item) => {
    if (item.checked) {
      acc.push(item.id);
    }
    return acc;
  }, []);
}
