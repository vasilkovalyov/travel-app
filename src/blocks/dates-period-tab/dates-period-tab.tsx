import { useEffect } from 'react';
import cn from 'classnames';

import { useSearchFilterStore } from '@/store';

import { Button } from '@/components/ui';
import { BlockDates } from '../dates';
import { BlockMonths } from '../months';

import './dates-period-tab.scss';

export default function BlockDatesPeriodTab() {
  const { activeTabDates, updateTab } = useSearchFilterStore();

  useEffect(() => {
    if (activeTabDates) {
      updateTab(activeTabDates);
    }
  }, []);

  return (
    <div className="block-dates-period-tab">
      <div className="block-dates-period-tab__togglers">
        <Button
          size="md"
          variant={activeTabDates === 'dates' ? 'primary' : 'light'}
          onClick={() => updateTab('dates')}
          className={cn({ active: activeTabDates === 'dates' })}
        >
          Choose dates
        </Button>
        <Button
          size="md"
          variant={activeTabDates === 'month' ? 'primary' : 'light'}
          onClick={() => updateTab('month')}
          className={cn({ active: activeTabDates === 'month' })}
        >
          Choose month
        </Button>
      </div>
      <div className="block-dates-period-tab__content">
        {activeTabDates === 'dates' && <BlockDates />}
        {activeTabDates === 'month' && <BlockMonths />}
      </div>
    </div>
  );
}
