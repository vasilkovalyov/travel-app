import { ModalFooterProps } from './modal-footer.type';

import './modal-footer.scss';

export default function ModalFooter({ children }: ModalFooterProps) {
  return <div className="modal-footer">{children}</div>;
}
