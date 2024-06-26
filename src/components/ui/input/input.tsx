import { forwardRef, ForwardedRef, useState } from 'react';
import cn from 'classnames';

import { InputProps } from './input.type';

import './input.scss';

const Input = forwardRef(
  (
    { onChange, type, id, label, className, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
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
          ref={ref as ForwardedRef<HTMLInputElement>}
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
  },
);

Input.displayName = 'Input';

export default Input;
