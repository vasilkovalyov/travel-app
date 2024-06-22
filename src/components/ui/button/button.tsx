import { forwardRef, ForwardedRef } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ButtonProps } from './button.type';
import { Icon } from '../icon';

import './button.scss';

const Button = forwardRef(
  (
    {
      children,
      isLoading,
      className,
      href,
      icon,
      iconSize,
      contentReversed,
      type = 'button',
      size = 'sm',
      view = 'fill',
      variant = 'primary',
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    const modificationSizeCn = cn({
      'btn--sm': size === 'sm',
      'btn--md': size === 'md',
      'btn--lg': size === 'lg',
      'btn--xl': size === 'xl',
    });
    const modificationViewCn = cn({
      'btn--fill': view === 'fill',
      'btn--outline': view === 'outline',
    });
    const modificationVariantCn = cn({
      'btn--primary': variant === 'primary',
      'btn--secondary': variant === 'secondary',
    });

    const modificationCn = cn(
      {
        'btn--loading': isLoading,
        'btn--link': href,
        'btn--content-reversed': contentReversed,
      },
      modificationSizeCn,
      modificationViewCn,
      modificationVariantCn,
    );

    const classnames = cn('btn', modificationCn, className);

    const content = () => {
      return (
        <>
          {icon && <Icon icon={icon} size={iconSize} className="btn__icon" />}
          {children && <span className="btn__text">{children}</span>}
        </>
      );
    };

    if (href) {
      return (
        <Link to={href} className={classnames}>
          {content()}
        </Link>
      );
    }

    return (
      <button
        ref={ref as ForwardedRef<HTMLButtonElement>}
        type={type}
        {...props}
        className={classnames}
      >
        {content()}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
