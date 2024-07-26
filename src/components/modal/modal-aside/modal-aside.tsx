import { useEffect, useRef } from 'react';
import cn from 'classnames';

import { useModal } from '../hooks/useModal';

import { Button, IconEnum } from '@/components/ui';
import { ReactPortal } from '@/components';

import { ModalAsideProps } from './modal-aside.type';

import './modal-aside.scss';

function ModalAside({
  id,
  open,
  children,
  className,
  position = 'left',
  onClose,
}: ModalAsideProps) {
  const ref = useRef<HTMLDivElement | null>(null);

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

  const modificationCn = cn({
    'modal-aside--position-right': position === 'right',
  });

  return (
    <ReactPortal wrapperId={`react-portal-${id}`}>
      {open && (
        <div
          ref={ref}
          className={cn('modal-aside', modificationCn, className)}
          tabIndex={-1}
          aria-modal={true}
        >
          <div className="modal-aside__overlay overlay" onClick={onClose}></div>
          <div className="modal-aside__box">
            <Button
              iconSize={22}
              view="transparent"
              icon={IconEnum.CROSS}
              onClick={onClose}
              className="modal-aside__close-btn"
            />
            {children}
          </div>
        </div>
      )}
    </ReactPortal>
  );
}

export default ModalAside;
