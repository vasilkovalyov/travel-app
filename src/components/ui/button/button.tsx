import { forwardRef, ForwardedRef } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ButtonProps } from './button.type';
import './button.scss';
import { Icon } from '../icon';

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
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    const modificationCn = cn({
      'btn--loading': isLoading,
      'btn--link': href,
      'btn--content-reversed': contentReversed,
    });

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
