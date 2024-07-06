import { useEffect, useState } from 'react';
import { Select } from '@/components/ui';
import { useSearchFilterStore } from '@/store';

import { GuestCounter } from '../guest-counter';

import {
  defaultRoom,
  getGuestTypeInfo,
  getUpdatedRoom,
} from './guest-class.utils';
import { GuestRoomType } from './guest-class.type';

import './guest-class.scss';

export default function BlockGuestClass() {
  const roomCount = 3;
  const childrenMaxAge = 18;
  const { updateGuests } = useSearchFilterStore();
  const [rooms, setRooms] = useState<GuestRoomType[]>([defaultRoom]);

  function onHandleChangeAdults(room: number, value: number) {
    const arr = [...rooms];
    arr[room - 1].adults = value;
    setRooms(arr);
  }

  function onHandleChangeChildren(room: number, value: number) {
    const arr = [...rooms];
    if (value === 0) {
      arr[room - 1].children = [];
      setRooms(arr);
      return;
    }

    if (arr[room - 1].children.length > value) {
      arr[room - 1].children.pop();
    } else {
      arr[room - 1].children.push(0);
    }

    setRooms(arr);
  }

  function onHandleChangeChildAge(room: number, child: number, value: number) {
    const arr = [...rooms];
    arr[room - 1].children[child] = value;
    setRooms(arr);
  }

  useEffect(() => {
    updateGuests(getGuestTypeInfo(rooms));
  }, [rooms]);

  return (
    <div className="block-guest-class">
      <div className="block-guest-class__panel">
        <Select
          label="How many rooms do you need?"
          onChange={(e) =>
            setRooms(getUpdatedRoom(rooms, +e.currentTarget.value))
          }
        >
          {Array.from(Array(roomCount).keys()).map((item) => (
            <option key={item} value={item + 1}>
              {item + 1}
            </option>
          ))}
        </Select>
        <div className="block-guest-class__rooms">
          {rooms.map((room, index) => (
            <div
              key={`${room.room}-${index}`}
              className="block-guest-class__room"
            >
              {rooms.length !== 1 && <h6>Room {room.room}</h6>}
              <div key={index} className="block-guest-class__counter-list">
                <GuestCounter
                  id="adults"
                  title="Adults"
                  description="18+ years"
                  value={room.adults}
                  minValue={1}
                  room={room.room}
                  onChange={onHandleChangeAdults}
                />
                <GuestCounter
                  id="children"
                  title="Children"
                  description="0-17 years"
                  value={room.children.length}
                  room={room.room}
                  onChange={onHandleChangeChildren}
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
                            onHandleChangeChildAge(
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
