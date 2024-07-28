import { useEffect, useRef } from 'react';
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
  size = 'default',
  onClose,
}: ModalProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const classnames = cn(
    'modal',
    {
      'modal--small': size === 'small',
    },
    className,
  );

  const { addClassOpenOnBody, eventKeyListener, removeEventKeyListener } =
    useModal({
      onClose,
    });

  useEffect(() => {
    if (open) {
      addClassOpenOnBody();
      if (ref && ref.current) {
        eventKeyListener(ref.current);
      }
    }
    return () => {
      removeEventKeyListener();
    };
  }, [open]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      {open && (
        <div ref={ref} tabIndex={-1} className={classnames} aria-modal={true}>
          <div className="modal__overlay overlay" onClick={onClose}></div>
          <div className="modal__box">
            <Button
              iconSize={22}
              view="transparent"
              icon={IconEnum.CROSS}
              onClick={onClose}
              className="modal__close-btn"
            />
            {children}
          </div>
        </div>
      )}
    </ReactPortal>
  );
}
