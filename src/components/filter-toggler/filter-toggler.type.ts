export type FilterTogglerType = {
  id: string;
  label: string;
  text?: string;
  placeholder?: string;
  readonly?: boolean;
  dataTestIdInput: string;
  dataTestIdButton: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
};
