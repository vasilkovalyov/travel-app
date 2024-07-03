export type FilterModalProps = {
  title?: string;
  open: boolean;
  children: React.ReactNode;
  loading?: boolean;
  onHandleClose: () => void;
};
