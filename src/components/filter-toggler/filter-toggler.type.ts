export type FilterTogglerType = {
  label: string;
  text?: string;
  placeholder?: string;
  readonly?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
};
