import { GuestRoomType } from '@/blocks/guest-class-search';
import { GuestType } from './types';

export const getGuestFormattedMessage = (guests: GuestType): string => {
  let adults = `${guests.adults} ${guests.adults > 1 ? 'adults' : 'adult'}`;
  let rooms = `${guests.rooms} ${guests.rooms > 1 ? 'rooms' : 'room'}`;
  const childrenNumber = guests.children;
  let children = childrenNumber
    ? `, ${childrenNumber} ${childrenNumber > 1 ? 'children' : 'child'}`
    : '';
  return `${adults}, ${rooms}${children}`;
};

export function getGuestTypeInfo(rooms: GuestRoomType[]): GuestType {
  return rooms.reduce<GuestType>(
    (acc, room) => {
      acc.rooms += 1;
      acc.children += room.children.length;
      acc.adults += room.adults;
      return acc;
    },
    {
      adults: 0,
      children: 0,
      rooms: 0,
    },
  );
}

export function getUpdatedRoom(
  roomArray: GuestRoomType[],
  roomCount: number,
): GuestRoomType[] {
  const defaultRoom: Readonly<GuestRoomType> = {
    room: 1,
    adults: 1,
    children: [],
  };

  const tempArray: GuestRoomType[] = [...roomArray];
  if (roomCount === 1) return [defaultRoom];
  if (roomCount < tempArray.length) return tempArray.slice(0, roomCount);

  for (let i = 1; i <= roomCount; i++) {
    if (i !== 1 && i > tempArray.length) {
      tempArray.push({
        room: i,
        adults: 1,
        children: [],
      });
    }
  }

  return tempArray;
}

export function getTotalChildren(roomArray: GuestRoomType[]) {
  return roomArray.reduce<number>((acc, room) => {
    acc += room.children.length;
    return acc;
  }, 0);
}
