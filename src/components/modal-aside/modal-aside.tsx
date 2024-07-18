import { useEffect } from 'react';
import cn from 'classnames';

import { Button, IconEnum } from '../ui';
import { ReactPortal } from '../portal';

import { ModalAsideProps } from './modal-aside.type';

import './modal-aside.scss';

function ModalAside({
  id,
  open,
  header,
  title,
  children,
  footer,
  className,
  position = 'left',
  contentPadding = false,
  onClose,
}: ModalAsideProps) {
  const bodyActiveModalCn = 'modal-open';

  const onHandleCloseEscapeKey = (e: KeyboardEvent) =>
    e.key === 'Escape' ? onClose() : null;

  useEffect(() => {
    if (open) {
      document.body.classList.add(bodyActiveModalCn);
    }
  }, [open]);

  useEffect(() => {
    document.body.addEventListener('keydown', onHandleCloseEscapeKey);
    return () => {
      if (document.body.classList.contains(bodyActiveModalCn)) {
        document.body.removeEventListener('keydown', onHandleCloseEscapeKey);
        document.body.classList.remove(bodyActiveModalCn);
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
        <div className="modal-aside__box">
          <div className="modal-aside__header">
            {header}
            {title && <h4 className="modal-aside__title">{title}</h4>}
            <Button
              icon={IconEnum.CROSS}
              iconSize={22}
              view="transparent"
              onClick={onClose}
            ></Button>
          </div>
          <div
            className={cn('modal-aside__content', {
              'modal-aside__content--with-padding': contentPadding === true,
            })}
          >
            {children}
          </div>
          {footer && <div className="modal-aside__footer">{footer}</div>}
        </div>
      </div>
    </ReactPortal>
  );
}

export default ModalAside;
