import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Icon, IconEnum } from '../ui';
import { SwitcherListItem, SwitcherListProps } from './switcher-list.type';

import './/switcher-list.scss';

export default function SwitcherList({
  items,
  checkedId,
  className,
  onClick,
}: SwitcherListProps) {
  const [selectedId, setSelectedId] = useState<string>('1');

  if (!items.length) return null;

  function onHandleClick({ id, title }: SwitcherListItem) {
    setSelectedId(id);
    onClick(id, title);
  }

  useEffect(() => {
    setSelectedId(checkedId);
  }, [checkedId]);

  return (
    <ul className={cn('switcher-list', className)}>
      {items.map((item) => (
        <li key={item.id} className="switcher-list__item">
          <button
            className={cn('switcher-btn', {
              active: item.id === selectedId,
            })}
            onClick={() => onHandleClick(item)}
          >
            <p className="switcher-btn__title">{item.title}</p>
            {item.id === selectedId && (
              <Icon icon={IconEnum.CHECK} className="switcher-btn__icon" />
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}
