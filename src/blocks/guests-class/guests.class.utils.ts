import { RoomType } from './guests-class.type';

export const defaultRoom: Readonly<RoomType> = {
  room: 1,
  adults: 1,
  children: [],
};

export function getUpdatedRoom(
  roomArray: RoomType[],
  roomCount: number,
): RoomType[] {
  const tempArray: RoomType[] = [...roomArray];
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
