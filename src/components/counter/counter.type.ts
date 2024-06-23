export type CountaerProps = {
  id: string;
  value?: number;
  minValue?: number;
  onChange: (value: number) => void;
};
