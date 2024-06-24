import { useEffect, useState } from 'react';
import { Button, IconEnum, Input } from '../ui';
import { CountaerProps } from './counter.type';

import './counter.scss';

export default function Counter({
  id,
  value = 0,
  minValue = 0,
  onChange,
}: CountaerProps) {
  const [counterValue, setCounterValue] = useState<number>(0);

  useEffect(() => {
    setCounterValue(value);
  }, []);

  useEffect(() => {
    onChange(counterValue);
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
    <div className="counter">
      <Button
        view="outline"
        className="counter__button"
        icon={IconEnum.MINUS}
        iconSize={20}
        {...{ disabled: counterValue === minValue }}
        onClick={() => onHandleClick('dec')}
      ></Button>
      <Input id={id} value={counterValue} className="counter__field" />
      <Button
        view="outline"
        className="counter__button"
        icon={IconEnum.PLUS}
        iconSize={20}
        onClick={() => onHandleClick('inc')}
      ></Button>
    </div>
  );
}