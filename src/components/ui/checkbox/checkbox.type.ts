import { InputHTMLAttributes } from 'react';

export type CheckboxProps = {
  label?: string;
} & Partial<InputHTMLAttributes<HTMLInputElement>>;
