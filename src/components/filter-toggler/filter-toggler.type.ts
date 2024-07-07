export type FilterTogglerType = {
  id: string;
  label: string;
  text?: string;
  placeholder?: string;
  readonly?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
};
