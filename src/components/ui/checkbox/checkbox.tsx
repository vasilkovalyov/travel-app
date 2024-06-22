import { useState } from 'react';
import cn from 'classnames';

import { CheckboxProps } from './checkbox.type';

import './checkbox.scss';

export default function Checkbox({
  onChange,
  type,
  id,
  label,
  ...props
}: CheckboxProps) {
  const [value, setValue] = useState<string>('');
  const modificationCn = cn({});

  return (
    <label htmlFor={id} className={cn('checkbox', modificationCn)}>
      <div className="checkbox__mark-box">
        <input
          id={id}
          type="checkbox"
          autoCorrect="off"
          autoCapitalize="off"
          className="checkbox__field"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange && onChange(e);
          }}
          {...props}
        />
        <span className="checkbox__mark"></span>
      </div>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
}
