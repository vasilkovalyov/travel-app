import { ModalHeaderProps } from './modal-header.type';

import './modal-header.scss';

export default function ModalHeader({ title, children }: ModalHeaderProps) {
  return (
    <div className="modal-header">
      {children && (
        <div className="modal-header__pretitle-container">{children}</div>
      )}
      {title && <h4 className="modal-header__title">{title}</h4>}
    </div>
  );
}
