import { InputHTMLAttributes } from 'react';

export type InputProps = {
  label?: string;
} & Partial<InputHTMLAttributes<HTMLInputElement>>;
