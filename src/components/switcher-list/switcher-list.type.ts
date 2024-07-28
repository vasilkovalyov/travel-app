export type SwitcherListProps = {
  items: SwitcherListItem[];
  className?: string;
  checkedId: string;
  onClick: (id: string, title: string) => void;
};

export type SwitcherListItem = {
  id: string;
  title: string;
};
