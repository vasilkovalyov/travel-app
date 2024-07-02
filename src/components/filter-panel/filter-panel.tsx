import { Button, IconEnum } from '../ui';
import { FilterPanelProps } from './filter-panel.type';

import './filter-panel.scss';

export default function FilterPanel({ children }: FilterPanelProps) {
  const loading = false;
  return (
    <div className="filter-panel">
      <div className="filter-panel__heading">
        <h4>Filter results</h4>
        <Button icon={IconEnum.CROSS} iconSize={22} view="transparent"></Button>
      </div>
      <div className="filter-panel__body">{children}</div>
      <div className="filter-panel__bottom">
        <Button variant="secondary" size="lg" fullwidth loading={loading}>
          {loading ? 'Looking for matches' : `View ${2} matches`}
        </Button>
      </div>
    </div>
  );
}
