import { InputHTMLAttributes } from 'react';

export type InputProps = {
  label?: string;
  largeSize?: boolean;
  buttonToggler?: boolean;
  clearTextButton?: boolean;
  invalid?: boolean;
  onCustomBlur?: () => void;
} & Partial<InputHTMLAttributes<HTMLInputElement>>;
