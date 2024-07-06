import { GuestType } from '@/store/search-filters';
import { GuestRoomType } from './guest-class.type';

export const defaultRoom: Readonly<GuestRoomType> = {
  room: 1,
  adults: 1,
  children: [],
};

export function getUpdatedRoom(
  roomArray: GuestRoomType[],
  roomCount: number,
): GuestRoomType[] {
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

export function getGuestTypeInfo(rooms: GuestRoomType[]): GuestType {
  return rooms.reduce<GuestType>(
    (acc, room) => {
      acc.rooms += 1;
      acc.children = [...acc.children, ...room.children];
      acc.adults += room.adults;
      return acc;
    },
    {
      adults: 0,
      children: [],
      rooms: 0,
    },
  );
}
