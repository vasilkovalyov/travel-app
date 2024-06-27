export type FilterCategoryProps = {
  name: string;
  items: FilterCategoryItemType[];
  checkedItems?: number[];
  visibleLimit?: number;
  onChange?: (checkedIds: number[]) => void;
};

export type FilterCategoryItemType = {
  id: number;
  title: string;
};

export type FilterSelectCategoryType = FilterCategoryItemType & {
  checked: boolean;
};
