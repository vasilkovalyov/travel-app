export type MainMenuProps = {
  items: NavigationType[];
  activeSubmenus?: ActiveSubmenusType;
  onClick?: (title: string, activedLinks: ActiveSubmenusType) => void;
  onClickBack?: () => void;
};

export type ActiveSubmenusType = {
  [level: number]: {
    key: number;
    title?: string | null;
  };
};

export type MenuItemProps = {
  level: number;
  prevTitle?: string | null;
} & NavigationType;

export type NavigationType = {
  id: number;
  title: string;
  href?: string;
  type?: string;
  children?: NavigationType[];
};

export type SubMenuProps = {
  title: string;
  children: NavigationType[];
};
