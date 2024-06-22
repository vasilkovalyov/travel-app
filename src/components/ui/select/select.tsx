import cn from 'classnames';
import { SelectProps } from './select.type';

import './select.scss';

export default function Select({
  id,
  name,
  children,
  className,
  label,
  ...props
}: SelectProps) {
  return (
    <div className={cn('select', className)}>
      {label && (
        <label htmlFor={id} className="select__label">
          {label}
        </label>
      )}
      <select name={name} id={id} className="select__field" {...props}>
        {children}
      </select>
    </div>
  );
}
