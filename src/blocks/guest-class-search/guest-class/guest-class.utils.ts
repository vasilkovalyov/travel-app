import { GuestRoomType } from './guest-class.type';

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
