import { Select } from '@/components/ui';
import { useSearchFilterStore } from '@/store';

import { GuestCounter } from '../guest-counter';

import './guest-class.scss';

export default function BlockGuestClass() {
  const roomCount = 3;
  const childrenMaxAge = 18;
  const { guests, updateAdults, updateChildren, updateRooms, updateChildAge } =
    useSearchFilterStore();

  return (
    <div className="block-guest-class">
      <div className="block-guest-class__panel">
        <Select
          label="How many rooms do you need?"
          value={guests.rooms.length}
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
            >
              {guests.rooms.length !== 1 && <h6>Room {room.room}</h6>}
              <div key={index} className="block-guest-class__counter-list">
                <GuestCounter
                  id="adults"
                  title="Adults"
                  description="18+ years"
                  value={room.adults}
                  minValue={1}
                  room={room.room}
                  onChange={updateAdults}
                />
                <GuestCounter
                  id="children"
                  title="Children"
                  description="0-17 years"
                  value={room.children.length}
                  room={room.room}
                  onChange={updateChildren}
                />
                {room.children.length ? (
                  <div className="block-guest-class__childrens">
                    <p>Age of children at time of return</p>
                    <div className="block-guest-class__childrens-selects">
                      {room.children.map((child, index) => (
                        <Select
                          key={`child-${index + 1}`}
                          id={`child-${index + 1}`}
                          defaultValue={child}
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
