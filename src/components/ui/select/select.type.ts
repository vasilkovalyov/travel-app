import { SelectHTMLAttributes } from 'react';

export type SelectProps = {
  label?: string;
} & Partial<SelectHTMLAttributes<HTMLSelectElement>>;
