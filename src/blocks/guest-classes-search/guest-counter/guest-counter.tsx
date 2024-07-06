import { Counter } from '@/components';
import { GuestCounterProps } from './guest-counter.type';

import './guest-counter.scss';

export default function GuestCounter({
  id,
  title,
  description,
  value,
  minValue = 0,
  room,
  onChange,
}: GuestCounterProps) {
  return (
    <div className="guest-counter">
      <div className="guest-counter__content">
        <label className="guest-counter__title">{title}</label>
        <p className="guest-counter__description">{description}</p>
      </div>
      <Counter
        id={id}
        value={value}
        minValue={minValue}
        onChange={(value) => onChange(room, value)}
      />
    </div>
  );
}
