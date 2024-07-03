import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Icon, IconEnum } from '../ui';
import { AccoridonProps } from './accordion.type';

import './accordion.scss';

export default function Accordion({
  className,
  title,
  helpTitle,
  children,
  expanded = false,
}: AccoridonProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  useEffect(() => {
    if (expanded !== undefined) {
      setIsExpanded(expanded);
    }
  }, []);

  return (
    <div className={cn('accordion', className)}>
      <div
        role="button"
        className={cn('accordion__toggler', {
          'accordion__toggler--active': isExpanded,
        })}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <p className="accordion__title">
          {title}{' '}
          {helpTitle && (
            <span className="accordion__help-title">{helpTitle}</span>
          )}
        </p>
        <Icon icon={IconEnum.CHEVRON_DOWN} className="accordion__icon" />
      </div>
      <div
        className={cn('accordion__content', {
          'accordion__content--active': isExpanded,
        })}
      >
        {children}
      </div>
    </div>
  );
}
