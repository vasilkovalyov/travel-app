import { useState } from 'react';
import cn from 'classnames';

import { InputProps } from './input.type';

import './input.scss';

export default function Input({
  onChange,
  type,
  id,
  label,
  className,
  ...props
}: InputProps) {
  const [value, setValue] = useState<string>('');
  const modificationCn = cn({});

  return (
    <div className={cn('input', modificationCn, className)}>
      {label && (
        <label htmlFor={id} className="input__label">
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        autoCorrect="off"
        autoCapitalize="off"
        className="input__field"
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
          onChange && onChange(e);
        }}
        {...props}
      />
    </div>
  );
}
