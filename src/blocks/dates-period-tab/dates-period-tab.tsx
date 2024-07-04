import { useEffect, useState } from 'react';
import cn from 'classnames';

import { useSearchFilterStore } from '@/store';

import { Button } from '@/components/ui';
import { BlockDates } from '../dates';
import { BlockMonths } from '../months';

import './dates-period-tab.scss';

export default function BlockDatesPeriodTab() {
  const { updateTab, activeTabDates } = useSearchFilterStore();

  const [activeTab, setActiveTab] = useState<string>('dates');

  function onHandleClickTab(tab: string) {
    setActiveTab(tab);
    updateTab(tab);
  }

  useEffect(() => {
    if (activeTabDates) {
      setActiveTab(activeTabDates);
    }
  }, []);

  return (
    <div className="block-dates-period-tab">
      <div className="block-dates-period-tab__togglers">
        <Button
          size="md"
          variant={activeTab === 'dates' ? 'primary' : 'light'}
          onClick={() => {
            onHandleClickTab('dates');
          }}
          className={cn({
            active: activeTab === 'dates',
          })}
        >
          Choose dates
        </Button>
        <Button
          size="md"
          variant={activeTab === 'month' ? 'primary' : 'light'}
          onClick={() => {
            onHandleClickTab('month');
          }}
          className={cn({
            active: activeTab === 'month',
          })}
        >
          Choose month
        </Button>
      </div>
      <div className="block-dates-period-tab__content">
        {activeTab === 'dates' && <BlockDates />}
        {activeTab === 'month' && <BlockMonths />}
      </div>
    </div>
  );
}
