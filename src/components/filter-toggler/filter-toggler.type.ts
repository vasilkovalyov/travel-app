export type FilterTogglerType = {
  id: string;
  label: string;
  text?: string;
  placeholder?: string;
  readonly?: boolean;
  dataTestIdInput: string;
  dataTestIdButton: string;
  resetToggler?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
};
