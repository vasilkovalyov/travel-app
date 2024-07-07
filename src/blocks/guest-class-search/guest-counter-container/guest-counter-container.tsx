import { GuestCounterContainerProps } from './guest-counter-container.type';

import './guest-counter-container.scss';

export default function GuestCounterContainer({
  title,
  description,
  children,
}: GuestCounterContainerProps) {
  return (
    <div className="guest-counter-container">
      <div className="guest-counter-container__content">
        <label className="guest-counter-container__title">{title}</label>
        <p className="guest-counter-container__description">{description}</p>
      </div>
      {children}
    </div>
  );
}
