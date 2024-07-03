import { useEffect } from 'react';
import { Button, IconEnum } from '../ui';
import { FilterModalProps } from './filter-modal.type';
import { ReactPortal } from '../portal';

import './filter-modal.scss';

export default function FilterModal({
  children,
  title,
  open,
  loading,
  onHandleClose,
}: FilterModalProps) {
  const onHandleCloseEscapeKey = (e: KeyboardEvent) =>
    e.key === 'Escape' ? onHandleClose() : null;

  useEffect(() => {
    document.body.addEventListener('keydown', onHandleCloseEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', onHandleCloseEscapeKey);
    };
  }, [onHandleClose]);

  if (!open) return null;

  return (
    <ReactPortal
      wrapperId="react-portal-sidebar-filter-container"
      className="filter-modal"
    >
      <div
        className="filter-modal__overlay overlay"
        onClick={onHandleClose}
      ></div>
      <div className="filter-modal__box">
        <div className="filter-modal__heading">
          <h4>{title}</h4>
          <Button
            icon={IconEnum.CROSS}
            iconSize={22}
            view="transparent"
            onClick={onHandleClose}
          ></Button>
        </div>
        <div className="filter-modal__content">{children}</div>
        <div className="filter-modal__bottom">
          <Button
            variant="secondary"
            size="lg"
            fullwidth
            loading={loading}
            onClick={onHandleClose}
          >
            {loading ? 'Looking for matches' : `View ${2} matches`}
          </Button>
        </div>
      </div>
    </ReactPortal>
  );
}
