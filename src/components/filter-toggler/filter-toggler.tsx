import cn from 'classnames';
import { FilterTogglerType } from './filter-toggler.type';
import { Input, Button } from '../ui';
import { useEffect, useRef, useState, forwardRef, ForwardedRef } from 'react';

import './filter-toggler.scss';

const FilterToggler = forwardRef(
  (
    {
      id,
      label,
      text = '',
      placeholder,
      readonly,
      resetToggler = false,
      dataTestIdInput,
      dataTestIdButton,
      onBlur,
      onFocus,
      onClick,
    }: FilterTogglerType,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const inputRef = useRef<{ field: HTMLInputElement }>(null);

    const [isFocusedInput, setIsFocusedInput] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    const modificationCn = cn({
      'filter-toggler--focused': isFocusedInput,
      'filter-toggler--filled': inputValue.length,
    });

    const classnames = cn('filter-toggler', modificationCn);

    useEffect(() => {
      setInputValue(text);
    }, []);

    useEffect(() => {
      setInputValue(text);
    }, [text]);

    useEffect(() => {
      if (isFocusedInput && inputRef.current) {
        inputRef.current.field.focus();
        onFocus && onFocus();
      }
    }, [isFocusedInput]);

    function onCustomBlurInput() {
      setIsFocusedInput(false);
      onBlur && onBlur();
    }

    function onButtonClick() {
      setIsFocusedInput(true);
      onClick && onClick();
      onFocus && onFocus();
    }

    return (
      <div ref={ref} className={classnames}>
        <p className="filter-toggler__label text-truncate">{label}</p>
        {isFocusedInput ? (
          <Input
            ref={inputRef as any}
            id={id}
            autoComplete="off"
            placeholder={placeholder}
            value={inputValue}
            className="filter-toggler__text-field"
            largeSize
            clearTextButton={resetToggler}
            readOnly={readonly}
            data-testid={dataTestIdInput}
            onCustomBlur={onCustomBlurInput}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
        ) : (
          <Button
            view="transparent"
            className="filter-toggler__button text-truncate"
            data-testid={dataTestIdButton}
            onClick={onButtonClick}
          >
            {inputValue}
          </Button>
        )}
      </div>
    );
  },
);

FilterToggler.displayName = 'FilterToggler';

export default FilterToggler;
