import { ButtonHTMLAttributes } from 'react';
import { IconEnum } from '../icon';

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  href?: string;
  icon?: IconEnum;
  iconSize?: number;
  contentReversed?: boolean;
} & Partial<ButtonHTMLAttributes<HTMLButtonElement>>;
