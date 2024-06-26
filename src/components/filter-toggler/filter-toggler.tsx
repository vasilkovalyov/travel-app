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
  const inputRef = useRef<HTMLInputElement>(null);

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
      inputRef.current.focus();
      onFocus && onFocus();
    }
  }, [isFocusedInput]);

  function onHandleChangeInput(value: string) {
    setInputValue(value);
  }

  return (
    <div className={classnames}>
      <label className="filter-toggler__label">{label}</label>
      {isFocusedInput && (
        <Input
          ref={inputRef}
          autoComplete="off"
          placeholder={placeholder}
          value={inputValue}
          className="filter-toggler__field filter-toggler__field--input"
          onBlur={() => {
            setIsFocusedInput(false);
            onBlur && onBlur();
          }}
          onChange={(e) => onHandleChangeInput(e.currentTarget.value)}
        />
      )}
      {!isFocusedInput && (
        <Button
          view="transparent"
          className="filter-toggler__field filter-toggler__field--button"
          onFocus={() => {
            setIsFocusedInput(true);
          }}
        >
          {inputValue}
        </Button>
      )}
      {isFocusedInput && inputValue.length !== 0 && (
        <Button
          view="transparent"
          icon={IconEnum.CROSS}
          className="filter-toggler__clear-btn"
        ></Button>
      )}
      {isFocusedInput && <div className="filter-toggler__placeholder"></div>}
    </div>
  );
}
