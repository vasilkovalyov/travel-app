import { ButtonHTMLAttributes } from 'react';
import { IconEnum } from '../icon';

type ButtonSizeType = 'sm' | 'md' | 'lg' | 'xl';
type ButtonViewType = 'outline' | 'fill' | 'transparent';
type ButtonVariantType = 'primary' | 'secondary';

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  icon?: IconEnum;
  iconSize?: number;
  iconRight?: boolean;
  contentReversed?: boolean;
  variant?: ButtonVariantType;
  view?: ButtonViewType;
  size?: ButtonSizeType;
  fullwidth?: boolean;
  loading?: boolean;
} & Partial<ButtonHTMLAttributes<HTMLButtonElement>>;
