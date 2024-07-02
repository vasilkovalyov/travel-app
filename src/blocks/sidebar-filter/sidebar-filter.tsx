import cn from 'classnames';
import { Button } from '@/components/ui';
import { Accordion, FilterCategory, FilterRangePrices } from '@/components';

import './sidebar-filter.scss';

const filterItems = [
  {
    id: 1,
    title: 'Room Only',
  },
  {
    id: 2,
    title: 'Bed & Breakfast',
  },
  {
    id: 3,
    title: 'Half Board',
  },
  {
    id: 4,
    title: 'Full Board 2',
  },
  {
    id: 5,
    title: 'Full Board 3',
  },
  {
    id: 6,
    title: 'Full Board 4',
  },
  {
    id: 7,
    title: 'Full Board 5',
  },
];

export default function BlockSidebarFilter({
  className,
}: {
  className?: string;
}) {
  return (
    <aside className={cn('block-sidebar-filter', className)}>
      <Button type="reset" view="outline" size="lg">
        Reset filters
      </Button>
      <Accordion
        title="Lorem ipsum"
        helpTitle="(inc flights)"
        expanded={true}
        className="sidebar-filter-category"
      >
        <FilterCategory
          name="board-type"
          items={filterItems}
          checkedItems={[2, 4, 6]}
          visibleLimit={4}
          onChange={(e) => console.log(e)}
        />
      </Accordion>
      <Accordion
        title="Lorem ipsum"
        helpTitle="(inc flights)"
        expanded={true}
        className="sidebar-filter-category"
      >
        <FilterCategory
          name="board-type"
          items={filterItems}
          checkedItems={[2, 4, 6]}
          visibleLimit={4}
          onChange={(e) => console.log(e)}
        />
      </Accordion>
      <Accordion
        title="Total price"
        helpTitle="(inc flights)"
        expanded={true}
        className="sidebar-filter-category"
      >
        <FilterRangePrices min={100} max={1000} currency="$" />
      </Accordion>
    </aside>
  );
}
