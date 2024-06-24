export type CountaerProps = {
  id?: string;
  value?: number;
  minValue?: number;
  input?: boolean;
  title?: string;
  className?: string;
  onChange: (value: number) => void;
};
