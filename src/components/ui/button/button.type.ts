import { ButtonHTMLAttributes } from 'react';
import { IconEnum } from '../icon';

type ButtonSizeType = 'sm' | 'md' | 'lg' | 'xl';
type ButtonViewType = 'outline' | 'fill' | 'transparent';
type ButtonVariantType = 'primary' | 'secondary';

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  href?: string;
  icon?: IconEnum;
  iconSize?: number;
  contentReversed?: boolean;
  variant?: ButtonVariantType;
  view?: ButtonViewType;
  size?: ButtonSizeType;
} & Partial<ButtonHTMLAttributes<HTMLButtonElement>>;
