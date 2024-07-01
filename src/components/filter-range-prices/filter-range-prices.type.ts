export type FilterRangePricesProps = {
  min: number;
  max: number;
  currency: string;
  showResult?: boolean;
  onChange?: (min: number, max: number) => void;
};
