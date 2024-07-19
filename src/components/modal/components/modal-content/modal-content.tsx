import cn from 'classnames';
import { ModalContentProps } from './modal-content.type';

import './modal-content.scss';

export default function ModalContent({
  children,
  innerPadding = false,
}: ModalContentProps) {
  return (
    <div
      className={cn('modal-content', {
        'modal-content--with-padding': innerPadding,
      })}
    >
      {children}
    </div>
  );
}
