import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui';
import { localStringType } from '@/constants/strings';

import {
  convertToNumericValue,
  getFormattedCurrency,
} from './filter-range-prices.utils';
import { FilterRangePricesProps } from './filter-range-prices.type';

import './filter-range-prices.scss';

export default function FilterRangePrices({
  min,
  max,
  currency,
  showResult = true,
  onChange,
}: FilterRangePricesProps) {
  const inputMin = useRef<HTMLInputElement>(null);
  const inputMax = useRef<HTMLInputElement>(null);

  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  const minValueMoreThenMaxValueMessage =
    'Min value should be lower than max value';
  const maxValueLessThenMinValueMessage =
    'Max value should be higher than min value';

  useEffect(() => {
    setMinValue(min);
    setMaxValue(max);
  }, []);

  return (
    <div className="filter-range-prices">
      <div className="filter-range-prices__top">
        <Input
          ref={inputMin}
          id="price-min"
          label="Min"
          invalid={minValue > maxValue}
          value={getFormattedCurrency(minValue, currency)}
          onChange={(e) => {
            const numericValue = Number(
              convertToNumericValue(e.currentTarget.value),
            );
            if (numericValue < maxValue) {
              setMinValue(numericValue);
              onChange && onChange(numericValue, maxValue);
              return;
            }
            setMinValue(numericValue);
          }}
        />
        <span> - </span>
        <Input
          ref={inputMax}
          id="price-max"
          label="Max"
          invalid={maxValue < minValue}
          value={getFormattedCurrency(maxValue, currency)}
          onChange={(e) => {
            const numericValue = Number(
              convertToNumericValue(e.currentTarget.value),
            );
            if (numericValue < minValue) {
              setMaxValue(numericValue);
              onChange && onChange(minValue, numericValue);
              return;
            }
            setMaxValue(numericValue);
          }}
        />
      </div>
      <div className="filter-range-prices__validation-messages">
        {minValue > maxValue && (
          <p className="filter-range-prices__error-message">
            {minValueMoreThenMaxValueMessage}
          </p>
        )}
        {maxValue < minValue && (
          <p className="filter-range-prices__error-message">
            {maxValueLessThenMinValueMessage}
          </p>
        )}
      </div>
      {showResult && (
        <div className="filter-range-prices__result">
          <p>
            Range:{' '}
            <span>
              {currency}
              {minValue.toLocaleString(localStringType)}
              {' - '}
              {currency}
              {maxValue.toLocaleString(localStringType)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
