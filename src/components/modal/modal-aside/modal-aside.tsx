import { useEffect } from 'react';
import cn from 'classnames';

import { useModal } from '../hooks/useModal';

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

  const modificationCn = cn({
    'modal-aside--position-right': position === 'right',
  });

  return (
    <ReactPortal wrapperId={`react-portal-${id}`}>
      <div className={cn('modal-aside', modificationCn, className)}>
        <div className="modal-aside__overlay overlay" onClick={onClose}></div>
        <div className="modal-aside__box">{children}</div>
      </div>
    </ReactPortal>
  );
}

export default ModalAside;
