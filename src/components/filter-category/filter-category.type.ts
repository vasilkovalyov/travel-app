export type FilterCategoryProps = {
  name: string;
  title: string;
  items: FilterCategoryItemType[];
  checkedItems?: number[];
};

export type FilterCategoryItemType = {
  id: number;
  title: string;
};

export type FilterSelectCategoryType = FilterCategoryItemType & {
  checked: boolean;
};
