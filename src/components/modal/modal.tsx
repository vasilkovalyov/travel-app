import { useEffect } from 'react';
import cn from 'classnames';
import { Button, IconEnum } from '../ui';
import { ModalProps } from './modal.type';
import { ReactPortal } from '../portal';

import './modal.scss';

export default function Modal({
  children,
  title,
  open,
  headerContent,
  bottomContent,
  className,
  onHandleClose,
}: ModalProps) {
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
    <ReactPortal wrapperId="react-portal-modal-container">
      <div className={cn('modal', className)}>
        <div className="modal__overlay overlay" onClick={onHandleClose}></div>
        <div className="modal__box">
          <div className="modal__header">
            <div className="modal__header-heading">
              <h3 className="modal__title">{title}</h3>
              <Button
                iconSize={22}
                view="transparent"
                icon={IconEnum.CROSS}
                onClick={onHandleClose}
              />
            </div>
            {headerContent && (
              <div className="modal__header-embed">{headerContent}</div>
            )}
          </div>
          <div className="modal__content">{children}</div>
          {bottomContent && (
            <div className="modal__footer">{bottomContent}</div>
          )}
        </div>
      </div>
    </ReactPortal>
  );
}
