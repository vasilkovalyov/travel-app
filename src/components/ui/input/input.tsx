import {
  forwardRef,
  ForwardedRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react';
import cn from 'classnames';

import { InputProps } from './input.type';

import { IconEnum } from '../icon';
import { Button } from '../button';

import './input.scss';

const Input = forwardRef(
  (
    {
      type,
      id,
      label,
      className,
      largeSize,
      value,
      buttonToggler = false,
      clearTextButton,
      onChange,
      onCustomBlur,
      onFocus,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const modificationSizeCn = cn({
      'text-field--lg': largeSize,
      'text-field--focused': isFocused,
      'text-field--filled': inputValue.length,
      'text-field--without-label': !label,
    });

    const classnames = cn('text-field', modificationSizeCn, className);

    useEffect(() => {
      if (value) {
        setInputValue(value.toString());
      }
    }, []);

    useImperativeHandle(ref, (): any => {
      return {
        field: inputRef.current,
      };
    }, []);

    return (
      <div className={classnames}>
        {label && (
          <label htmlFor={id} className="text-field__label text-truncate">
            {label}
          </label>
        )}
        <div className="text-field__field-container">
          <input
            tabIndex={0}
            ref={inputRef as ForwardedRef<HTMLInputElement>}
            id={id}
            type="text"
            autoCorrect="off"
            autoCapitalize="off"
            className="text-field__input"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.currentTarget.value);
              onChange && onChange(e);
            }}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus && onFocus(e);
            }}
            onBlur={(e) => {
              if (
                !e.relatedTarget?.classList.contains('text-field__clear-btn')
              ) {
                // setIsFocused(false);
                return;
              }
            }}
            {...props}
          />
          {clearTextButton && isFocused && inputValue.length !== 0 && (
            <Button
              tabIndex={0}
              view="transparent"
              icon={IconEnum.CROSS}
              className="text-field__clear-btn"
              onClick={(_) => {
                setInputValue('');
                inputRef.current?.focus();
              }}
              onBlur={(e) => {
                if (e.relatedTarget !== inputRef.current) {
                  setIsFocused(false);
                }
              }}
            ></Button>
          )}
        </div>
        <div className="text-field__holder"></div>
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
