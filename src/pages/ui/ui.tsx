import { BlockDates, BlockGuestsClass, BlockMonths } from '@/blocks';
import { FilterToggler } from '@/components';
import { FilterCategory } from '@/components/filter-category';
import { Checkbox, Button, Input, FieldPlaceholder } from '@/components/ui';

export default function Ui() {
  return (
    <div>
      <div>
        <FilterCategory
          title="Board type"
          name="board-type"
          items={[
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
              title: 'Full Board',
            },
          ]}
          checkedItems={[2, 4]}
        />
        <br />
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '40px',
            display: 'grid',
            gap: '14px',
            gridTemplateColumns: 'repeat(3, 40%)',
          }}
        >
          <FilterToggler
            label="Going to"
            placeholder="Destination or hotel name"
          />
          <FilterToggler
            label="Going to"
            text="London Gatwick (+ 5 others)"
            placeholder="Destination or hotel name"
          />
        </div>
        <br />
        <div>
          <Checkbox id="check" label="Checkbox" />
        </div>
        <br />

        <div>
          <div>
            <Button size="sm">Button primary sm</Button>
            <Button variant="secondary" size="sm">
              Button secondary sm
            </Button>
          </div>
          <br />
          <div>
            <Button size="md">Button primary md</Button>
            <Button variant="secondary" size="md">
              Button secondary sm
            </Button>
          </div>
          <br />
          <div>
            <Button size="lg">Button primary lg</Button>
            <Button variant="secondary" size="lg">
              Button secondary lg
            </Button>
          </div>
          <br />
          <div>
            <Button size="xl">Button primary xl</Button>
            <Button variant="secondary" size="xl">
              Button secondary xl
            </Button>
          </div>
          <br />
          <div>
            <Button view="outline" size="sm">
              Button primary sm
            </Button>
            <Button view="outline" variant="secondary" size="sm">
              Button secondary sm
            </Button>
          </div>
          <br />
          <div>
            <Button view="outline" size="md">
              Button primary md
            </Button>
            <Button view="outline" variant="secondary" size="md">
              Button secondary sm
            </Button>
          </div>
          <br />
          <div>
            <Button view="outline" size="lg">
              Button primary lg
            </Button>
            <Button view="outline" variant="secondary" size="lg">
              Button secondary lg
            </Button>
          </div>
          <br />
          <div>
            <Button view="outline" size="xl">
              Button primary xl
            </Button>
            <Button view="outline" variant="secondary" size="xl">
              Button secondary xl
            </Button>
          </div>
        </div>
        <br />
        <Input />
        <br />
        <FieldPlaceholder title="Anywhere" />
        <br />
        <BlockGuestsClass />
        <br />

        <BlockDates />
        <br />
        <BlockMonths />
        <br />
      </div>
    </div>
  );
}
