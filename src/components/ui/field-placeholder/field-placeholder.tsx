import { FieldPlaceholderProps } from './field-placeholder.type';

import './field-placeholder.scss';

export default function FieldPlaceholder({ text }: FieldPlaceholderProps) {
  return (
    <div className="field-placeholder">
      <p className="field-placeholder__text">{text}</p>
    </div>
  );
}
