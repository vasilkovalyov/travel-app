import { useState } from 'react';
import { Counter } from '@/components';
import { Select } from '@/components/ui';

import { defaultRoom, getUpdatedRoom } from './guests.class.utils';
import { RoomType } from './guests-class.type';

import './guests-class.scss';

function GuestCounter({
  id,
  title,
  description,
  value,
  minValue = 0,
  room,
  onChange,
}: {
  id: string;
  title: string;
  description: string;
  value: number;
  minValue?: number;
  room: number;
  onChange: (room: number, value: number) => void;
}) {
  return (
    <div className="guest-counter">
      <div className="guest-counter__content">
        <label className="guest-counter__title">{title}</label>
        <p className="guest-counter__description">{description}</p>
      </div>
      <Counter
        id={id}
        value={value}
        minValue={minValue}
        onChange={(value) => onChange(room, value)}
      />
    </div>
  );
}

export default function GuestClass() {
  const roomCount = 3;
  const childrenMaxAge = 18;
  const [rooms, setRooms] = useState<RoomType[]>([defaultRoom]);

  function onHandleChangeRoom(roomCount: number) {
    setRooms(getUpdatedRoom(rooms, roomCount));
  }

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

  return (
    <div className="guests-class">
      <div className="guests-class__panel">
        <Select
          label="How many rooms do you need?"
          onChange={(e) => onHandleChangeRoom(+e.currentTarget.value)}
        >
          {Array.from(Array(roomCount).keys()).map((item) => (
            <option key={item} value={item + 1}>
              {item + 1}
            </option>
          ))}
        </Select>
        {rooms.map((room, index) => (
          <div key={`${room.room}-${index}`} className="guests-class__room">
            {rooms.length !== 1 && <h6>Room {room.room}</h6>}
            <div key={index} className="guests-class__counter-list">
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
                <div className="guests-class__childrens">
                  <p>Age of children at time of return</p>
                  <div className="guests-class__childrens-selects">
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
  );
}
