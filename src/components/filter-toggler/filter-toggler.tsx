import cn from 'classnames';
import { FilterTogglerType } from './filter-toggler.type';
import { Input, Button, IconEnum } from '../ui';
import { useEffect, useRef, useState } from 'react';

import './filter-toggler.scss';

export default function FilterToggler({
  label,
  text = '',
  placeholder,
  onBlur,
  onFocus,
}: FilterTogglerType) {
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
    if (isFocusedInput && inputRef.current) {
      inputRef.current.field.focus();
      onFocus && onFocus();
    }
  }, [isFocusedInput]);

  return (
    <div className={classnames}>
      <label className="filter-toggler__label text-truncate">{label}</label>
      {isFocusedInput ? (
        <Input
          ref={inputRef as any}
          autoComplete="off"
          placeholder={placeholder}
          value={inputValue}
          className="filter-toggler__text-field"
          largeSize
          clearTextButton
          onCustomBlur={() => {
            setIsFocusedInput(false);
            onBlur && onBlur();
          }}
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
      ) : (
        <Button
          view="transparent"
          className="filter-toggler__button"
          onFocus={() => {
            setIsFocusedInput(true);
          }}
        >
          {inputValue}
        </Button>
      )}
    </div>
  );
}
