import { Select } from '@/components/ui';
import { useSearchFilterStore } from '@/store';

import { Counter } from '@/components';
import { GuestCounterContainer } from '../guest-counter-container';

import { dataAttributes } from './guest-class.test-attributes';

import './guest-class.scss';

export default function BlockGuestClass() {
  const roomCount = 3;
  const childrenMaxAge = 18;
  const { guests, updateAdults, updateChildren, updateRooms, updateChildAge } =
    useSearchFilterStore();

  return (
    <div data-testid={dataAttributes.rootBlock} className="block-guest-class">
      <div className="block-guest-class__panel">
        <Select
          label="How many rooms do you need?"
          value={guests.rooms.length}
          data-testid={dataAttributes.selectRooms}
          onChange={(e) => updateRooms(guests.rooms, +e.currentTarget.value)}
        >
          {Array.from(Array(roomCount).keys()).map((item) => (
            <option key={item} value={item + 1}>
              {item + 1}
            </option>
          ))}
        </Select>
        <div className="block-guest-class__rooms">
          {guests.rooms.map((room, index) => (
            <div
              key={`${room.room}-${index}`}
              className="block-guest-class__room"
              data-testid={dataAttributes.roomItem}
            >
              {guests.rooms.length !== 1 && <h6>Room {room.room}</h6>}
              <div key={index} className="block-guest-class__counter-list">
                <GuestCounterContainer title="Adults" description="18+ years">
                  <Counter
                    id="adults"
                    value={room.adults}
                    minValue={1}
                    data-testid={dataAttributes.counterAdults}
                    onChange={(value) => updateAdults(room.room, value)}
                  />
                </GuestCounterContainer>
                <GuestCounterContainer
                  title="Children"
                  description="0-17 years"
                >
                  <Counter
                    id="children"
                    value={room.children.length}
                    minValue={0}
                    data-testid={dataAttributes.counterChildren}
                    onChange={(value) => updateChildren(room.room, value)}
                  />
                </GuestCounterContainer>
                {room.children.length ? (
                  <div
                    className="block-guest-class__children"
                    data-testid={dataAttributes.childrenWrapper}
                  >
                    <p>Age of children at time of return</p>
                    <div className="block-guest-class__children-selects">
                      {room.children.map((child, index) => (
                        <Select
                          key={`child-${index + 1}`}
                          id={`child-${index + 1}`}
                          defaultValue={child}
                          data-testid={dataAttributes.childSelectAge}
                          onChange={(e) =>
                            updateChildAge(
                              room.room,
                              index,
                              +e.currentTarget.value,
                            )
                          }
                        >
                          {Array.from(Array(childrenMaxAge).keys()).map(
                            (item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ),
                          )}
                        </Select>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
