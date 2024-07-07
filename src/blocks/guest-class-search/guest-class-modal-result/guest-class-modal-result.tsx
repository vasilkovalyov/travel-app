import { useSearchFilterStore } from '@/store';

import { Button } from '@/components/ui';

import './guest-class-modal-result.scss';

export default function GuestClassModalResult({
  onHandleClick,
}: {
  onHandleClick?: () => void;
}) {
  const { guests, resetGuests } = useSearchFilterStore();
  const { adults, children, rooms } = guests.result;

  return (
    <div className="block-guest-class-modal-result">
      <div className="guest-class-info">
        <div className="guest-class-info__item">
          <span className="guest-class-info__title">Rooms: </span>
          {rooms}
        </div>
        <div className="guest-class-info__item">
          <span className="guest-class-info__title">Adults: </span>
          {adults}
        </div>
        <div className="guest-class-info__item">
          <span className="guest-class-info__title">Children: </span>
          {children}
        </div>
      </div>
      <div className="block-guest-class-modal-result__controls">
        <Button view="transparent" size="sm" onClick={resetGuests}>
          Reset
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="block-guest-class-modal-result__done-btn"
          onClick={onHandleClick}
        >
          Done
        </Button>
      </div>
    </div>
  );
}
