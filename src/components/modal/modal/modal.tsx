import { useEffect } from 'react';
import cn from 'classnames';

import { useModal } from '../hooks/useModal';

import { Button, IconEnum } from '@/components/ui';
import { ReactPortal } from '@/components';

import { ModalProps } from './modal.type';

import './modal.scss';

export default function Modal({
  children,
  open,
  className,
  onClose,
}: ModalProps) {
  const {
    addClassOpenOnBody,
    isHasAcvieModalClassName,
    addEventListenerClose,
    removeEventListenerClose,
  } = useModal();

  useEffect(() => {
    if (open) {
      addClassOpenOnBody();
    }
  }, [open]);

  useEffect(() => {
    addEventListenerClose(onClose);
    return () => {
      if (isHasAcvieModalClassName()) {
        removeEventListenerClose(onClose);
      }
    };
  }, [onClose]);

  if (!open) return null;

  return (
    <ReactPortal
      wrapperId="react-portal-modal-container"
      className={cn('modal', className)}
    >
      <div className="modal__overlay overlay" onClick={onClose}></div>
      <div className="modal__box">
        {children}
        <Button
          iconSize={22}
          view="transparent"
          icon={IconEnum.CROSS}
          onClick={onClose}
          className="modal__close-btn"
        />
      </div>
    </ReactPortal>
  );
}
