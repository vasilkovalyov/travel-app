import cn from 'classnames';
import { RatingProps } from './rating.type';
import { Icon, IconEnum } from '../ui';

import './rating.scss';

export default function Rating({ rating, size = 12, className }: RatingProps) {
  return (
    <ul className={cn('rating', className)}>
      {Array.from(Array(rating).keys()).map((item) => (
        <li key={item}>
          <Icon icon={IconEnum.STAR} size={size} />
        </li>
      ))}
    </ul>
  );
}
