import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Button, IconEnum, Input } from '../ui';
import { CountaerProps } from './counter.type';

import { dataAttributes } from './counter.test-attributes';
import './counter.scss';

export default function Counter({
  id,
  value = 0,
  minValue = 0,
  input = true,
  title,
  className,
  onChange,
}: CountaerProps) {
  const [counterValue, setCounterValue] = useState<number>(0);

  useEffect(() => {
    setCounterValue(value);
  }, []);

  useEffect(() => {
    onChange && onChange(counterValue);
  }, [counterValue]);

  function onHandleClick(type: 'inc' | 'dec') {
    if (type === 'inc') {
      setCounterValue((prev) => prev + 1);
    }
    if (type === 'dec' && counterValue > 0) {
      setCounterValue((prev) => prev - 1);
    }
  }

  return (
    <div className={cn('counter', className)}>
      <Button
        data-testid={dataAttributes.buttonDecrease}
        view="outline"
        className="counter__button"
        icon={IconEnum.MINUS}
        iconSize={20}
        {...{ disabled: counterValue === minValue }}
        onClick={() => onHandleClick('dec')}
      ></Button>
      {input ? (
        <Input
          data-testid={dataAttributes.input}
          id={id}
          value={counterValue}
          className="counter__field"
        />
      ) : (
        <div className="counter__middle">
          <span data-testid={dataAttributes.value} className="counter__value">
            {counterValue}
          </span>
          {title && (
            <span data-testid={dataAttributes.title} className="counter__title">
              {title}
            </span>
          )}
        </div>
      )}
      <Button
        data-testid={dataAttributes.buttonIncrease}
        view="outline"
        className="counter__button"
        icon={IconEnum.PLUS}
        iconSize={20}
        onClick={() => onHandleClick('inc')}
      ></Button>
    </div>
  );
}
