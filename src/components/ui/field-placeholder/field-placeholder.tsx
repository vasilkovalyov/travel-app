import cn from 'classnames';
import { FieldPlaceholderProps } from './field-placeholder.type';

import './field-placeholder.scss';

export default function FieldPlaceholder({
  title,
  description,
  extend = false,
  className,
}: FieldPlaceholderProps) {
  const modificationCn = cn({
    'field-placeholder--extend': extend,
  });
  const classnames = cn('field-placeholder', modificationCn, className);

  return (
    <div className={classnames}>
      <p className="field-placeholder__title text-truncate">{title}</p>
      {description && (
        <p className="field-placeholder__description text-truncate">
          {description}
        </p>
      )}
    </div>
  );
}
