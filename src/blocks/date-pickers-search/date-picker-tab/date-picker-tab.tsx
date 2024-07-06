import cn from 'classnames';

import { useSearchFilterStore } from '@/store';

import { Button } from '@/components/ui';

import { BlockDatePickerRange } from '../date-picker-range';
import { BlockDatePickerMonth } from '../date-picker-month';
import { DatepickerTabEnum } from '../utils';

import './date-picker-tab.scss';

export default function BlockDatePickerTab() {
  const { activeTabDates, updateTab } = useSearchFilterStore();

  return (
    <div className="block-date-picker-tab">
      <div className="block-date-picker-tab__togglers">
        <Button
          size="md"
          variant={
            activeTabDates === DatepickerTabEnum.Dates ? 'primary' : 'light'
          }
          onClick={() => updateTab(DatepickerTabEnum.Dates)}
          className={cn({ active: activeTabDates === DatepickerTabEnum.Dates })}
        >
          Choose dates
        </Button>
        <Button
          size="md"
          variant={
            activeTabDates === DatepickerTabEnum.Month ? 'primary' : 'light'
          }
          onClick={() => updateTab(DatepickerTabEnum.Month)}
          className={cn({ active: activeTabDates === DatepickerTabEnum.Month })}
        >
          Choose month
        </Button>
      </div>
      <div className="block-date-picker-tab__content">
        {activeTabDates === DatepickerTabEnum.Dates && <BlockDatePickerRange />}
        {activeTabDates === DatepickerTabEnum.Month && <BlockDatePickerMonth />}
      </div>
    </div>
  );
}
