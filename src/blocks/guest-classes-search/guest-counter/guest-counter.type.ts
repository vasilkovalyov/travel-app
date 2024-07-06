export type GuestCounterProps = {
  id: string;
  title: string;
  description: string;
  value: number;
  minValue?: number;
  room: number;
  onChange: (room: number, value: number) => void;
};
